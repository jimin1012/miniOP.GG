import './css/App.css';
import logo from './images/lollogo.png'
import React, { useState, useContext,useEffect } from 'react';
import {Routes, Route,Link} from "react-router-dom";
function App() {

  const [userName,setUserName] = useState("");
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://kit.fontawesome.com/0ddb604158.js";
    script.crossorigin = "anonymous";
    document.body.appendChild(script);
  });
  return (
    <main>
      <header>
        <section>
            <div className='search-wrap'>
              <label for="userSearch">
                <i class="fa-solid fa-magnifying-glass" style={{color: "#FFD43B;"}}></i>
              </label>
              <input id='userSearch' type='text' value={userName} onChange={e=>setUserName(e.target.value)} placeholder='Search'/>
            </div>
          
            <button type='button' id='LanguageChange'>한국어</button>
        </section>
        <section>
          <ul id='nav'>
              <li><img id='lolLogo' src={logo}/></li>
              <li><Link to="/">홈</Link></li>
              <li><Link to="/1">챔피언</Link></li>
              <li><Link to="/2">티어리스트</Link></li>
              <li><Link to="/3">랭킹</Link></li>
          </ul>
        </section>
      </header>

      <div className='main-wrap'>
        <div className='content-wrap top-content'>
            <div>
                <div id='tcFirst'>
                  <img id='lolLogo' src={logo}/>
                  <p>리그 오브 레전드</p>
                </div>
                <div id='tcSecond'>
                    <label for="userSearch">
                      <i class="fa-solid fa-magnifying-glass" style={{color: "#FFD43B;"}}></i>
                    </label>
                    <input id='userSearch' type='text' value={userName} onChange={e=>setUserName(e.target.value)} placeholder='Search'/>
                </div>
            </div>
        </div>
        <div className='content-wrap middle-content'>
          
        </div>
        <div className='content-wrap bottom-content'>
          
        </div>

      </div>

      <footer>

      </footer>
    </main>
  );
}

export default App;
