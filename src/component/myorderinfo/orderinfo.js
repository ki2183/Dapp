import { useEffect, useState } from "react"
import "./orderinfo.css"
import axios from "axios";

function OrderInfoFrame(){
    
    const token = (JSON.parse(localStorage.getItem('token')) && JSON.parse(localStorage.getItem('token')).token) ? (JSON.parse(localStorage.getItem('token')).token) : null
    
    const [infoView,setinfoView] = useState([]) 
    const [ordDto , setOrdDto] = useState(null)
    const [limit,setlimit] = useState(false) 
    const [limit2,setlimit2] = useState(false) 
    const [storename,setStoreName] = useState([])
    const [storeID,setStoreID] = useState([])
    
    
    useEffect(()=>{

        let tf

        const getUserOrder = () => {
            axios.get(`/orders/${token.id}/user/date-desc`)
            .then((res)=>{
                console.log(res.data.data)
                setStoreID(res.data.data)
                setOrdDto(res.data.data)
                setlimit(true)
            })
            .catch((err)=>{
                console.log(err)
            })
        }

        console.log(storeID)
        const getStoreName = async() => {
            
            const storename_ = []

            try{
                const requests = storeID.map(el => axios.get(`/stores/${el.storeId}`));
                const responses = await Promise.all(requests);

                responses.forEach(res =>{
                    storename_.push(res.data.data.name)
                })

                setStoreName(storename_)
                console.log(storename_)
                setlimit2(true)
                setInfo()

            }catch(err){
                console.log(err);
            }
            // storeID.forEach(el => {
            //     axios.get(`/stores/${el.storeId}`)
            //     .then(res=>{
            //         storename_.push(res.data.data.name)
            //         console.log(res.data.data.name)
            //     })
            //     .catch(err=>{
            //         console.log(err)
            //     })
            // });
            
            // setStoreName(storename_)
            // console.log(storename_)
            // setlimit2(true)
            // setInfo()
        }

        console.log(storename)


        const setInfo = () => {
            const infoView_ = []


            let j=0
            console.log(storename[j])
            ordDto.forEach(el => {
                console.log(storename[j])
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

                    onemenu.push(<p className="order-etc-shortmenu"> ·  {el.orderLines[0].name} 외 {n-1}개 주문</p>)
                }
                else if(el.orderLines.length === 1){  //메뉴가 1개 이하 일 때
                    onemenu.push(<p className="order-etc-shortmenu"> ·  {el.orderLines[0].name}</p>)
                }

                infoView_.push(
                    <div className="order-frame">
                        <div className="order-date-frame">  
                            <p>{mon}{day} ({Day}) {el.status}</p>
                            <button onClick={e =>{ e.preventDefault(); alert("아직연결안함"); window.location.href = `/order/?id=${storename[j]}` }}>가게보기</button>
                        </div>
                        <div className="order-etc-frame">
                            <p className="order-etc-storename">{storename[j]}</p>
                            {onemenu}
                        </div>
                        {menus}
                        <div className="order-totalprice-frame">
                        <div className="order-price-div">
                                <p className="order-price-p">할인 금액</p>
                                <p className="order-totalprice-p" id="order-total-price-p-sale">{el.paymentPrice!==null ? totalPrice-el.paymentPrice : 0}원</p>
                            </div>
                            <div className="order-price-div">
                                <p className="order-price-p">주문금액</p>
                                <p className="order-totalprice-p">{totalPrice}원</p>
                            </div>
                            <div className="order-total-frame">
                                <p>총 결재금액</p>
                                <p>{el.paymentPrice}원</p>
                            </div>
                        </div>
                    </div>
                )
                j++
            });
            setinfoView(infoView_)
            console.log("끝")
        }

        (token && token.id)? tf=true : tf=false

        if(tf===true){
            console.log(token.id)
            if(!limit)
                getUserOrder()
                if(!limit2 && limit===true)
                    getStoreName()
        
            if(ordDto !== null)
                setInfo()
        }

        console.log(storename)
    },[ordDto,storename,storeID])

    // useEffect(()=>{
    //     console.log(storeID)
    //     const getStoreName = () => {
            
    //         const storename_ = []
    //         storeID.forEach(el => {
    //             axios.get(`/stores/${el.storeId}`)
    //             .then(res=>{
    //                 storename_.push(res.data.data.name)
    //                 console.log(res.data.data.name)
    //             })
    //             .catch(err=>{
    //                 console.log(err)
    //             })
    //         });
            
    //         setStoreName(storename_)
    //         console.log(storename_)
            
    //     }
    //     getStoreName()
    //     console.log(storename)
    // },[storeID])

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
                            <div className="order-price-div">
                                <p className="order-price-p">할인 금액</p>
                                <p className="order-totalprice-p" id="order-total-price-p-sale">-9000원</p>
                            </div>
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
        {/* <OrderCSSTEST/>*/}
       

    </div>
}

export default OrderInfo