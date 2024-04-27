import "./order.css"
import { useEffect,useRef,useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate} from 'react-router-dom';

function Basket(probs){
    const [BasketContainer,setBasketContainer] = useState([])
    const navigate = useNavigate();
    // const token = (JSON.parse(localStorage.getItem('token')) && JSON.parse(localStorage.getItem('token')).token) ? (JSON.parse(localStorage.getItem('token')).token) : null
    const token = JSON.parse(localStorage.getItem('token'))
    const limit = useRef(false)
    const [totalPrice,setTotalPrice] = useState(0)
    useEffect(()=>{
        const basket = probs.basket
        const BasketContainer_=[]
        console.log(basket)
        let totalPrice_ = 0
        if(basket.length!==0 || basket.length!==undefined){
            for(let i=0; i<basket.length; i++){
                totalPrice_ += basket[i].count*basket[i].price
                BasketContainer_.push(
                    <div className="container-basket-menus" key={`basket${i}`}>
                        <p>{basket[i].menuId}</p>
                        <div className="container-basket-menus-num">
                            <button onClick={(e)=>{
                                e.preventDefault()
                                if(basket[i].count>1){
                                    const basket_ = [...basket]
                                    basket_[i].count--
                                    probs.setBasket(basket_)
                                }
                            }}>-</button>
                            <p>{basket[i].count}</p>
                            <button onClick={(e)=>{
                                e.preventDefault()
                                if(basket[i].count>=1){
                                    const basket_ = [...basket]
                                    basket_[i].count++
                                    probs.setBasket(basket_)
                                }
                            }}>+</button>
                        </div>
                        <div className="container-basket-menus-cancle" key={`cancle${i}`}>
                        <p>{basket[i].price*basket[i].count}원</p><button onClick={e=>{
                                e.preventDefault()
                                probs.CancleThis(i)}}
                            >취소</button>
                        </div>
                    </div>
                )
            }
            setBasketContainer(BasketContainer_)
            setTotalPrice(totalPrice_)
        }

    },[probs.basket])

    const [data,setData] = useState({
        storename:probs.query_,
        menuLine:[]
    })

    const onsubmit = async dt => {
        await new Promise((r) => setTimeout(r, 1000));
 
        const basket = probs.basket;
        
        console.log(dt)   
        console.log(probs.query_)     
        
        for(let i=0; i<dt.length; i++){
            const data_ = {...dt}
            await axios.get(`/menus/${basket[i].menuId}/name`)
            .then((res)=>{
                console.log(res.data.data[0].id)
                data_.menuLine.push({
                    "menuId":res.data.data[0].id,
                    "name":res.data.data[0].name,
                    "count": basket[i].count,
                    "price" : res.data.data[0].price,
                    "imgurl" : ''
                })
                setData(data_)
                
            })
            .catch((err)=>{
                console.log(err)
            })
            console.log(data)
        }
        const dto_ = {...data}
            dt.forEach((item,idx)=>{
                dto_.menuLine.push({
                    "menuId":item.menuId,
                    "name":item.menuId,
                    "price":item.price,
                    "imgurl":"",
                    "count":item.count
                    // "name":res.data.data[0].name,
                    // "count": basket[i].count,
                    // "price" : res.data.data[0].price,
                    // "imgurl" : ''
                })
            })
        console.log(dto_)
        alert("주문확인")
        navigate('/totalorder', { state: [dto_.menuLine,probs.query_]});
        
        
        // axios.post('/orders/save', JSON.stringify(data), {
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
        // })
        // .then((response) => {
        //   console.log(response); // 전송 결과를 처리하는 코드
        // //   window.location.href="/myorder"
        // })
        // .catch((error) => {
        //   console.error(error); // 오류를 처리하는 코드
        // });
    

    }
    
    // useEffect(() => {
    //     const handleResize = () => {
    //       if (typeof window !== 'undefined' && probs.componentRef.current) {
    //         probs.setHeight(probs.componentRef.current.clientHeight);
    //       }
    //     };
      
    //     handleResize(); // 초기 렌더링 시 크기를 설정하기 위해 한 번 호출
      
    //     if (typeof window !== 'undefined') {
    //       window.addEventListener('resize', handleResize);
    //     }
      
    //     return () => {
    //       if (typeof window !== 'undefined') {
    //         window.removeEventListener('resize', handleResize);
    //       }
    //     };
    //   }, []);

    return <div className="container-basket-frame" style={{height:probs.height}}>
        <div className="container-basket">
            <div className="container-basket-title">장바구니</div>
            <div className="conatiner-basket-menus-frame">
                {BasketContainer}
            </div>
            <div className="order-button-frame">
                <div>
                    <div>
                        최종금액
                    </div>
                    <div>
                        {totalPrice}원
                    </div>
               
                </div>
                <button className="order-button" onClick={e=>{
                    e.preventDefault();
                    if(token&&token.id!==undefined && token.id!==null){
                        onsubmit(probs.basket)
                    }else{
                        alert("로그인을 해야합니다.")
                    }
                }}>주문하기</button>
            </div>
            
            <div className="empty-container"></div>
            <div className="empty-container"></div>
            <div className="empty-container"></div>
        </div>
    </div>
}

function Order(probs){
    
    const [MainImg,setMainImg] = useState(null)

    useEffect(() => {
        console.log(probs.storeimg)
        if (probs.storeimg !== null && probs.storeimg !== undefined) {
            setMainImg({
                backgroundImage: `url(https://dev-server-delivery.s3.ap-northeast-2.amazonaws.com/${probs.storeimg})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            });
        } else {
            setMainImg(null);
        }
    }, [probs.storeimg]);

    return <div className="container-order">
        <div className="container-order-frame">
            <div className="order-main-image-title-frame">  {/*추가함 */}
                <div className="order-main-image" style={MainImg}></div>
                <div className="order-info">
                    <h1>{probs.query_}</h1>
                    <p>배달료</p>
                    <p>open now</p>
                </div>
            </div>

            <Menulist storeimg={probs.storeimg} setStoreimg={probs.setStoreimg} componentRef={probs.componentRef} query_= {probs.query_} StoreId={probs.StoreId} ActiveOn={probs.ActiveOn} reverse={probs.reverse} setReverse={probs.setReverse}></Menulist>
        </div>
    </div>
}

function Menulist(probs){

    const [showSearch, setShowSearch] = useState(null)  // 검색 데이터 div 저장
    const searchData = useRef(null) // 메뉴 리스트를 여기다 저장
    const [searchDataAll,setSearchDataAll] = useState([]) 
    const [menu_datalist,setMenu_datalist] = useState([]) //datalist 저장
    const [menuDtoALL,setMenuDtoAll] = useState([])
    const [inputValue, setInputValue] = useState(null);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
      };
    
      const handleButtonClick = () => {
        console.log('입력 값:', inputValue);
      };

    const [ChangeOrderReview,setChangeOrderReview] = useState("order")

    const [ChangeView,setChangeView] = useState(<MenulistBottom menuDtoALL={menuDtoALL} componentRef={probs.componentRef} query_= {probs.query_} ActiveOn={probs.ActiveOn} reverse={probs.reverse} setReverse={probs.setReverse}></MenulistBottom>)

    let change = <MenulistBottom menuDtoALL={menuDtoALL} componentRef={probs.componentRef} showSearch={showSearch} query_= {probs.query_} ActiveOn={probs.ActiveOn} reverse={probs.reverse} setReverse={probs.setReverse}></MenulistBottom>

    const ChangeOrderFunction =(num)=>{
        setChangeOrderReview(num)
    }

    useEffect(() => {
        const getMenusFST = async () => {
          try {
            const res = await axios.get(`/stores/${probs.query_}/name`);
            console.log(res.data.data);
            let menu_ = res.data.data[0].menus;
            const menu_datalist_ = [];
            let searchdata_ = [];
      
            for (let i = 0; i < menu_.length; i++) {
              console.log(menu_[i]);
              console.log(menu_[i].name);
              menu_datalist_.push(<option value={menu_[i].name} />);
              searchdata_.push(menu_[i]);
              console.log(menu_datalist_);
            }
            
            console.log(menu_datalist_);
            setMenu_datalist(menu_datalist_);
            searchData.current = searchdata_;
            console.log("CURRENT");
            console.log(searchData.current);
            console.log(menu_datalist);
            console.log("state");
            probs.setStoreimg(res.data.data[0].amazonS3s[0].fileName);

            getMenusSEC()
      
          } catch (err) {
            console.log(err + "get menu list");
          }
        };

        const getMenusSEC = async () => {
            try {
              console.log("SEC시작");
              console.log(searchData.current);
              const menuDtoALL_ = [];
        
              for (const el of searchData.current) {
                try {
                  const res = await axios.get(`/menus/${el.name}/name`);
                  console.log(res.data.data[0]);
                  menuDtoALL_.push(res.data.data[0]);
                } catch (err) {
                  console.log(err);
                }
              }
        
              setMenuDtoAll(menuDtoALL_);
              console.log(menuDtoALL);
        
              
            //   setChangeView(<MenulistBottom menuDtoALL={menuDtoALL} componentRef={probs.componentRef} showSearch={showSearch} query_={probs.query_} ActiveOn={probs.ActiveOn} reverse={probs.reverse} setReverse={probs.setReverse}></MenulistBottom>)
            setChangeView(change)
            } catch (err) {
              console.log(err);
            }
          };
      
        getMenusFST();
      }, []);

    useEffect(() => {
        console.log(menuDtoALL);
        // setChangeView(<MenulistBottom menuDtoALL={menuDtoALL} componentRef={probs.componentRef} showSearch={showSearch} query_={probs.query_} ActiveOn={probs.ActiveOn} reverse={probs.reverse} setReverse={probs.setReverse}></MenulistBottom>)
        setChangeView(change)
      }, [menuDtoALL]);


    useEffect(()=>{

        if(ChangeOrderReview ==="order"){
            const testChange = < MenulistBottom menuDtoALL = {menuDtoALL}componentRef={probs.componentRef} showSearch={showSearch} query_= {probs.query_} ActiveOn={probs.ActiveOn} reverse={probs.reverse} setReverse={probs.setReverse}></MenulistBottom>
            setChangeView(testChange)
        }else if(ChangeOrderReview ==="review"){
            const testChange = <Review componentRef={probs.componentRef} query_= {probs.query_} StoreId={probs.StoreId}/>
            setChangeView(testChange)
        }else if(ChangeOrderReview ==="review_write"){
            const testChange = <ReviewSave StoreId = {probs.StoreId} query_={probs.query_}></ReviewSave>
            setChangeView(testChange)
        }
    },[ChangeOrderReview,ChangeOrderReview,showSearch,menuDtoALL])

    return <div className="menulist-frame">
                <div className="menulist">
                        <div className="menulist-top">
                            <div className="menulist-top-searchbar-div">
                                <h2>모든메뉴</h2>
                                <form>
                                    <button onClick={e=>{
                                        e.preventDefault();
                                        handleButtonClick()
                                        console.log(inputValue)
                                        const showSearch_ = searchData.current.filter(obj=>obj.name === inputValue)
                                        console.log(showSearch_)
                                        setShowSearch(showSearch_)
                                    }}>
                                        <span className="material-symbols-outlined">search</span>
                                    </button>
                                    <input type="text" placeholder="메뉴를 고르세요" list="searchmenu" onChange={handleInputChange}/>
                                    <datalist id="searchmenu">
                                       {menu_datalist}
                                    </datalist>
                                </form>
                            </div>

                            <MenuListTop  query_= {probs.query_} ChangeOrderFunction={ChangeOrderFunction}></MenuListTop>
                            
                            {ChangeView}
                        </div>
                    </div>
            </div>
}

function MenuListTop(probs){

    const token = (JSON.parse(localStorage.getItem('token')) && JSON.parse(localStorage.getItem('token')).token) ? (JSON.parse(localStorage.getItem('token')).token) : null

    return <div className="menulist-top-list">
          <button className="menulist-button"
                onClick={e=>{
                    e.preventDefault();
                    probs.ChangeOrderFunction("order")
                }}
                ><span className="menulist-button-span">주문</span></button>
                  <button className="menulist-button"
                onClick={e=>{
                    e.preventDefault();
                    probs.ChangeOrderFunction("review")
                }}
                ><span className="menulist-button-span">리뷰</span></button>

                <button className="menulist-button"
                onClick={e=>{
                    e.preventDefault();
                    (token !== undefined &&token !== null)? probs.ChangeOrderFunction("review_write") : alert("로그인이 필요합니다.")
                   
                }}
                ><span className="menulist-button-span">리뷰작성</span></button>
                
    </div>
}



function MenulistBottom(probs){
    const [menuli,setMenuli] = useState([])
    const menus= useRef([])

    const [SearchMenuShow,setSearchMenuShow] = useState(null)

    useEffect(()=>{
        console.log(probs.menuDtoALL)
    },[probs.menu])

    useEffect(()=>{
        console.log(probs.showSearch)
        console.log(probs.menuDtoALL)

        if(probs.showSearch !== null  && probs.showSearch !== undefined){
            setSearchMenuShow(
                <button className="menu-choice-button" 
                        onClick={e=>{
                            e.preventDefault();
                            probs.ActiveOn(probs.showSearch[0].name,probs.showSearch[0].price,); //여기

                        }}
                        ><div>
                            <div className="menu-choice-img"> 사진</div>
                            <div className="menu-choice-intro">
                                <h2>{probs.showSearch[0].name}</h2>
                                <div>부위 선택 가능 BBQ 자메이카 저크소스와 신선육 소떡소떡을 조합하여 풍미를 올린 전국민이 최애하는 치킨</div>
                            </div>
                            <div class="menu-choice-price">
                                <p>{probs.showSearch[0].price}원</p>
                                <button>추가</button>
                            </div>
                                
                        </div></button>
            )
        }

    },[probs.showSearch])

    useEffect(()=>{
        let i = menus.length
        const menuli_=[]

    //     axios.get(`/stores/${probs.query_}/name`)
    //    .then((res)=>{
    //         console.log(res.data.data)
    //         console.log(res.data.data[0].menus)
    //         let menu_=res.data.data[0].menus
    //         menus.current = menu_
    //         console.log(menus.current)

    //         for(let j=0; j<menus.current.length; j++){
    //             console.log(menus.current.length)
    //                     menuli_.push( <button key={`menus${j}`} className="menu-choice-button "
    //                     onClick={e=>{
    //                         e.preventDefault();
    //                         probs.ActiveOn(menus.current[j].name,menus.current[j].price,probs.menuDtoALL[j]); //여기
    //                     }}
    //                     ><div>
    //                         <div className="menu-choice-img"  style={{ 
    //                                         backgroundImage:`url(https://dev-server-delivery.s3.ap-northeast-2.amazonaws.com/${probs.menuDtoALL[j].amazonS3s[0].fileName})` ,
    //                                         backgroundSize: "cover",
    //                                         backgroundRepeat: "no-repeat",
    //                                         backgroundPosition: "center",
    //                                     }} ></div>
    //                             <div className="menu-choice-intro">
    //                             <h2>{menus.current[j].name}</h2>
    //                             <div>부위 선택 가능 BBQ 자메이카 저크소스와 신선육 소떡소떡을 조합하여 풍미를 올린 전국민이 최애하는 치킨</div>
    //                         </div>
    //                         <div class="menu-choice-price">
    //                             <p>{menus.current[j].price}원</p>
    //                             <button>추가</button>
    //                         </div>
                                
    //                     </div></button>)
    //         }
    //         setMenuli(menuli_)
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //     })
        /////////////css////////////////////
        menuli_.push( <button key={`menus`} className="menu-choice-button "
        onClick={e=>{
            e.preventDefault();
            probs.ActiveOn("황금 올리브 치킨",23000); //여기


        }}
        ><div>
            <div className="menu-choice-img"> 사진</div>
            <div className="menu-choice-intro">
                <h2>황금 올리브 치킨</h2>
                <div>부위 선택 가능 BBQ 자메이카 저크소스와 신선육 소떡소떡을 조합하여 풍미를 올린 전국민이 최애하는 치킨</div>
            </div>
            <div class="menu-choice-price">
                <p>23000원</p>
                <button>추가</button>
            </div>
                
        </div></button>)

        setMenuli(menuli_)

        menuli_.push( <button key={`menus`} className="menu-choice-button "
        onClick={e=>{
            e.preventDefault();
            probs.ActiveOn("핫 황금 올리브 치킨",23000); //여기


        }}
        ><div>
            <div className="menu-choice-img"> 사진</div>
            <div className="menu-choice-intro">
                <h2>핫 황금 올리브 치킨</h2>
                <div>부위 선택 가능 BBQ 자메이카 저크소스와 신선육 소떡소떡을 조합하여 풍미를 올린 전국민이 최애하는 치킨</div>
            </div>
            <div class="menu-choice-price">
                <p>23000원</p>
                <button>추가</button>
            </div>
                
        </div></button>)

        setMenuli(menuli_)

        menuli_.push( <button key={`menus`} className="menu-choice-button "
        onClick={e=>{
            e.preventDefault();
            probs.ActiveOn("황금 올리브 순살치킨",25000); //여기


        }}
        ><div>
            <div className="menu-choice-img"> 사진</div>
            <div className="menu-choice-intro">
                <h2>황금 올리브 순살치킨</h2>
                <div>부위 선택 가능 BBQ 자메이카 저크소스와 신선육 소떡소떡을 조합하여 풍미를 올린 전국민이 최애하는 치킨</div>
            </div>
            <div class="menu-choice-price">
                <p>23000원</p>
                <button>추가</button>
            </div>
                
        </div></button>)

        setMenuli(menuli_)

        ////////////////////////////////
        
    },[setMenuli,menus,probs.menuDtoALL])

    return <div className="menulist-bottom-frame" ref={probs.componentRef}>
    {SearchMenuShow}
    {menuli}
    <div className="empty-container"></div>
    </div>
}


function MenuWindow(probs){

    const [num,setNum] = useState(1)
    const [thisprice, setThisPrice] = useState(null)


    useEffect(()=>{
        setThisPrice(num*probs.price)
        console.log(probs.menuall)
    },[num])

    return <div className="menuwindow-frame" onClick={e=>{e.preventDefault(); probs.ActiveOn()}}>
        <div className="menuwindow-main" onClick={e=>{e.preventDefault(); e.stopPropagation()}}>
           <button id="menucancle" onClick={e=>{e.preventDefault(); probs.ActiveOn()}}>✖</button>
           <div className="menus-img-div" 
                // style={{ 
                //     backgroundImage:`url(https://dev-server-delivery.s3.ap-northeast-2.amazonaws.com/${probs.menuall.amazonS3s[0].fileName})` ,
                //     backgroundSize: "cover",
                //     backgroundRepeat: "no-repeat",
                //     backgroundPosition: "center",
                // }}
                >
           </div>

           <p className="menus-title-p">{probs.menud}</p>

           <p className="menus-intro-p">부위 선택 가능 BBQ 자메이카 저크소스와 신선육 소떡소떡을 조합하여 풍미를 올린 전국민이 최애하는 치킨 선택 가능 BBQ 자메이카 저크소스와 신선육 소떡소떡을 조합하여 풍미를 올  부위 선택 가능 BBQ 자메이카 저크소스와 신선육 소떡소떡을 조합하여 풍미를 올린 전국민이 최애하는 치킨 선택 가능 BBQ 자메이카 저크소스와 신선육 소떡소떡을 조합하여 풍미를 올</p>
           <form className="menus-order-form">
                <div className="plus-minus-div">
                    <button onClick={(e)=>{
                        e.preventDefault()
                        if(num>1)setNum(num-1)
                    }}>-</button>
                    <p>{num}</p>
                    <button onClick={(e)=>{
                        e.preventDefault()
                        if(num>0)setNum(num+1)
                    }}>+</button>

                    <p className="menus-price-p">{thisprice}원</p>
                </div>
            </form>
        </div>
        <div className="menus-total-add-div">
            <div className="menus-total-price-div">
                <p className="menus-total-price-p1">최종금액</p>
                <p className="menus-total-price-p2">{thisprice}원</p> 
                {/*새거*/}
            </div>
                <button className="menus-total-add-button"
                onClick={(e)=>{
                    e.preventDefault()
                    probs.F_basket(num,probs.menud,probs.price)
                    probs.ActiveOn()
                }}>장바구니에 추가</button>
        </div>
    </div>
}

function Review(probs){


    const [reviewdto,setReviedto] = useState([])
    const [pagebutton,setPagebutton] = useState([])
    const reviewnum = useRef(0)
    const review_measure = 5
    const [allowScroll, setAllowScroll] = useState(false);
    // const review_measure = 10

    function getStarRating(num) {
        const roundedNum = Math.round(num);
        if (roundedNum === 5) {
          return "★★★★★";
        } else if (roundedNum === 4) {
          return "★★★★☆";
        } else if (roundedNum === 3) {
          return "★★★☆☆";
        } else if (roundedNum === 2) {
          return "★★☆☆☆";
        } else if (roundedNum === 1) {
          return "★☆☆☆☆";
        } else {
          return "☆☆☆☆☆";
        }
      }

    useEffect(()=>{

        console.log(reviewnum)
        console.log(probs.query_)
        console.log(probs.StoreId)

        const getdata = ()=>{

            console.log(reviewnum.current)
            console.log(review_measure)
            console.log(probs.StoreId)
            axios.get(`/reviews/${probs.StoreId}/store-page?offset=${reviewnum.current}&limit=${review_measure}`)
            .then(res=>{
                console.log(res.data)

                const reviewdto_ = []
                
                for(let i=0; i<res.data.data.length; i++){
                    
                    const reviewData = res.data.data[i]
                    console.log(reviewData.amazonS3s[0])
                    if(reviewData.amazonS3s[0]===undefined){
                        reviewdto_.push(
                            <div className="review-child-frame" key={`review-child-frame${i}`}>
                                <div className="review-child-content">
                                    <p className="review-id"><div className="review-badge"></div>익명</p>
                                    <p className="review-score">별점 : {reviewData.score} {getStarRating(reviewData.score)}  </p>
                                    <p className="review-content">{reviewData.content} </p>
                                </div>
                                {/* <div className="review-child-img">
                                    <div src="" className="review-null-img"></div>
                                </div> */}
                            </div>
                        )
                    }else{
                        const img_contain = []
                        for(let i=0; i<reviewData.amazonS3s.length; i++){
                            if(i<2){
                                img_contain.push(
                                    // <img className="review-active-img" src={`https://dev-server-delivery.s3.ap-northeast-2.amazonaws.com/${reviewData.amazonS3s[i].fileName}`}></img>
                                    <div className="review-active-img" style={{ 
                                            backgroundImage:`url(https://dev-server-delivery.s3.ap-northeast-2.amazonaws.com/${reviewData.amazonS3s[i].fileName})` ,
                                            backgroundSize: "cover",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center",
                                        }} 
                                    
                                    ></div>
                                )
                            }
                        }

                        reviewdto_.push(
                            <div className="review-child-frame" key={`review-child-frame${i}`}>
                                <div className="review-child-content">
                                    <p className="review-id"><div className="review-badge"></div>익명</p>
                                    <p className="review-score">별점 : {reviewData.score} {getStarRating(reviewData.score)}</p>
                                </div>
                                <div className="review-child-img">
                                    {img_contain}
                                </div>
                                <p className="review-content">{reviewData.content} </p>
                            </div>
                        )
                    }

                    setReviedto(reviewdto_)
                }
                
            })
            .catch((err)=>{
                console.log(err+"getdata")
            })
            
        }

        const getbutton = ()=>{

            function isNaturalNumber(num) {
                return Math.sign(num) === 1 && Number.isInteger(num);
              }
            const handleScrollReset = () => {
                document.body.scroll(0, 0);
                console.log("height 초기화")
            };  

            axios.get(`/reviews/${probs.StoreId}/store`)
            .then(res=>{

                const leng = (isNaturalNumber(res.data.data.length/review_measure)) ? Math.floor(res.data.data.length/review_measure) : Math.floor(res.data.data.length/review_measure)+1 ;
                const pagebutton_ = []
                for(let i=0; i<leng; i++){
                    pagebutton_.push(
                        <button className="review-page-button" onClick={e=>{
                            e.preventDefault()
                            handleScrollReset()
                            reviewnum.current = i*review_measure
                            console.log(reviewnum.current)
                            getdata()
                        }}>{i}</button>
                    )
                }
                setPagebutton(pagebutton_)

            }).catch(err=>{
                console.log(err+"getbutton")
            })
        }

        
        getbutton()
        getdata()
 

    },[reviewnum])


 
    return <div className="container-review" ref={probs.componentRef} >
        {reviewdto}
            <div className="container-button">
        {pagebutton}
        
        {/* <button className="review-page-button"></button>
        <button className="review-page-button"></button> */}
        </div>
    </div> 
}

function ReviewSave(probs){
    // 1. onChnage 만들어서 text상시 인지
    //button을 누를 시 
    //probs.StoreId
    // const testId = 2



    const token = (JSON.parse(localStorage.getItem('token')) && JSON.parse(localStorage.getItem('token')).token) ? (JSON.parse(localStorage.getItem('token')).token) : null
    const userid = token.id

    // const userid = 1

    const [selectedFile, setSelectedFile] = useState(null);
    const [content, setContent] = useState(null)
    const [scoreFrame,setScoreFrame] = useState([])
    // const contentRef = useRef(null)
    const [score,setScore] = useState(0)
    const [v,setV] = useState(null)


    // const HandleContentInput = (e)=>{
    //     const inputValue = e.target.value;
    //     setContent(inputValue);
    // }
    
    

    const submitReview = (e)=>{
        if(content!==undefined && content!==null){
            const formData = new FormData();
            formData.append("userId",userid)  
            formData.append("storeId",probs.StoreId)
            formData.append("score",score)
            
            if(selectedFile !== null && selectedFile !== undefined){
                formData.append("file",selectedFile)
                console.log(formData.get("file"))    
            }
            
            formData.append("content",content)

            console.log(formData.get("content"))
            
            
            fetch("/reviews/save",{
                method:"POST",
                body:formData
            })
            .then(response => response.json())
            .then(data=>{
                console.log(data)
            }).catch(err=>{
                console.log(err)
            })
            window.location.href=`/order/?id=${probs.query_}`
        }
    }
 
    // const SubmitReview = ()=>{
    //     const reviewDto = {
    //         "userId":userid,   
    //         "storeId":probs.StoreId,
    //         "score":score,
    //         "content":content
    //     }
    // }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        
        if(file && file.name) 
            setV(file.name)
      };
    
    const textChange = (e) => {
        const text = e.target.value;
        setContent(text);
      };
    
//★☆☆☆☆ 
    useEffect(()=>{
        const scoreFrame_ = []

        for(let i=0; i<5; i++){
            if(i<score){
                scoreFrame_.push(<button onClick={e=>{e.preventDefault(); setScore(i+1)}}>★</button>)
            }else{
                scoreFrame_.push(<button onClick={e=>{e.preventDefault(); setScore(i+1)}}>☆</button>)
            }
        }

        setScoreFrame(scoreFrame_)
    },[score])  


    return (
        <div className="container-review-save">
            <div className="review-save-score-frame">{scoreFrame}</div>
            {/* <input className="review-save-text" type="text" name="text" onChange={textChange} ></input> */}
            <textarea className="review-save-text" type="text" name="text" onChange={textChange} ></textarea>
            <input className="review-save-file" id="input-file" type="file" name="file" onChange={handleFileChange}></input>
            
            <p id="search-file">파일찾기</p>
            <div className="file-frame">
            
                <input type="text" value={v} className="review-save-file-view"></input>
                <label for="input-file" className="label-file"><span id="link" className="material-symbols-outlined">link</span></label>
            </div>
            <button className="review-save-score-button" onClick={submitReview}>리뷰작성</button>
          
        </div>
      );
}

function OrderMain(){
    const [reverse,setReverse] = useState(false)
    const [menud,setMenud] = useState(null)
    const [price,setPrice] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const query_=(searchParams.get("id"))
    const [basket , setBasket] = useState([])
    const [StoreId,setStoreId] = useState(null)
    const componentRef = useRef(null);
    const [storeimg,setStoreimg] = useState(null)
    const [menuall,setMenuall] = useState(null)

    const [height, setHeight] = useState(0)
    const [viewBasket,setviewBasket] = useState( <Basket componentRef={componentRef} height={height} setHeight={setHeight} query_={query_} basket={basket} StoreId={StoreId} setBasket={setBasket} CancleThis={(i)=>{
        const basket__ =[...basket]
        basket__.splice(i,1)
        setBasket(basket__)
    }}/>)
    
    const token = (JSON.parse(localStorage.getItem('token')) && JSON.parse(localStorage.getItem('token')).token) ? (JSON.parse(localStorage.getItem('token')).token) : null

    const [order ,setOrder] = useState(  <Order storeimg={storeimg} setStoreimg={setStoreimg} componentRef={componentRef} query_ = {query_} setReverse={setReverse}  StoreId={StoreId} reverse={reverse} ActiveOn={(data,price)=>{
        setReverse(!reverse)
        setMenud(data)
        setPrice(price)
        console.log(data)
        }}/>)
    let window

    (!reverse) ? window=undefined : window=(   <MenuWindow menuall={menuall} menud={menud} price={price} setReverse={setReverse} reverse={reverse}
        ActiveOn={()=>{setReverse(!reverse)}}
        F_basket={(num,data,price)=>{
            const basket_=[...basket]

            console.log(basket_.some(el=>el.menuId === data))
            if(basket_.some(el=>el.menuId === data)===true){
                const index = basket_.findIndex(e=>e.menuId === data)
                basket_[index].count+=num
            }
            else{
            basket_.push({
                "menuId": data,
                "count": num,
                "price": price /*새거*/
            })
            console.log(num)
            console.log(data)
            console.log(price)
            }
            setBasket(basket_)
            console.log(basket)
        }}
        /> )

        useEffect(()=>{
            console.log(storeimg)
            axios.get(`/stores/${query_}/name`)
                .then(res=>{
                    setStoreId(res.data.data[0].id)
                    
                    console.log(StoreId)
                    
                    console.log(storeimg)
                    
                    // setOrder(<Order query_ = {query_} setReverse={setReverse}  StoreId={StoreId} reverse={reverse} ActiveOn={(data,price)=>{
                    //     setReverse(!reverse)
                    //     setMenud(data)
                    //     setPrice(price)
                    //     componentRef={componentRef}
                    //     storeimg={storeimg} 
                    //     setStoreimg={setStoreimg}
                    //     }}/>)
                }).catch(err=>{
                    console.log(err+" 가게이름")
                })

                setOrder(
                    <Order
                        query_={query_}
                        setReverse={setReverse}
                        StoreId={StoreId}
                        reverse={reverse}
                        ActiveOn={(data, price,all) => {
                            setReverse(!reverse);
                            setMenud(data);
                            setPrice(price);
                            setMenuall(all)
                        }}
                        storeimg={storeimg}
                        setStoreimg={setStoreimg}
                        componentRef={componentRef}
                    />
                )
                
        },[StoreId,storeimg])
            
        useEffect(()=>{
            setviewBasket(
                <Basket componentRef={componentRef} height={height} setHeight={setHeight} query_={query_} basket={basket} StoreId={StoreId} setBasket={setBasket} CancleThis={(i)=>{
                    const basket__ =[...basket]
                    basket__.splice(i,1)
                    setBasket(basket__)
                }}/>
            )
        },[height,basket])
        // useEffect(()=>{
        //     console.log(basket)
        // },[basket])
     

    return <div className="container-order-total">
   
        {order}
        {/* <Basket componentRef={componentRef} query_={query_} basket={basket} StoreId={StoreId} setBasket={setBasket} CancleThis={(i)=>{
            const basket__ =[...basket]
            basket__.splice(i,1)
            setBasket(basket__)
        }}/> */}
        {viewBasket}
        {window}
    </div>
}
export default OrderMain;