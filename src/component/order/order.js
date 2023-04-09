import "./order.css"
import menulist from "./dumy.json"
import { useEffect,useState } from "react";
import axios from "axios";

function Basket(){
    return <div className="container-basket">

    </div>
} 

function Order(probs){
    return <div className="container-order">
        <div className="container-order-frame">
            <div className="order-main-image">
                <div className="order-main-badge"></div>
            </div>

            <div className="order-info">
                <h1>가게 이름</h1>
                <p>배달료</p>
                <p>open now</p>
            </div>

            <Menulist ActiveOn={probs.ActiveOn} reverse={probs.reverse} setReverse={probs.setReverse}></Menulist>
        </div>
    </div>
}

function Menulist(probs){

    return <div className="menulist-frame">
                <div className="menulist">
                        <div className="menulist-top">
                            <div className="menulist-top-searchbar-div">
                                <h2>모든메뉴</h2>
                                <form>
                                    <button onClick={e=>{
                                        e.preventDefault();
                                        alert();
                                    }}>
                                        <span className="material-symbols-outlined">search</span>
                                    </button>
                                    <input type="text" placeholder="메뉴를 고르세요"></input>    
                                </form>    
                            </div>
                            <MenuListTop></MenuListTop>
                            <MenulistBottom ActiveOn={probs.ActiveOn} reverse={probs.reverse} setReverse={probs.setReverse}></MenulistBottom>
                        </div>
                    </div>
            </div>
}

function MenuListTop(){
    const list = menulist.menuList;
    const [li,setLi] = useState([]);


    //axios     @GetMapping("/api/menu/name/{name}")

    useEffect(()=>{
        let li_=[];

        list.forEach(e=>{
            li_.push(
                <button key={e} className="menulist-button"
                onClick={e=>{
                    e.preventDefault();
                    alert();
                }}
                ><span className="menulist-button-span">{e}</span></button>
            )
        })

        setLi(li_)
    },[list])

    return <div className="menulist-top-list">
        {li}
    </div>
}
function MenulistBottom(probs){
    const [menuli,setMenuli] = useState([])

    useEffect(()=>{
        let i = 10
        const menuli_=[]

        for(let j=0; j<i; j++){
            menuli_.push( <button key={`dk${j}`} className="menu-choice-button "
            onClick={e=>{
                e.preventDefault();
                probs.ActiveOn();
            }}
            ><div>
                <div className="menu-choice-intro">
                    <h2>메뉴</h2>
                    <p>설명</p>
                    <p>가격</p>
                </div>
                <div className="menu-choice-img"> 사진</div>

            </div></button>)
        }
        setMenuli(menuli_)
    },[setMenuli,probs])

    return <div className="menulist-bottom-frame">
    { menuli}
   
    </div>
}
function MenuWindow(probs){
    return <div className="menuwindow-frame">
        <div className="menuwindow-main">
           <button id="menucancle" onClick={e=>{e.preventDefault(); probs.ActiveOn()}}>✖</button>
           <div>
            
           </div>
            <form>
                <button>﹢</button>
                <input type="text"></input>
                <button>﹣</button>
                <button>장바구니에 추가</button>
            </form>
        </div>
    </div>
}

function OrderMain(){
    const [reverse,setReverse] = useState(false)

    let window

    (!reverse) ? window=undefined : window=(   <MenuWindow setReverse={setReverse} reverse={reverse} ActiveOn={()=>{
        setReverse(!reverse)
    }}/> )

    return <div className="container-order-total">
        <Order setReverse={setReverse} reverse={reverse} ActiveOn={()=>{setReverse(!reverse)}}/>
        <Basket/>
        {window}
    </div>
}
export default OrderMain;