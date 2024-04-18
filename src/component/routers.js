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

import "./router.css"
function Home(){
    return <div>
        <Serchbar></Serchbar>
        <Mainbanner></Mainbanner>
    </div>
}
function STORELIST(){
    return (<div className='router-frame'>
        <Nav/> 
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

function AppRouter(){

    return <BrowserRouter>
    
         <Routes>
                <Route path="/" element={<Login/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/userSave" element={<Usersave/>}></Route>
                <Route path="/storeList/*" element={<Category />}></Route>
                {/* <Route path="/storeList/*" element={<STORELIST/>}></Route> */}
                {/* <Route path="/order/*" element={<Od/>}></Route> */}
                <Route path="/order/*" element={<ORDER/>}></Route>
                <Route path='/userUpdate' element={<USERUPDATE/>}></Route>
                {/* <Route path='/userUpdate' element={<UserUpdate/>}></Route> */}
                <Route path='/AddressUpdate' element={<ADDRESSUPDATE/>}></Route>
                {/* <Route path='/AddressUpdate' element={<Addressupdate/>}></Route> */}
                <Route path='/basket' element={<Test/>}></Route>
                <Route path='/myorder' element={<ORDERINFO/>}></Route>
                {/* <Route path='/myorder' element={<OrderInfo/>}></Route> */}
                <Route path='/userremove' element={<USERREMOVE/>}></Route>

                <Route path='/totalorder' element={<TOTALORDER/>}></Route>

            </Routes>
    </BrowserRouter>
}

export default AppRouter;