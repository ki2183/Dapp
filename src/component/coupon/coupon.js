import { useEffect, useRef, useState } from "react"
import "./coupon.css"
import axios from "axios"

function CouponFrame(probs){

    const [clickTF,setClickTF] = useState(false)
    const [css,setCss] = useState(['choiced-menu',''])
    const savedToken = (JSON.parse(localStorage.getItem('token')) && JSON.parse(localStorage.getItem('token')).token) ? (JSON.parse(localStorage.getItem('token')).token) : null
    const couponsInfoRef = useRef([]) 
    const [coupon_list_view,setCoupon_list_view] = useState([])
    const [pagebuttonView,setPagebuttonView] = useState([])
    const [ButtonNum,setButtonNum] = useState(0)
    const [limit,setLimit] = useState(false)

    useEffect(()=>{
        const css_ = ['choiced-menu','']
        const css__ = ['','choiced-menu']    
        clickTF===false ? setCss(css_) : setCss(css__)
        console.log(couponsInfoRef.current)
    },[clickTF])
    
    useEffect(()=>{
        const getCoupons = () => {
            axios.get(`/coupons/${savedToken.id}/user`)
            .then(res=>{
                console.log(res.data)
                console.log(res.data.data)
                couponsInfoRef.current = res.data.data
                console.log(couponsInfoRef.current)
                make_button()
                // make_coupon_list()
            })
            .catch(err=>{
                console.log(err)
            })
        }

        const make_button = () =>{
            
            const num = couponsInfoRef.current.length

            // const num = 13

            const buttonnum = (num/6-Math.floor(num/6)==0) ? Math.floor(num/6) : Math.floor(num/6)+1

            console.log(buttonnum)

            const pagebuttonView_=[]
            for(let i=0; i<buttonnum; i++){
                pagebuttonView_.push(
                    <button className="mycoupon-button" onClick={e=>{
                        e.preventDefault()
                        setButtonNum(i)
                        console.log(ButtonNum)
                        }}>
                        {i+1}
                    </button>
                )
            }
            setPagebuttonView(pagebuttonView_)
            console.log(pagebuttonView)



            setLimit(true)
        }

        const make_coupon_list = () =>{

            axios.get(`/coupons/${savedToken.id}/user-page?offset=${ButtonNum*6}&limit=6`)
            .then(res=>{
                console.log(res.data)
                console.log(res.data.data)
                const data = res.data.data
                const coupon_list_view_ = []
                for(let i=0; i<data.length; i++){
    
                    const date = new Date(data[i].couponExpirationDate);
    
                    const Date_data = date.toISOString().replace("T"," ").slice(0,-5);
    
                    coupon_list_view_.push(
                        <div className="mycoupon-list-div">
                        <div>{data[i].name}</div>
                        <div>{data[i].discountAmount}{data[i].couponType==="PERCENT" ? '%': '원' }</div>
                        <div>{Date_data}</div>
                    </div>
                    )
                }

                setCoupon_list_view(coupon_list_view_)
                

            })
            .catch(err=>{
                console.log(err)
            })
        }

        if(savedToken!==null && savedToken!==undefined){
            console.log("getcoupons 실행함")
            if(limit===false){
                getCoupons()
            }
            else{
                make_coupon_list()
            }

        }

        // make_button()
    },[ButtonNum,limit])

    // useEffect(()=>{
    //     console.log(ButtonNum)
    // },[ButtonNum])

    return (
        <div className="mycoupon-frame">
            <div className="mycoupon-state-choice">
                <div id={css[0]} onClick={e=>{
                    e.preventDefault()
                    setClickTF(false)
                }} >내 쿠폰</div>
                <div id={css[1]} onClick={e=>{
                    e.preventDefault()
                    setClickTF(true)
                    alert("아직 미구현")
                }} >쿠폰 등록</div>
            </div>

            <div className="mycoupon-list">
                <div className="mycoupon-list-div" id="mycoupon-list-first">
                    <div>쿠폰명</div>
                    <div>할인액(율)</div>
                    <div>유효기간</div>
                </div>

                {coupon_list_view}
                
            </div>
            <div className="mycoupon-page-button">
                {pagebuttonView}
            </div>
        </div>
    )
}

function Coupon(probs){
    return (
        <div className="mycoupon-container">
            <CouponFrame/>
        </div>
    )
} 

export default Coupon
