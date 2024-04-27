import './category.css';
import { useEffect, useState,useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import  axios  from 'axios';
import 치킨 from './menuPhoto/chicken.png'
import 피자 from './menuPhoto/pizza.png'
import 중식 from './menuPhoto/cfood.png'
import 일식 from './menuPhoto/jfood.png'
import 햄버거 from './menuPhoto/fastfood.png'
import 디저트 from './menuPhoto/dessert.png'
import { gsap } from 'gsap';
import { Dumy } from '../../dumydata/dumy';

const viewMenuNum = 5
const boxgap = 15;
const boxsize = 181.5;

function ChoiceMenu(probs){
    
    const [li,setLi] = useState([]);
    const boxRef = useRef(null);

    const menu = [['CHICKEN',"치킨",치킨],['PIZZA',"피자",피자],['CHINESE','중식',중식],['JAPANESE','일식',일식],['HAMBURGER', '햄버거',햄버거],['DESSERT','디저트',디저트]]
    const menuLen = menu.length
    const viewMenuNum = 5

    const numRef = useRef(0)
    const limitRef = useRef()
    const boxsize = 181.5;

    const buttonhandle = (b) =>{
        if(b==="l"){
                console.log(numRef.current)
                console.log(menuLen*boxsize)
                // numRef.current+=boxsize*viewMenuNum; //범위 내면 +
                if(numRef.current>=0){
                   console.log("범위끝")
                   numRef.current=0
                }
                else{
                    numRef.current += boxsize*viewMenuNum //범위를 벗어나면 최대로 바꿈
                }

        }if(b==="r"){
            console.log(numRef.current)
            console.log(menuLen*boxsize)
                if(numRef.current-menuLen*boxsize<-menuLen*boxsize){
                    console.log("범위끝임")
                }
                else{
                    numRef.current-=boxsize*viewMenuNum; //범위 내면 +
                }
        }
        console.log(numRef.current)
    }

    const handleRight = (e) => {
        buttonhandle("r")
        gsap.to(boxRef.current, {
            x:`${numRef.current}px`,
            ease: 'power3.inOut',
            duration: 0.5,
        });
      };
    
      const handleLeft = (e) => {
        buttonhandle("l")
        gsap.to(boxRef.current, {
            x:`${numRef.current}px`,
            ease: 'power3.inOut',
            duration: 0.5,
        });
      };
    

    useEffect(()=>{

        const li_=[];
        
        menu.forEach(e => {
            li_.push(
                <a href={`/storeList/?id=${e[0]}`} key={e[0]} onClick={probs.HandlerF} ><div> 
                    <div className='menu-list-img'
                    style={{
                    
                        backgroundImage: `url(${e[2]})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                    }}
                    ></div>
                 <p>{e[1]}</p></div></a>
            ); 
        });
        setLi(li_);
    },[]);

 
    

    return <div className='choicemenu'>
        <button onClick={e=>{e.preventDefault(); handleLeft()}}>
        <span className="material-symbols-outlined">
        arrow_circle_left
        </span>
        </button>
        <div className='choicemenu-in' style={{ width: `${viewMenuNum * 180+10}px` }}>
            <div className='choicemenu-in-frame' ref={boxRef} style={{ width: `${menuLen * 180+10}px` }}>
                {li}
            </div>
        </div>
        <button onClick={e=>{e.preventDefault(); handleRight()}}>
        <span className="material-symbols-outlined">
        arrow_circle_right
        </span>
        </button>
    </div>
}

function ShopSearchBar(probs){

    const [choiceSort,setChoiceSort] = useState([])
    const inputRef = useRef(null)
    const [inputVal,setInputval] = useState(null)

    const HandlerInputVal =()=>{
        setInputval(inputRef.current.value)
        console.log(inputVal)
    }

    const empty_input= (e) =>{
        e.preventDefault()
        probs.HandlerSearch(inputVal)
        inputRef.current.value= null
        setInputval(null)

        
        console.log(inputVal)
    }

    const button_info = [
        {
            info:"score-asc",
            title:"별점 오름차순"
        },
        {
            info:"score-desc",
            title:"별점 내림차순"
        },
        {
            info:"name-asc",
            title:"이름 오름차순"
        },
        {
            info:"name-desc",
            title:"이름 내림차순"
        }
    ]
    
    useEffect(()=>{
        const choiceSort_ = []
        button_info.forEach(e => {
            choiceSort_.push(<button key={e.info} className='shop-searchbar-sort-button' onClick={event=>{
                event.preventDefault()
                probs.ChangeSort(e.info)
            }}
            >{e.title}</button>)
        });
        setChoiceSort(choiceSort_)
    },[])
    

    return <div className='shop-searchbar-container'>
        <div className='storeList-nav'>
            <div className='storeList-nav-in'>
                <div className='nav-in-login'></div>
            </div>
        </div>
        <form>
            <input placeholder='찾고 싶은 가게 검색' type='text'onChange={HandlerInputVal} ref={inputRef}></input>
            <button onClick={empty_input}>
             <span className="material-symbols-outlined">search</span>
            </button>
        </form>
        <div className='sort-button-container'>
                {choiceSort}
        </div>
    </div>
}

function TEST2(probs) { 
    const num = 15
    const query = probs.query
    const num_first = useRef(0)
    const num_second = useRef(15)
    const limit = useRef(false)
    const container_ref = useRef({})

    const [content,setContent] = useState([])
    const [button,setButton] = useState([])

    const card_num = 3  //화면 카드 수
    const card_width = (viewMenuNum*boxsize-boxgap)/card_num
    const card_height = card_width*1.3
    const data = new Dumy().data

    useEffect(()=>{
        console.log(num_first.current)
        console.log(num_second.current)

        function isNaturalNumber(num) {
            return Math.sign(num) === 1 && Number.isInteger(num);
          } // 자연수인지 아닌지 판별


        const handleScrollReset = () => {
            document.body.scroll(0, 0);
        };  

        const button_function = () =>{
            try{
                axios.get(`/stores/${query}/category`)
                .then((res)=>{
                    const data = res.data.data
                    console.log(data)
                    // const button_num = Math.floor(data.length/num+1)
                    const button_num = (isNaturalNumber(data.length/num)) ? Math.floor(data.length/num) : Math.floor(data.length/num)+1 ; //10 단위면 버튼이 +1이 되기 때문에 나눴을때 자연수면 +1이 안되게 만듦
                    const button_ = []

                    for(let i=0; i<button_num; i++){
                        button_.push(<button className='pagebutton' key={`button${i}`} onClick={e=>{
                            e.preventDefault();
                            handleScrollReset()
                            num_first.current = num*i
                            
                            list_function()

                        }}>{i}</button>)
                    }
                    setButton(button_)

                })
                .catch((err)=>{
                    console.log(err)
                })
            }
            catch(err){
                console.log(err)
            }
        }

        const list_function = ()=>{
            try{
                axios.get(`/stores/${query}/category/${probs.sort}?offset=${num_first.current}&limit=${num}`)
                .then((res)=>{
                    const data = res.data.data
                    console.log(data)
                    const content_=[]
                    
                    const IntroCSS = {
                        width:`${card_width}px`,
                        height:`${card_width*0.5}px`
                    }

                    for(let i=0; i<data.length; i++){
                        
                        const ImageCSS = (data[i] && (data[i].amazonS3s && data[i].amazonS3s[0].fileName)) ? {
                            backgroundImage:`url(https://dev-server-delivery.s3.ap-northeast-2.amazonaws.com/${data[i].amazonS3s[0].fileName})` ,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            width:`${card_width}px`,
                            height:`${card_width*0.9}px`
                            
                        } : {
                            backgroundColor:"white",
                            width:`${card_width}px`,
                            height:`${card_width*0.9}px`
                        }  

                        content_.push(<a href={`/order/?id=${data[i].shop_name}`} key={data[i].shop_name}>
                            <div className='shop_div' style={{width:`${card_width}px`,height:`${card_height}px`}}>
                            <div id='shopImage' style={ImageCSS}></div>
                            <div id='shopIntro' style={IntroCSS} ><p>{data[i].shop_name}</p><p>별점 : {data[i].score} </p></div></div></a>)
                    }
    
                    setContent(content_)

                    console.log('first')
                    probs.limit.current=true
                })
                .catch((err)=>{  
                    console.log(err)
                })
            }catch(err){
                return console.log(err+"first_function")
            }
        }

        // button_function()
        // if(probs.limit.current===false) list_function()      
        
                    
                
                    console.log(data)
                    const content_=[]
                    
                    const IntroCSS = {
                        width:`${card_width}px`,
                        height:`${card_width*0.5}px`
                    }
                    console.log(data.length)

                    for(let i=0; i<data.length; i++){
                        console.log(data[i])
                        const ImageCSS = (data[i] && (data[i].amazonS3s && data[i].amazonS3s[0].fileName)) ? {
                            backgroundImage:`url(https://dev-server-delivery.s3.ap-northeast-2.amazonaws.com/${data[i].amazonS3s[0].fileName})` ,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            width:`${card_width}px`,
                            height:`${card_width*0.9}px`
                            
                        } : {
                            backgroundColor:"white",
                            width:`${card_width}px`,
                            height:`${card_width*0.9}px`
                        }  
                        content_.push(<a href={`/order/?id=${data[i].shop_name}`} key={data[i].shop_name}>
                            <div className='shop_div' style={{width:`${card_width}px`,height:`${card_height}px`}}>
                            <div id='shopImage' style={ImageCSS}></div>
                            <div id='shopIntro' style={IntroCSS} ><p>{data[i].shop_name}</p><p>별점 : {5.0} </p></div></div></a>)
                    }
    
                    setContent(content_)

                    console.log('first')
                    probs.limit.current=true
        
        return () => {};

    // },[num_first,content,probs.sort])
},[])

    return <div className='container_shop' ref={container_ref} style={{
        width:`${viewMenuNum*boxsize+boxgap*3}px`
    }}>
        {content}
        <div className='pagebutton-frame'>
            {button}
        </div>
    </div>
}

function TEST1(probs) { 
    const num = 15
    const query = probs.query
    const num_first = useRef(0)
    const num_second = useRef(15)
    const limit = useRef(false)
    const container_ref = useRef({})

    const [content,setContent] = useState([])
    const [button,setButton] = useState([])

    const card_num = 3
    const card_width = (viewMenuNum*boxsize-boxgap)/card_num
    const card_height = card_width*1.3

    useEffect(()=>{
        console.log(num_first.current)
        console.log(num_second.current)

        const handleScrollReset = () => {
            document.body.scroll(0, 0);
            console.log("height 초기화")
        };  

        function isNaturalNumber(num) {
            return Math.sign(num) === 1 && Number.isInteger(num);
          } // 자연수인지 아닌지 판별

        const button_function = () =>{
            try{
                axios.get(`/stores/${probs.searchInput}/name`)
                .then((res)=>{
                    const data = res.data.data

                    // const button_num = Math.floor(data.length/num+1)
                    const button_num = (isNaturalNumber(data.length/num)) ? Math.floor(data.length/num) : Math.floor(data.length/num)+1 ; //10 단위면 버튼이 +1이 되기 때문에 나눴을때 자연수면 +1이 안되게 만듦
                    
                    const button_ = []

                    for(let i=0; i<button_num; i++){
                        button_.push(<button className='pagebutton' key={`button${i}`} onClick={e=>{ 
                            e.preventDefault();
                            handleScrollReset();
                            num_first.current = num*i

                            list_function()

                        }}>{i}</button>)
                    }
                    setButton(button_)

                })
                .catch((err)=>{
                    console.log(err)
                })
            }
            catch(err){
                console.log(err)
            }
        }

        const list_function = ()=>{
            try{
                axios.get(`/stores/${probs.searchInput}/name-page?offset=${num_first.current}&limit=${num}`)
                .then((res)=>{
                    const data = res.data.data
                    const content_=[]
                    
                    const IntroCSS = {
                        width:`${card_width}px`,
                        height:`${card_width*0.5}px`
                    }

    
                    for(let i=0; i<data.length; i++){

                        const ImageCSS = (data && data[i].amazonS3s && data[i].amazonS3s[0].fileName) ? {
                            backgroundImage:`url(https://dev-server-delivery.s3.ap-northeast-2.amazonaws.com/${data[i].amazonS3s[0].fileName})` ,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            width:`${card_width}px`,
                            height:`${card_width*0.9}px`
                            
                        } : {
                            backgroundColor:"white",
                            width:`${card_width}px`,
                            height:`${card_width*0.9}px`
                        }  

                        content_.push(<a href={`/order/?id=${data[i].name}`} key={data[i].name}>
                            <div className='shop_div' style={{width:`${card_width}px`,height:`${card_height}px`}}>
                            <div id='shopImage' style={ImageCSS}></div>
                            <div id='shopIntro' style={IntroCSS} ><p>{data[i].name}</p><p>별점 : {data[i].score} </p></div></div></a>)
                    }

    
                    setContent(content_)

                    console.log('first')
                    probs.limit.current=true
                })
                .catch((err)=>{  
                    console.log(err)
                })
            }catch(err){
                return console.log(err+"first_function")
            }
        }

        button_function()
        if(probs.limit.current===false) list_function()       
        
        // probs.limit.current=false //추가

        return () => {};

    },[num_first,content,probs.searchInput])

    return <div className='container_shop' ref={container_ref} style={{
        width:`${viewMenuNum*boxsize+boxgap*3}px`
    }}>
        {content}
        <div className='pagebutton-frame'>
            {button}
        </div>
    </div>
}

function Sort(probs){

    const [choiceSort,setChoiceSort] = useState([])
    const inputRef = useRef(null)
    const [inputVal,setInputval] = useState(null)

    const HandlerInputVal =()=>{
        setInputval(inputRef.current.value)
        console.log(inputVal)
    }

    const empty_input= (e) =>{
        e.preventDefault()
        probs.HandlerSearch(inputVal)
        inputRef.current.value= null
        setInputval(null)

        
        console.log(inputVal)
    }

    const button_info = [
        {
            info:"score-asc",
            title:"별점 오름차순"
        },
        {
            info:"score-desc",
            title:"별점 내림차순"
        },
        {
            info:"name-asc",
            title:"이름 오름차순"
        },
        {
            info:"name-desc",
            title:"이름 내림차순"
        }
    ]
    
    useEffect(()=>{
        const choiceSort_ = []
        button_info.forEach(e => {
            choiceSort_.push(<button key={e.info} className='shop-searchbar-sort-button' onClick={event=>{
                event.preventDefault()
                probs.ChangeSort(e.info)
            }}
            >{e.title}</button>)
        });
        setChoiceSort(choiceSort_)
    },[])
    

    return <div className='shop-sort-container'>
        <div className='sort-button-container'>
            {choiceSort}
        </div>
    </div>
}

function Category(probs) {

    const [searchParams, setSearchParams] = useSearchParams();
    const query_=(searchParams.get("id"));
    const [TF,setTF] = useState(false)
    const [sort,setSort] = useState("score-asc")
    const limit = useRef(false)
    
    const [shoplist,setShoplist] = useState(<TEST2 sort={sort} query={query_} limit={limit}/>) 
    const [view,setView] = useState(null)
    const [searchInput ,setsearchInput] = useState(null)

    const ChangeSort = (mode)=>{
        setSort(mode)
    }

    const HandlerSearch = (data) =>{
        if(data !== null && data !==undefined && data !== ''){
            console.log(data)
            setsearchInput(data)
            setTF(true)
            console.log(TF)
        }
    }
    const HandlerT = () => {
        setTF(true)
    }
    const HandlerF = () => {
        setTF(false)
    }

    useEffect(()=>{
        console.log(sort +"check")
        console.log(TF)
        console.log(searchInput)
        if(TF===false)
        setShoplist(<TEST2 sort={sort} query={query_} limit={limit}/>)
        else
        // setShoplist(<TEST1 searchInput = {searchInput} sort={sort} limit={limit} />)

        limit.current=false
        console.log(limit.current)
    },[sort,query_,TF,searchInput])
      

  return (
    <div className="container_category">
        <ShopSearchBar HandlerSearch = {HandlerSearch} sort={sort} ChangeSort={ChangeSort}/>
        <ChoiceMenu HandlerF={HandlerF}></ChoiceMenu>
        {/* <Sort HandlerSearch = {HandlerSearch} sort={sort} ChangeSort={ChangeSort}/> */}
        {shoplist}
        <div className="empty-category">
            배경화면 출처: <a href="https://kr.freepik.com/free-photo/top-view-fresh-vegetables-various-spices-in-small-bowls-wooden-spoons-on-table-free-space_17255862.htm#query=%EC%9A%94%EB%A6%AC&position=0&from_view=keyword&track=sph">작가 KamranAydinov</a> 출처 Freepik
        </div>
    </div>
  )
}

export default Category;
