import './Mainbanner.css';
import { useEffect, useState } from 'react';
import { useCookies} from 'react-cookie';

function Menulist(probs){

   const menu = ['CHICKEN','PIZZA','CHINESE','JAPANESE','HAMBURGER','DESSERT','TEST']
      const menu_ = [];
      for(let i=0; i<menu.length; i++){
        menu_.push(
            <a href={`/storeList/?id=${menu[i]}`} key={`menu${i}_`}>
              <div className='menu-div' id={menu[i]} key={`menu${i}_div`}>
                <p>{menu[i]}</p></div></a>
        );
    }
    return  <div className='banner'>
        {menu_}
   </div>

}

function Mainbanner(probs){

  const [data,setData] = useState(0);
  
  const list = probs.data;
  const [cookies,setCookie,removeCookies] = useCookies(['token']); // 'token' 쿠키를 사용하기 위해 useCookies 사용
  const token = cookies.token;

  return (
    <div className="container_main">
        <Menulist list={data}></Menulist>
        <div id='empty'></div>
        {/* <button onClick={e=>{alert(token)}}>토큰확인</button>
        <button onClick={e=>{alert("토큰 아웃"); removeCookies('token') }}>토큰 아웃</button> */}
    </div>
  );
}
// api 필요없어짐
export default Mainbanner;
