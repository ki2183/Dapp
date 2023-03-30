import './Mainbanner.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
function Menulist(probs){

    const [menu,setMenu] = useState([]);

    useEffect(()=>{
      const menu_ = [];
      for(let i=0; i<probs.list.length; i++){
        menu_.push(
            <a href={`/category/?id=${probs.list[i]}`} key={`menu_${i}_`}>
              <div className='menu-div' id={probs.list[i]} key={`menu_${i}_div`}>
                <p>{probs.list[i]}</p></div></a>
        );
    }
    setMenu(menu_);
    },[probs.list]);
    
    return  <div className='banner'>
        {menu}
   </div>

}

function Mainbanner(probs){

  const [data,setData] = useState(0);
  useEffect(
    () => {
      axios({
          url: '/api/home',
          method: 'GET'
      }).then((res) => {
          setData(res.data);
      });

    }, [setData]
  );
    console.log(data)
  const list = probs.data;
  return (
    <div className="container_main">
        <Menulist list={data}></Menulist>
    </div>
  );
}

export default Mainbanner;
