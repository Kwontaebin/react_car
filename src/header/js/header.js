import '../css/header.css';
import Sign from './sign';
import Login from './login';
import '../css/login.css';
import $ from 'jquery';
import MainLogo from '../../images/mainLogo.png';
import SearchImg from '../../images/headerSearchBtn.png';
import { useEffect, useState } from 'react';
import cookie from 'react-cookies';
import * as  LocalStorage from '../../search/js/LocalStrage';

export default function Header() {
    const [carModel, setCarModel] = useState(null);

    useEffect(() => {
        let userId = cookie.load('id');

        if(userId === undefined) {
            $("#myPage").addClass('hideText')
            $("#textLogout").addClass('hideText')

            $("#textLogin").removeClass('hideText')
            $("#textSign").removeClass('hideText')
        } else {
            $("#textLogin").addClass('hideText')
            $("#textSign").addClass('hideText')

            $("#myPage").removeClass('hideText')
            $("#textLogout").removeClass('hideText')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const goSignPage=()=> {
        $("#loginDiv").hide();
        $("#signDiv").show();
    }

    const goLoginPage=()=> {
        $("#signDiv").hide();
        $("#loginDiv").show();
    }

    const getCarModel=(e)=> {
        setCarModel(e.target.value);
    }

    const searchBtn=(e)=> {
        if(e.key === 'Enter') {
            console.log(carModel)
            window.location.href=`/search?model=${carModel}&ie=utf-8`;
            window.localStorage.clear();
            LocalStorage.LocalStorage();
        }
    }

    const searchImgBtn=()=> {
        console.log(carModel)
        window.location.href=`/search?model=${carModel}&ie=utf-8`;
        window.localStorage.clear();
        LocalStorage.LocalStorage()
    }

    const goMainPage=()=> {
        window.location.href='/';
    }

    const goSearchPage=()=> {
        window.location.href='/search';
    }

    const goCarSellPage=()=> {
        window.location.href='/sell';
    }

    const goMyPage=()=> {
        window.location.href='/myPage';
    }

    const textLogout=()=> {
        cookie.remove('id', {path : '/'},1000)
        cookie.remove('name', {path : '/'},1000)
        alert('로그아웃!');
        window.location.href='/';
    }

    return(
        <div id='header'>
            <div id='headerTop'>
                <div id='headerTopInner'>
                    <div id='headerTopInnerLeft'>
                        <p id='textLogin' onClick={goLoginPage}>로그인</p>
                        <p className='hideText' id='myPage' onClick={goMyPage}>내정보</p>
                    </div>

                    <div id='headerTopInnerRight'>
                        <p id='textSign' onClick={goSignPage}>회원가입</p>
                        <p className='hideText' id='textLogout' onClick={textLogout}>로그아웃</p>
                    </div>
                </div>
            </div>

            <div id='headerBottom'>
                <img alt='' src={`${MainLogo}`} onClick={goMainPage}></img>

                <input placeholder='차량을 검색하세요' onChange={getCarModel} onKeyDown={searchBtn}></input>

                <img alt='' src={SearchImg} id='searchImgBtn' onClick={searchImgBtn}></img>

                <p onClick={goSearchPage}>내차사기</p>
                <p onClick={goCarSellPage}>내차팔기</p>
            </div>

            <Sign></Sign>
            <Login></Login>
        </div>
    )
}