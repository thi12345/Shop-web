
import Navbar from './Components/Navbar/Navbar';
import './App.css';
import {Routes, BrowserRouter, Route} from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
function App() {
  return (
    <div >
      <BrowserRouter>
        <Navbar />
        <Routes>
          
          <Route path='/' element={<Shop/>}/>
          <Route path='/men' element={<ShopCategory category="men"/>}/>
          <Route path='/womens' element={<ShopCategory category="women"/>} />
          <Route path='/kid' element={<ShopCategory category="kids"/>} />
          <Route path='/product' element={<Product/>} />
          <Route path=':productId' element={<Product/>}/>
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup/>}/>
          
        </Routes>
      </BrowserRouter>
     
     
    </div>
  );
}

export default App;
