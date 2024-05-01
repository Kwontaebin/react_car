import '../css/main.css';
import MainImgSlide from './mainImgSlide';
import MainRecommendCar from '../recommendCar/js/mainRecommendCar';
import SearchCar from '../searchCar/js/searchCar';

export default function Main() {
    return(
        <div id='main'>
            {/* 이미지 슬라이드 */}
            <div id='mainImgSlide'>
                <MainImgSlide/>
            </div>

            {/* 차량 검색 */}
            <div id='mainSearchCar'>
                <SearchCar/>
            </div>

            {/* 자동차 추천 */}
            <div id='mainRecommendCar'>
                <MainRecommendCar/>
            </div>
        </div>
    )
}