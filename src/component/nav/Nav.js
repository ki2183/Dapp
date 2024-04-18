import { useEffect, useRef, useState } from 'react';
import './Nav.css';
import { useCookies} from 'react-cookie';
import { type } from '@testing-library/user-event/dist/type';
import axios from 'axios';


function Globalnav(probs){
  return <nav className='global_nav'>
    <a href='#' className='global_nav_first' onClick={e=>{e.preventDefault(); alert(probs.token);}}><span className='nav-span'>home</span></a>
    <a href='/login' className='global_nav_second'><span className="nav-span-login">로그인</span></a>
  </nav>
}
function Loginnav(probs){

  const [semiview,setSemiView] = useState([])
  
  useEffect(()=>{
    const semiview_ =[<SemiNav key="seminav"/>]
    !probs.semicheck ? setSemiView([]) : setSemiView(semiview_)
  },[probs.semicheck])

  return <nav className='global_nav'>
    {semiview}

    <a href='/storeList/?id=CHICKEN' className='global_nav_first' ><span className='nav-span'>home</span></a>

    <button id='button_menu_frame' className='global_nav_second' onClick={(e)=>{
      e.preventDefault();
      probs.Changesemi(e);
    }}><span className="material-symbols-outlined">menu</span></button>

  </nav>
}
function SemiNav(probs){
  const [cookies,removeCookies] = useCookies(['token']);
  const token = cookies.token
  const LogoutApi = ()=>{
    axios.delete('/users/logout', { data: { refreshToken: token.refreshToken } })
    .then(res=>{
      console.log("로그아웃")
    }).catch(err=>{
      console.log(err+"토큰에러")
    })
  }
  // LogoutApi(); 일단 뺌 오류 있어서 이거 있으면 못고침 
  return <div className='seminav'>
    <div className='seminav_list_container'>
    <a href='/' onClick={e=>{e.preventDefault(); removeCookies('token'); localStorage.removeItem('token'); alert("로그아웃 됐습니다."); window.location.href="/" }}><div className='seminav_list'><p>로그아웃</p></div></a>
    <a href='#' onClick={e=>{e.preventDefault(); (cookies.token!==undefined && cookies.token!==null)? window.location.href="/userUpdate" : alert("로그인하세요")}}><div className='seminav_list'><p>정보수정</p></div></a>
    <a href='#' onClick={e=>{e.preventDefault(); (cookies.token!==undefined && cookies.token!==null)? window.location.href="/myorder" : alert("로그인하세요")}}><div className='seminav_list'><p>주문 내역</p></div></a>
    </div>
  </div>
}

function Nav(probs){

  const [semicheck,setSemicheck] = useState(false);
  const savedToken = JSON.parse(localStorage.getItem('token'));

  const tokenRef = useRef(null)
  const [view,setView] = useState(null)
  const [cookies, setCookie, removeCookies] = useCookies(['token']);

  const token = cookies.token

  const Changesemi = (e)=>{
    e.preventDefault();
    setSemicheck(!semicheck)
    console.log(semicheck)
  }


  useEffect(()=>{
    console.log(token)
    console.log(savedToken)
  },[semicheck,token])
  
  return <div className="App">
      <Loginnav semicheck={semicheck} token={token} setSemicheck={setSemicheck} Changesemi={Changesemi}/> 
    </div>
  
}

export default Nav;
