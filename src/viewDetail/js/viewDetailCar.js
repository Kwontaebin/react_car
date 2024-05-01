import '../css/viewDetailCar.css'
import '../css/viewDetailCarMainRight.css'
import CarImgLeftArrow from '../../images/leftArrow.png'
import CarImgRightArrow from '../../images/rightArrow.png'
import $ from 'jquery';
import RedHeart from '../../images/favoriteRedIcon.png';
import BlackHeart from '../../images/favoriteBlackIcon.png';
import ViewDetailCarLeft from './viewDetailCarLeft';
import cookie from 'react-cookies';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ViewDetailCar(props) {
    const { id, brand, carImg1, carImg2, color, mileage, name, price, type, year } = props;
    const [ myFavoriteCarList, setMyFavoriteCarList ] = useState([]);
    const [ allBuyCarList, setAllBuyCarList ] = useState([]);

    // 이전 등록비
    let carMoviePrice = price / 3;
    // 괸리 비용
    let administrationPrice = price / 8;
    // 수수료
    let commissionPrice = "33,000";
    // 합계
    let totalPrice = price + carMoviePrice + administrationPrice;

    useEffect(() => {
        getFavoriteList();
        getBuyList();

        async function getFavoriteList() {
            let userId = cookie.load('id');

            const {
                data
            } = await axios.get(`/getFavoriteCarList/${userId}`);
            setMyFavoriteCarList(data);
            
            for(let i = 0; i < data.length; i++) {
                if(data[i].carId === id) {
                    $("#heartImg").attr('src', RedHeart);
                }
            }
        }

        async function getBuyList() {
            const {
                data
            } = await axios.get(`/getBuyCarList`);
            setAllBuyCarList(data)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const moveCarImg=()=> {
        if($("#carImg1").hasClass('hideCarImgClass') === true) {
            $("#carImg1").removeClass('hideCarImgClass')
            $("#carImg2").addClass('hideCarImgClass')
        } else {
            $("#carImg2").removeClass('hideCarImgClass')
            $("#carImg1").addClass('hideCarImgClass')
        }
    }

    const favoriteBtn=async()=> {
        let userId = cookie.load('id');

        if(userId === undefined) {
            alert('로그인을 먼저 해주세요');
            return;
        }

        for(let i = 0; i < allBuyCarList.length; i++) {
            if(allBuyCarList[i].carId === id) {
                alert('이미 판매가 완료된 차량입니다.');
                return;
            }
        }

        for(let i = 0; i < myFavoriteCarList.length; i++) {
            if(myFavoriteCarList[i].carId === id) {
                if(window.confirm("관심목록에서 삭제하시겠습니까?")) {
                    const result = await axios.delete(`/removeFavoriteCar/${id}/${userId}`);
                    console.log(result);
                    alert('관심목록에서 삭제되었습니다.');
                    return;
                } else {
                    alert('취소')
                    return;
                }
            } 
        }

        if(window.confirm("관심목록에 추가하시겠습니까?")) {
            const favoriteCarObj = { carId:id, userId:userId };
            const result = await axios.post('/addFavoriteCar', favoriteCarObj);
            console.log(result);
            alert('관심목록 추가');
            return;
        } else {
            alert('취소');
            return;
        }
    }

    const buyBtn=async()=> {
        let userId = cookie.load('id');

        if(userId === undefined) {
            alert('로그인을 먼저 해주세요');
            return;
        }

        for(let i = 0 ; i < allBuyCarList.length; i++) {
            if(allBuyCarList[i].carId === id) {
                alert('이미 판매가 완료된 상품입니다');
                return;
            }
        }

        if(window.confirm('구매하시겠습니까?')) {
            const buyCarObj = { carId:id, userId:userId };
            const result = await axios.post('/addBuyCarList', buyCarObj);
            console.log(result);
            alert('구매 완료');
            return;
        } else {
            alert('취소');
            return
        }
    }

    return(
        <div id='viewDetailCar'>
            <div id='viewDetailCarHeader'>
                <div id='viewDetailCarHeaderTop'>
                    <h1 id='carName'>{name}</h1>

                    <h2 id='carPrice'>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}만원</h2>
                </div>

                <div id='viewDetailCarHeaderBottom'>
                    <p>{brand}</p>
                    <p>{type}</p>
                    <p>{year}년</p>
                    <p>{mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}km</p>
                    <p>{color}</p>
                </div>
            </div>

            <div id='viewDetailCarImg'>
                <img id='carImg1' alt='' src={`${carImg1}`}></img>
                <img id='carImg2' alt='' src={`${carImg2}`} className='hideCarImgClass'></img>

                <img id='carImgLeftArrow' onClick={moveCarImg} alt='' src={CarImgLeftArrow}></img>
                <img id='carImgRightArrow' onClick={moveCarImg} alt='' src={CarImgRightArrow}></img>
            </div>

            <div id='viewDetailCarMain'>
                <div id='viewDetailCarMainLeft'>
                    <ViewDetailCarLeft id={props.id} price={props.price} year={props.year} mileage={props.mileage} type={props.type} />
                </div>

                <div id='viewDetailCarMainRight'>
                    <div id='viewDetailCarMainRightHeader'>
                        <div id='viewDetailCarMainRightHeaderName'>
                            <h2>{name}</h2>
                        </div>

                        <div id='viewDetailCarMainRightHeaderYearMileage'>
                            <p>{brand}</p>
                            <p>{year}</p>
                            <p>{mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}km</p>
                        </div>
                    </div>

                    {/* 고객님의 총 구매 예상 비용 */}
                    <div id='viewDetailCarMainRightMain'>
                        <p>고객님의 총 구매 예상 비용</p>

                        <div id='viewDetailCarMainRightMainDiv'>
                            <div>
                                <p className='carDetailName'>차량가</p>

                                <p className='carDetailPrice'>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}만원</p>
                            </div>

                            <div>
                                <p className='carDetailName'>이전 등록비</p>

                                <p className='carDetailPrice'>{carMoviePrice.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}만원</p>
                            </div>

                            <div>
                                <p className='carDetailName'>관리비용</p>

                                <p className='carDetailPrice'>{administrationPrice.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}만원</p>
                            </div>

                            <div>
                                <p className='carDetailName'>수수료</p>

                                <p className='carDetailPrice'>{commissionPrice}만원</p>
                            </div>
                        </div>

                        <div id='viewDetailCarMainRightMainTotalPrice'>
                            <p id='totalPriceText'>합계 <span id='totalPriceTextSpan'>{totalPrice.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}만원</span></p>
                        </div>
                    </div>

                    <div id='viewDetailCarMainRightFooter'>
                        {/* 가격 자세히 보기 div */}
                        <div id='viewDetailCarMainRightFooterDetailPrice'>
                            <button>총 구매 비용 계산</button>
                        </div>

                        {/* 구매 버튼 div */}
                        <div id='viewDetailCarMainRightFooterBuyDiv'>
                            <button id='heartImgDiv' onClick={favoriteBtn}>
                                <img id='heartImg' alt='' src={BlackHeart}></img>
                            </button>

                            <button id='buyBtn' onClick={buyBtn}>바로구매</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}