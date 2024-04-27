import axios from "axios"
import { useRef } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useLayoutEffect } from "react"
import { useNavigate } from 'react-router-dom';
import './board_post.css'

const pageLimit = 10
const testdata = [
        {
            "id": 1,
            "storedId": 1,
            "title": "[베라]이럴거면 그냥 빅뱅 전으로 가자.....",
            "content": 
            `메이플이 참 ~~ 사기치기 쉬운게임이야 
            고확으로 메소사기쳐도  정지안당하는 갓겜이라는거냐
            사기꾼들이 겁나많네
            아직도 일안합니까?`,
            "createdBy": "오산시 물주먹",
            "createdDate": "2023-08-22T20:13:18.633966",
            "view": 0
        },
        {
            "id": 2,
            "storedId": 1,
            "title": "[루나]운영진은 큐브시스템 정상화(?)하라",
            "content": "rmsid xpsdlkfjlskdjf  skjlsdk aslkjsdflkasdf sadowlab spring fjdkslsdkfj",
            "createdBy": "오산시 물주먹",
            "createdDate": "2023-08-22T20:13:19.74937",
            "view": 0
        },
        {
            "id": 3,
            "storedId": 1,
            "title": "[루나]버프프리저 통수로 인해 게시판들 오열 쩔듯 ㅠㅠ",
            "content": "rmsid xpsdlkfjlskdjf  skjlsdk aslkjsdflkasdf sadowlab spring fjdkslsdkfj",
            "createdBy": "오산시 물주먹",
            "createdDate": "2023-08-22T20:13:20.076303",
            "view": 0
        },
        {
            "id": 4,
            "storedId": 1,
            "title": "[오로라]점검끝나고 코인돌이할 생각에",
            "content": "rmsid xpsdlkfjlskdjf  skjlsdk aslkjsdflkasdf sadowlab spring fjdkslsdkfj",
            "createdBy": "오산시 물주먹",
            "createdDate": "2023-08-22T20:13:20.431354",
            "view": 0
        },
        {
            "id": 5,
            "storedId": 1,
            "title": "[리부트2]운영진님들 진짜 PC방 로딩좀 어떻게 안 해주나요",
            "content": "rmsid xpsdlkfjlskdjf  skjlsdk aslkjsdflkasdf sadowlab spring fjdkslsdkfj",
            "createdBy": "오산시 물주먹",
            "createdDate": "2023-08-22T20:13:21.115733",
            "view": 0
        },
        {
            "id": 6,
            "storedId": 1,
            "title": "[스카니아]하나이C ~ 결국 보상 똥인채로 진행되는구려",
            "content": "rmsid xpsdlkfjlskdjf  skjlsdk aslkjsdflkasdf sadowlab spring fjdkslsdkfj",
            "createdBy": "오산시 물주먹",
            "createdDate": "2023-08-22T20:13:21.115733",
            "view": 0
        },
        {
            "id": 7,
            "storedId": 1,
            "title": "[크로아]일반서버 모든아이템 교환가능 가자",
            "content": "rmsid xpsdlkfjlskdjf  skjlsdk aslkjsdflkasdf sadowlab spring fjdkslsdkfj",
            "createdBy": "오산시 물주먹",
            "createdDate": "2023-08-22T20:13:21.115733",
            "view": 0
        },
        {
            "id": 8,
            "storedId": 1,
            "title": "[베라]내일부터 20주년 축제 시작인가요?",
            "content": "rmsid xpsdlkfjlskdjf  skjlsdk aslkjsdflkasdf sadowlab spring fjdkslsdkfj",
            "createdBy": "오산시 물주먹",
            "createdDate": "2023-08-22T20:13:21.115733",
            "view": 0
        },
        {
            "id": 9,
            "storedId": 1,
            "title": "[스카니아]운영진일안하는듯 20주년이 중요해요 물통 고확 정지안사킴??",
            "content": "rmsid xpsdlkfjlskdjf  skjlsdk aslkjsdflkasdf sadowlab spring fjdkslsdkfj",
            "createdBy": "오산시 물주먹",
            "createdDate": "2023-08-22T20:13:21.115733",
            "view": 0
        },{
            "id": 10,
            "storedId": 1,
            "title": "[크로아]pc방 로딩이 무슨 1시간이나 걸려 아 ㅈ같은게임이네 진짜 매우 짜증이 날라고 해 뭐하냐진짜",
            "content": "rmsid xpsdlkfjlskdjf  skjlsdk aslkjsdflkasdf sadowlab spring fjdkslsdkfj",
            "createdBy": "오산시 물주먹",
            "createdDate": "2023-08-22T20:13:21.115733",
            "view": 0
        }
]
export default function Board_post(probs){
    const savedToken = (JSON.parse(localStorage.getItem('token')) && JSON.parse(localStorage.getItem('token')).token) ? (JSON.parse(localStorage.getItem('token')).token) : null
    const [totalNum,setTotalNum] = useState(0)
    const [num,setNum] = useState(0) // 페이지 넘버
    const [buttonview,setButtonview] = useState([])
    const [viewInfo,setViewInfo] = useState([])
    const search_ = ['title','createdBy','content']
    const [search_tf,setSearch_TF] = useState([true,false,false])
    const search_content = ['제목','닉네임','내용']
    const searchRef = useRef('title') //버튼 선택된거
    const [search_in,setSearch_in] = useState('') //검색내용
    const search_limit = useRef(false)

    const navigate = useNavigate();
    const handleButtonClick = (item) => {
        navigate('/notice', { state: { data: item,type: 'board'} });
    };

    const handleWrite = (item) => {
        console.log(item)
        navigate('/boardwrite', { state: { type:item} });
    };

    const changeSearchTF = (index_) => {
        console.log(index_)
        const tf = []
        search_tf.map((item,index)=>{
            if(index === index_){
                tf.push(true)
                searchRef.current = search_[index]
            }else{
                tf.push(false)
            }
        })
        console.log(searchRef.current)
        setSearch_TF(tf)
    }

    const getBoards = () =>{

        const viewInfo_ = []
        const getDate = (date) => {
            return date.slice(0,10);
        }

        axios.get(`/boards/page?offset=${num}&limit=${pageLimit}`)
        .then(res=>{
            console.log(res.data.data)
            const dto = res.data.data 
            dto.map((item,index)=>{
                
                viewInfo_.push(
                    <div key={index} className="board-post" onClick={e=>{
                        e.preventDefault();
                        handleButtonClick(item);
                }}>
                    <div className="post-title">{item.title}</div>
                    <div className="post-user">{item.createdBy}</div>
                    <div className="post-info">
                        <div className="post-info-view">
                            <span className="material-symbols-outlined" id="viewspan">visibility</span>
                            <span id="viewnum">{item.view}</span>
                        </div>
                        <div className="post-info-date">{getDate(item.createdDate)}</div>
                    </div>
                </div>
                )
            })
            setViewInfo(viewInfo_)

        }).catch(err=>{
            console.log(err)
            // const dto = testdata
            // dto.map((item,index)=>{
            //     viewInfo_.push(
            //         <div key={index} className="board-post" onClick={e=>{
            //             e.preventDefault();
            //             handleButtonClick(item);
            //     }}>
            //         <div className="post-title">{item.title}</div>
            //         <div className="post-user">{item.createdBy}</div>
            //         <div className="post-info">
            //             <div className="post-info-view">
            //                 <span className="material-symbols-outlined" id="viewspan">visibility</span>
            //                 <span id="viewnum">{item.view}</span>
            //             </div>
            //             <div className="post-info-date">{getDate(item.createdDate)}</div>
            //         </div>
            //     </div>
            //     )
            // })
            // setViewInfo(viewInfo_) // css 테스트 할 때 쓰는거임 삭제 ㄴㄴ
        })
    }

    const getSearchBoards = () =>{
        console.log('서치보드')
        const viewInfo_ = []
        const getDate = (date) => {
            return date.slice(0,10);
        }

        axios.get(`/boards/${search_in}/${searchRef.current}-page?offset=${num}&limit=${pageLimit}`)
        .then(res=>{
            console.log(res.data.data)
            const dto = res.data.data 
            dto.map((item,index)=>{
                
                viewInfo_.push(
                    <div key={index} className="board-post" onClick={e=>{
                        e.preventDefault();
                        handleButtonClick(item);
                }}>
                    <div className="post-title">{item.title}</div>
                    <div className="post-user">{item.createdBy}</div>
                    <div className="post-info">
                        <div className="post-info-view">
                            <span className="material-symbols-outlined" id="viewspan">visibility</span>
                            <span id="viewnum">{item.view}</span>
                        </div>
                        <div className="post-info-date">{getDate(item.createdDate)}</div>
                    </div>
                </div>
                )
            })
            setViewInfo(viewInfo_)

        }).catch(err=>{
            console.log(err)
            const dto = testdata
            dto.map((item,index)=>{
                viewInfo_.push(
                    <div key={index} className="board-post" onClick={e=>{
                        e.preventDefault();
                        handleButtonClick(item);
                }}>
                    <div className="post-title">{item.title}</div>
                    <div className="post-user">{item.createdBy}</div>
                    <div className="post-info">
                        <div className="post-info-view">
                            <span className="material-symbols-outlined" id="viewspan">visibility</span>
                            <span id="viewnum">{item.view}</span>
                        </div>
                        <div className="post-info-date">{getDate(item.createdDate)}</div>
                    </div>
                </div>
                )
            })
            setViewInfo(viewInfo_)
        })
    }

    useEffect(()=>{
        const getTotalNum = () =>{
            axios.get(`/boards`)
            .then(res=>{
                console.log(res.data.data)
                setTotalNum(res.data.data.length)
            }).catch(err=>{
                console.log(err)
                setTotalNum(testdata.length) //테스트용
            })
        }
        getTotalNum()
    },[])

    useEffect(()=>{
        console.log(search_in)
    },[search_in])

    useEffect(()=>{
        console.log(search_limit.current+"리밋")
        let limit 
        const buttonview_ = []
        console.log(totalNum)
        if (totalNum%pageLimit === 0){
            limit = Math.floor(totalNum/pageLimit)
        }else{
            limit = Math.floor(totalNum/pageLimit)+1
        }

        const makeButton = () =>{
            for(let i = 0; i < limit; i++){
                buttonview_.push(
                    <button onClick={e=>{
                        e.preventDefault(); 
                        setNum(i)
                    }} key={`${i}`}>{i+1}</button>
                )
            }
            setButtonview(buttonview_)
        } //버튼을 만듦

        makeButton()
        // setNum(0)
        // getBoards()
        search_limit.current===false ? getBoards() : getSearchBoards();

    },[totalNum])

    useEffect(()=>{
        console.log(num)
        search_limit.current===false ? getBoards():getSearchBoards();
    },[num])

    
    const handler_search_button=()=>{
        console.log('핸들러시작')
        console.log(search_in)
        console.log(searchRef.current)
        const getTotalNum = () =>{
            axios.get(`/boards/${search_in}/${searchRef.current}`)
            .then(res=>{
                console.log(res.data.data)
                setTotalNum(res.data.data.length)
                setNum(0)
                search_limit.current = true
            }).catch(err=>{
                console.log(err)
                setTotalNum(testdata.length) //테스트용
            })
        }
        getTotalNum() // 실행되면 useEffect 실행
    }
    return (
    <div className="container-board-post">
        <div className="frame-board-searchbar">
            <div className="empty-search"></div>
           
             {search_tf.map((item, index) => {
                if (item === true) {
                    return (
                    <div className="choice-search" id="choice-true" key={index} onClick={e=>{
                        e.preventDefault();
                        changeSearchTF(index)
                        }}>
                        {search_content[index]}
                    </div>
                    );
                }else{
                    return (
                        <div className="choice-search" key={index} onClick={e=>{
                            e.preventDefault();
                            changeSearchTF(index)
                            }}>
                            {search_content[index]}
                        </div>
                    );
                }
                
                })}

            
            <div className="frame-searchbar">
                
                <input className="input-searchbar"value={search_in} 
                    onChange={e=>{
                    setSearch_in(e.target.value);
                    }}
                    ></input>
                <button className="searchbar-icon" onClick={e=>{
                    e.preventDefault();
                    handler_search_button();
                    }}>
                    <span id="search-icon" className="material-symbols-outlined">search</span>
                    </button>
            </div>
        </div>
        <div className="frame-board-posts">
            {viewInfo}
        </div>
        {/* const handleEditBoard = (item) => {
        console.log(item)
        navigate('/boardedit', { state: { type:item} });
    }; */}
        <div className="write-button-div">
                <button onClick={e=>{
                    e.preventDefault();
                    if(savedToken && savedToken.id)
                        handleWrite("board")
                    else{
                        alert("로그인해야 이용가능합니다.")
                    }
                    }}>작성하기</button>
        </div>
        <div className="frame-board-button">
            {buttonview}
        </div>
    </div>
    )

}