import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../src/header/js/header.js'
import Main from './main/js/main.js';
import Search from './search/js/search.js';
import ViewDetail from './viewDetail/js/viewDetail.js';
import Sell from './sell/js/sell.js';
import MyPage from './myPage/js/myPage.js';

export default function App() {
  return(
    <div id='app'>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/search' element={<Search/>}></Route>
          <Route path='/sell' element={<Sell/>}></Route>
          <Route path='/detailCar' element={<ViewDetail/>}></Route>
          <Route path='/myPage' element={<MyPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}