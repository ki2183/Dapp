import { useEffect } from "react"
import ShopSearchBar2 from "../boardTop"
import { useState } from "react"
import './boardEdit.css'
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { useRef } from "react"

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
  ];

export default function BoardEdit(probs){

    const location = useLocation();
    const { data, type } = location.state;
    return (
        <div className="container-board-edit">
            <ShopSearchBar2/>
            <div className='container-load'>
                {type === "board" && (
                      <div>
                      <a href='/board'>게시판</a> <span>&gt;</span> <a href="javascript:history.back()">게시글</a> <span>&gt;</span> <span id='in-this'>게시글 수정</span>
                  </div>
                )}
                {type === "announcements" && (
                      <div>
                      <a href='/board'>공지사항</a> <span>&gt;</span> <a href="javascript:history.back()">공지</a> <span>&gt;</span> <span id='in-this'>공지 수정</span>
                  </div>
                )}
              
            </div>
            <Boardbottom/>         
        </div>
    )
}

function Boardbottom(probs){

    return (
    <div className='container-board-bottom'>
        <span className='title-board-bottom'>게시판</span>

            <BoardEditThis/>
            <div className='null-box'></div>
    </div>
    )
}

function BoardEditThis(probs){

    const location = useLocation();
    const val = location.state?.data; // 전달된 값 읽기
    const { data, type } = location.state;

    useEffect(()=>{
        console.log(val)
        console.log(data)
        console.log(type)
    },[])

    const savedToken = (JSON.parse(localStorage.getItem('token')) && JSON.parse(localStorage.getItem('token')).token) ? (JSON.parse(localStorage.getItem('token')).token) : null
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
       
        const sendDTOBoard = async(DTO) =>{        
            try{
                const res = await axios.put(`/boards/${data.id}/update`, JSON.stringify(DTO), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(res); // 전송 결과를 처리하는 코드]
                const ress = await axios.get(`/boards/${data.id}`, JSON.stringify(DTO), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(ress.data.data)
                navigate('/notice', { state: { data: ress.data.data,type:"board"} });
            }
            catch(err){
                console.log(err)
                console.log('동기적 함수 실팬')
            }
           
        }

        const sendDTONotice = async(DTO) =>{        
            try{
                const res = await axios.put(`/announcements/${data.id}/update`, JSON.stringify(DTO), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(res); // 전송 결과를 처리하는 코드]
                const ress = await axios.get(`/announcements/${data.id}`, JSON.stringify(DTO), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(ress.data.data)
                navigate('/notice', { state: { data: ress.data.data,type:"announcements"} });
            }
            catch(err){
                console.log(err)
                console.log('동기적 함수 실팬')
            }
           
        }

        if( title != '' && content != ''){
            if(savedToken && savedToken.id !== null){
                const DTO_ = {         
                    "id" : savedToken.id,
                    "title" :  title,
                    "content" : content
                }
                if(type === 'board')
                    sendDTOBoard(DTO_)
                else
                    sendDTONotice(DTO_)
            }else{
                alert('로그인을 하지 않았아요')
            }
        }else{
            alert('제목,내용,가게란이 비어있는지 확인해주세요.')
        }
        const Content = content.replace("\r\n", "<br>");
        console.log(Content)


    };

    useEffect(()=>{
        
        const getPreDTO = () => {
            const title_ = data.title
            const content_ = data.content
            
            setTitle(title_)
            setContent(content_)
        }

        
        getPreDTO()
    },[]) //store 이름

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          console.log('Enter key pressed');
          console.log(content)
        }
      };

    return (
        <div className="container-edit-this">
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
        </div>
    )
}