import { useEffect, useState } from "react"
import "./orderinfo.css"
import axios from "axios";
import { useCookies } from 'react-cookie';

function OrderInfoFrame(){
    
    const token = JSON.parse(localStorage.getItem('token'));
    
    const [infoView,setinfoView] = useState([]) 
    const [ordDto , setOrdDto] = useState(null)
    const [limit,setlimit] = useState(false) 
    useEffect(()=>{

        let tf

        const getUserOrder = () => {
            axios.get(`/orders/${token.id}/user/date-desc`)
            .then((res)=>{
                console.log(res.data.data)
                setOrdDto(res.data.data)
                setlimit(true)
            })
            .catch((err)=>{
                console.log(err)
            })
        }

        const setInfo = () => {
            const infoView_ = []



            ordDto.forEach(el => {
                
                const mon = el.orderDate.substr(5, 2); //달
                const day =el.orderDate.substr(8, 2); //일

                const dateObj = new Date(el.orderDate);
                const options = { weekday: 'long', timeZone: 'Asia/Seoul' };
                const dayOfWeek = dateObj.toLocaleDateString('ko-KR', options);
                const Day = dayOfWeek.slice(0,1) //요일

                const menus = []  //메뉴들 div
                const onemenu = [] // 메뉴 요약
                

                let totalPrice = 0; //총 가격

                for(let i=0; i<el.orderLines.length; i++){
                    const t = el.orderLines[i]

                    totalPrice += t.price*t.count
                }

                

                for(let i=0; i<el.orderLines.length; i++){

                    const t = el.orderLines[i]

                    menus.push(<div className="order-menus-div">
                        <p className="order-menus-name">{t.name}</p>
                        <p className="order-menus-count"> · {t.count}개</p>
                        <p className="order-menus-price">{t.count*t.price}원</p>
                    </div>)
                }

                if(el.orderLines.length >= 2){  //메뉴가 2개 이상일때
                    let n = 0
                    for(let i=0; i<el.orderLines.length; i++){
                        const t = el.orderLines[i]
                        n += t.count
                    }

                    onemenu.push(<p className="order-etc-shortmenu"> ·  {el.orderLines[0].name} 외 {n}개 주문</p>)
                }
                else if(el.orderLines.length === 1){  //메뉴가 1개 이하 일 때
                    onemenu.push(<p className="order-etc-shortmenu"> ·  {el.orderLines[0].name}</p>)
                }

                infoView_.push(
                    <div className="order-frame">
                        <div className="order-date-frame">  
                            <p>{mon}{day} ({Day}) {el.status}</p>
                            <button onClick={e =>{ e.preventDefault(); alert("아직연결안함")}}>가게보기</button>
                        </div>
                        <div className="order-etc-frame">
                            <p className="order-etc-storename">가게이름</p>
                            {onemenu}
                        </div>
                        {menus}
                        <div className="order-totalprice-frame">
                            <p className="order-pay-p">결재금액</p>
                            <div className="order-price-div">
                                <p className="order-price-p">주문금액</p>
                                <p className="order-totalprice-p">{totalPrice}원</p>
                            </div>
                            <div className="order-total-frame">
                                <p>총 결재금액</p>
                                <p>{totalPrice}원</p>
                            </div>
                        </div>
                    </div>
                )
            });
            setinfoView(infoView_)
        }

        (token && token.id)? tf=true : tf=false

        if(tf===true){
            console.log(token.id)
            if(!limit)
                getUserOrder()
            if(ordDto !== null)
                setInfo()
        }

    },[ordDto])

    return <div className="container-orderinfo-frame">
        {infoView}
    </div>
}

function OrderCSSTEST(){
    return <div className="container-orderinfo-frame">
        <div className="order-frame">
                        <div className="order-date-frame">  
                            <p>06 29 (목) 배달완료</p>
                            <button onClick={e =>{ e.preventDefault(); alert("아직연결안함")}}>가게보기</button>
                        </div>
                        <div className="order-etc-frame">
                            <p className="order-etc-storename">가게이름</p>
                            <p className="order-etc-shortmenu"> · 초당옥수수라떼 외 1개 주문</p>
                        </div>

                        <div className="order-menus-div">
                            <p className="order-menus-name">미니 크로플</p>
                            <p className="order-menus-count"> · 2개</p>
                            <p className="order-menus-price">3000원</p>
                        </div>
                        <div className="order-menus-div">
                            <p className="order-menus-name">초코 크로플</p>
                            <p className="order-menus-count"> · 1개</p>
                            <p className="order-menus-price">3500원</p>
                        </div>
                        <div className="order-menus-div">
                            <p className="order-menus-name">오리진 크로플</p>
                            <p className="order-menus-count"> · 1개</p>
                            <p className="order-menus-price">2500원</p>
                        </div>

                        <div className="order-totalprice-frame">
                            <p className="order-pay-p">결재금액</p>
                            <div className="order-price-div">
                                <p className="order-price-p">주문금액</p>
                                <p className="order-totalprice-p">9000원</p>
                            </div>
                            <div className="order-total-frame">
                                <p>총 결재금액</p>
                                <p>9000원</p>
                            </div>
                        </div>
                    </div>
    </div>
}

function OrderInfo() {
    return <div className="container-orderinfo">
        <OrderInfoFrame/>
        {/* <OrderCSSTEST/>
        <OrderCSSTEST/><OrderCSSTEST/><OrderCSSTEST/><OrderCSSTEST/> */}

    </div>
}

export default OrderInfo