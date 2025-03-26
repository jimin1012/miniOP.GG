import './css/Ranking.css'; // 랭킹 페이지의 스타일을 위한 CSS 파일 임포트
import React, { useState, useEffect } from 'react'; // React와 상태 관리 및 생명주기 훅 임포트
//import ReactPaginate from 'react-paginate'; // 페이지네이션 컴포넌트 임포트
import Pagination from 'react-js-pagination'; // 페이지네이션 컴포넌트 임포트
// Ranking 컴포넌트 정의
const Ranking = () => {
    // 상태 변수 정의
    const [ranks, setRanks] = useState([]); // 랭킹 데이터를 저장하는 상태 (소환사 리스트)
    const [pageCount, setPageCount] = useState(0); // 전체 페이지 수를 저장하는 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 (1부터 시작)
    const [loading, setLoading] = useState(false); // 데이터 로딩 상태를 나타내는 플래그
    const [error, setError] = useState(null); // 에러 메시지를 저장하는 상태
    const itemsPerPage = 5; // 페이지당 표시할 항목 수 (고정값)

    // 랭킹 데이터를 가져오는 함수
    const fetchRankInfo = (page) => {
        setLoading(true); // 데이터 로딩 시작, 로딩 상태를 true로 설정
        setError(null); // 이전 에러 초기화
        // 백엔드 API 호출 (CHALLENGER 티어, I 디비전, 지정된 페이지 데이터 요청)
        fetch(`http://localhost:8080/getSoloRankInfo?tier=CHALLENGER&division=I&page=${page}`)
            .then(response => {
                if (!response.ok) throw new Error('데이터를 불러오지 못했습니다.'); // 응답 실패 시 에러 발생
                return response.json(); // 응답을 JSON으로 파싱
            })
            .then(data => {
                console.log("API Response:", data); // API 응답 전체를 콘솔에 출력 (디버깅용)
                console.log("Entries:", data.content); // 데이터의 content 필드 출력 (소환사 리스트)
                setRanks(data.content || []); // content 필드(소환사 배열)를 ranks 상태에 저장, 없으면 빈 배열
                
                const totalEntries = data.totalElements; // 전체 소환사 수를 백엔드에서 가져옴
                console.log(totalEntries); // 전체 항목 수 출력 (디버깅용)
                setPageCount(Math.ceil(totalEntries / itemsPerPage)); // 전체 페이지 수 계산 및 설정
            })
            .catch(error => {
                console.error('Fetching ranks failed:', error); // 에러 발생 시 콘솔에 출력
                setError(error.message); // 에러 메시지를 상태에 저장
            })
            .finally(() => setLoading(false)); // 로딩 완료 후 로딩 상태를 false로 설정
    };

    // 컴포넌트 마운트 시 및 currentPage 변경 시 데이터 가져오기
    useEffect(() => {
        fetchRankInfo(currentPage); // 현재 페이지에 맞는 데이터를 가져옴
    }, [currentPage]); // currentPage가 변경될 때마다 실행

    // ranks 상태가 업데이트될 때마다 콘솔에 출력 (디버깅용)
    useEffect(() => {
        console.log("Current ranks:", ranks); // ranks 상태 확인
    }, [ranks]);

    // 페이지네이션 버튼 클릭 핸들러
    const handlePageClick = (data) => {

        console.log(data);
        setCurrentPage(data); // 선택된 페이지 번호(0부터 시작) + 1로 현재 페이지 설정

     
    };

    // 승률 계산 함수
    const calculateWinRate = (wins, losses) => {
        console.log(wins, losses); // 승리 횟수, 패배 횟수 출력 (디버깅용)
        const totalGames = wins + losses; // 총 게임 수 계산
        return totalGames > 0 ? Math.round((wins / totalGames) *100) + '%' : '0%'; // 승률 계산 후 %로 반환
        
    };

    // UI 렌더링
    return (
        <div id="rankingListWrap"> {/* 랭킹 리스트를 감싸는 컨테이너 */}
            {loading ? ( // 로딩 중일 때
                <div>로딩 중...</div>
            ) : error ? ( // 에러가 발생했을 때
                <div>오류 발생: {error}</div>
            ) : ranks.length > 0 ? ( // 데이터가 있을 때
                <>
                    <table border={1} id="rankingListTable"> {/* 랭킹 데이터를 표로 표시 */}
                        <thead>
                            <tr>
                                <th>#</th> {/* 순위 */}
                                <th>소환사</th> {/* 소환사 이름 */}
                                <th>티어</th> {/* 티어 */}
                                <th>LP</th> {/* 리그 포인트 */}
                                <th>레벨</th> {/* 소환사 레벨 */}
                                <th>승률</th> {/* 승률 */}
                            </tr>
                        </thead>
                        <tbody>
                            {ranks.map((rank, index) => ( // ranks 배열을 순회하며 행 생성
                                <tr key={index}> {/* 각 소환사 데이터 행 */}
                                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td> {/* 순위 계산 */}
                                    <td>
                                        <div className="summonerName-wrap"> {/* 소환사 이름과 아이콘 */}
                                            <img
                                                src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/profileicon/${rank.profileIconId}.png`}
                                                alt="프로필 아이콘" // 소환사 프로필 아이콘 이미지
                                            />
                                            {rank.gameName} <span>#{rank.tagLine}</span> {/* 소환사 이름과 태그 */}
                                        </div>
                                    </td>
                                    <td>{rank.tier}챌린저</td> {/* 티어 */}
                                    <td>{rank.leaguePoints} LP</td> {/* 리그 포인트 */}
                                    <td>{rank.summonerLevel}</td> {/* 소환사 레벨 */}
                                    <td>{calculateWinRate(rank.wins, rank.losses)}</td> {/* 승률 */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination // 페이지네이션 컴포넌트
                        activePage={currentPage} // 현재 페이지
                        itemsCountPerPage={itemsPerPage} // 페이지당 항목 수
                        totalItemsCount={pageCount} // 전체 항목 수
                        pageRangeDisplayed={5} // 한 번에 표시할 페이지 범위
                        onChange={handlePageClick} // 페이지 변경 시 호출되는 핸들러
                        //innerClass={'pagination'} // 페이지네이션 컨테이너 클래스
                        activeClass={'active'} // 활성 페이지 클래스
                    />
                </>
            ) : ( // 데이터가 없을 때
                <div>데이터가 존재하지 않습니다.</div>
            )}
        </div>
    );
};

export default Ranking; // 컴포넌트 내보내기