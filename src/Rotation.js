import './css/Rotation.css';
import React, { useState, useContext,useEffect } from 'react';
import {Routes, Route,Link} from "react-router-dom";
import { MiniggContext } from './App';
import championsData from './jsonList/champions.json';

const Rotation = ()=>{
    const {userName,setUserName,championRotationList,setChampionRotationList,summonerRankingList,setSummonerRankingList} = useContext(MiniggContext);

    let matchedblurbs = [];

    for (const id of championRotationList) {
        if (championsData.data[id]) {
            matchedblurbs.push(championsData.data[id].blurb);
        }
      }

    return(
        <section>
            <div id='rotationWrap'>
                <div>
                    <table>
                        <tr>
                            <th>로테이션 챔피언 명</th>
                            <th>챔피언 설명</th>
                        </tr>
                
                        {championRotationList.map((championId, index) => (
                            <tr key={index}>
                                <td>
                                    <div>
                                        <img src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/${championId}.png`}/>
                                        <span>{championId}</span>
                                    </div>
                                </td>
                                <td className='matchedblurbs'>
                                    {matchedblurbs[index]}
                                </td>
                            </tr>
                        ))}
                
                    </table>
                </div>
            </div>
        </section>
    );
}

export default Rotation;