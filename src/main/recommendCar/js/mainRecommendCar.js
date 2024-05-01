import '../css/mainRecommendCar.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import $ from 'jquery';
import RecommendCar from './recommendCar';

export default function MainRecommendCar() {
    const [recommendCarList, setrecommendCarList] = useState([]);
    const [recommendCarCurrendPage, setRecommendCarCurrendPage] = useState(1);
    const [slidePx, setSlidePx] = useState(0);

    useEffect(() => {
        // mainRecommendCar에 들어갈 데이터를 가져오는 함수
        getRandomCarList();

        $("#mainRecommendCarFooterRightSpan").text(`${recommendCarCurrendPage}`);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recommendCarCurrendPage]);

    const getRandomCarList=async()=> {
        const {
            data
        } = await axios.get('/mainRecommendCarRand');
        setrecommendCarList(data);
    }

    const leftArrow=()=> {
        setSlidePx(slidePx + 1200);

        if(slidePx === 0) {
            setSlidePx(-2400);
        }

        if(recommendCarCurrendPage === 1) {
            setRecommendCarCurrendPage(3);
            $("#mainRecommendCarFooterLeft2").addClass('mainRecommendCarFooterPage');
            $("#mainRecommendCarFooterLeft3").addClass('mainRecommendCarFooterPage');
        } else if(recommendCarCurrendPage === 3) {
            setRecommendCarCurrendPage(2);
            $("#mainRecommendCarFooterLeft3").removeClass('mainRecommendCarFooterPage');
            $("#mainRecommendCarFooterLeft2").addClass('mainRecommendCarFooterPage');
        } else if(recommendCarCurrendPage === 2) {
            setRecommendCarCurrendPage(1);
            $("#mainRecommendCarFooterLeft div").removeClass('mainRecommendCarFooterPage');
            $("#mainRecommendCarFooterLeft1").addClass('mainRecommendCarFooterPage');
        }  
    }

    const rightArrow=()=> {
        setSlidePx(slidePx - 1200);

        if(slidePx === -2400) {
            setSlidePx(0);
        }

        if(recommendCarCurrendPage === 3) {
            setRecommendCarCurrendPage(1);
            $("#mainRecommendCarFooterLeft div").removeClass('mainRecommendCarFooterPage');
            $("#mainRecommendCarFooterLeft1").addClass('mainRecommendCarFooterPage');
        } else if(recommendCarCurrendPage === 1) {
            setRecommendCarCurrendPage(2);
            $("#mainRecommendCarFooterLeft2").addClass('mainRecommendCarFooterPage');
        } else if(recommendCarCurrendPage === 2) {
            setRecommendCarCurrendPage(3);
            $("#mainRecommendCarFooterLeft3").addClass('mainRecommendCarFooterPage');
        }
    }

    const recommendCarResult = recommendCarList.map(
        (data, index) => (
            <RecommendCar
            key={index}
            id={data.id}
            carImg1={data.carImg1}
            name={data.name}
            price={data.price}
            year={data.year}
            mileage={data.mileage}
            brand={data.brand}
            recommendCarCurrendPage={recommendCarCurrendPage}
            ></RecommendCar>
        )
    )

    return(
        <div id='mainRecommendCar'>
            <div id='mainRecommendCarHeader'>
                <h1>AI가 추천하는 요즘 대세 차량은?</h1>
            </div>

            <div id='mainRecommendCarMain'
                      style={{
                        transform: `translateX(${slidePx}px)`,
                        transition: "0.5s ease",
                      }}
            >
                {recommendCarResult}
            </div>

            <div id='mainRecommendCarFooter'>
                <div id='mainRecommendCarFooterLeft'>
                    <div className='mainRecommendCarFooterPage' id='mainRecommendCarFooterLeft1'></div>
                    <div id='mainRecommendCarFooterLeft2'></div>
                    <div id='mainRecommendCarFooterLeft3'></div>
                </div>

                <div id='mainRecommendCarFooterRight'>
                    <div id='leftArrow' onClick={leftArrow}></div>

                    <p id='mainRecommendCarFooterRightP'><span id='mainRecommendCarFooterRightSpan' className='recommendCarCurrendPageColor'></span> / 3</p>

                    <div id='rightArrow' onClick={rightArrow}></div>
                </div>
            </div>
        </div>
    )
}