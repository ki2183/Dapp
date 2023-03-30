import"./Infopatch.css";
import { useForm, useFormState } from 'react-hook-form';
import { useEffect, useRef, useState } from "react";

function InfoMain({Setuser, user, userdata}){

    const { register, handleSubmit, watch ,formState: { isDirty, errors }, } = useForm({});
    const [pcheck, setPcheck] = useState(false);
    const onSubmit=(data)=>{
        
        alert(JSON.stringify(data))
    };

    console.log(user)
    const city=[];
    const Do=['서울','부산','대구','인천','광주','대전','울산','경기도','경상도','충청도','전라도','강원도','제주도'];
    const this_ = useRef();

    Do.forEach(e => {
        city.push(
            <option key={`city${e}`} value={e}>{e}</option>
        );
    });
    
    let check;

    (!pcheck) ? check=[] : check = <CheckPassword pcheck={pcheck} setPcheck={setPcheck}/>  

    return  <form className="info_form" method="post" onSubmit={handleSubmit(onSubmit)}>
       {check}

    <div className="info_form_div">
        <label htmlFor="name">이름</label>
        <input type="text"
        name="name" 
        defaultValue={user[0]}
        {...register("name",{required:"! 이름은 필수입력 칸입니다."})}/>
        {errors.name && <small className='err_message' role="alert">{errors.name.message}</small>}
    </div>


    <div className="info_form_div">
        <label htmlFor="phonenumber">전화번호</label>
        <input type="text" name="phonenumber"
        defaultValue={user[1]}
        {...register("phonenumber",{required:"! 전화번호는 필수입력 칸입니다."})}
        />
        {errors.phonenumber && <small className='err_message' role="alert">{errors.phonenumber.message}</small>}
    </div>
    <div className="info_form_div_aria">
    <label htmlFor="area">주소</label>
    <select id="pp" name="area" aria-label="도"
                 aria-invalid={!isDirty ? undefined : errors.area ? "true" : "false"}
                 defaultValue={user[2]}
                 {...register("area",{
                 required:"지역 선택은 필수입력 칸입니다."
                })}>
                    <option value="">도</option>
                    {city}
    </select>
    <input type='text' name='address'  placeholder='주소'
        defaultValue={user[3]}
        aria-invalid={!isDirty ? undefined : errors.address ? "true" : "false"}
        {...register("address",{required:"주소 입력은 필수입력 칸입니다."}
    )}/>

    <input type="text" name="postnumber" placeholder='우편번호'
                 defaultValue={user[4]}
                 aria-invalid={!isDirty ? undefined : errors.postnumber ? "true" : "false"}
                 {...register("postnumber",{
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
            {!errors.area &&errors.address && <small role="alert">{errors.address.message}</small>}
            {!errors.area &&!errors.address &&errors.postnumber && <small role="alert">{errors.postnumber.message}</small>}
    </div>

    <button onClick={e=>{e.preventDefault(); setPcheck(!pcheck) }}>수정하기</button>
    <button id="secession">탈퇴하기</button>

</form>
}

function CheckPassword({password,pcheck, setPcheck}){
    return <div className="check_frame">
            <div id="check_frame_div">
                <button id="cancle_but" onClick={e=>{
                    e.preventDefault();
                    setPcheck(!pcheck);
                }}>x</button>
                <p>수정하기 위해서는 비밀번호가 필요합니다.</p>
                <input type="password" ></input>
                <button id="start_">수정하기</button>
            </div>
            
    </div>
}

function Infopatch({userdata}){
    console.log(userdata)

   

    const [user,setUser] = useState([]);
    const [main,setMain] = useState([]);

    useEffect(()=>{
        const user_=[]
        let main_;
        user_.push(userdata.name)
        user_.push(userdata.phonenumber)
        user_.push(userdata.area)
        user_.push(userdata.address)
        user_.push(userdata.postnumber)

        setUser(user_)
        
        main_=(<InfoMain userdata={userdata} setUser={setUser} user={user_} />);
        setMain(main_);
    },[setUser,setMain,userdata])

    console.log(main)
    
    



    return (<div className="info_container">
       {main}

    </div>);
}

export default Infopatch;
