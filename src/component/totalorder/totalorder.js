import { useEffect,useState,useLayoutEffect } from 'react'
import './totalorder.css'
import { useLocation} from 'react-router-dom'
import axios from 'axios'



function TestMenu(probs){

    const menucheck = probs.menucheck
    const dt = probs.menucheck
    const storename = probs.storename
    useEffect(()=>{
        console.log(dt)
        console.log(menucheck)
        console.log(storename)
    },[])

    return  <div className='total-menus-frame'>
                <div className='basket-menus-check'>
                    <div className='basket-checkbox-frame'>
                        <span className={['material-symbols-outlined', 'basket-checkbox'].join(' ')}>check_box_outline_blank</span>
                    </div>
                </div>
                <div className='basket-menus-info'>
                    <div className='basket-menus-info-fst'>
                        <div className='basket-menus-img'></div>
                        <div className='basket-menus-etcinfo'>
                            <p>이게아닌데 내맘은 이게 아닌데</p>
                            <p>28000원</p>
                            <p>가게이름....</p>
                        </div>
                    </div>                        
                </div>
                <div className='basket-pm-div'>
                            <button onClick={(e)=>{
                                e.preventDefault()
                                // if(num>1)setNum(num-1)
                                }}>-</button>
                                <p>1</p>
                                <button onClick={(e)=>{
                                e.preventDefault()
                                // if(num>0)setNum(num+1)
                                }}>+</button>
                </div>
                <div className='basket-delete-frame'> <button>삭제하기</button></div>
                <div className='basket-menus-price-frame'>
                    <p>상품금액</p>
                    <p>25000원</p>
                </div>
            </div>
}

function CouponWindow(probs){


    const token = (JSON.parse(localStorage.getItem('token')) && JSON.parse(localStorage.getItem('token')).token) ? (JSON.parse(localStorage.getItem('token')).token) : null
    const [viewcoupon,setViewCoupon] = useState([])

    useEffect(()=>{
        const getCoupon = () => {
            axios.get(`coupons/${token.id}/user`)
            .then(res=>{
                console.log(res.data)
                console.log(res.data.data)
                const couponData = res.data.data

                const viewcoupon_=[]

                couponData.forEach(el => { //쿠폰들 만듦
        
                    let coupontype 
        
                    el.couponType==="FIX"? coupontype="원" : coupontype="%";
        
                    const date = new Date(el.couponExpirationDate);
        
                    const Date_data = date.toISOString().replace("T"," ").slice(0,-6);
        
                    viewcoupon_.push(<div class="coupons-zip" key={`couponkey${el.id}`} onClick={e=>{
                        e.preventDefault()
                        probs.setTotal_coupon_dto(el)
                        probs.handleWindow()
                    }}>
                            <p>쿠폰명 : {el.name}</p>
                            <p>할인율 : {el.discountAmount}{coupontype}</p>
                            <p>기간 : ~{Date_data}</p>
                        </div>
                    )
                    setViewCoupon(viewcoupon_)
                });
                
            })
            .catch(err=>{
                console.log(err)
            })
        }
        
        getCoupon()


    },[])

    return <div className='coupon-window-frame' onClick={e=>{e.preventDefault(); probs.handleWindow();}}>
        <div className='coupon-window'onClick={e=>{e.stopPropagation();}}>
            <div className='coupon-title'>
                <div></div>
                <div>쿠폰 할인적용</div>
                <div onClick={e=>{e.preventDefault(); probs.handleWindow();}}>✕</div>
            </div>
            <div className='coupon-div-coupons'>
                {viewcoupon}
                <div class="coupons-zip" onClick={e=>{
                        e.preventDefault()
                        probs.setTotal_coupon_dto({
                            name:"신규 회원 쿠폰",
                            discountAmount:10,
                            couponType:"PERCENT",
                            couponExpirationDate:"2024-04-19"
                        })
                        probs.handleWindow()
                    }}>
                <p>쿠폰명 : 신규 회원 쿠폰

                </p>
                <p>할인율 : 10%</p>
                <p>기간 : ~2023-06-23</p>
            </div>
            <div class="coupons-zip" onClick={e=>{
                        e.preventDefault()
                        probs.setTotal_coupon_dto({
                            name:"신규 회원 쿠폰",
                            discountAmount:10,
                            couponType:"PERCENT",
                            couponExpirationDate:"2024-04-19"
                        })
                        probs.handleWindow()
                    }}>
                <p>쿠폰명 : 봄 
                    이벤트</p>
                <p>할인율 : 10%</p>
                <p>기간 : ~2023-06-23</p>
            </div>
            <div class="coupons-zip" onClick={e=>{
                        e.preventDefault()
                        probs.setTotal_coupon_dto({
                            name:"월간 쿠폰",
                            discountAmount:3000,
                            couponType:"FIX",
                            couponExpirationDate:"2024-04-19"
                        })
                        probs.handleWindow()
                    }}>
                <p>쿠폰명 : 회원 쿠폰</p>
                <p>할인율 : 3000원</p>
                <p>기간 : ~2023-06-23</p>
            </div>
            <div class="coupons-zip" onClick={e=>{
                        e.preventDefault()
                        probs.setTotal_coupon_dto({
                            name:"월간 쿠폰",
                            discountAmount:5,
                            couponType:"PERCENT",
                            couponExpirationDate:"2024-04-19"
                        })
                        probs.handleWindow()
                    }}>
                <p>쿠폰명 : 회원 쿠폰</p>
                <p>할인율 : 5%</p>
                <p>기간 : ~2023-06-23</p>
            </div>
            </div>
        </div>
    </div>
}

function TotalOrderFrame(probs){       
            
    const storename = probs.storename
    
    const token = (JSON.parse(localStorage.getItem('token')) && JSON.parse(localStorage.getItem('token')).token) ? (JSON.parse(localStorage.getItem('token')).token) : null
    const [menuFrame , setMenuFrame] = useState([])
    const [couponWindow,setCouponWindow] = useState([]) //view
    const [couponTF,setCouponTF] = useState(false) //TF
    // const [TotalSum,setTotalSum] = useState(0)


    const handleWindow = () =>{
        setCouponTF(!couponTF);
    }

    useEffect(()=>{
        (couponTF===true) ? setCouponWindow(<CouponWindow setTotal_coupon_dto={probs.setTotal_coupon_dto} handleWindow={handleWindow}/>):setCouponWindow(null) 
    },[couponTF])

    useEffect(() => {
        console.log(probs.dt);
        console.log(probs.menucheck);
        console.log(storename);
        console.log("TOTALORDERFRAME");
        const MakeMenu = () => {
            if(probs.dt){
                
                const menuFrame_ = [];
            
                for (let i = 0; i < probs.dt.length; i++) {
                console.log(i);
                console.log(probs.menucheck[i]);
                menuFrame_.push(
                    <Menuframe
                    key={`menuframe${i}`}
                    i={i}
                    storename={storename}
                    dt={probs.dt}
                    menucheck={probs.menucheck}
                    setMenucheck={probs.setMenucheck}
                    probMenuCheck={probs.menucheck}
                    setDT={probs.setDT}
                    delHadler={probs.delHadler}
                    handleTotalPrice={probs.handleTotalPrice}
                    />
                );
                }
                setMenuFrame(menuFrame_);
            }
        }

        MakeMenu()    
        
      }, [probs.menucheck,probs.dt]);
      
      const onClickHandler = () =>{
 
        console.log(probs.dt)
        console.log(probs.storeID)
        
        
        const orderLines = []

        for(let i=0; i<probs.dt.length; i++){
            orderLines.push(
                {
                    "menu": {
                        "id": probs.dt[i].menuId
                    },
                    "count": probs.dt[i].count,
                    "price": probs.dt[i].price
                },
            )
        }

        const dto ={
            "userId":token.id,
            "storeId": probs.storeID,
            "orderLines": orderLines
        }

        if(probs.total_coupon_dto!==null && probs.total_coupon_dto!==undefined)
            dto.couponId = probs.total_coupon_dto.id;

        console.log(dto)


         axios.post('/orders/save', JSON.stringify(dto), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          console.log(response); // 전송 결과를 처리하는 코드
          alert("주문완료")
        //   history.push('/myorder');
            window.location.href = "/myorder";
            
        })
        .catch((error) => {
          console.error(error); // 오류를 처리하는 코드
          alert('서버 연결 실패')
        });
      }

    return <div className='totalorder-frame'>
        <div className='total-back'>
            <span className="material-symbols-outlined">arrow_back</span>
            <p onClick={e=>{e.preventDefault(); window.location.href=`/order/?id=${probs.storename}`}}>뒤로가기</p>
            <p>주문/결제</p>
        </div>
        <div className='total-basket'>
            <div className='total-basket-storename '>
                <p className='total-store-name'>{storename}</p>
            </div>
            
            {menuFrame}

            <div className='coupon-container'>
                <div className='coupon-frame'>
                    <div>쿠폰 사용</div>
                    <div>{probs.coupon_sale}원</div>
                    <button onClick={e=>{e.preventDefault(); handleWindow(); console.log(couponTF)}}>쿠폰</button>
                    <button onClick={e=>{e.preventDefault(); probs.setTotal_coupon_dto(null); probs.setCoupon_sale(0)}}>취소</button>
                </div>
            </div>
            <div className='total-order-decision'>
                <div>
                    <div className='dicision-order-div'>
                        <p>선택상품금액</p>
                        <p>{probs.totalSum}원</p>    
                    </div>
                    <div className='dicision-order-div'>
                        <p>총 배송비</p>
                        <p>0원</p>    
                    </div>
                    <div className='dicision-order-div'>
                        <p>할인예상금액</p>
                        <p id='dicisiontotalprice'>{probs.coupon_sale}원</p>    
                    </div>
                    <div className='dicision-order-totalprice'>
                        <p>주문금액</p>
                        <p>{probs.totalSum-probs.coupon_sale}원</p>
                        <button onClick={e=>{
                            e.preventDefault() 
                            onClickHandler()
                            }}>주문하기</button>
                    </div>
                </div>

            </div>
        </div>
        {couponWindow}
        
    </div>
}

function Menuframe(probs){

    const menucheck = probs.menucheck
    const dt = probs.dt || []
    const storename = probs.storename
    const [menuNum,setMenuNum]= useState(dt[probs.i].count)
    const [totalPrice,setTotalPrice] = useState(dt[probs.i].price*menuNum)


    useEffect(()=>{
        console.log(dt)
        console.log(menucheck)
        console.log(storename)
        console.log("MENUFRAME")
    },[probs.menucheck])

    useEffect(()=>{
        setTotalPrice(menuNum*dt[probs.i].price)
    },[menuNum,probs.dt])

    return (
    <div className='total-menus-frame'>
        <div className='basket-menus-info'>
            <div className='basket-menus-info-fst'>
                <div className='basket-menus-img'
                style={{ 
                    // backgroundImage:`url(https://dev-server-delivery.s3.ap-northeast-2.amazonaws.com/${probs.dt[probs.i].imgurl[0].fileName})` ,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                }}>
                </div>
                <div className='basket-menus-etcinfo'>
                    <p>{probs.dt[probs.i].name}</p>
                    <p>{probs.dt[probs.i].price}원</p>
                    <p>{storename}</p>
                </div>
            </div>                        
        </div>
        <div className='basket-pm-div'>
                    <button onClick={(e)=>{
                        e.preventDefault()
                            if(dt[probs.i].count>1){
                                const dt_ = [...probs.dt]
                                dt_[probs.i].count-=1
                                probs.setDT(dt_)
                                setMenuNum(menuNum-1)
                                probs.handleTotalPrice()
                            }
                        }}>-</button>
                        <p>{probs.dt[probs.i].count}</p>
                        <button onClick={(e)=>{
                        e.preventDefault()
                        if(probs.dt[probs.i].count>0){
                            const dt_ = [...probs.dt]
                            console.log(dt_)
                            dt_[probs.i].count+=1
                            probs.setDT(dt_)
                            setMenuNum(menuNum+1)
                            probs.handleTotalPrice()
                        }
                        }}>+</button>
        </div>
        <div className='basket-delete-frame'> <button
        onClick={(e)=>{e.preventDefault(); 
            const dt_ = [...probs.dt]
            const menucheck_ = [...probs.menucheck]

            if(dt_&&dt_.length===1){
                alert("메뉴가 없습니다.")
                window.location.href=`/order/?id=${probs.storename}`
            }
            console.log(probs.i)
            console.log(dt_[probs.i])
            dt_.splice(probs.i,1)
            menucheck_.splice(probs.i,1)
            console.log(dt_)
            console.log(menucheck_)
            probs.setDT(dt_)
            probs.setMenucheck(menucheck_)
            console.log(dt)
            console.log(menucheck)
            console.log("TOTALORDER")
        }}
        >삭제하기</button></div>
        <div className='basket-menus-price-frame'>
            <p>상품금액</p>
            <p>{totalPrice}원</p>
        </div>
    </div>
)
}

function TotalOrder(probs){
    const location_ = useLocation()

    const d = location_.state
    const [menucheck, setMenucheck] = useState([null])
    // const token = (JSON.parse(localStorage.getItem('token')) && JSON.parse(localStorage.getItem('token')).token) ? (JSON.parse(localStorage.getItem('token')).token) : null
    const token = (JSON.parse(localStorage.getItem('token')))
    const [dt,setDT] =  useState({})
    const [totalSum,setTotalSum] = useState(0) 
    const [TOTALVIEW,setTOTALVIEW] = useState(null)

    const [total_coupon_dto,setTotal_coupon_dto] = useState(null) //coupon
    const [coupon_sale,setCoupon_sale] = useState(0)
    const [storeID,setStoreId] = useState(null)

    const delHadler = (dt,setDT,menucheck,setMenucheck,i) =>{
        const dt_ = {...dt}
        const menucheck_ = [...menucheck]
        dt_.menuLine = dt_.menuLine.filter((_, index) => index !== i)
        menucheck_.splice(i,1)
        setDT(dt_)
        setMenucheck(menucheck_)
        console.log(dt)
        console.log(menucheck)
        console.log("TOTALORDER")
    }
    
    const [storename,setStroename]= useState(null)
    
    useLayoutEffect(()=>{
        console.log(d)

        const GetStoreID = ()=>{
            console.log("axios시작")
            axios.get(`stores/${d[1]}/name`)
            .then(res=>{
                console.log("axios 안가게아이디")
                console.log(res.data.data[0].id)
                setStoreId(res.data.data[0].id)
            })
            .catch(err=>{
                console.log(err)
            })
            console.log("axios시작")
        }

        let menucheck_ = []
        if(d && d[0] ){
            console.log(d[0])
            console.log(d[1])
            
            let d_ = []
            d[0].forEach(el => {
                d_.push(el)
                menucheck_.push(false)
            });

            // alert("주문확인")
            setDT(d_)
            setStroename(d[1])
            setMenucheck(menucheck_)

            GetStoreID()
            console.log("axios 가게아이디")
        }   
        else{
            // let d_=[
            //     {menuId: 132, name: '전채 요리63', count: 1, price: 19390, imgurl: Array(1)}
            // ]
            // setDT(d_)
            // setStroename("BBQ")
            // setMenucheck([false,false,false])
        }
        console.log("useLayoutEffect 끝")

    },[])

    // coupon_sale,setCoupon_sale
    useEffect(() => {
        console.log("useEffect 시작")
        console.log(total_coupon_dto)

        const handleTotalCoupon = (totalSum_) => {
            console.log()
            if(total_coupon_dto.couponType === "PERCENT"){
                console.log('percenter')
                let coupon_sale_ = totalSum_*0.01*total_coupon_dto.discountAmount
                coupon_sale_ = (Math.floor(coupon_sale_/100))*100
                setCoupon_sale(coupon_sale_)

            }else if(total_coupon_dto.couponType === "FIX"){
                setCoupon_sale(total_coupon_dto.discountAmount)
            }
            else{
                setCoupon_sale(0)
            }
        }


        const handleTotalPrice = () => {
            if (dt) {
              let totalSum_ = 0;
              for (let i = 0; i < dt.length; i++) {
                totalSum_ += dt[i].price * dt[i].count;
              }
              if(total_coupon_dto && total_coupon_dto.couponType)
                handleTotalCoupon(totalSum_)
              setTotalSum(totalSum_);
            }
          };
        
        if(dt && dt.length){
            console.log("setTotal----------------------")
            setTOTALVIEW(
                <TotalOrderFrame
                dt={dt}
                storename={storename}
                menucheck={menucheck}
                setDT={setDT}
                setMenucheck={setMenucheck}
                delHadler={delHadler}
                handleTotalPrice={handleTotalPrice}
                totalSum={totalSum}
                token={token}
                setTotal_coupon_dto={setTotal_coupon_dto}
                total_coupon_dto={total_coupon_dto}
                coupon_sale={coupon_sale}
                setCoupon_sale={setCoupon_sale}
                storeID={storeID}
                />
            )
        }
        

        handleTotalPrice();
        console.log(coupon_sale)
        console.log(totalSum)
        console.log(TOTALVIEW)
      }, [dt,menucheck,totalSum,storename,total_coupon_dto,coupon_sale,storeID]);

    return <div className='container-totalorder'>
       
            {TOTALVIEW}
            

        <div className='order-total-frame'></div>

    </div>
}

export default TotalOrder