import '../css/login.css';
import $ from 'jquery';
import pageCloseImg from '../../images/pageClose.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import cookie from 'react-cookies';

export default function Login() {
    const [userEmail, setUserEmail] = useState();
    const [userPassword, setUserPassword] = useState();
    const [userList, setUserList] = useState([]);
    const [loginStatus, setLoginStatus] = useState();

    useEffect(() => {
        getUserList();

        login();

        async function login() {
            if(loginStatus === 'null') {
                alert('모두 다 작성해주세요');
            } else if(loginStatus === 'idErr') {
                alert('아이디가 일치하지 않습니다.')
            } else if(loginStatus === 'passwordErr') {
                alert('비밀번호가 일치하지 않습니다.')
            } else if(loginStatus === 'success') {
                const {
                    data
                } = await axios.get(`/login/${userEmail}`);
                console.log(data);

                const expires = new Date()
                expires.setMinutes(expires.getMinutes() + 120)

                cookie.save('id', data[0].id, {
                    path : '/',
                    expires,
                });

                cookie.save('name', data[0].name, {
                    path : '/',
                    expires,
                });

                alert('로그인 성공')

                window.location.href='/';
                return;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginStatus]);

    const hideLoginDiv=()=> {
        $("#loginDiv").hide();
    }

    const showSignDiv=()=> {
        $("#loginDiv").hide();
        $("#signDiv").show();
    }

    const getUserList=async()=> {
        const {
            data
        } = await axios.get('/userList');
        setUserList(data);
    }

    const getUserEmail=(e)=> {
        setUserEmail(e.target.value)
    }

    const getUserPassword=(e)=> {
        setUserPassword(e.target.value)
    }

    const loginBtn=async()=> {
        for(let i = 0; i < userList.length; i++) {
            const bytes  = CryptoJS.AES.decrypt(userList[i].password, "5546")
            const decodingPw = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

            if(userEmail === undefined || userPassword === undefined) {
                setLoginStatus('null');
                return;
            };

            if(String(userList[i].email) === userEmail) {
                if(String(decodingPw) === userPassword) {
                    setLoginStatus('success');
                    return;
                } else {
                    setLoginStatus('passwordErr');
                    return;
                }
            } else {
                setLoginStatus('idErr');
            }
        }
    }

    const loginEnterKey=(e)=> {
        if(e.code === 'Enter') {
            loginBtn();
        }
    }

    return(
    <div id="loginDiv">
        <div id='loginDivHeader'>
            <img alt='' onClick={hideLoginDiv} src={pageCloseImg}></img>
        </div>

        <div id='loginDivMain'>
            <div id='loginDivMainHeader'>
                <p>로그인</p>
            </div>

            <div id='loginDivMainCenter'>
                <div id='loginDivMainCenterEmail'>
                    <p>아메일</p>

                    <input placeholder='이메일' onChange={getUserEmail}></input>
                </div>

                <div id='loginDivMainCenterPassword'>
                    <p>비밀번호</p>

                    <input onKeyDown={loginEnterKey} type='password' placeholder='비밀번호' onChange={getUserPassword}></input>
                </div>

                <div id='loginDivMainCenterLoginBtn'>
                    <div id='loginDivMainCenterLoginBtnTop'>
                        <button onClick={loginBtn}>로그인</button>
                    </div>

                    <div id='loginDivMainCenterLoginBtnBottom'>
                        <p>아직 회원이 아니신가요?</p>
                        <p onClick={showSignDiv}>회원가입</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}