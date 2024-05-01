import '../css/carLeftRecommendPage.css';
import { useEffect } from 'react';
import $ from 'jquery';

export default function CarLeftRecommendPage(props) {
    // eslint-disable-next-line
    const { id, brand, carImg1, mileage, name, price, year } = props;

    let monthPrice = price / 60;

    const viewDetailCar=()=> {
        window.location.href=`/detailCar?id=${id}&ie=utf-8`;
    }

    useEffect(() => {
        $("#viewDetailCarLeftDivBottomMain #carLeftRecommendPage:nth-child(4)").addClass('hideDiv');
        $("#viewDetailCarLeftDivBottomMain #carLeftRecommendPage:nth-child(5)").addClass('hideDiv');
        $("#viewDetailCarLeftDivBottomMain #carLeftRecommendPage:nth-child(6)").addClass('hideDiv');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <div id='carLeftRecommendPage' onClick={viewDetailCar}>
            <div id='carLeftRecommendPageImg'>
                <img alt='' src={`${carImg1}`}></img>
            </div>
            
            <div id='carLeftRecommendPageName'>
                <p>{name}</p>
            </div>

            <div id='carLeftRecommendPagePrice'>
                <p>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}만원</p>
            </div>

            {/* 할부금액 div */}
            <div id='carLeftRecommendPageMonthPrice'>
                <p>할부 <span style={{color:'#b70f28'}}>월{monthPrice.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}만원</span></p>
            </div>

            {/* 브랜드, 연도, 주행거리 */}
            <div id='carLeftRecommendPageFooter'>
                <p>{brand}</p>
                <p>{year}년</p>
                <p>{mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}km</p>
            </div>
        </div>
    )
}