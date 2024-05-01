import '../css/viewDetailCarLeft.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import CarLeftRecommendPage from './carLeftRecommendPage';
import $ from 'jquery';

export default function ViewDetailCarRight(props) {
    // eslint-disable-next-line
    const { id, price, year, mileage, type } = props;

    // 할부 금액
    let monthPrice = price / 60;

    const [ recommendCar, setRecommendCar ] = useState([]);
    const [recommendCarPage, setRecommendCarPage] = useState(1);
    const [slidePx, setSlidePx] = useState(0);

    useEffect(() => {
        getSmaeTypeCarList();
        if(recommendCarPage === 1) {
            $("#prevBtn").css('opacity', '0.4');
        } else {
            $("#prevBtn").css('opacity', '1');
        }

        if(recommendCarPage === 4) {
            $("#nextBtn").css('opacity', '0.4');
        } else {
            $("#nextBtn").css('opacity', '1');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recommendCarPage]);

    const getSmaeTypeCarList=async()=> {
        const {
            data
        } = await axios.get(`/getSameTypeCar/${type}`);
        setRecommendCar(data);
    }

    const prevBtn=()=> {
        if(recommendCarPage === 4) {
            setRecommendCarPage(3);
            setSlidePx(-450);
            $("#viewDetailCarLeftDivBottomMain #carLeftRecommendPage:nth-child(6)").addClass('hideDiv');
            $("#viewDetailCarLeftDivBottomMain #carLeftRecommendPage:nth-child(3)").removeClass('hideDiv');
        } else if(recommendCarPage === 3) {
            setRecommendCarPage(2);
            setSlidePx(-220);
            $("#viewDetailCarLeftDivBottomMain #carLeftRecommendPage:nth-child(5)").addClass('hideDiv');
            $("#viewDetailCarLeftDivBottomMain #carLeftRecommendPage:nth-child(2)").removeClass('hideDiv');
        } else if(recommendCarPage === 2) {
            setRecommendCarPage(1);
            setSlidePx(0);
            $("#viewDetailCarLeftDivBottomMain #carLeftRecommendPage:nth-child(4)").addClass('hideDiv');
            $("#viewDetailCarLeftDivBottomMain #carLeftRecommendPage:nth-child(1)").removeClass('hideDiv');
        }
    }

    const nextBtn=()=> {
        if(recommendCarPage === 1) {
            setRecommendCarPage(2);
            setSlidePx(-220);
            $("#viewDetailCarLeftDivBottomMain #carLeftRecommendPage:nth-child(1)").addClass('hideDiv');
            $("#viewDetailCarLeftDivBottomMain #carLeftRecommendPage:nth-child(4)").removeClass('hideDiv');
        } else if(recommendCarPage === 2) {
            setRecommendCarPage(3);
            setSlidePx(-450);
            $("#viewDetailCarLeftDivBottomMain #carLeftRecommendPage:nth-child(2)").addClass('hideDiv');
            $("#viewDetailCarLeftDivBottomMain #carLeftRecommendPage:nth-child(5)").removeClass('hideDiv');
        } else if(recommendCarPage === 3) {
            setRecommendCarPage(4);
            setSlidePx(-670);
            $("#viewDetailCarLeftDivBottomMain #carLeftRecommendPage:nth-child(3)").addClass('hideDiv');
            $("#viewDetailCarLeftDivBottomMain #carLeftRecommendPage:nth-child(6)").removeClass('hideDiv');
        }
    }

    const recommendCarResult = recommendCar.map(
        (data, index) => (
            <CarLeftRecommendPage
            key={index}
            id={data.id}
            brand={data.brand}
            carImg1={data.carImg1}
            mileage={data.mileage}
            name={data.name}
            price={data.price}
            year={data.year}
            ></CarLeftRecommendPage>
        )
    )

    return(
        <div id="viewDetailCarLeftDiv">
            <div id="viewDetailCarLeftDivTop">
                <div id="viewDetailCarLeftDivTopHeader">
                    <h1>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}만원</h1>
                    <p>할부 <span>월{monthPrice.toFixed(0)}만원</span> </p>
                </div>

                <div id="viewDetailCarLeftDivTopBottom">
                    <button id="YearBtn">
                        <span>연식</span>
                        <p>{year}년</p>
                    </button>

                    <button id="mileageBtn">
                        <span>주행거리</span>
                        <p>{mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}km</p>
                    </button>
                </div>
            </div>

            <div id="viewDetailCarLeftDivBottom">
                <div id='viewDetailCarLeftDivBottomHeader'>
                    <p>AI 추천<span style={{fontWeight:'400'}}>차량은 어떠세요?</span></p>
                </div>

                <div id='viewDetailCarLeftDivBottomMain'
                    style={{
                        transform: `translateX(${slidePx}px)`,
                        transition: "0.5s ease",
                      }}
                >
                    {recommendCarResult}
                </div>

                <div id='viewDetailCarLeftDivBottomFooter'>
                    <img id='prevBtn' onClick={prevBtn} alt=''></img>
                    <img id='nextBtn'onClick={nextBtn} alt=''></img>
                </div>
            </div>
        </div>
    )
}