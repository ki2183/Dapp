import { useEffect, useRef, useState } from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';
import axios from "axios";
import userDto from "../../../dumydata/user.json"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Login(){

    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 30)
  
    const { handleSubmit, register, formState: { errors } } = useForm()
    const onsubmit = async dt => {
      // await new Promise((r) => setTimeout(r, 1000));

      console.log(JSON.stringify(dt))
      
      // axios.post('/users/login', JSON.stringify(dt), {
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })
      // .then((response) => {
      //   console.log(response); // 전송 결과를 처리하는 코드
      //   // alert(response)

      //   const token = response.data; // 서버에서 받은 토큰 값
      //   console.log(token)

      //   const tokenData = {
      //     token:token,
      //     expirationDate:expirationDate.getTime()
      //   }
        
      //   localStorage.setItem('token', JSON.stringify(tokenData));


      //   window.location.href="/storeList/?id=CHICKEN"

      // })
      // .catch((error) => {
      //   console.error(error); // 오류를 처리하는 코드
      //   alert("아이디가 없거나 비밀번호가 틀립니다.")
      // });
      const JSON_dto = JSON.stringify(userDto)
      localStorage.setItem("token",JSON_dto)
      window.location.href="/storeList/?id=CHICKEN"
  };

  return (
    <div className="container-login">
      <div className='login-case'>
      <div id='login-title'>
        <h1>로그인</h1>
        <p>아이디가 없으십니까? <a href='/userSave'>회원가입하기</a></p>
      </div>
        <form id="login-frame"method='post' onSubmit={handleSubmit(onsubmit)}>
        <div>
            <label htmlFor="id">아이디</label>
            <input type="id" name="username"
            {...register("username",{required:"! 아이디를 입력해주세요"})}
            />
            {errors.username && <small className='err_m' role="alert">{errors.username.message}</small>}
         </div>
         <div>
            <label htmlFor="password">비밀번호</label>
            <input type="password"name='password' 
            {...register("password",{required:"! 비밀번호를 입력해주세요"})}/>
             {errors.password && <small className='err_m' role="alert">{errors.password.message}</small>}
         </div>
         <button className='login-button' id="login-button-first" >로그인</button>
        </form>
        <div id='line_'></div>
        <div id='login-option'>
        <button className='login-button'>구글로 로그인하기</button>
        <button className='login-button'>네이버로 로그인하기</button>
        <button className='login-button'>카카오로 로그인하기</button>
        
      </div>
      </div>
      <ServerLessModal/>
    </div>
  );  
}

export default Login;


function ServerLessModal(){
  const boxRef = useRef(null)

  useGSAP(()=>{
    const tl = gsap.timeline()
    tl.to(boxRef.current,{
      duration:0,
      boxShadow:"0px 0px 0px #1b1b1b4d",
    })
    tl.to(boxRef.current,{
      duration:1.5,
      opacity:0,
      
    },0.5)
    tl.to(boxRef.current,{
      display:"none" 
    },2)
  },[])

  return (
    <div ref={boxRef} className='server-less-modal-container'>
      <span>프리티어 기간이 끝나서</span>
      <span>UI만 남아있어요</span>
    </div>
  )
}
