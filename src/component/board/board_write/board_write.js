import axios from "axios";
import { useEffect, useRef } from "react";
import { useState } from "react";
import "./board_write.css"

const testdata = [
    { id: 1, name: '짱깨 짜장면' },
    { id: 2, name: '피자나라 치킨공주' },
    { id: 3, name: '도미노 피자0' },
    { id: 4, name: '도미노 피자1' },
    { id: 5, name: '도미노 피자2' },
    { id: 6, name: '도미노 피자3' },
    { id: 7, name: '도미노 피자4' },
    { id: 8, name: '도미노 피자5' },
    { id: 9, name: '도미노 피자6' },
    { id: 10, name: '도미노 피자7' },
    { id: 11, name: '도미노 피자8' },
    { id: 12, name: '도미노 피자9' },
    { id: 13, name: '도미노 피자10' },
    { id: 14, name: '도미노 피자11' },
    { id: 15, name: '도미노 피자12' },
    { id: 16, name: '도미노 피자13' },
    { id: 17, name: '도미노 피자14' },
    { id: 18, name: '도미노 피자15' },
    { id: 19, name: '도미노 피자16' },
    { id: 20, name: '도미노 피자17' },
    { id: 21, name: '도미노 피자18' },
    { id: 22, name: '도미노 피자19' },
    { id: 23, name: '도미노 피자20' },
    { id: 24, name: '도미노 피자21' },
    { id: 25, name: '도미노 피자22' },
    { id: 26, name: '도미노 피자23' },
    { id: 27, name: '도미노 피자24' },
    { id: 28, name: '도미노 피자25' },
    { id: 29, name: '도미노 피자26' },
    { id: 30, name: '도미노 피자27' },
    { id: 31, name: '도미노 피자28' },
    { id: 32, name: '도미노 피자29' },
    { id: 33, name: '도미노 피자30' },
    { id: 34, name: '도미노 피자31' },
    { id: 35, name: '도미노 피자32' },
    { id: 36, name: '도미노 피자33' },
    { id: 37, name: '도미노 피자34' },
    { id: 38, name: '도미노 피자35' },
    { id: 39, name: '도미노 피자36' },
    { id: 40, name: '도미노 피자37' },
    { id: 41, name: 'BBQ38' },
    { id: 42, name: 'BBQ39' },
    { id: 43, name: 'BBQ40' },
    { id: 44, name: 'BBQ41' },
    { id: 45, name: 'BBQ42' },
    { id: 46, name: 'BBQ43' },
    { id: 47, name: 'BBQ44' },
    { id: 48, name: 'BBQ45' },
    { id: 49, name: 'BBQ46' },
    { id: 50, name: 'BBQ47' }
  ];

export default function Board_write(probs){
    const savedToken = (JSON.parse(localStorage.getItem('token')) && JSON.parse(localStorage.getItem('token')).token) ? (JSON.parse(localStorage.getItem('token')).token) : null
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [choice_store,setChoice_store] = useState({id:null, name:"가게선택"})
    const [storeInfo,setStoreInfo] = useState([])
    const [storeView,setStoreView] = useState([])

    const [css,setCss] = useState('none') 

    const type = probs.type
    
    const handleSubmit = (e) => {
        e.preventDefault();
       
        const sendDTOBoard = (DTO) =>{        
            axios.post('/boards/save', JSON.stringify(DTO), {
            headers: {
                'Content-Type': 'application/json'
            }
            })
            .then((response) => {
            console.log(response); // 전송 결과를 처리하는 코드
              window.location.href="/board"
            })
            .catch((error) => {
            console.error(error); // 오류를 처리하는 코드
            });
        }
        const sendDTONotice = (DTO) =>{        
            axios.post('/announcements/save', JSON.stringify(DTO), {
            headers: {
                'Content-Type': 'application/json'
            }
            })
            .then((response) => {
            console.log(response); // 전송 결과를 처리하는 코드
              window.location.href="/board"
            })
            .catch((error) => {
            console.error(error); // 오류를 처리하는 코드
            });
        }

        // if(title != '' && content != ''){
        //     if(savedToken && savedToken.id !== null){
        //         const DTO_ = {
        //             "userId": savedToken.id,
        //             "storeId" : choice_store.id,
        //             "title" :  title,
        //             "content" : content
        //         }
        //         const DTO__ = {
        //             "userId": savedToken.id,
        //             "title" :  title,
        //             "content" : content
        //         }
        //         // choice_store.id != null
        //         if(type === "announcements"){
        //             sendDTONotice(DTO__)
        //         }else if(type === "board"){
        //             if(choice_store.id != null)
        //                 sendDTOBoard(DTO_) 
        //             else{
        //                 alert("가게를 선택해주세요.")
        //             }
        //         }     
        //     }else{
        //         alert('로그인을 하지 않았아요')
        //     }
        // }
        // else{
        //     alert('제목,내용,가게란이 비어있는지 확인해주세요.')
        //     console.log(title)
        //     console.log(content)
        // }
        if(title !== "" && content !== ""){
            if(savedToken && savedToken.id !== null){
                if(type === "announcements"){
                             const DTO_ = {
                                            "userId": savedToken.id,
                                            "title" :  title,
                                            "content" : content
                                            }
                            sendDTONotice(DTO_)
                            console.log(DTO_)
                            console.log("ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ")
                }else if (type ==="board"){
                    if(choice_store.id !== null){
                        const DTO_ = {
                                    "userId": savedToken.id,
                                    "storeId" : choice_store.id,
                                    "title" :  title,
                                    "content" : content
                                    }
                        sendDTOBoard(DTO_) 
                        console.log(DTO_)
                        console.log("ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ")
                    }else{
                        alert("가게를 선택해주세요.")
                    }
                }else{
                    alert("오류, 데이터를 보낼수가 없습니다.죄송하지만 페이지를 나가주세요")
                }
            }else{
                alert("로그인을 해야합니다.")
            }
        }else{
            alert("제목,내용을 입력해주세요.")
        }
    };
  
    const click_handler=(id_,name_)=>{
        console.log('click')
        setChoice_store({
            ...choice_store,
            id: id_,
            name: name_
          });
    }

    useEffect(()=>{

        const getStoreInfo = () =>{
            axios.get('/stores')
            .then(res=>{
                const storeInfo_ = []
                const dto = res.data.data
    
                
                dto.map((item,index)=>{
                    storeInfo_.push({
                        id:item.id,
                        name:item.name
                    })
                })
                console.log(storeInfo_)
                setStoreInfo(storeInfo_)

            }).catch(err=>{
                setStoreInfo(testdata)
            })
    
        }
        if(type==="board")
            getStoreInfo()
    },[]) //store 이름

    useEffect(()=>{
        console.log(storeInfo)
        const storeView_ = []

        storeInfo.map((item,index)=>{
            storeView_.push(
                <div className="store-item" key={index+item} onClick={e=>{e.preventDefault();  click_handler(item.id,item.name); setCss('none')}} >{item.name}</div>
            )
        })
        setStoreView(storeView_)
    },[storeInfo])

    useEffect(()=>{
        console.log(choice_store)
    },[choice_store])

    const brRef = useRef([])
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          console.log('Enter key pressed');
          console.log(content)
        }
      };

    return (
    <div className="container-write">
        
            <div className="write-top">
                <div className="write-top-title">
                    <label htmlFor="title" className="write-title">제목 :</label>
                    <input
                    className="write-title-input"
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                {
                    type === "board" &&(
                        <div className="frame-stores-p" >
                            <span>가게 선택 : </span><button className ="choice-stores"onClick={e=>{
                            e.preventDefault();
                            css==='none' ? setCss('block') : setCss('none')
                            }
                            }>{choice_store.name}</button>
                            <div className="frame-stores" style={{ display: css }}>{storeView}</div>
                        </div>
                    )
                }
                
            </div>
            
            <div className="textzone">
                <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={e=>{handleKeyDown(e)}}
                />
            </div>
            <button onClick={handleSubmit} className="makebutton">작성하기</button>
    </div>
    )
}