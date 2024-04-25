import './css/App.css';
import lollogo from './images/lollogo.png'
import logo from './images/image.png'
import React, { useState, useContext,useEffect } from 'react';
import {Routes, Route,Link} from "react-router-dom";
function App() {
  const apiKey = "RGAPI-34d74300-b044-4e5d-b177-cd9bdd775bfa";
  const url ="https://asia.api.riotgames.com";

  const [topUserName,setTopUserName] = useState("");
  const [userName,setUserName] = useState("");


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://kit.fontawesome.com/0ddb604158.js";
    script.crossorigin = "anonymous";
    document.body.appendChild(script);
  });


  const handleChange = (e) => {
    setTopUserName(e.target.value)
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log('Enter key pressed!');
      event.preventDefault();

      console.log(topUserName.substring(topUserName.indexOf("#")+1));
      console.log(topUserName.substring(0,topUserName.indexOf("#")).trim());

      let nickName = topUserName.substring(0,topUserName.indexOf("#")).trim();
      let tag = topUserName.substring(topUserName.indexOf("#")+1);

      fetch(url+"/riot/account/v1/accounts/by-riot-id/"+nickName+"/"+tag+"?api_key="+apiKey)
      .then(res=>res.text())
      .then(result=>{
        console.log(result);
      })
      .catch(err=>{console.log(err);})

    }
  };

  return (
    <main>
      <header>
        <section>
            <div className='search-wrap'>
              <label for="userSearch">
                <i class="fa-solid fa-magnifying-glass" style={{color: "#FFD43B;"}}></i>
              </label>
              <input id='userSearch' type='text' value={topUserName} onChange={handleChange}  onKeyDown={handleKeyPress} placeholder='Search'/>
            </div>
          
            <button type='button' id='LanguageChange'>한국어</button>
        </section>
        <section>
          <ul id='nav'>
              <li><img id='lolLogo' src={lollogo}/></li>
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
                  <img id='lolLogo' src={lollogo}/>
                  <p>리그 오브 레전드</p>
                </div>
                <div id='tcSecond'>
                    <label for="tcUserSearch">
                      <i class="fa-solid fa-magnifying-glass" style={{color: "#FFD43B;"}}></i>
                    </label>
                    <input id='tcUserSearch' type='text' value={userName} onChange={e=>setUserName(e.target.value)} placeholder='Search'/>
                </div>
                <div id='tcThird'>
                    <a href='https://www.op.gg/'>op.gg 바로가기</a>
                </div>
            </div>
        </div>
        <div className='content-wrap middle-content'>
          
        </div>
        <div className='content-wrap bottom-content'>
          
        </div>

      </div>

      <footer>
        <div>
          <div id='ftFirst' className='ft-wrap'>
            <img src={logo}/>
            <a href=''>포트폴리오</a>
          </div>
          <div id='ftSecond' className='ft-wrap'>
            <ul className='ft-ul'>
              <li>경력</li>
              <li>(주)와임</li>
              <li>티쿤글로벌</li>
            </ul>
          </div>
          <div id='ftThird' className='ft-wrap'>
            <ul className='ft-ul'>
              <li>자격증</li>
              <li>정보처리산업기사</li>
              <li>웹디자인기능사</li>
              <li>정보처리기능사</li>
              <li>ITQ 아래한글 A</li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
