import './css/Footer.css';
import React, { useState, useContext,useEffect } from 'react';
import {Routes, Route,Link} from "react-router-dom";
import lollogo from './images/lollogo.png'
import logo from './images/image.png'

const Footer = ()=>{
    return(
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
                    <li>정보처리기사 (필기)</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;