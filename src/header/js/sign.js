import '../css/sign.css'
import $ from 'jquery';
import pageCloseImg from '../../images/pageClose.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

export default function Sign() {
    const [userNmae, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [userPassword, setUserPassword] = useState();
    const [userPasswordCheck, setUserPasswordCheck] = useState();
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        getUserList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getUserList=async()=> {
        const {
            data
        } = await axios.get('/userList');
        setUserList(data);
    }

    const hideSignDiv=()=> {
        $("#signDiv").hide();
    }

    const getNameValue=(e)=> {
        setUserName(e.target.value);
    }
    
    const getEmailValue=(e)=> {
        setUserEmail(e.target.value)
    }

    const getPasswordValue=(e)=> {
        setUserPassword(e.target.value)
    }
    
    const getPasswordCheckValue=(e)=> {
        setUserPasswordCheck(e.target.value)
    }

    const signBtn=async()=> {
        const hashPw = CryptoJS.AES.encrypt(userPassword, "5546").toString();

        if(userList.length === 0) {
            const signObj = { email:userEmail, password:hashPw, name:userNmae };
            const result = await axios.post('/sign', signObj);
            console.log(result);
            alert('회원가입 성공');
        }

        for(let i = 0; i < userList.length; i++) {
            if(userEmail === undefined || userPassword === undefined || userPasswordCheck === undefined || userNmae === undefined) {
                alert('모두다 작성해주세요');
                return;
            } else if(userList[i].email === userEmail) {
                alert('일치하는 아이디가 있습니다.')
                return;
            } else if(userPasswordCheck !== userPassword) {
                alert('비밀번호가 일치하지 않습니다.')
                return;
            } else if(userList[i].name === userNmae) {
                alert('일치하는 닉네임이 있습니다.')
                return;
            } else {
                const signObj = { email:userEmail, password:hashPw, name:userNmae };
                const result = await axios.post('/sign', signObj);
                console.log(result);
                alert('회원가입 성공');
            }
        }
    }

    return(
        <div id='signDiv'>
            <div id='signDivHeader'>
                <img alt='' onClick={hideSignDiv} src={pageCloseImg}></img>
            </div>

            <div id='signDivMain'>
                <div id="signDivMainHeader">
                    <p>회원가입</p>
                </div>

                <div id="signDivMainCenter">
                    <div id="signDivMainCenterName">
                        <p>닉네임</p>

                        <input onChange={getNameValue} placeholder="닉네임을 입력하세요"></input>
                    </div>

                    <div id="signDivMainCenterEmail">
                        <p>이메일</p>

                        <input onChange={getEmailValue}  placeholder="아이디를 입력하세요"></input>
                    </div>

                    <div id="signDivMainCenterPassword">
                        <div id="signDivMainCenterPasswordTop">
                            <p>비밀번호</p>

                            <input type="password" onChange={getPasswordValue}  placeholder="비밀번호"></input>
                        </div>

                        <div id="signDivMainCenterPasswordBottom">
                            <p>비밀번호 확인</p>

                            <input type="password" onChange={getPasswordCheckValue}  placeholder="비밀번호 확인"></input>
                        </div>
                    </div>

                    <div id="signDivMainCenterbutton">
                        <button onClick={signBtn}>회원가입</button>
                    </div>
                </div>
            </div>
        </div>
    )
}