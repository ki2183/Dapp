import"./Userupdate.css";
import { useForm} from 'react-hook-form';
import { useEffect, useState } from "react";
import axios from "axios"


function InfoMain(probs){

    const token = (JSON.parse(localStorage.getItem('token')) && JSON.parse(localStorage.getItem('token')).token) ? (JSON.parse(localStorage.getItem('token')).token) : null
    const { register, handleSubmit } = useForm({});
    const [userDto,setUserDto] = useState({})
    const [view,setView] = useState()

    useEffect(()=>{
        const getData = () => {
           
            axios.get(`/users/${token.id}`)
            .then(res=>{
                console.log(res.data)
                console.log(res.data.data)
                const getdata_ = res.data.data;

                setUserDto(getdata_)
                
            })
            .catch(err=>{
                console.log(err)
            })
        }
        // const dto = {
        //     "username" : "김기준",
        //     "name":"김기준",
        //     "nickName":"김기준",
        //     "address":{
        //         "city":"Osan-si",
        //         "street": "99-18, Gyeonggi-daero, Osan-si, Gyeonggi-do",
        //         "zipcode":"18146"
        //     }
        // }
        // setUserDto(dto)
        getData()
    },[])

    useEffect(()=>{

        const validateName = (value) => {
            if (value === "") {
              return "빈칸을 채우세요.";
            }
            return true;
          };

          const validatePost = (value) => {
            if (value === "") {
              return "빈칸을 채우세요";
            } else{
                if(!/^[0-9]*$/.test(value)){
                    return "숫자만 입력 가능합니다.";
                }
                else{
                    return true;
                }
      
            }
          };

        console.log(userDto)

        setView( 
            <form>
                <div className="info_form_div">
                    <label htmlFor="name">이름</label>
                    <input 
                        placeholder="이름 입력은 필수입니다."
                        defaultValue={userDto.name || ""}
                        {...register("name", { validate: () => validateName(userDto.name) })}
                        onChange={(e) => setUserDto({ ...userDto, name: e.target.value })}
                        />
                </div>

                {validateName(userDto.name)!==true && <small className='err_message' role="alert">{validateName(userDto.name)}</small>}

                <div className="info_form_div">
                <label htmlFor="nickName">닉네임</label>
                    <input
                        type="text"
                        placeholder="닉네임 입력은 필수입니다."
                        defaultValue={userDto.nickName || ""}
                        {...register("nickName", { validate: () => validateName(userDto.nickName) })}
                        onChange={(e) => setUserDto({ ...userDto, nickName: e.target.value })}
                    />
                </div>

                {validateName(userDto.nickName)!==true && <small className='err_message' role="alert">{validateName(userDto.nickName)}</small>}

                <div className="info_form_div_aria">


                <label htmlFor="area">주소</label>

                <input type='text' name="city" placeholder='주소'

                    defaultValue={userDto && userDto.address ? (userDto.address.city || ""): null}
                    {...register("city", { validate: () => validateName(userDto.address.city) })}
                    onChange={(e) => setUserDto({ ...userDto, address: { ...userDto.address, city: e.target.value } })}
                    />

                {userDto.address && validateName(userDto.address.city)!==true && <small className='err_message' role="alert">{validateName(userDto.address.city)}</small>}

                <input type='text' name='street'  placeholder='주소'
                    // defaultValue={(userDto && userDto.address) ? userDto.address.street:null}
                    defaultValue={userDto && userDto.address ? (userDto.address.street || ""): null}
                    {...register("street", { validate: () => validateName(userDto.address.street) })}
                    onChange={(e) => setUserDto({ ...userDto, address: { ...userDto.address, street: e.target.value } })}
                  />
                {userDto.address && validateName(userDto.address.street)!==true && <small className='err_message' role="alert">{validateName(userDto.address.street)}</small>}
                <input type="text" name="zipcode" placeholder='우편번호'
                            defaultValue={userDto && userDto.address ? (userDto.address.zipcode || ""): null}
                            {...register("zipcode", { validate: () => validatePost(userDto.address.zipcode)})} 
                           
                            onChange={(e) => setUserDto({ ...userDto, address: { ...userDto.address, zipcode: e.target.value } })}
                           
                ></input>
                {userDto.address && validatePost(userDto.address.zipcode)!==true && <small className='err_message' role="alert">{validatePost(userDto.address.zipcode)}</small>}
                <br/>
    </div>
            </form>
        )
    },[userDto,register])

    const onSubmit=(data)=>{
        console.log(userDto)
   
        // alert(JSON.stringify(userDto))

        axios.put(`/users/${token.id}/update`, JSON.stringify(userDto), {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            console.log(response.data); // 전송 결과를 처리하는 코드
            // alert(JSON.stringify(userDto))
            window.location.href="/storeList/"
          })
          .catch((error) => {
            console.error(error); // 오류를 처리하는 코드
          });

    };


    

    return  <form className="info_form" method="post" onSubmit={handleSubmit(onSubmit)}>

    {view}

    <button className="submit-myinfo" onClick={e=>{

        }}>수정하기</button>
    <button id="secession" onClick={e=>{e.preventDefault(); window.location.href="./userremove"}}>탈퇴하기</button>

</form>
}

function UserUpdate(){


    return (<div className="info_container">
       <InfoMain/>

    </div>);
}

export default UserUpdate;
