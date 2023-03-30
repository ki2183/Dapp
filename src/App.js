import {React} from 'react';
import './index.css';
import AppRouter from "./component/routers"
import Nav from './component/nav/Nav';

function App() {
 
  return (
    <div className="container_category">
      <Nav></Nav>
        <AppRouter></AppRouter>
    </div>
  );
}

export default App;
