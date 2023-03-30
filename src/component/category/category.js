import './category.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import  axios  from 'axios';
import { Dumy } from '../../dumydata/dumy.js';


function ChoiceMenu(probs){
    
    const [li,setLi] = useState([]);

    useEffect(()=>{
        const li_=[];
        const num = probs.list.length;
        
        probs.list.forEach(e => {
            li_.push(
                <a href={`/category/?id=${e}`} key={e}><div><p>{e}</p></div></a>
            ); 
        });
        setLi(li_);
    },[probs.list]);

    return <div className='choicemenu'>
        {li}
    </div>
}
function Shoplist(probs){
    
    const query = probs.query_;
    const [shoplist,setShoplist] = useState([]);

    useEffect(()=>{
        const shoplist_ = [];
        probs.shop_data.forEach(e => {
            if(e.category===query){
                shoplist_.push(<a href='/order' key={`${e.shop_name}_shopinfo`}><div className='shop_div'>
                <div id='shopImage'></div>
                <div id='shopIntro'><p>{e.shop_name}</p><p>배달료:{e.delivery_price}</p></div>
            </div></a>);
            }
        });
        setShoplist(shoplist_);
    },[query,probs.shop_data]);

    return <div className='container_shop'>
        {shoplist}
    </div>
}
function Category(probs) {

    const [data,setData] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const query_=(searchParams.get("id"));
    const shop_data = new Dumy().data;
    useEffect(
      () => {
        axios({
            url: '/api/category',
            method: 'GET'
        }).then((res) => {
            setData(res.data);
        });
      }, [setData]
    );
    
      
  return (
    <div className="container_category">
        <ChoiceMenu list={data}></ChoiceMenu>
        <Shoplist query_={query_} shop_data={shop_data}></Shoplist>
    </div>
  );
}

export default Category;
