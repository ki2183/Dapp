import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Mainbanner from './main/Mainbanner';
import Nav from './nav/Nav';
import Usersave from './user/usersave/Usersave';
import Od from './order/order';
import UserUpdate from './user/userupdate/Userupdate';
import Category from './category/category';
import Serchbar from './search_/Searchbar';
import Login from './user/login/Login'
import Addressupdate from './user/addresupdate/addressupdate';
import Test from './test';
import OrderInfo from './myorderinfo/orderinfo';
import UserRemove from './user/userremove/userremove';
import TotalOrder from './totalorder/totalorder';
import Coupon from './coupon/coupon';
import AddRessInfo from './user/addressinfo/addressinfo';
// import Test2 from './test';
import Board from './board/board';
import Board_view from './board_view/board_view';
import BoardEdit from './board/board_edit/boardEdit';
import BoardWrite from './board/board_write/boardwrite';

import "./router.css"
function Home(){
    return <div>
        <Serchbar></Serchbar>
        <Mainbanner></Mainbanner>
    </div>
}
function STORELIST(){
    return (<div className='router-frame'>
        <Nav rec={true}/> 
        <Category />
    </div>)
}
function ORDER(){
    return (<div className='router-frame'>
        <Nav/> 
        <Od/>
    </div>)
}function USERUPDATE(){
    return (<div className='router-frame'>
        <Nav/> 
        <UserUpdate/>
    </div>)
}function ADDRESSUPDATE(){
    return (<div className='router-frame'>
        <Nav/> 
        <Addressupdate/>
    </div>)
}function ORDERINFO(){
    return (<div className='router-frame'>
        <Nav/> 
        <OrderInfo/>
    </div>)
}function USERREMOVE(){
    return (<div className='router-frame'>
       <Nav/> 
        <UserRemove/>
    </div>)
}function TOTALORDER(){
    return (<div className='router-frame'>
       <Nav/> 
        <TotalOrder/>
    </div>)
}
function COUPON(){
    return (<div className='router-frame'>
       <Nav/> 
        <Coupon/>
    </div>)
}
function ADDRESSINFO(){
    return (<div className='router-frame'>
    <Nav/> 
     <AddRessInfo/>
 </div>)
}
function BOARDSERICE(){
    return (<div className='router-frame'>
         <Nav rec={true}/> 
        <Board/>
 </div>)
}
function BOARDVIEW(){
    return (<div className='router-frame'>
         <Nav rec={true}/> 
        <Board_view/>
 </div>)
}
function BOARDEDIT(){
    return (<div className='router-frame'>
         <Nav rec={true}/> 
        <BoardEdit/>
 </div>)
}
function BOARDWRITE(){
    return (<div className='router-frame'>
         <Nav rec={true}/> 
        <BoardWrite/>
 </div>)
}



function AppRouter(){

    return <BrowserRouter>
    
         <Routes>
                <Route path="/" element={<STORELIST/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/userSave" element={<Usersave/>}></Route>
                <Route path="/storeList/*" element={<STORELIST/>}></Route>
                <Route path="/order/*" element={<ORDER/>}></Route>
                <Route path='/userUpdate' element={<USERUPDATE/>}></Route>
                <Route path='/addressUpdate' element={<ADDRESSUPDATE/>}></Route> 
                <Route path='/basket' element={<Test/>}></Route>
                <Route path='/myorder' element={<ORDERINFO/>}></Route>
                <Route path='/userremove' element={<USERREMOVE/>}></Route>
                <Route path='/totalorder' element={<TOTALORDER/>}></Route>
                <Route path='/mycoupons' element={<Coupon/>}></Route>
                <Route path='/addressinfo' element={<AddRessInfo/>}></Route>
                <Route path='/board' element={<BOARDSERICE/>}></Route>
                <Route path='/notice' element={<BOARDVIEW/>}></Route>
                <Route path='/boardedit' element={<BOARDEDIT/>}></Route>
                <Route path='/boardwrite' element={<BOARDWRITE/>}></Route>
                {/* <Route path='/test2' element={<TEST2 />}></Route> */}

            </Routes>
    </BrowserRouter>
}

export default AppRouter;