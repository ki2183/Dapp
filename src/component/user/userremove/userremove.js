import './userremove.css'
import axios from "axios";
import { useState,useRef, useEffect } from 'react';
import { useCookies } from 'react-cookie';

function RemoveFrame(probs){
    
    const [cookies, setCookie, removeCookies] = useCookies(['token']);
    const token = cookies.token;
    const [pwd, setPwd] = useState(null)
    const [view,setView] = useState(null)
    const inputRef = useRef(null)
    const [tf,setTF] = useState(false)
    const [pwdtf,setPwdTf] = useState(false)
    const handlerPwd = (e) => {
        e.preventDefault();
        setPwd(inputRef.current.value)
    }
    const TFpassword = (e) => {
        e.preventDefault();
        
        const dt = {
            "checkPassword": pwd
        }

        axios.post(`/users/${token.id}/check-password`, JSON.stringify(dt),{
            headers: {'Content-Type': 'application/json'}})
          .then(res => {
            console.log(res.data.result)

            const result = res.data.result

            !result ? alert("비밀번호가 틀렸습니다.") : setTF(res.data.result)

          }).catch(err=>{
                console.log(err)
            })

    }    

    const LogoutApi = ()=>{
        axios.post('/users/logout')
        .then(res=>{
          console.log("로그아웃")
        }).catch(err=>{
          console.log(err+"토큰에러")
        })
      }
    
    const RemoveMyId = () => {
        axios.delete(`/users/${token.id}/delete`)
        .then(res => {
            LogoutApi()
            removeCookies('token')
            window.location.href="/"

        })
        .catch(err => {
            console.log(err)
            alert("삭제를 실패했습니다. 다시 실행해주세요.")
        })
    }

    useEffect(()=>{
        console.log("a")
        !tf ? setView(null) : setView( <div className='remove-question'>
        <div className='remove-question-div'>
            <p>탈퇴하시겠습니까? 정보는 되돌릴 수 없습니다.</p>
            <div>
                <button className='remove-but1' onClick={e=>{e.preventDefault(); RemoveMyId()}}>탈퇴하기</button>    
                <button className='remove-but2' onClick={e=>{e.preventDefault(); 
                setTF(false)}}>취소하기</button>
            </div>
        </div>
    </div>)
    },[tf])

    return <div className='remove-frame'>
        <h2 className='remove-h2'>탈퇴를 원하시면 비밀번호를 입력하세요.</h2>
        <input className='remove-pwd' type='password' ref={inputRef} onChange={handlerPwd}/>
        <div className='div-lines'></div>
        <button className='remove-but' onClick={e=>{
            e.preventDefault(); 
  
            if(pwd !== null)
                TFpassword(e);
            else{
                alert("비밀번호를 입력하세요")
            }
            }}>탈퇴하기</button>
        {view}
    </div>
}

function UserRemove(){

    return <div className='container-userremove'>
        <RemoveFrame/>
    </div>
}


export default UserRemove