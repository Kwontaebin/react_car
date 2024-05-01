import '../css/searchCarPrice.css';
import $ from 'jquery';
import { useEffect, useState } from 'react';
import axios from 'axios'
import * as LocalStrage from '../../../search/js/LocalStrage';

export default function SearchCarPrice() {
    const cars = ["bmw","기아", "미니 쿠퍼", "벤츠", "볼보", "삼성", "쉐보레", "아우디", "제네시스", "현대"];
    const lowPriceList = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000];
    const highPriceList = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

    const [carBrand, setCarBrand] = useState();
    const [lowPrice, setLowPrice] = useState(0);
    const [hightPrice, setHightPrice] = useState(8630);

    useEffect(() => {
        $(".disabledText").prop('disabled',true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getCarBrand=(e)=> {
        setCarBrand(e.target.value);
    }

    const getLowPrice=(e)=> {
        setLowPrice(e.target.value);

        for(let i = 0; i < highPriceList.length; i++) {
            if(e.target.value > highPriceList[i]) {
                $("#searchCarHighPrice #searchCarHighPriceOption").eq(0).addClass('disabledText');
                $("#searchCarHighPrice #searchCarHighPriceOption").eq(i + 1).addClass('disabledText');
                $(".disabledText").prop('disabled',true);
            }
        }
    }

    const getHighPrice=(e)=> {
        setHightPrice(e.target.value);
    }

    const searchBtn=async()=> {
        console.log(carBrand);
        console.log(lowPrice);
        console.log(hightPrice);

        if(carBrand === undefined) {
            alert('제조사를 선택하세요');
            return;
        }

        const {
            data
        } = await axios.get(`/searchCarPrice/${carBrand}/${lowPrice}/${hightPrice}`)

        if(data.length === 0) {
            alert('검색 결과가 없습니다.')
        }  else {
            console.log(data);
        }

        localStorage.setItem('carBrand', carBrand)
        localStorage.setItem('lowPrice', lowPrice)
        localStorage.setItem('highPrice', hightPrice)
        LocalStrage.LocalStorage()

        window.location.href=`/search?brand=${carBrand}&lowPrice=${lowPrice}&highPrice=${hightPrice}`;
    }

    return(
        <div id="searchCarPrice">
            <select id='searchCarPriceBrand' onChange={getCarBrand}>
                <option className='disabledText'>제조사</option>

                {cars.map((car, idx) => {
                    return <option key={idx} value={car}>{car}</option>
                })}
            </select>

            <select id='searchCarLowPrice' onChange={getLowPrice}>
                <option className='disabledText'>낮은가격</option>

                {lowPriceList.map((price, idx) => {
                    return <option key={idx} value={price}>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}만원</option>
                })}
            </select>

            <select id='searchCarHighPrice' onChange={getHighPrice}>
                <option className='disabledText'>높은가격</option>

                {highPriceList.map((price, idx) => {
                    return <option id='searchCarHighPriceOption' key={idx} value={price}>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}만원</option>
                })}
            </select>

            <button onClick={searchBtn}>검색하기</button>
        </div>
    )
}