import './css/Ranking.css';
import React, { useState, useContext,useEffect } from 'react';
import {Routes, Route,Link} from "react-router-dom";
import ReactPaginate from 'react-paginate';
const Ranking = ()=>{

    const [ranks, setRanks] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);


    const fetchRankInfo = (currentPage) => {
        fetch(`http://localhost:8080/getSoloRankInfo?tier=CHALLENGER&division=I&page=${currentPage}`)
            .then(response => response.json()) // axios와 달리 fetch는 자동으로 JSON 변환을 하지 않으므로, 수동으로 변환해주어야 합니다.
            .then(data => {

                console.log(data);
                setRanks(data);
                // 페이지 카운트 설정, 예를 들어 API나 다른 방법으로 받아온다고 가정
                // setPageCount(10); // 총 페이지 수 설정
                setPageCount(Math.ceil(300 / 100));
            })
            .catch(error => console.error('Fetching ranks failed:', error));
    };

    useEffect(() => {
        fetchRankInfo(currentPage);
    }, [currentPage]);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    };

    return(
        <>
            <div id='rankingListWrap'>
                <div>
                    {ranks.length > 0 ?(
                    <table border={1} id='rankingListTable'>
                        <tr>
                            <th>#</th>
                            <th>소환사</th>
                            <th>티어</th>
                            <th>LP</th>
                            <th>레벨</th>
                            <th>승률</th>
                        </tr>
                        {ranks.map((rank,index) => (
                        <tr key={index}>
                            <td>{++index}</td>
                            <td>
                                <div className='summonerName-wrap'>
                                    <img src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/profileicon/${rank.profileIconId}.png`}/>
                                    {rank.gameName} <span>#{rank.tagLine}</span>
                                </div>
                            </td>
                            <td>{rank.tier}</td>
                            <td>{rank.leaguePoints}</td>
                            <td>{rank.summonerLevel}</td>
                            <td>{rank.gameName}</td>
                        </tr>
                        ))}
                       
                    </table>
                    ):(
                    <div>
                        데이터가 존재하지 않습니다.
                    </div>
                    )}
                    
                </div>
                <div>
                    <ReactPaginate
                            previousLabel={'이전'}
                            nextLabel={'다음'}
                            breakLabel={'...'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                    />
                </div>
            </div>
        </>
    );
}

export default Ranking;