import './order.css';

import {Menu} from "../menu.js"
import { useEffect, useState } from 'react';

function Menulist(probs){
    const menu = new Menu().list;
    const shop = menu[0].shop[0];
    const S = shop;
    const menu_li=[];
    const menu_num = [];

    for(let i=0; i<S.menu.length; i++){
        menu_num.push(0);
        menu_li.push(<div key={`menu${i}`} className="menu_frame_">
            <div className="menu_info_" >
                <p>{S.menu[i].name}</p>
                <p>{S.menu[i].price}원</p>
                <div>
    
                <button type='button' onClick={(e)=>{
                    e.preventDefault();
                    probs.AddBasket(S.menu[i].name,S.menu[i].price);
                }} >담기</button>
                </div>
            </div>
            <div className='menu_img_'></div>
        </div>);
    }
    return <div id='menulist_frame'>
        {menu_li}
    </div>
}
 
function Od(){
    const menu = new Menu().list;
    const shop = menu[0].shop[0];

    const [create, setCreate] = useState([]);
    const [orderlist,setOrderlist] = useState([]);
    const [lastbasket,setLastbasket] = useState([]);
    
    useEffect(()=>{
        const create_ = [...create];
        let orderlist_ = [];
        for(let i=0; i<create_.length; i++){
            orderlist_.push(<div key={`orderlist${i}`} className='basket_list_frame'>
                <div id='cancle_button_frame'><button onClick={(e)=>{
                    e.preventDefault();
                    const create_ = [...create];
                    const lastbasket_ = [...lastbasket];

                    create_.splice(i,1);
                    setCreate(create_);
                    lastbasket_.splice(i,1);
                    setLastbasket(lastbasket_);

                }}>×</button>
                </div>
                <span>{create[i]}</span>
                <div id='num_control'>
                    <button onClick={()=>{
                        if(lastbasket[i]>1){
                        const lastbasket_ =[...lastbasket];
                        lastbasket_[i]-=1;
                        setLastbasket(lastbasket_);
                    }
                    }}>-</button>
                    <span>{lastbasket[i]}</span>
                    <button onClick={()=>{
                        const lastbasket_ =[...lastbasket];
                        lastbasket_[i]+=1;
                        setLastbasket(lastbasket_);
                    }}
                    >+</button>
                </div>
                <span>총가격</span>
            </div>);
        }
        setOrderlist(orderlist_);
    },[create,lastbasket]);
    
    return <div className="container_order"> 
        <div className='order_frame'>
            <div id='menu_frame'>
                <div id='menu_frame_title'>가게이름</div>
                <div id='shop_info'>
                    <div id='shop_img'></div>
                    <div id='shop_intro'></div>
                </div>

                <div id='menu_list'>
                    <div id='menu_intro'>메뉴</div>
                    <Menulist AddBasket={(name,price)=>{
                        const create_ = [...create];
                        const lastbasket_ =[...lastbasket];

                        if(create_.includes(`${name}`)===false){
                        create_.push(name);
                        setCreate(create_);
                        lastbasket_.push(1);
                        setLastbasket(lastbasket_);
                        }
                    }}></Menulist>
                </div>
            </div>
            <div id="basket_frame">
                <div id='basket_frame_title'><span>장바구니</span></div>
                <div id='basket_list'>
                    {orderlist}
                    <div className='total_price'>
                        <span>합계 ...원</span>
                    </div>
                </div>
                <button id='start_order' onClick={(e)=>{
                    e.preventDefault();
                    alert();
                }}><span>주문하기</span></button>
            </div>
        </div>
    </div>
}
export default Od;