import './css/App.css';
import lollogo from './images/lollogo.png'
import logo from './images/image.png'
import React, { useState, useContext,useEffect,createContext } from 'react';
import {Routes, Route,Link,useNavigate} from "react-router-dom";

import championsData from './jsonList/champions.json'; // champions.json 파일의 경로에 맞게 조정

import Footer from './Footer';
import MainCon from './MainContent';
import Ranking from './Ranking';
import Rotation from './Rotation';
import Find from './Find';
import FindError from './FindError';

export const MiniggContext = createContext(); // 전역변수 생성

function App() {
  const [topUserName,setTopUserName] = useState("");
  const [userName,setUserName] = useState("");
  const [championRotationList,setChampionRotationList] = useState([]);
  const [summonerRankingList,setSummonerRankingList] = useState([]);
  const [summonerId,setSummonerId] = useState();
  const [summoner, setSummoner] = useState("");

  /* 페이지 이동 시 */
  const navigate = useNavigate();


  const rotationList = ()=>{
    fetch("http://localhost:8080/championRotationList")
    .then(resp=>resp.json())
    .then(res=>{
        
      setChampionRotationList(Object.keys(championsData.data).filter(championName => 
        res.freeChampionIds.includes(parseInt(championsData.data[championName].key))
      ));

    })
    .catch(e=>{console.log(e);})

  }

  const leagueRankingList = ()=>{
    fetch("http://localhost:8080/LeagueRanking")
    .then(resp=>resp.json())
    .then(res=>{
      setSummonerRankingList(res);
    })
    .catch(e=>{console.log(e);})

  }
  


  useEffect(() => {
    // 아이콘 받을라고 라이브러리 추가한거임
    const script = document.createElement("script");
    script.src = "https://kit.fontawesome.com/0ddb604158.js";
    script.crossorigin = "anonymous";
    document.body.appendChild(script);
    rotationList();
    leagueRankingList();
  },[]);

  

  


  const handleChange = (e) => {
    setTopUserName(e.target.value)
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      console.log(topUserName.substring(topUserName.indexOf("#")+1));
      console.log(topUserName.substring(0,topUserName.indexOf("#")).trim());

      let nickName = topUserName.substring(0,topUserName.indexOf("#")).trim();
      let tag = topUserName.substring(topUserName.indexOf("#")+1);

      
      fetch("http://localhost:8080/findSummoner?nickName="+nickName+"&tag="+tag)
      .then(resp=>resp.json())
      .then(res=>{
          console.log(res.responseCode);
          console.log(res);

          if(res.responseCode === 200){
            setSummoner(res);
            setSummonerId(res.summonerId);
            navigate("/find/"+nickName+"-"+tag);
           
          }else{
            navigate("/find/error/"+topUserName);
          }
          setTopUserName("");
      })
      .catch(e=>{console.log(e);})


    }
  };

  return (
    <MiniggContext.Provider value={{userName,setUserName,championRotationList,setChampionRotationList,summonerRankingList,setSummonerRankingList,summonerId,setSummonerId,summoner,setSummoner}}>
      <main>
        <header>
          <section>
              <div className='search-wrap'>
                <label for="userSearch">
                  <i class="fa-solid fa-magnifying-glass" ></i>
                </label>
                <input id='userSearch' type='text' value={topUserName} onChange={handleChange}  onKeyDown={handleKeyPress} placeholder='Search'/>
              </div>
            
              <button type='button' id='LanguageChange'>한국어</button>
          </section>
          <section>
            <ul id='nav'>
                <li><img id='lolLogo' src={lollogo}/></li>
                <li><Link to="/">홈</Link></li>
                <li><Link to="/1">랭킹</Link></li>
                <li><Link to="/2">로테이션</Link></li>
            </ul>
          </section>
        </header>
        <Routes>
          {/* 메인화면 */}
          <Route path='/' element={<MainCon/>}/>
          <Route path='1' element={<Ranking/>}/>
          <Route path='2' element={<Rotation/>}/>

          <Route path='/find/:summonerName' element={<Find/>}/>
          <Route path='/find/error/:summonerName' element={<FindError/>}/>
          {/* 잘못된 요청일 경우 */}
          <Route path='*' element={<div className='error-page'>존재하지 않는 페이지입니다.</div>}/>
        </Routes>

        <Footer/>
      </main>
    </MiniggContext.Provider>
  );
}

export default App;
