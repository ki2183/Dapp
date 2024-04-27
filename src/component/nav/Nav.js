import { useEffect, useState } from 'react';
import './Nav.css';
import axios from 'axios';


function Globalnav(probs){
  const [navCSS, setNavCSS] = useState({ color: "black" });

  useEffect(() => {
    console.log(probs.rec);
    if (probs.rec === true) {
      setNavCSS({ color: "#ffbb00" });
    } else {
      setNavCSS({ color: "black" });
    }
    console.log(navCSS);
  }, []);

  return <nav className='global_nav'>
    <a href='/' className='global_nav_first'><span className="material-symbols-outlined"style={navCSS} >home</span></a>
    <a href='/login' className='global_nav_second'><span className="nav-span-login" style={navCSS}>로그인</span></a>
  </nav>
}
function Loginnav(probs){

  const [semiview,setSemiView] = useState([])
  const [navCSS, setNavCSS] = useState({ color: "black" });

  useEffect(() => {
    console.log(probs.rec);
    if (probs.rec === true) {
      setNavCSS({ color: "#ffbb00" });
    } else {
      setNavCSS({ color: "black" });
    }
    console.log(navCSS);
  }, []);

  useEffect(()=>{
    const semiview_ =[<SemiNav key="seminav"/>]
    !probs.semicheck ? setSemiView([]) : setSemiView(semiview_)
  },[probs.semicheck])

  return <nav className='global_nav'>
    {semiview}

    <a href='/' className='global_nav_first' ><span className="material-symbols-outlined"style={navCSS} >home</span></a>

    <button id='button_menu_frame' className='global_nav_second' onClick={(e)=>{
      e.preventDefault();
      probs.Changesemi(e);
    }}><span className="material-symbols-outlined" style={navCSS}>menu</span></button>

  </nav>
}
function SemiNav(probs){

  const savedToken = (JSON.parse(localStorage.getItem('token')) && JSON.parse(localStorage.getItem('token')).token) ? (JSON.parse(localStorage.getItem('token')).token) : null
  const LogoutApi = async()=>{
    try{
      const res =  await axios.delete('/users/logout', { data: { refreshToken: savedToken.refreshToken } })
      .then(res=>{
        console.log("로그아웃")
        localStorage.removeItem('token');
      }).catch(err=>{
        console.log(err+"토큰에러")
      })
    }
    catch (err){
      console.log(err)
    }

  }

//   const LogoutApi_ = ()=> {axios.delete('/users/logout', { data: { refreshToken: savedToken.refreshToken } })
//   .then(res=>{
//     console.log("로그아웃")
//   }).catch(err=>{
//     console.log(err+"토큰에러")
//   })
// }

  const openWindowCoupon = () => {
    const newWindow = window.open('/mycoupons', '_blank', 'width=470,height=400');
    newWindow.focus();
  };

  const openWindowAddressinfo = () => {
    const newWindow = window.open('/addressinfo', '_blank', 'width=520,height=450');
    newWindow.focus();
  };

  const openWindowReview = () => {
    const newWindow = window.open('/addressinfo', '_blank', 'width=520,height=450');
    newWindow.focus();
  };

  // LogoutApi(); 일단 뺌 오류 있어서 이거 있으면 못고침 
  return <div className='seminav'>
    <div className='seminav_list_container'>
      {/* <div onClick={e=>{e.preventDefault();  localStorage.removeItem('token'); alert("로그아웃 됐습니다."); window.location.href="/" }}className='seminav_list'><p>로그아웃</p></div> */}
      {/* 테스트용 */}
      <div onClick={e=>{e.preventDefault(); LogoutApi(); alert("로그아웃 됐습니다."); window.location.href="/" }}className='seminav_list'><p>로그아웃</p></div>
      <div onClick={e=>{e.preventDefault(); (savedToken&&savedToken.id!==undefined && savedToken.id!==null)? window.location.href="/userUpdate" : alert("로그인하세요")}}className='seminav_list'><p>정보수정</p></div>
      <div className='seminav_list'  onClick={e=>{e.preventDefault(); (savedToken && savedToken.id!==undefined && savedToken.id!==null)? window.location.href="/myorder" : alert("로그인하세요")}}><p>주문 내역</p></div>
      <div className='seminav_list' onClick={e=>{e.preventDefault();  openWindowCoupon() }} ><p>내 쿠폰보기</p></div>
      <div className='seminav_list' onClick={e=>{e.preventDefault();  openWindowAddressinfo() }} ><p>내 주소보기</p></div>
      <div className='seminav_list' onClick={e=>{e.preventDefault();  window.location.href="/board" }} ><p>공지/게시판</p></div>
    </div>
  </div>
}

function Nav(probs){

  const [semicheck,setSemicheck] = useState(false);
  // const savedToken = (JSON.parse(localStorage.getItem('token')) && JSON.parse(localStorage.getItem('token')).token) ? (JSON.parse(localStorage.getItem('token')).token) : null
  const savedToken = (JSON.parse(localStorage.getItem('token')))

  const [view,setView] = useState(null)
  const [changeCheck,setChangeCheck] = useState(false)
  const Changesemi = (e)=>{
    e.preventDefault();
    setSemicheck(prevSemicheck => !prevSemicheck);
    console.log(semicheck)
  }

  useEffect(() => {

    
    if(savedToken && savedToken.id){
      console.log("토큰있음")
      setView(<Loginnav  rec={probs.rec} semicheck={semicheck} setSemicheck={setSemicheck} Changesemi={Changesemi}/> )
    }
    else{
      console.log("토큰 없음")
      setView(<Globalnav rec={probs.rec}/> )
    }
    
    // function checkTokenExpiration() {
    //   const tokenDataString = localStorage.getItem('token');
      
    //   if (tokenDataString) {
    //     const tokenData = JSON.parse(tokenDataString);
    //     const expirationTime = tokenData.expirationDate;
    //     const currentTime = new Date().getTime();
    //     if (currentTime > expirationTime) {
    //       localStorage.removeItem('token');
    //       setChangeCheck(!changeCheck)
    //     }
    //   }
    // }

    // const interval = setInterval(() => {

    //     checkTokenExpiration(); // 다른 페이지에서 토큰 유효 시간 확인 및 삭제

    //     if(savedToken && savedToken.id){
    //       console.log("토큰있음")
    //       setView(<Loginnav  rec={probs.rec} semicheck={semicheck} setSemicheck={setSemicheck} Changesemi={Changesemi}/> )
    //     }
    //     else{
    //       console.log("토큰 없음")
    //       setView(<Globalnav rec={probs.rec}/> )
    //     }
    // }, 10000);
    // console.log(savedToken)
    // return () => {
    //   clearInterval(interval);
    // };
  }, []);



  useEffect(()=>{
    if(probs.rec){
    console.log(probs.rec)}

    console.log(savedToken)

    if(savedToken&&savedToken.id){  //토큰있으면 Loginnav 없으면 Global nav
      console.log("토큰 있어유 ") 
      setView(<Loginnav  rec={probs.rec} semicheck={semicheck}  setSemicheck={setSemicheck} Changesemi={Changesemi}/> )
    }else{
      setView(<Globalnav rec={probs.rec}/> )
    }

  },[semicheck,changeCheck])
  
  return <div className="App">
      {/* <Loginnav rec={probs.rec} semicheck={semicheck}  setSemicheck={setSemicheck} Changesemi={Changesemi}/>  */}
      {view}
    </div>
  
}

export default Nav;
