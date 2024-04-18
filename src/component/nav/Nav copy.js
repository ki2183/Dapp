import { useEffect, useState } from 'react';
import './Nav.css';
import { useCookies} from 'react-cookie';


function Globalnav(probs){
  return <nav className='global_nav'>
    <a href='/'><span className="material-symbols-outlined">home</span></a>
    <button className='loginbutton' onClick={(e)=>{ e.preventDefault(); probs.ChangeLogin()}}>로그인</button>
    {/* 편의성때문에 냅둠 */}
    <a href='/login'><span className="material-symbols-outlined">login</span></a>
  </nav>
}
function Loginnav(probs){
  return <nav className='global_nav'>
    <a href='/'><span className="material-symbols-outlined">home</span></a>
    <button className='loginbutton' onClick={(e)=>{ e.preventDefault(); probs.ChangeLogin()}}>로그아웃</button>
    {/* 편의성때문에 냅둠 */}
    <button id='button_menu_frame' onClick={(e)=>{
      e.preventDefault();
      probs.Changesemi(e);
      console.log(probs.token)
    }}><span className="material-symbols-outlined">menu</span></button>
  </nav>
}
function SemiNav(probs){
  return <div className='seminav'>
    {/* <div id='seminav_empty'></div> */}
    <div className='seminav_list_container'>
    <a href='/' onClick={probs.removeCookies('token')}><div className='seminav_list'><p>로그아웃</p></div></a>
    <a href='#' onClick={e=>{e.preventDefault(); (probs.token!==undefined && probs.token!==null)? window.location.href="/userUpdate" : alert("로그인하세요")}}><div className='seminav_list'><p>정보수정</p></div></a>
    {/* <a href='/basket'><div className='seminav_list'><p>장바구니</p></div></a> */} 
    {/* 편의성때문에 냅둠 */}
    </div>
  </div>
}

function Nav() {

  
  const [logincheck,setLogincheck] = useState(false);
  const [semicheck,setSemicheck] = useState(false);
  const [cookies,setCookie,removeCookies] = useCookies(['token']); // 'token' 쿠키를 사용하기 위해 useCookies 사용
  const [semiView,setSemiView] = useState(null)
  // const token = cookies.token;
  const [token ,setToken] = useState(null)
 
  const [view,setView] = useState(null)

  let nav_frame;
  let seminav;
  const ChangeLogin = ()=>{
    const check = !logincheck
    console.log(check)
    setLogincheck(check)
    console.log(logincheck)
  }
  const Changesemi = (e)=>{
    e.preventDefault();
    setSemicheck(!semicheck)
    console.log(semicheck)
  }

  // (token!==undefined&&token!==null)? setView(<Loginnav token={token} ChangeLogin={ChangeLogin} Changesemi={Changesemi}/>) : setView(nav_frame=<Globalnav ChangeLogin={ChangeLogin}/>)
  let v 

  (token!==undefined&&token!==null)? v=<Loginnav token={token} ChangeLogin={ChangeLogin} Changesemi={Changesemi}/> : v = nav_frame=<Globalnav ChangeLogin={ChangeLogin}/>

  // useEffect(()=>{
  //    (token!==undefined&&token!==null)? setView(<Loginnav token={token} ChangeLogin={ChangeLogin} Changesemi={Changesemi}/>) : setView(nav_frame=<Globalnav ChangeLogin={ChangeLogin}/>)
  //    console.log(token)
  //    console.log(semicheck)
  // },[])

  // useEffect(()=>{
  //   // !semicheck ? semiView(null) : semiView(<SemiNav/>)
  //   // !semicheck ? seminav=[] : seminav=<SemiNav/>
  //   console.log(semicheck)
  // },[semicheck])

  // useState(()=>{
  //   console.log(token)
  // },[cookies])

  // !logincheck ? nav_frame=<Globalnav ChangeLogin={ChangeLogin}/> : nav_frame=<Loginnav ChangeLogin={ChangeLogin} Changesemi={Changesemi}/>;
  // useEffect(()=>{
    !semicheck ? seminav=[] : seminav=<SemiNav token={token} removeCookies={removeCookies}/>
  //   console.log(semicheck)
  // },[semicheck])
  
  return (
    <div className="App">
      {seminav}
      {/* {view} */}
      {v}
      
    </div>
  );
}

export default Nav;
