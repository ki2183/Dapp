import { useEffect, useRef, useState,useLayoutEffect } from 'react'
import './totalorder.css'
import { useLocation } from 'react-router-dom'
import axios from 'axios'


// function TestMenu(probs){

//     const menucheck = probs.menucheck
//     const dt = probs.menucheck
//     const storename = probs.storename
//     useEffect(()=>{
//         console.log(dt)
//         console.log(menucheck)
//         console.log(storename)
//     },[])

//     return  <div className='total-menus-frame'>
//                 <div className='basket-menus-check'>
//                     <div className='basket-checkbox-frame'>
//                         <span className={['material-symbols-outlined', 'basket-checkbox'].join(' ')}>check_box_outline_blank</span>
//                     </div>
//                 </div>
//                 <div className='basket-menus-info'>
//                     <div className='basket-menus-info-fst'>
//                         <div className='basket-menus-img'></div>
//                         <div className='basket-menus-etcinfo'>
//                             <p>이게아닌데 내맘은 이게 아닌데</p>
//                             <p>28000원</p>
//                             <p>가게이름....</p>
//                         </div>
//                     </div>                        
//                 </div>
//                 <div className='basket-pm-div'>
//                             <button onClick={(e)=>{
//                                 e.preventDefault()
//                                 // if(num>1)setNum(num-1)
//                                 }}>-</button>
//                                 <p>1</p>
//                                 <button onClick={(e)=>{
//                                 e.preventDefault()
//                                 // if(num>0)setNum(num+1)
//                                 }}>+</button>
//                 </div>
//                 <div className='basket-delete-frame'> <button>삭제하기</button></div>
//                 <div className='basket-menus-price-frame'>
//                     <p>상품금액</p>
//                     <p>25000원</p>
//                 </div>
//             </div>
// }



function TotalOrderFrame(probs){                

    const storename = probs.storename
    
    
    const menucheck = probs.menucheck
    const [menuFrame , setMenuFrame] = useState([])

    const [TotalSum,setTotalSum] = useState(0)

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
        // console.log(probs.token.id)
        console.log(probs.dt)

        alert("orderAPI 고친대서 일단 console에 데이터만 올려놓음")

        // const data = []

        //  axios.post('/orders/save', JSON.stringify(data), {
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
        // })
        // .then((response) => {
        //   console.log(response); // 전송 결과를 처리하는 코드
        //   window.location.href="/myorder"
        // })
        // .catch((error) => {
        //   console.error(error); // 오류를 처리하는 코드
        // });
      }

    return <div className='totalorder-frame'>
        <div className='total-back'>
            <span className="material-symbols-outlined">arrow_back</span>
            <p>뒤로가기</p>
            <p>주문/결제</p>
        </div>
        <div className='total-basket'>
            <div className='total-basket-storename '>

                <div className='basket-checkbox-frame'>
                    {/* <span className={['material-symbols-outlined', 'basket-checkbox'].join(' ')}>radio_button_unchecked</span> */}
                    <span className={['material-symbols-outlined', 'basket-checkbox'].join(' ')}>check_box_outline_blank</span>
                </div>
                <p className='total-store-name'>{storename}</p>
            </div>
            
            {menuFrame}

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
                        <p id='dicisiontotalprice'>0원</p>    
                    </div>
                    <div className='dicision-order-totalprice'>
                        <p>주문금액</p>
                        <p>{probs.totalSum}원</p>
                        <button onClick={e=>{
                            e.preventDefault() 
                            onClickHandler()
                            }}>주문하기</button>
                    </div>
                </div>

            </div>
        </div>
        
        
    </div>
}

function Menuframe(probs){

    const menucheck = probs.menucheck
    const dt = probs.dt || []
    const storename = probs.storename

    const trueCheckSpan = (<span className={['material-symbols-outlined', 'basket-checkbox'].join(' ')}>check_box</span>)
    const falseCheckSpan = (<span className={['material-symbols-outlined', 'basket-checkbox'].join(' ')}>check_box_outline_blank</span>)
    const [CheckButtonFrame,setCheckButtonFrame] = useState(falseCheckSpan)
    const [menuNum,setMenuNum]= useState(dt[probs.i].count)
    const [totalPrice,setTotalPrice] = useState(dt[probs.i].price*menuNum)


    useEffect(()=>{
        console.log(dt)
        console.log(menucheck)
        console.log(storename)
        console.log("MENUFRAME")
        !menucheck[probs.i] ? setCheckButtonFrame(falseCheckSpan) : setCheckButtonFrame(trueCheckSpan)
    },[probs.menucheck])

    useEffect(()=>{
        setTotalPrice(menuNum*dt[probs.i].price)
    },[menuNum,probs.dt])

    return (
    <div className='total-menus-frame'>
        <div className='basket-menus-check'>
            <div className='basket-checkbox-frame'>
                {CheckButtonFrame}
            </div>
        </div>
        <div className='basket-menus-info'>
            <div className='basket-menus-info-fst'>
                <div className='basket-menus-img'></div>
                <div className='basket-menus-etcinfo'>
                    <p>황금올리브 치킨</p>
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
    const location = useLocation()
    // const dt__ = location.state[0]
    // const storename= location.state[1]
    const data = {
        menuLine : [
            {menuId: 113, count: 1 ,price:21000},
            {menuId: 112, count: 2 ,price:24000}
        ]
    }

    const d = location.state
    const [menucheck, setMenucheck] = useState([null])
    const token = JSON.parse(localStorage.getItem('token'))
    const [dt,setDT] =  useState(data)
    const [totalSum,setTotalSum] = useState(0) 
    const [TOTALVIEW,setTOTALVIEW] = useState(null)

    const [dt_,setDT_] = useState([])
    const [limit,setlimit] = useState(0)
    const dumyRef = useRef(null)
    const [MenuDT,setMenuDT] = useState()

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
    
    const [storename,setStroename]= useState("BBQ")
    
    useLayoutEffect(()=>{
        let menucheck_ = []
        if(d && d[0] ){
            console.log(d[0])
            console.log(d[1])
            
            let d_ = []
            d[0].forEach(el => {
                d_.push(el)
                menucheck_.push(false)
            });

            alert("주문확인")
            setDT(d_)
            setStroename(d[1])
            setMenucheck(menucheck_)
        }   
        else{
            let d_=[
                {menuId: 152, name: '사이드 음식73', count: 1, price: 24230, imgurl: Array(0)},
                {menuId: 151, name: '메인 음식73', count: 1, price: 24894, imgurl: Array(0)},
                {menuId: 152, name: '사이드 음식73', count: 1, price: 24230, imgurl: Array(0)}]
            setDT(d_)
            setStroename("BBQ")
            setMenucheck([false,false,false])
        }
        console.log("useLayoutEffect 끝")
    },[])


    useEffect(() => {
        console.log("useEffect 시작")
        const handleTotalPrice = () => {
            if (dt) {
              let totalSum_ = 0;
              for (let i = 0; i < dt.length; i++) {
                totalSum_ += dt[i].price * dt[i].count;
              }
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
                />
            )
        }
        

        handleTotalPrice();
        console.log(totalSum)
        console.log(TOTALVIEW)
      }, [dt,menucheck,totalSum,storename]);

    return <div className='container-totalorder'>
       
            {TOTALVIEW}

        <div className='order-total-frame'></div>
    </div>
}

export default TotalOrder