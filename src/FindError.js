import './css/FindError.css';
import React, { useState, useContext,useEffect } from 'react';
import {Routes, Route,Link,useParams} from "react-router-dom";


const FindError = ()=>{

    // useParams() : URL 파라미터에 입력한 데이터를 가지고 옴
    const {summonerName} = useParams();
    return(
        <div id='findError'>
            <div>
                흐음... 검색을 잘 못 하신 거 같은데요?
                " {summonerName} " 검색 결과는 없어요
            </div>
        </div>
    );
}

export default FindError;