import { useEffect, useState } from 'react'
import axios from 'axios'
import { _checkPlugin } from 'gsap/gsap-core'
import { useLocation, useNavigate } from 'react-router-dom'
import Modal from 'react-modal';

const comentlist = [
    `1빠 놓쳤네 하`,
    '정말 감동적이여서 살 수 가 없습니다. 이와 같은 공지는 어디서 오는 것입니까? 혹여 가보로 내려옵니까? 나의 공중제비를 멈추게 하십쇼! 당신과 같은 사람들 때문에 삶이 굉장히 재미있습니다. 그러한 공지는 비밀리에 보관하지말고, 재빨리 내용물을 꺼내주십시오'
]

export default function Board_this(probs){
    const savedToken = (JSON.parse(localStorage.getItem('token')) && JSON.parse(localStorage.getItem('token')).token) ? (JSON.parse(localStorage.getItem('token')).token) : null

    const [date,setDate] = useState('')
    const location = useLocation();
    const { data, type } = location.state;
    const content = data.content
    const postId = data.id
    

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const [postInfo,setPostInfo] = useState({
        'content' : data.content,
        'title': data.title,
        'createdBy': data.createdBy,
        'view': data.view,
        'postId' : data.id,
        'createdDate':data.createdDate
    })
    console.log(postInfo.view)
    const [meCheck,setMeCheck]= useState(false)
    const [editbutton,setEditButton] = useState(null)

    const getDate = (date) => {
        return date.slice(0,10);
    }

    const navigate = useNavigate();
    
    const handleButtonClick = (item) => {
        console.log(item)
        navigate('/boardedit', { state: { data: item ,type:type} });
    };

    const delthisboard = () => {
        const delboard = () =>{
            axios.delete(`/boards/${postInfo.postId}/delete`)
            .then(res=>{
                openModal();
                window.location.href = '/board' //바꿔야함
            })
            .catch(err=>{
                   console.log(err)
                   console.log("del 에러입니다.") 
                }
            )
        }
        const delnotice = () => {
            axios.delete(`/announcements/${postInfo.postId}/delete`)
            .then(res=>{
                openModal();
                window.location.href = '/board' //바꿔야함
            })
            .catch(err=>{
                   console.log(err)
                   console.log("del 에러입니다.") 
                }
            )
        }

        type === "board" ? delboard() : delnotice();
     
    }

   

    useEffect(()=>{
        console.log(type)
        console.log(savedToken&&savedToken.id ? savedToken.id : '없음')

        const getMycontent = () => {  // 내가 맞는지 확인
            console.log('실행')
            axios.get(`/boards/${savedToken.id}/user`)
            .then(res=>{
                console.log(res.data.data)
                console.log('초기 useEffect')
                const dto = res.data.data
                dto.find(item => {
                    if (item.id === postId && type==="board") {
                        setMeCheck(true);
                        return true;
                    }
                    return false;
                });
            })
            .catch(err=>{
                console.log(err)
            })
        }
        const checkadmin = () =>{
            console.log('관리자 체크함')
            if(savedToken  && type==="announcements") {
                if(savedToken.id === 303 || savedToken.id === 1){
                    setMeCheck(true);
                    console.log('관리자 확인')
                }
            }
        } 

        const getMyinfo = () => { //board 데이터 불러오긔
            axios.get(`/boards/${postId}`).then(res =>{
                console.log(res.data.data)
                const dto = res.data.data
                setPostInfo(preState=>({
                    ...preState,
                    'content' : dto.content,
                    'title': dto.title,
                    'createdBy': dto.createdBy,
                    'view': dto.view,
                    'postId' : dto.id,
                    'createdDate':getDate(dto.createdDate)
                }))

            })
            .catch(err=>{
                console.log(err)
                console.log('getinfo err')
            })
        }

        const getNoticeinfo = () => { //board 데이터 불러오긔
            axios.get(`/announcements/${postId}`).then(res =>{
                console.log(res.data.data)
                const dto = res.data.data
                setPostInfo(preState=>({
                    ...preState,
                    'content' : dto.content,
                    'title': dto.title,
                    'createdBy': dto.createdBy,
                    'view': dto.view,
                    'postId' : dto.id,
                    'createdDate':getDate(dto.createdDate)
                }))

            })
            .catch(err=>{
                console.log(err)
                console.log('getinfo err')
            })
        }

        if(savedToken&&savedToken.id)
            type === 'board' ? getMycontent(): checkadmin()
        console.log(postInfo)
        if(type === 'board')
            getMyinfo()
        else
            getNoticeinfo()
    },[])   

    useEffect(()=>{
        console.log(postInfo)
        console.log(postInfo.createdDate)
        setDate(getDate(postInfo.createdDate))
    },[postInfo])

    useEffect(()=>{
        console.log(meCheck)
        if(meCheck === true){
            setEditButton(<div className="container-content-edit-button">
             <button className='content-edit-button' onClick={e=>{
                e.preventDefault();
                openModal();
                
            }}>삭제</button>    
            <button className='content-edit-button' onClick={e=>{
                e.preventDefault();
                handleButtonClick(data);
            }}>수정</button>
            </div>)
        }
    },[meCheck])
    

    const Content = content.replace("\r\n", "<br>");
    const Coments1 = comentlist[0].replace("\r\n", "<br>");
    const Coments2 = comentlist[1].replace("\r\n", "<br>");

    return (
        <div className="container-board-this">
            <div className="container-board-title">
                <span>{postInfo.title}</span>
            </div>
            <div className="container-board-name">
                <div className='board-name-name'>
                    <span id='userimg'></span><span>{postInfo.createdBy}</span>
                </div>
                <div className='board-name-view'>
                    <span id='viewimg'></span><span>{postInfo.view}</span>
                </div>
                <div className='board-name-date'>
                    <span>{date}</span>
                </div>
            
            </div>
            
            <Modal
                className="delmodel"
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="모달"
            >
                <h2>게시글 삭제를 하시겠습니까?</h2>
                <div>
                    <button onClick={delthisboard}>삭제한다</button>
                    <button onClick={closeModal}>닫기</button>
                </div>
            </Modal>

            <div className="container-board-content">
                <pre className='board-content'>
                    {Content}
                </pre>
            </div>
            {editbutton}

            <div className="container-board-conment">
                <div className='board-comment-title'>
                    <span>댓글</span>
                </div>
                <div className='board-comment-frame'>
                    <div className='board-comment-div'> 
                        <span>아무닉네임</span>
                        <pre className='board-comment'>
                            {Coments1}
                        </pre>
                    </div>

                    <div className='board-comment-div'> 
                        <span>존</span>
                        <pre className='board-comment'>
                            {Coments2}
                        </pre>
                    </div>
                   
                </div>
            </div>

            <div className="container-board-conmentwrite">
                <textarea></textarea>
                <div className='board-comment-button'><button>등록</button></div>
            </div>

        </div>
    )
}
