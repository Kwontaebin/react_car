import '../css/searchCar.css';
import SearchWantCar from './searchWantCar';
import SearchCarPrice from './searchCarPrice';
import SearchCarType from './searchCartype';
import { useEffect, useState } from 'react';
import * as LocalStorage from '../../../search/js/LocalStrage';
import $ from 'jquery';

export default function SearchCar() {
    const [carModel, setCarModel] = useState(null);

    useEffect(() => {
        $("#searchCarDivFooterInnerHeader>h3").click(function() {
            let idx = $("#searchCarDivFooterInnerHeader>h3").index(this);

            $("#searchCarDivFooterInnerHeader>h3").removeClass('searchCarCurrentPage');
            $("#searchCarDivFooterInnerHeader>h3").eq(idx).addClass('searchCarCurrentPage');

            $("#searchCarDivFooterInnerMain>div").hide();
            $("#searchCarDivFooterInnerMain>div").eq(idx).show();
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getCarModel=(e)=> {
        setCarModel(e.target.value);
    }

    const searchCarModel=(e)=> {
        if(e.key === 'Enter') {
            console.log(carModel)
            window.location.href=`/search?model=${carModel}&ie=utf-8`;
            window.localStorage.clear();
            LocalStorage.LocalStorage();
        }
    }

    return(
        <div id='searchCarDiv'>
            {/* 그냥 글자 */}
            <div id='searchCarDivHeader'>
                <h1>어떤 차를 찾으세요?</h1>
            </div>

            {/* input */}
            <div id='searchCarDivMain'>
                <input placeholder='모델명을 입력해주세요. 예) 아이오닉5' onChange={getCarModel} onKeyDown={searchCarModel}></input>

                <div>
                    <a href='/search?brand=현대&model=엑센트&ie=utf-8'>#엑센트</a>
                </div>

                <div>
                    <a href='/search?brand=현대&model=쏘나타&ie=utf-8'>#쏘나타</a>
                </div>

                <div>
                    <a href='/search?brand=아우디&model=A6&ie=utf-8'>#아우디 A6</a>
                </div>

                <div>
                    <a href='/search?brand=쉐보레&model=아베오&ie=utf-8'>#쉐보레 아베오</a>
                </div>

                <div>
                    <a href='/search?brand=삼성&model=SM6&ie=utf-8'>#르노코리아 SM6</a>
                </div>
            </div>
            
            {/* option */}
            <div id='searchCarDivFooter'>
                <div id="searchCarDivFooterInner">
                    <div id="searchCarDivFooterInnerHeader">
                        <h3 className="searchCarCurrentPage">원하는 차가 있어요</h3>
                        <h3>예산이 정해져 있어요</h3>
                        <h3>차종별로 찾고 있어요</h3>
                    </div>

                    <div id="searchCarDivFooterInnerMain">
                        <SearchWantCar/>
                        <SearchCarPrice/>
                        <SearchCarType/>
                    </div>
                </div>
            </div>
        </div>
    )
}