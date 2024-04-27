import { useEffect, useRef, useState } from 'react'
import ShopSearchBar2 from '../board/boardTop'
import Board_this from './board_this'
import './board_view.css'
import { useLocation } from 'react-router-dom';

export default function Board_view(probs){
    const location = useLocation();
    const { data, type } = location.state;
    useEffect(()=>{
        console.log(type)
    },[])
    return (
        <div className='container-board'>
            <ShopSearchBar2/>
            <div className='container-load'>
                {type === "board" && (
                      <div>
                      <a href='/board'>게시판</a> <span>&gt;</span> <span id='in-this'>게시글</span>
                  </div>
                )}
                {type === "announcements" && (
                      <div>
                      <a href='/board'>공지사항</a> <span>&gt;</span> <span id='in-this'>공지</span>
                  </div>
                )}
              
            </div>
            <Boardbottom />
        </div>
    )
}



// ----------------------------------------------------------------------

function Boardbottom(probs){


    return (
    <div className='container-board-bottom'>
            <Board_this />
            <div className='null-box'></div>
    </div>
    )
}