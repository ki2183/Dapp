import { useState } from 'react';
import './Nav.css';

function Globalnav(probs){
  return <nav className='global_nav'>
    <a href='/'><span className="material-symbols-outlined">home</span></a>
    <button className='loginbutton' onClick={(e)=>{ e.preventDefault(); probs.ChangeLogin()}}>로그인</button>
    <a href='/login'><span className="material-symbols-outlined">login</span></a>
  </nav>
}
function Loginnav(probs){
  return <nav className='global_nav'>
    <a href='/'><span className="material-symbols-outlined">home</span></a>
    <button className='loginbutton' onClick={(e)=>{ e.preventDefault(); probs.ChangeLogin()}}>로그아웃</button>
    <button id='button_menu_frame' onClick={(e)=>{
      e.preventDefault();
      probs.Changesemi();
    }}><span className="material-symbols-outlined">menu</span></button>
  </nav>
}
function SemiNav(probs){
  return <div className='seminav'>
    <div id='seminav_empty'></div>
    <div className='seminav_list_container'>
    <a href='/logout'><div className='seminav_list'><p>로그아웃</p></div></a>
    <a href='/infopatch'><div className='seminav_list'><p>정보수정</p></div></a>
    <a href='/basket'><div className='seminav_list'><p>장바구니</p></div></a>
    </div>
  </div>
}

function Nav() {

  const [logincheck,setLogincheck] = useState(false);
  const [semicheck,setSemicheck] = useState(false);

  let nav_frame;
  let seminav;
  const ChangeLogin = ()=>{
    setLogincheck(!logincheck)
  }
  const Changesemi = ()=>{
    setSemicheck(!semicheck)
  }

  !logincheck ? nav_frame=<Globalnav ChangeLogin={ChangeLogin}/> : nav_frame=<Loginnav ChangeLogin={ChangeLogin} Changesemi={Changesemi}/>;
  !semicheck ? seminav=[] : seminav=<SemiNav/>
  return (
    <div className="App">
      {seminav}
      {nav_frame}
      
    </div>
  );
}

export default Nav;
