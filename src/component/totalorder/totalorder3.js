import { useEffect, useRef, useState,useLayoutEffect } from 'react'
import './totalorder.css'
import { useLocation } from 'react-router-dom'
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
            if(probs.dt.menuLine){
                const menuFrame_ = [];
            
                for (let i = 0; i < probs.dt.menuLine.length; i++) {
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
                        <button>주문하기</button>
                    </div>
                </div>

            </div>
        </div>
        
        
    </div>
}

function Menuframe(probs){

    const menucheck = probs.menucheck
    const dt = probs.dt.menuLine || []
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
    },[menuNum])

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
                    <p>{dt[probs.i].price}원</p>
                    <p>{storename}</p>
                </div>
            </div>                        
        </div>
        <div className='basket-pm-div'>
                    <button onClick={(e)=>{
                        e.preventDefault()
                            if(dt[probs.i].count>1){
                                const dt_ = [probs.dt]
                                dt_[0].menuLine[probs.i].count-=1
                                probs.setDT(dt_)
                                setMenuNum(menuNum-1)
                                probs.handleTotalPrice()
                            }
                        }}>-</button>
                        <p>{dt[probs.i].count}</p>
                        <button onClick={(e)=>{
                        e.preventDefault()
                        if(dt[probs.i].count>0){
                            const dt_ = [probs.dt]
                            dt_[0].menuLine[probs.i].count+=1
                            probs.setDT(dt_)
                            setMenuNum(menuNum+1)
                            probs.handleTotalPrice()
                        }
                        }}>+</button>
        </div>
        <div className='basket-delete-frame'> <button
        onClick={(e)=>{e.preventDefault(); probs.delHadler(probs.dt,probs.setDT,probs.menucheck,probs.setMenucheck,probs.i)}}
        >삭제하기</button></div>
        <div className='basket-menus-price-frame'>
            <p>상품금액</p>
            <p>{totalPrice}원</p>
        </div>
    </div>
)}

function TotalOrder(probs){
    const location = useLocation()
    // const dt = location.state[0]
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
    // const [dt_,setDT_] = useState([])
    const [totalSum,setTotalSum] = useState(0) 
    const [limit,setlimit] = useState(0)
    const dumyRef = useRef(null)

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
    
    const storename = "BBQ" 

    const handleTotalPrice = () => {
        if (dt && dt.menuLine) {
          let totalSum_ = 0;
          for (let i = 0; i < dt.menuLine.length; i++) {
            totalSum_ += dt.menuLine[i].price * dt.menuLine[i].count;
          }
          setTotalSum(totalSum_);
        }
      };

      useEffect(() => {

        const getData = (menuid)=> {axios.get(`/menus/${menuid}`)
            .then(res=>{
                console.log(res)
                console.log(res.data.data)
                dumyRef.current=res.data.data
                return dumy
            }).catch(err=>{
                console.log(err)
            })

            if(dt !== null && dt!== undefined){
                let dt_ = []
                dt.forEach(el => {
                    // getData(el.)
                });
            }
        }

        if (dt && dt.menuLine) {

            // for(let i=0; i<dt.menuLine.length; i++){
            //     getData(data.menuLine.menuId[i])
                
            // }
            console.log(dt.menuLine.length)
            console.log("확인!!!!!!!!!!!!!!!!!!!")
            if(limit<10){
                const dt_ = [...dt.menuLine]
                const menuLine_ = []
                let dumy
                dt_.forEach(e=>{
                    getData(e.menuId,dumy)
                    // console.log(getData(e.menuId))
                    if(dumy&&dumy.name && dumy&&dumy.amazonS3s){
                        menuLine_.push({
                            menuId: e.menuId,
                            count: e.count,
                            price: e.price,
                            storename:dumy.name,
                            img:dumy.amazonS3s
                        })
                    }
                    setDT({menuLine:menuLine_})
                })
                setDT({menuLine:menuLine_})
                console.log(dt)
                // setlimit(limit++)
            }
            

            console.log(dt)
            console.log("확인!!!!!!!!!!!!!!!!!!! 301301301301")
          const menucheck_ = [];
          for (let i = 0; i < dt.menuLine.length; i++) {
            console.log(i);
            console.log("TOTALORDER");
            menucheck_.push(false);
          }
          setMenucheck(menucheck_);
        }
      }, [dt]);

    // useEffect(()=>{
    //     const menucheck_=[]
    //     for(let i=0; i<dt.menuLine.length; i++){
    //         console.log(i)
    //         console.log("TOTALORDER")
    //         menucheck_.push(false)
    //     }
    //     setMenucheck(menucheck_)
    // },[])

    useEffect(() => {

        const getData = (menuid,dumy)=> {axios.get(`/menus/${menuid}`)
            .then(res=>{
                console.log(res)
                console.log(res.data.data)
                dumy=res.data.data
                return dumy
            }).catch(err=>{
                console.log(err)
            })
        }


        handleTotalPrice();
        console.log(totalSum)
      }, [dt]);

    return <div className='container-totalorder'>
        {/* <TotalOrderFrame 
        dt={dt} 
        storename={storename} 
        menucheck={menucheck} 
        setDT={setDT} 
        setMenucheck={setMenucheck} 
        delHadler={delHadler}
        handleTotalPrice={handleTotalPrice}
        totalSum={totalSum}/> */}

        {dt ? (
            <TotalOrderFrame
                dt={dt}
                storename={storename}
                menucheck={menucheck}
                setDT={setDT}
                setMenucheck={setMenucheck}
                delHadler={delHadler}
                handleTotalPrice={handleTotalPrice}
                totalSum={totalSum}
            />
            ) : (
            <div>Loading...</div>
            )}

        <div className='order-total-frame'></div>
    </div>
}

export default TotalOrder