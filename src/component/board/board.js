import { useEffect, useRef, useState } from 'react'
import './board.css'
import ShopSearchBar2 from './boardTop'
import Board_write from './board_write/board_write'
import Notice from './notice/notice'
import Board_post from './board_post/board_post'
export default function Board(probs){
    return (
        <div className='container-board'>
            <ShopSearchBar2/>
            <BoardBottom/>
        </div>
    )
}



// ----------------------------------------------------------------------

function BoardBottom(probs){

    const [itemCss, setItemCss] = useState(
        ['menu-board-item-click','','','']
    )


    const item_f = (num) =>{
        const itemCss_ = []
        itemCss.map((val,index)=>{
            if(num===index){
                itemCss_.push('menu-board-item-click')
            }else{
                itemCss_.push('')
            }
        })
        setItemCss(itemCss_)
    }

    return (
    <div className='container-board-bottom'>
        <span className='title-board-bottom'>공지/게시판</span>
        <div className='menu-board-bottom'>
            <div className='menu-board-item' id={itemCss[0]} onClick={e=>{e.preventDefault();
            item_f(0)
            }}>
                <span>공지</span>
            </div>
            <div className='menu-board-item' id={itemCss[1]} onClick={e=>{e.preventDefault();
            item_f(1)
            }}>
                <span>리뷰</span>
            </div>
            <div className='menu-board-item' id="null-item-css" onClick={e=>{e.preventDefault();
            // item_f(2)
            }}>
                <span></span>
                
            </div>
            <div className='menu-board-item' id="null-item-css" onClick={e=>{e.preventDefault();
            // item_f(3)
            }}>
                
            </div>
        </div>
        {itemCss[0] !== '' && <Notice></Notice>} 
        {itemCss[1] !== '' && <Board_post />} 
        {/* {itemCss[2] !== '' && <></>}  */}
        {/* <Board_post /> */}
        {/* <Board_write /> */}
    </div>
    )
}