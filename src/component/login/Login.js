import { useState } from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';

function Login(){
    const { handleSubmit, register, formState: { errors } } = useForm();
    const onSubmit=(data)=>{alert(JSON.stringify(data))};

  return (
    <div className="container-login">
      <div className='login-case'>
      <div id='login-title'>
        <h1>로그인</h1>
        <p>아이디가 없으십니까? <a href='/joinmember'>회원가입하기</a></p>
      </div>
        <form id="login-frame"method='post' onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label htmlFor="id">아이디</label>
            <input type="id" name="id"
            {...register("id",{required:"! 아이디를 입력해주세요"})}
            />
            {errors.id && <small className='err_m' role="alert">{errors.id.message}</small>}
         </div>
         <div>
            <label htmlFor="password">비밀번호</label>
            <input type="password"name='password' 
            {...register("password",{required:"! 비밀번호를 입력해주세요"})}/>
             {errors.password && <small className='err_m' role="alert">{errors.password.message}</small>}
         </div>
         <button className='login-button' id="login-button-first">로그인</button>
        </form>
        <div id='line_'></div>
        <div id='login-option'>
        <button className='login-button'>구글로 로그인하기</button>
        <button className='login-button'>네이버로 로그인하기</button>
        <button className='login-button'>카카오로 로그인하기</button>
        
      </div>
      </div>
    </div>
  );  
}

export default Login;
