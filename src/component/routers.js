import { BrowserRouter, Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import Mainbanner from './main/Mainbanner';
import Nav from './nav/Nav';
import Usersave from './user/usersave/Usersave';
import Od from './order/order';
import UserUpdate from './user/userupdate/Userupdate';
import Category from './category/category';
import Serchbar from './search_/Searchbar';
import Login from './user/login/Login'


function Home(){
    return <div>
        <Serchbar></Serchbar>
        <Mainbanner></Mainbanner>
    </div>
}

function AppRouter(){
    return <BrowserRouter>
    <Nav/>
         <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/userSave" element={<Usersave/>}></Route>
                <Route path="/storeList/*" element={<Category />}></Route>
                <Route path="/order/*" element={<Od/>}></Route>
                <Route path='/userUpdate/*' element={<UserUpdate/>}></Route>
            </Routes>
    </BrowserRouter>
}

export default AppRouter;