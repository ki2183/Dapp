import"./Userupdate.css";
import { useForm} from 'react-hook-form';
import { useEffect, useRef, useState } from "react";
import { useCookies } from 'react-cookie';
import axios from "axios"

function InfoMain({userdto,getdata}){
    console.log(getdata)
    const { register, handleSubmit, watch ,formState: { isDirty, errors }, } = useForm({});
    const [pcheck, setPcheck] = useState(false);
    const onSubmit=(data)=>{
        const dto = {
            "username" : userdto.username,
            "name":data.name,
            "nickName":data.nickName,
            "address":{
                "city":data.city,
                "street": data.street,
                "zipcode":data.zipcode
            },
            "gender" : getdata.gender
        }
        alert(JSON.stringify(dto))

        axios.put(`/users/${userdto.id}/update`, JSON.stringify(dto), {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            console.log(response.data); // 전송 결과를 처리하는 코드
            alert(JSON.stringify(dto))
            window.location.href="/"
          })
          .catch((error) => {
            console.error(error); // 오류를 처리하는 코드
          });

    };

    // console.log(user)
    const city=[];
    const Do=['서울','부산','대구','인천','광주','대전','울산','경기도','경상도','충청도','전라도','강원도','제주도'];
    const this_ = useRef();

    Do.forEach(e => {
        city.push(
            <option key={`city${e}`} value={e}>{e}</option>
        );
    });

    return  <form className="info_form" method="post" onSubmit={handleSubmit(onSubmit)}>

    <div className="info_form_div">
        <label htmlFor="name">이름</label>
        <input type="text"
        name="name" 
        defaultValue={getdata.name}
        {...register("name",{required:"! 이름은 필수입력 칸입니다."})}/>
        {errors.name && <small className='err_message' role="alert">{errors.name.message}</small>}
    </div>

    <div className="info_form_div">
        <label htmlFor="nickName">닉네임</label>
        <input type="text"
        name="nickName" 
        defaultValue={getdata.nickName}
        {...register("nickName",{required:"! 이름은 필수입력 칸입니다."})}/>
        {errors.nickName && <small className='err_message' role="alert">{errors.nickName.message}</small>}
    </div>

    <div className="info_form_div_aria">
    <label htmlFor="area">주소</label>

    <input type='text' name="city" placeholder='주소'
        defaultValue={getdata.address.city}
        aria-invalid={!isDirty ? undefined : errors.city ? "true" : "false"}
        {...register("city",{required:"주소 입력은 필수입력 칸입니다."}
    )}/>

    <input type='text' name='street'  placeholder='주소'
        defaultValue={getdata.address.street}
        aria-invalid={!isDirty ? undefined : errors.street ? "true" : "false"}
        {...register("street",{required:"주소 입력은 필수입력 칸입니다."}
    )}/>

    <input type="text" name="zipcode" placeholder='우편번호'
                   defaultValue={getdata.address.zipcode}
                 aria-invalid={!isDirty ? undefined : errors.zipcode ? "true" : "false"}
                 {...register("zipcode",{
                 required:"우편 번호는 필수입력 칸입니다.",
                 minLength:{value:5,
                    message:"5자리 미만 불가능"
                },
                 maxLength:{value:6,
                    message:"6자리 초과 불가능"
                },
                 pattern:{
                    value: /[0-9]/g,
                }
    })}></input><br/>
            {errors.area && <small role="alert">{errors.area.message}</small>}
            {!errors.area &&errors.street && <small role="alert">{errors.street.message}</small>}
            {!errors.area &&!errors.street &&errors.zipcode && <small role="alert">{errors.zipcode.message}</small>}
    </div>

    <button onClick={e=>{
        }}>수정하기</button>
    <button id="secession">탈퇴하기</button>

</form>
}

function UserUpdate(){
    
    const [user,setUser] = useState([]);
    const [main,setMain] = useState([]);
    const [cookies] = useCookies(['token']); // 'token' 쿠키를 사용하기 위해 useCookies 사용
    const token = cookies.token;

    // const [userdto,setUserDto] = useState({
    //     id: token.id,
    //     username: token.username,
    //     name: token.name,
    //     nickName: token.username,
    //     address: {
    //         city: token.address.city,
    //         street: token.address.street,
    //         zipcode: token.address.zipcode 
    //     }  
    // });

    const [userdto,setUserDto] = useState({
        id: "ki2183",
        username: "ki2183",
        name: "김기준",
        nickName: "ki2183",
        address: {
            city: "오산",
            street: "경기대로",
            zipcode: "180515",
        }  
    });

    const [getdata,setGetdata] = useState({
        "username" : null,
        "name":null,
        "nickName":null,
        "address":{
            "city":null,
            "street":null,
            "zipcode":null,
        }})
    useEffect(()=>{
        const userdata = async()=>{
            try{
                axios.get(`/users/${userdto.id}`)
                .then(res=>{
                    // console.log(res.data.data)
                    const getdata_ = res.data.data;
                    
                    const getdata__ = {
                        "username" : getdata_.username,
                        "name":getdata_.name,
                        "nickName":getdata_.nickName,
                        "address":{
                            "city":getdata_.address.city,
                            "street": getdata_.address.street,
                            "zipcode":getdata_.address.zipcode
                        },    
                        "gender":getdata_.gender
                    }
                    setGetdata(getdata__)
                }).catch(err=>{
                    console.log("axios"+err)
                })
            }
            catch(err){
                console.log('getdata'+err)
            }
        }

        userdata()

        let main_;

        main_=(<InfoMain userdto={userdto} getdata={getdata} />);

        setMain(main_);

    },[cookies,getdata])

    // useEffect(()=>{
       
        
    // },[cookies,setUser,setMain])

    // console.log(main)
    
    
//  기본 주소 이름 닉네임


    return (<div className="info_container">
       {main}

    </div>);
}

export default UserUpdate;
