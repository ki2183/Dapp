import { useEffect, useRef, useState } from "react"
import './boardTop.css'
export default function ShopSearchBar2(probs){

    const [choiceSort,setChoiceSort] = useState([])
    const inputRef = useRef(null)
    const [inputVal,setInputval] = useState(null)
    
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
            choiceSort_.push(<button key={e.info} className='shop-searchbar-sort-button unactice-sort-button' onClick={event=>{
                event.preventDefault()
                // probs.ChangeSort(e.info)
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
            <input placeholder='찾고 싶은 가게 검색' type='text'></input>
            <button onClick={empty_input}>
             <span className="material-symbols-outlined">search</span>
            </button>
        </form>
        <div className='sort-button-container '>
                {choiceSort}
        </div>
    </div>
}