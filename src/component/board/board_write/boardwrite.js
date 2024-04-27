import './boardwrite.css'
import ShopSearchBar2 from '../boardTop'
import Board_write from './board_write'
import { useLocation } from 'react-router-dom';

export default function BoardWrite(probs){
    
    const location = useLocation();
    const { type } = location.state;
    console.log(type)


    return(
        <div className='container-boardwrite-all'>
            <ShopSearchBar2/>
            <div className='container-load'>

                {
                    type === 'announcements' && (
                        <div>
                            <a href='/board'>공지</a> <span>&gt;</span> <span id='in-this'>공지 작성</span>
                        </div>
                    )
                }
                   {
                    type === 'board' && (
                        <div>
                            <a href='/board'>게시판</a> <span>&gt;</span> <span id='in-this'>게시글 작성</span>
                        </div>
                    )
                }
                {/* <div>
                    <a href='/board'>게시판</a> <span>&gt;</span> <span id='in-this'>게시글 작성</span>
                </div> */}
            </div>
            <Board_write type = {type}/>
        </div>
    )
}