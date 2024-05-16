import './css/Find.css';
import React, { useState, useContext,useEffect } from 'react';
import {Routes, Route,Link,useParams,useNavigate  } from "react-router-dom";
import UnrankedImg from './images/Unranked.png' // 언랭 이미지
import IronImg from './images/Emblem_Iron.png' // 아이언 이미지
import BronzeImg from './images/Emblem_Bronze.png' // 브론즈이미지
import SilverImg from './images/Emblem_Silver.png' // 실버 이미지
import GoldImg from './images/Emblem_Gold.png' // 골드 이미지
import PlatinumImg from './images/Emblem_Platinum.png' // 플래티넘이미지
import EmeraldImg from './images/Emblem_Emerald.png' // 에메랄드 이미지
import DiamondImg from './images/Emblem_Diamond.png' // 다이아몬드
import MasterImg from './images/Emblem_Master.png' // 마스터
import GrandmasterImg from './images/Emblem_Grandmaster.png' // 그랜드마스터
import ChallengerImg from './images/Emblem_Challenger.png' // 챌린저
import summonerSpellData from './jsonList/summonerSpell.json';
import { MiniggContext } from './App';


const Find = ()=>{

    
    let navigate = useNavigate();
    const [soloImg,setSoloImg] = useState(UnrankedImg);
    const [teamImg,setTeamImg] = useState(UnrankedImg);

    const {summonerId,setSummonerId,summoner,setSummoner} = useContext(MiniggContext);
    const [leagueInfo,setLeagueInfo] = useState([]);

    const [matches, setMatches] = useState([]); // 매치 데이터를 저장할 상태
    const [page, setPage] = useState(0); // 현재 페이지 번호
    const [teams, setTeams] = useState({ myTeam: [], enemyTeam: [] });

     // useParams() : URL 파라미터에 입력한 데이터를 가지고 옴
    const {summonerName} = useParams();
    
    let summonerLeagueInfoList = [];

    let nickName = summonerName.substring(0,summonerName.indexOf("-")).trim();
    let tag = summonerName.substring(summonerName.indexOf("-")+1);

    useEffect(() => {
        getSummonerId();
        // fetchMatches(0);
    }, []); // 컴포넌트가 마운트될 때 한 번만 getSummonerId 함수를 호출합니다.
    
    useEffect(() => {
        if (summonerId) {
            LeagueInfoList();
            fetchMatches(0);
        }
    }, [summonerId,page]); // summonerId가 변경될 때마다 LeagueInfoList를 호출합니다.
    
    // useEffect(() => {
    //     fetchMatches(0);
    // }, [page]);

    const getSummonerId = ()=>{

        fetch("http://localhost:8080/findSummoner?nickName="+nickName+"&tag="+tag)
        .then(resp=>resp.json())
        .then(res=>{
          console.log(res.responseCode);
          console.log("profileIconId : "+res.profileIconId);
          console.log(res);
        

          if(res.responseCode === 200){
            if(summonerId===undefined){
                setSummonerId(res.summonerId);

            }
            setSummoner(res);
            LeagueInfoList();
          }
       
          
        })
        .catch(e=>{console.log(e);})
    }

    const LeagueInfoList =  ()=>{
         fetch("http://localhost:8080/findLeageInfo?summonerId="+summonerId)
        .then(response=>response.json())
        .then(result=>{
            setSoloImg(UnrankedImg);
            setTeamImg(UnrankedImg);
            for (const i of result) {

                console.log(i);
                if(i.queueType ==="RANKED_SOLO_5x5"){

                    switch (i.tier) {
                        case "IRON":
                            setSoloImg(IronImg);
                            // soloImg = IronImg;
                            break;
                        case "BRONZE":
                            setSoloImg(BronzeImg);
                            // soloImg = BronzeImg;
                            break;
                        case "SILVER":
                            setSoloImg(SilverImg);
                            // soloImg = SilverImg;
                            break;
                        case "GOLD":
                            setSoloImg(GoldImg);
                            // soloImg = GoldImg;
                            break;
                        case "PLATINUM":
                            setSoloImg(PlatinumImg);
                            // soloImg = PlatinumImg;
                            break;
                        case "EMERALD":
                            setSoloImg(EmeraldImg);
                            // soloImg = EmeraldImg;
                            break;
                        case "DIAMOND":
                            setSoloImg(DiamondImg);
                            // soloImg = DiamondImg;
                            break;
                        case "MASTER":
                            setSoloImg(MasterImg);
                            // soloImg = MasterImg;
                            break;
                        case "GRANDMASTER":
                            setSoloImg(GrandmasterImg);
                            // soloImg = GrandmasterImg;
                            break;
                        case "CHALLENGER":
                            setSoloImg(ChallengerImg);
                            // soloImg = ChallengerImg;
                            break;
                        default:
                            setSoloImg(UnrankedImg);
                            // soloImg = UnrankedImg;
                            break;
                    }
                }

                if(i.queueType ==="RANKED_FLEX_SR"){
                    switch (i.tier) {
                        case "IRON":
                            setTeamImg(IronImg);
                            // soloImg = IronImg;
                            break;
                        case "BRONZE":
                            setTeamImg(BronzeImg);
                            // soloImg = BronzeImg;
                            break;
                        case "SILVER":
                            setTeamImg(SilverImg);
                            // soloImg = SilverImg;
                            break;
                        case "GOLD":
                            setTeamImg(GoldImg);
                            // soloImg = GoldImg;
                            break;
                        case "PLATINUM":
                            setTeamImg(PlatinumImg);
                            // soloImg = PlatinumImg;
                            break;
                        case "EMERALD":
                            setTeamImg(EmeraldImg);
                            // soloImg = EmeraldImg;
                            break;
                        case "DIAMOND":
                            setTeamImg(DiamondImg);
                            // soloImg = DiamondImg;
                            break;
                        case "MASTER":
                            setTeamImg(MasterImg);
                            // soloImg = MasterImg;
                            break;
                        case "GRANDMASTER":
                            setTeamImg(GrandmasterImg);
                            // soloImg = GrandmasterImg;
                            break;
                        case "CHALLENGER":
                            setTeamImg(ChallengerImg);
                            // soloImg = ChallengerImg;
                            break;
                        default:
                            setTeamImg(UnrankedImg);
                            // soloImg = UnrankedImg;
                            break;
                    }
                }
            }
            summonerLeagueInfoList= result;
            setLeagueInfo(summonerLeagueInfoList);
            
        })
        .catch(e=>{console.log(e);})
    }


    const fetchMatches =  async(page) => {
        const count = 10; // 한 번에 불러올 매치 수


        try {
            const resp = await fetch("http://localhost:8080/matchList?puuid="+summoner.puuid+"&page="+page+"&count="+count);
            if (!resp.ok) {
                throw new Error('네트워크 응답이 올바르지 않습니다.');
            }
            const res = await resp.json();
            
            const matchIds = res;
            const matchDetailsPromises = matchIds.map(matchId =>
                fetch("http://localhost:8080/matchDetail?matchId="+matchId,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8' // 서버와 통신할 때 UTF-8 인코딩 사용
                    }
                })
            
            );
    
            const matchDetailsResponses = await Promise.all(matchDetailsPromises); // await 추가
            console.log(matchDetailsResponses);
    
            const matchDetailsJsonPromises = matchDetailsResponses.map(response => response.json());
            const matchDetails = await Promise.all(matchDetailsJsonPromises); // await 추가
    
            console.log(matchDetails);

             // 각 매치에서 플레이어의 킬 수를 추출하여 상태에 추가합니다.
            const matchInfo = matchDetails.map(match => {
                const player = match.info.participants.find(participant => participant.puuid === summoner.puuid);

                console.log(match.info.participants);

                const myTeam = match.info.participants.filter(participant =>participant.teamId  === player.teamId);
                const enemyTeam = match.info.participants.filter(participant =>participant.teamId  !== player.teamId);

                console.log(myTeam);
                console.log(enemyTeam);

                // setTeams({ myTeam, enemyTeam });


                let winStr = "승리";
                let queueStr = "일반게임";
                if(player.win === true){
                    winStr = "승리";
                }else{
                    winStr = "패배";
                }

                if(match.info.queueId === 420) queueStr = "개인/2인 랭크";
                if(match.info.queueId === 430) queueStr = "일반게임";
                if(match.info.queueId === 440) queueStr = "자유 5:5 랭크";
                if(match.info.queueId === 450) queueStr = "무작위 총력전";
                if(match.info.queueId === 1700) queueStr = "아레나";

               
                let minutes = Math.floor(match.info.gameDuration / 60); // 분 (소수점 이하 내림)
                let seconds = match.info.gameDuration % 60; // 남은 초

               

                let spell1 = "";
                let spell2 = "";
                for (const key in summonerSpellData.data) {

                   if(Number(summonerSpellData.data[key].key) === player.summoner1Id){
                        spell1 = summonerSpellData.data[key].id;
                   }

                   if(Number(summonerSpellData.data[key].key) === player.summoner2Id){
                        spell2 = summonerSpellData.data[key].id;
                   }


                }

            
                return { 
                    matchId: match.metadata.matchId, 
                    kills: player.kills,
                    deaths : player.deaths,
                    assists : player.assists,
                    item0 : player.item0,
                    item1 : player.item1,
                    item2 : player.item2,
                    item3 : player.item3,
                    item4 : player.item4,
                    item5 : player.item5,
                    item6 : player.item6,
                    gameDuration : minutes+"분"+seconds+"초",
                    championName : player.championName,
                    win : winStr,
                    summoner1Id : spell1,
                    summoner2Id : spell2,
                    queueId : queueStr,
                    myTeam : myTeam,
                    enemyTeam : enemyTeam,
                 };
            });
    

            console.log(matchInfo);
            setMatches((prev) => [...prev, ...matchInfo]); // 기존 데이터에 새로운 데이터 추가
        } catch(e) {
            console.log(e);
            console.error("매치 정보를 가져오는 중 오류가 발생했습니다:", e);
        }

      
    }

       


    console.log(matches);

    return(
        <section>
            <div id='findSummonerWrap'>
                <div>
                    <div id='findSummonerInfoWrap'>
                        <div id='summonerProfileIcon'>
                            {summoner !== "" && (
                            <img src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/profileicon/${summoner.profileIconId}.png`}/>
                            )}
                        </div>
                        <div id='summonerInfo'>
                            {summoner !== "" && (
                                <div id='summonerLevel'>
                                    레벨 : {summoner.summonerLevel}
                                </div>
                            )}
                            <div>
                                {nickName} <span>#{tag}</span>
                            </div>
                            <div id='summonerTierWrap'>
                                <div id='soloRank'>
                                    <p className='rank-division'>솔로랭크</p>
                                    {leagueInfo.length > 0 && leagueInfo[0] !== undefined ?(
                                    <div id='soloRankInfo'>
                                        <img src={soloImg}/>
                                        <div>
                                            {leagueInfo.length > 0 && leagueInfo[0].queueType ==="RANKED_SOLO_5x5" ? (
                                                <p className='tier'>{leagueInfo[0].tier} {leagueInfo[0].rank}</p>
                                            ) : (
                                                <p className='tier'>{leagueInfo[1].tier} {leagueInfo[1].rank}</p>
                                            )}
                                            {leagueInfo.length > 0  &&  leagueInfo[0].queueType ==="RANKED_SOLO_5x5" ?(
                                                  <p>{leagueInfo[0].leaguePoints}LP</p>
                                            ) : (
                                                <p>{leagueInfo[1].leaguePoints}LP</p>
                                            )}
                                        </div>
                                        {leagueInfo.length > 0 && leagueInfo[0].queueType ==="RANKED_SOLO_5x5" ?(
                                            <div>
                                                <p>{leagueInfo[0].wins}승 {leagueInfo[0].losses}패</p>
                                                <p> 승률 {Math.round(leagueInfo[0].wins/(leagueInfo[0].wins+leagueInfo[0].losses)*100)}%</p>
                                            </div>   
                                        ) :(
                                            <div>
                                                <p>{leagueInfo[1].wins}승 {leagueInfo[1].losses}패</p>
                                                <p> 승률 {Math.round(leagueInfo[1].wins/(leagueInfo[1].wins+leagueInfo[1].losses)*100)}%</p>
                                            </div> 
                                        )}      
                                    </div>
                                    ) : (
                                    <div id='soloRankInfo'>
                                        <img src={soloImg}/>
                                        <p className='tier'>Unranked</p>
                                    </div>
                                    )}

                                </div>
                                <div id='teamRank'>
                                    <p className='rank-division'>자유랭크</p>
                                    {leagueInfo.length > 0 && leagueInfo[1] !== undefined  ? (
                                    <div id='teamRankInfo'>
                                        <img src={teamImg}/>
                                        <div>
                                            {leagueInfo.length > 0  && leagueInfo[1].queueType === "RANKED_FLEX_SR" ?(
                                                <p className='tier'>{leagueInfo[1].tier} {leagueInfo[1].rank}</p>
                                            ) : (
                                                <p className='tier'>{leagueInfo[0].tier} {leagueInfo[0].rank}</p>
                                            )}
                                            {leagueInfo.length > 0  && leagueInfo[1].queueType ==="RANKED_FLEX_SR" ?(
                                                <p>{leagueInfo[1].leaguePoints}LP</p>
                                            ) : (
                                                <p>{leagueInfo[0].leaguePoints}LP</p>
                                            )}
                                        </div>
                                        {leagueInfo.length > 0  && leagueInfo[1].queueType ==="RANKED_FLEX_SR" ?(
                                            <div>
                                                <p>{leagueInfo[1].wins}승 {leagueInfo[1].losses}패</p>
                                                <p> 승률 {Math.round(leagueInfo[1].wins/(leagueInfo[1].wins+leagueInfo[1].losses)*100)}%</p>
                                            </div>   
                                        ) : (
                                            <div>
                                                <p>{leagueInfo[0].wins}승 {leagueInfo[0].losses}패</p>
                                                <p> 승률 {Math.round(leagueInfo[0].wins/(leagueInfo[0].wins+leagueInfo[0].losses)*100)}%</p>
                                            </div> 
                                        )}       
                                    </div>
                                    ) : (
                                    <div id='teamRankInfo'>
                                        <img src={teamImg}/>
                                        <p className='tier'>Unranked</p>
                                    </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id='findSummonerMatchInfoWrap'>
                        {/* <div className='matchs'>
                            <div className='matchs-first-info'>
                                <p>무작위 총력전</p>
                                <p>패배</p>
                                <p>21분3초</p>
                            </div>
                            <div className='matchs-second-info'>
                                <img className='pick-champion-img' src='https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/Aatrox.png'/>
                                <div>
                                    <img className='spell-first' src='https://ddragon.leagueoflegends.com/cdn/14.9.1/img/spell/SummonerFlash.png'/>
                                    <img className='spell-second' src='https://ddragon.leagueoflegends.com/cdn/14.9.1/img/spell/SummonerFlash.png'/>
                                </div>
                                <div>
                                    11/12/12
                                </div>
                            </div>
                            <div className='matchs-third-info'>
                                <img src='https://ddragon.leagueoflegends.com/cdn/14.9.1/img/item/1001.png' onerror="this.onerror=null; this.src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fnamu.wiki%2Fw%2F%25EB%25B6%2584%25ED%2599%258D%25EC%2583%2589%3Frev%3D362&psig=AOvVaw1kbitHh1rfWNSIhyB_YV4-&ust=1715423875579000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCPjJvIjygoYDFQAAAAAdAAAAABAE';"/>
                                <img src='https://ddragon.leagueoflegends.com/cdn/14.9.1/img/item/1001.png' onerror="this.onerror=null; this.src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fnamu.wiki%2Fw%2F%25EB%25B6%2584%25ED%2599%258D%25EC%2583%2589%3Frev%3D362&psig=AOvVaw1kbitHh1rfWNSIhyB_YV4-&ust=1715423875579000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCPjJvIjygoYDFQAAAAAdAAAAABAE';"/>
                                <img src='https://ddragon.leagueoflegends.com/cdn/14.9.1/img/item/1001.png' onerror="this.onerror=null; this.src='대체 이미지 주소';"/>
                                <img src='https://ddragon.leagueoflegends.com/cdn/14.9.1/img/item/1001.png' onerror="this.onerror=null; this.src='대체 이미지 주소';"/>
                                <img src='https://ddragon.leagueoflegends.com/cdn/14.9.1/img/item/1001.png' onerror="this.onerror=null; this.src='대체 이미지 주소';"/>
                                <img src='https://ddragon.leagueoflegends.com/cdn/14.9.1/img/item/0.png' />
                                <img src='https://ddragon.leagueoflegends.com/cdn/14.9.1/img/item/1001.png' />
                            </div>
                            <div className='matchs-fourth-info'>
                                <table>
                                    <tr>
                                        <td>
                                            <img src='https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/Aatrox.png'/>
                                            <span>소환사1</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src='https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/Aatrox.png'/>
                                            <span>소환사2</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src='https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/Aatrox.png'/>
                                            <span>소환사3</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src='https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/Aatrox.png'/>
                                            <span>소환사4</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src='https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/Aatrox.png'/>
                                            <span>소환사5</span>
                                        </td>
                                    </tr>
                                </table>
                                <table>
                                <tr>
                                        <td>
                                            <img src='https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/Aatrox.png'/>
                                            <span>소환사6</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src='https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/Aatrox.png'/>
                                            <span>소환사7</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src='https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/Aatrox.png'/>
                                            <span>소환사8</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src='https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/Aatrox.png'/>
                                            <span>소환사9</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src='https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/Aatrox.png'/>
                                            <span>소환사10</span>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div> */}
                        

                        {matches.map((data,index)=>(
                        <div className='matchs'>

                    
                            <div className='matchs-first-info'>
                                <p>{data.queueId}</p>
                                <p>{data.win}</p>
                                <p>{data.gameDuration}</p>
                            </div>
                            <div className='matchs-second-info'>
                                <img className='pick-champion-img' src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/${data.championName}.png`}/>
                                <div>
                                    <img className='spell-first' src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/spell/${data.summoner1Id}.png`}/>
                                    <img className='spell-second' src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/spell/${data.summoner2Id}.png`}/>
                                </div>
                                <div>
                                    {data.kills} / {data.deaths} / {data.assists}
                                </div>
                            </div>
                            <div className='matchs-third-info'>
                                <img src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/item/${data.item0}.png`} onError={e => e.target.src='https://img.freepik.com/premium-photo/color-background-for-presentations-decorative-design-layout-template-insert-text-with-copy-space_7954-5787.jpg'}/>
                                <img src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/item/${data.item1}.png`} onError={e => e.target.src='https://img.freepik.com/premium-photo/color-background-for-presentations-decorative-design-layout-template-insert-text-with-copy-space_7954-5787.jpg'}/>
                                <img src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/item/${data.item2}.png`} onError={e => e.target.src='https://img.freepik.com/premium-photo/color-background-for-presentations-decorative-design-layout-template-insert-text-with-copy-space_7954-5787.jpg'}/>
                                <img src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/item/${data.item3}.png`} onError={e => e.target.src='https://img.freepik.com/premium-photo/color-background-for-presentations-decorative-design-layout-template-insert-text-with-copy-space_7954-5787.jpg'}/>
                                <img src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/item/${data.item4}.png`} onError={e => e.target.src='https://img.freepik.com/premium-photo/color-background-for-presentations-decorative-design-layout-template-insert-text-with-copy-space_7954-5787.jpg'}/>
                                <img src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/item/${data.item5}.png`} onError={e => e.target.src='https://img.freepik.com/premium-photo/color-background-for-presentations-decorative-design-layout-template-insert-text-with-copy-space_7954-5787.jpg'}/>
                                <img src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/item/${data.item6}.png`} onError={e => e.target.src='https://img.freepik.com/premium-photo/color-background-for-presentations-decorative-design-layout-template-insert-text-with-copy-space_7954-5787.jpg'}/>
                            </div>
                            {10===10 && (
                                <div className='matchs-fourth-info'>
                                    <table className='myTeamTable'>
                                        <tr>
                                            <td>
                                                <img src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/${data.myTeam[0].championName}.png`}/>
                                                <span>{data.myTeam[0].riotIdGameName}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/${data.myTeam[1].championName}.png`}/>
                                                <span>{data.myTeam[1].riotIdGameName}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/${data.myTeam[2].championName}.png`}/>
                                                <span>{data.myTeam[2].riotIdGameName}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/${data.myTeam[3].championName}.png`}/>
                                                <span>{data.myTeam[3].riotIdGameName}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/${data.myTeam[4].championName}.png`}/>
                                                <span>{data.myTeam[4].riotIdGameName}</span>
                                            </td>
                                        </tr>
                                    </table>
                                    <table className='enemyTeamTable'>
                                    <tr>
                                            <td>
                                                <img src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/${data.enemyTeam[0].championName}.png`}/>
                                                <span>{data.enemyTeam[0].riotIdGameName}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/${data.enemyTeam[1].championName}.png`}/>
                                                <span>{data.enemyTeam[1].riotIdGameName}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/${data.enemyTeam[2].championName}.png`}/>
                                                <span>{data.enemyTeam[2].riotIdGameName}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/${data.enemyTeam[3].championName}.png`}/>
                                                <span>{data.enemyTeam[3].riotIdGameName}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/${data.enemyTeam[4].championName}.png`}/>
                                                <span>{data.enemyTeam[4].riotIdGameName}</span>
                                            </td>
                                        </tr>
                                    </table>
                                </div>



                            )}
                           
                        </div>


                        ))}
                        {/* 반복될 거 끝 */}


                        <div>
                            <button id='findPlusBtn' onClick={() => {
                                setPage((prev) => prev + 1); // 페이지 상태 업데이트
                                fetchMatches(page + 1); // 다음 페이지 데이터 불러오기
                            }}>
                                더보기
                            </button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Find;