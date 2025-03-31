import React, { useState, useContext,useEffect } from 'react';
import {Routes, Route,Link} from "react-router-dom";
import lollogo from './images/lollogo.png'
import logo from './images/image.png'
import { MiniggContext } from './App';


const MainCon = ()=>{

    const {userName,setUserName,championRotationList,setChampionRotationList,summonerRankingList,setSummonerRankingList} = useContext(MiniggContext);
    console.log(summonerRankingList)
    return(
        <div className='main-wrap'>
            <div className='content-wrap top-content'>
                <div>
                    <div id='tcFirst'>
                        <img id='lolLogo' src={lollogo}/>
                        <p>리그 오브 레전드</p>
                    </div>
                    <div id='tcSecond'>
                        <label for="tcUserSearch">
                        <i class="fa-solid fa-magnifying-glass" ></i>
                        </label>
                        <input id='tcUserSearch' type='text' value={userName} onChange={e=>setUserName(e.target.value)} placeholder='Search'/>
                    </div>
                    <div id='tcThird'>
                        <a href='https://www.op.gg/'>op.gg 바로가기</a>
                    </div>
                </div>
            </div>
            <div className='content-wrap middle-content'>
                <div className='rotation-wrap'>
                    <p>로테이션 챔피언</p>
                    <div id='rotationChampionWrap'>
                    {championRotationList.map((championId, index) => (
                        <div className='rotation-champion' key={index}>
                            <img src={`https://ddragon.leagueoflegends.com/cdn/15.6.1/img/champion/${championId}.png`}/>
                            <p>{championId}</p>
                        </div>
                    ))}
                    </div>
                    <Link to="/2">로테이션 보기</Link>
                </div>
                <div className='ranking-wrap'>
                    <p>CHALLENGER 랭킹(소환사)</p>
                    <div>
                        {summonerRankingList.length > 0 ?(
                        <table border={1} id='rankingTable'>
                            <tr>
                                <th>#</th>
                                <th>소환사</th>
                                <th>티어</th>
                                <th>LP</th>
                                <th>레벨</th>
                                <th>승률</th>
                            </tr>
                            {summonerRankingList.map((data,index)=>(
                            <tr key={index}>
                                <td>{++index}</td>
                                <td>
                                    <div className='summonerName-wrap'>
                                        <img src={`https://ddragon.leagueoflegends.com/cdn/15.6.1/img/profileicon/${data.profileIconId}.png`}/>
                                        {data.gameName} <span>#{data.tagLine}</span>
                                    </div>
                                </td>
                                <td>{data.tier}</td>
                                <td>{data.leaguePoints}</td>
                                <td>{data.summonerLevel}</td>
                                <td>{Math.round((data.wins/(data.wins+data.losses))*100)}%</td>
                            </tr>
                            ))}
                        
                        </table>

                        ) : (
                        <div>
                            데이터가 존재하지 않습니다.
                        </div>
                        )}
                        
                    </div>
                    <Link to="/1">랭킹보기</Link>
                </div>
            </div>
            <div className='content-wrap bottom-content'>
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/ZHhqwBwmRkI?si=azu1dIjFawZ57CHI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
      </div>
    );
}

export default MainCon;