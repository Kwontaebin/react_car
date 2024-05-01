import '../css/searchWantCar.css';
import { useState, useEffect } from 'react';
import $ from 'jquery';
import * as LocalStrage from '../../../search/js/LocalStrage';

export default function SearchWantCar() {
    const [carBrand, setCarBrand] = useState();
    const [carModelList, setCarModelList] = useState([]);
    const [carModel, setCarModel] = useState(null);

    useEffect(() => {
        $(".disabledText").prop('disabled',true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const cars = ["bmw","기아", "미니 쿠퍼", "벤츠", "볼보", "삼성", "쉐보레", "아우디", "제네시스", "현대"];
    const bwmModel = ["1시리즈"];
    const kiaModel = ["프라이드", "쏘렌토", "셀토스"];
    // 미니 쿠페
    const miniModel = ["3세대"];
    const benzModel = ["A-클래스", "E-클래스", "CLS-클래스", "GLE-클래스", 'G-클래스'];
    const bolboModel = ["S60"];
    const samsungModel = ['SM6'];
    // 쉐보레
    const chevroletModel = ["아베오"];
    const audiModel = ["A6", "Q7", "Q5", "Q4"];
    // 제네시스
    const genesisModel = ["GV80", "Gv70"];
    // 현대
    const hyundaiModel = ["엑센트", "쏘나타", '그랜저'];

    const getCarBrand=(e)=> {
        let value = e.target.value

        setCarBrand(value)
        console.log(value);
        localStorage.setItem('carBrand', value);

        if(value === "bmw") {
            setCarModelList(bwmModel);
        } else if(value === "기아") {
            setCarModelList(kiaModel);
        } else if(value === "미니 쿠퍼") {
            setCarModelList(miniModel);
        } else if(value === "벤츠") {
            setCarModelList(benzModel);
        } else if(value === "볼보") {
            setCarModelList(bolboModel);
        } else if(value === "삼성") {
            setCarModelList(samsungModel);
        } else if(value === "쉐보레") {
            setCarModelList(chevroletModel);
        } else if(value === "아우디") {
            setCarModelList(audiModel);
        } else if(value === "제네시스") {
            setCarModelList(genesisModel);
        } else if(value === "현대") {
            setCarModelList(hyundaiModel);
        }
    }

    const getCardModel=(e)=> {
        // console.log(e.target.value);
        setCarModel(e.target.value);
    }

    const searchBtn=async()=> {
        if(carBrand === undefined) {
            alert('제조사를 선택해주세요');
            return;
        }
        console.log(carBrand)
        console.log(carModel)

        window.location.href=`/search?brand=${carBrand}&model=${carModel}&ie=utf-8`;
        localStorage.setItem('carBrand', carBrand);
        LocalStrage.LocalStorage();
    }

    return(
        <div id="searchWantCar">
            {/* carBrand */}
            <select onChange={getCarBrand}>
                <option className='disabledText'>제조사</option>

                {cars.map((car, idx) => {
                    return <option value={car} key={idx}>{car}</option>
                })}
            </select>

            {/* carModel */}
            <select onChange={getCardModel}>
                <option className='disabledText'>모델</option>

                {carModelList.map((model, idx) => {
                    return <option id='carModelOption' value={model} key={idx}>{model}</option>
                })}
            </select>

            <button onClick={searchBtn}>검색하기</button>
        </div>
    )
}