import { BrowserRouter, Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import Mainbanner from './main/Mainbanner';
import Nav from './nav/Nav';
import Join from './joinmember/JoinMembership';
// import Od from './order/order';
// import Infopatch from './infopatch/Infopatch';
import Category from './category/category';
import Serchbar from './search_/Searchbar';
import Login from './login/Login';

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
                <Route path="/joinmember" element={<Join/>}></Route>
                <Route path="/category/*" element={<Category />}></Route>
                {/* <Route path="/order/*" element={<Od/>}></Route> */}
                {/* <Route path='/infopatch/*' element={<Infopatch/>}></Route> */}
            </Routes>
    </BrowserRouter>
}

export default AppRouter;