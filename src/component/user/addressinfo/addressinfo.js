import { useEffect, useLayoutEffect, useState,useRef } from "react"
import "./addressinfo.css"
import axios from "axios"
import {useForm} from 'react-hook-form';

function AddressFrame(){
    const token = (JSON.parse(localStorage.getItem('token')) && JSON.parse(localStorage.getItem('token')).token) ? (JSON.parse(localStorage.getItem('token')).token) : null
    const { register, handleSubmit, watch ,formState: { isSubmitting, isDirty, errors }, } = useForm({});
    const [AddDtoList,setAddDtoList] = useState([])
    const [AddDiv, setAddDiv] = useState([])

    const [css,setCss] = useState(['choiced-menu',''])
    const [clickTF,setClickTF] = useState(false)
    const couponsInfoRef = useRef([]) 
    const [recognize, setRecognize] = useState(false)

    const [view,setView] = useState(null)
    
    const [limit,setLimit] = useState(false)

    const onsubmit = async dt => {
        await new Promise((r) => setTimeout(r, 1000));
      
        const dto= {
            // "userId" : token.id,
            "userId" : 303,
            "name" : dt.name,
            "deliveryCity":dt.city,
            "deliveryStreet" :dt.street,
            "deliveryZipcode" : dt.zipcode,
        }
        if(limit===false){
            // alert(dto)
            setLimit(true)
            console.log(dto)
            console.log(JSON.stringify(dto))


            axios.post('/deliveryAddresses/save', JSON.stringify(dto), {
            headers: {
                'Content-Type': 'application/json'
            }
            })
            .then((res) => {
                console.log(res.data); // 전송 결과를 처리하는 코드
                setRecognize(!recognize)
                alert("주소가 저장되었습니다.")
                window.location.href="/addressinfo"
                
            })
            .catch((error) => {
                // alert("실패했습니다.")
                console.error(error); // 오류를 처리하는 코드
                setLimit(false)
            });
        }
        
    };
    
    const AddressSave =  <div className="myaddress-list-save">
        <form name='form' method='post' onSubmit={e=>{e.preventDefault();}}>
            <label htmlFor="name">주소 별명</label>
            <input type='text' name="name" placeholder='ex) 우리집'
                aria-invalid={!isDirty ? undefined : errors.name ? "true" : "false"}
                {...register("name", {
                    required: "이름은 필수 입력입니다.",
                })}
            />

            {errors.name && <small role="alert" className='err_mess'>{errors.name.message}</small>}

            <label htmlFor="city">도,시</label>
            <input type='text' name='city'  placeholder='도시'
            aria-invalid={!isDirty ? undefined : errors.city ? "true" : "false"}
            {...register("city",{
            required:"도시입력은 필수입니다."
            })}
            />

            <label htmlFor="name">주소</label>
            <input type='text' name='street'  placeholder='주소'
            aria-invalid={!isDirty ? undefined : errors.street ? "true" : "false"}
            {...register("street",{
            required:"주소입력은 필수입니다."
            })}
            />


            <label htmlFor="name">우편번호</label>
            <input type="text" name="zipcode" placeholder='우편번호'
                aria-invalid={!isDirty ? undefined : errors.zipcode ? "true" : "false"}
                {...register("zipcode",{
                required:"우편번호 입력은 필수입니다.",
                minLength:{value:5,
                    message:"5자리 미만 불가능"
                },
                maxLength:{value:6,
                    message:"6자리 초과 불가능"
                },
                pattern:{
                    value: /[0-9]/g,
                    // message:"숫자로만 입력가능합니다."
                }
                })}
            ></input>
            {errors.city && <small role="alert" className='err_mess'>{errors.city.message}</small>}
            {!errors.city &&errors.street && <small role="alert" className='err_mess'>{errors.street.message}</small>}
            {!errors.city &&!errors.street &&errors.zipcode && <small role="alert" className='err_mess'>{errors.zipcode.message}</small>}
            <input type="submit"value='새주소 등록하기' onClick={
                handleSubmit(onsubmit)}></input>
        </form>
    </div>

   


 
    useLayoutEffect(()=>{
        
        const getAddresses = async() => {
            try{
                const res = await axios.get(`/deliveryAddresses/${token.id}`)
                console.log(res.data.data)
                setAddDtoList(res.data.data)

            }catch(err){
                console.log("getAddresses ERR")
                console.log(err)
            }
        }

        if(token && token.id){
            getAddresses()
        }else{
            // setAddDtoList([
            //     {id: 1209, name: '우리집', deliveryCity: '경기대로 99-18', deliveryStreet: '동아아파트 105동303호', deliveryZipcode: '181515'},
            //     {id: 1210, name: '우리집', deliveryCity: '경기대로 99-18', deliveryStreet: '동아아파트 105동303호', deliveryZipcode: '181515'},
            //     {id: 1211, name: '우리집', deliveryCity: '경기대로 99-18', deliveryStreet: '동아아파트 105동303호', deliveryZipcode: '181515'},
            //     {id: 1211, name: '우리집', deliveryCity: '경기대로 99-18', deliveryStreet: '동아아파트 105동303호', deliveryZipcode: '181515'}
            // ])
            // 임시데이터
        }
    },[recognize])


    useEffect(()=>{
        console.log(AddDtoList)


        const MakeAddressFrmae= ()=> {

            const AddDiv_=[]
            console.log(AddDtoList.length)

            AddDiv_.push(
                <div className="myaddress-list-div">
                <div className="myaddress-list-contents">
                    <span className="material-symbols-outlined span-location" >Location_on</span>
                    기본 주소
                </div>
                <div className="myaddress-list-contents-info">
                    {token.address.city} {token.address.street}
                </div>
                <div className="myaddress-list-contents-post">
                    {token.address.zipcode}
                </div>
            </div>
            )

            for(let i=0; i<AddDtoList.length; i++){
                AddDiv_.push(
                    <div key={`AddDtoList${i}`} className="myaddress-list-div">
                    <div className="myaddress-list-contents">
                        <span className="material-symbols-outlined span-location" >Location_on</span>
                        {AddDtoList[i].name}
                    </div>
                    <div className="myaddress-list-contents-info">
                        경기대로99-18 동아아파트 105동 303호
                    </div>
                    <div className="myaddress-list-contents-post">
                        181515
                    </div>
                </div>
                )
            }

            setAddDiv(AddDiv_)
            console.log(AddDiv)
        }
        MakeAddressFrmae()
        console.log(AddDiv)
        // setView(AddDiv)
    },[AddDtoList])

    useEffect(()=>{
        setView(AddDiv)
    },[AddDiv])

    useEffect(()=>{
        const css_ = ['choiced-menu','']
        const css__ = ['','choiced-menu']    
        clickTF===false ? setCss(css_) : setCss(css__)
        console.log(couponsInfoRef.current)
        if(clickTF===false){
            if(AddDiv!==[])
                setView(AddDiv)
        }
        else{
            setView(AddressSave)
        }
        console.log("clickTF")
    },[clickTF])
    
    return (<div id="address-frame" className="mycoupon-frame">
        <div id="address-state-choice" className="mycoupon-state-choice">
                <div id={css[0]} onClick={e=>{
                    e.preventDefault()
                    setClickTF(false)
                }} >내 주소</div>
                <div id={css[1]} onClick={e=>{
                    e.preventDefault()
                    setClickTF(true)
                }} >주소 등록</div>
            </div>

            <div className="myaddress-list">

                {view}
                
            </div>
        
    </div>)
}

function AddRessInfo(probs){
    return (<div className="mycoupon-container">
        <AddressFrame/>
    </div>)
}

export default AddRessInfo



// ------------------------------------------css임

   {/* <div className="myaddress-list-save">
                    <form name='form' method='post' onSubmit={e=>{e.preventDefault();}}>
                        <label htmlFor="name">이름</label>
                        <input type='text' name="name" placeholder='이름'
                            aria-invalid={!isDirty ? undefined : errors.name ? "true" : "false"}
                            {...register("name", {
                                required: "이름은 필수 입력입니다.",
                            })}
                        />

                        {errors.name && <small role="alert" className='err_mess'>{errors.name.message}</small>}
          
                        <label htmlFor="city">도,시</label>
                        <input type='text' name='city'  placeholder='도시'
                           aria-invalid={!isDirty ? undefined : errors.city ? "true" : "false"}
                           {...register("city",{
                           required:"도시입력은 필수입니다."
                          })}
                        />

                        <label htmlFor="name">주소</label>
                        <input type='text' name='street'  placeholder='주소'
                           aria-invalid={!isDirty ? undefined : errors.street ? "true" : "false"}
                           {...register("street",{
                           required:"주소입력은 필수입니다."
                          })}
                        />
            

                        <label htmlFor="name">우편번호</label>
                        <input type="text" name="zipcode" placeholder='우편번호'
                            aria-invalid={!isDirty ? undefined : errors.zipcode ? "true" : "false"}
                            {...register("zipcode",{
                            required:"우편번호 입력은 필수입니다.",
                            minLength:{value:5,
                                message:"5자리 미만 불가능"
                            },
                            maxLength:{value:6,
                                message:"6자리 초과 불가능"
                            },
                            pattern:{
                                value: /[0-9]/g,
                                // message:"숫자로만 입력가능합니다."
                            }
                            })}
                        ></input>
                        {errors.city && <small role="alert" className='err_mess'>{errors.city.message}</small>}
                        {!errors.city &&errors.street && <small role="alert" className='err_mess'>{errors.street.message}</small>}
                        {!errors.city &&!errors.street &&errors.zipcode && <small role="alert" className='err_mess'>{errors.zipcode.message}</small>}
                        <input type="submit"value='새주소 등록하기' onClick={
                            handleSubmit(onsubmit)}></input>
                    </form>
                </div> */}



                   {/* <div className="myaddress-list-div">
                    <div className="myaddress-list-contents">
                        <span className="material-symbols-outlined span-location" >Location_on</span>
                        내주소
                    </div>
                    <div className="myaddress-list-contents-info">
                        경기대로99-18 동아아파트 105동 303호
                    </div>
                    <div className="myaddress-list-contents-post">
                        181515
                    </div>
                </div> */}