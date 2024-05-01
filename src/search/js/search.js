import '../css/search.css';
import '../searchLeft/css/searchLeft.css'
import '../css/pagination.css'
import * as LocalStorage from './LocalStrage';
import SearchLeftType from '../searchLeft/js/searchLeftType';
import SearchLeftBrand from '../searchLeft/js/searchLeftBrand';
import SearchLeftYear from '../searchLeft/js/searchLeftYear';
import SearchLeftMileage from '../searchLeft/js/searchLeftMileage';
import SearchLeftPrice from '../searchLeft/js/searchLeftPrice';
import CarData from './carData';
import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';

export default function Search() {
    const [searchCarModel, setSearchCarModel] = useState();
    const [carData, setCarData] = useState([]);
    const [carModel, setCarModel] = useState("null");
    const [result, setResult] = useState([]);
    const [page, setPage] = useState(1);
    const [carType, setcarType] = useState();
    const [carBrand, setCarBrand] = useState();
    const [carLowYear, setCarLowYear] = useState(2011);
    const [carHighYear, setCarHighYear] = useState(2022);
    const [carLowMileage, setCarLowMileage] = useState(0);
    const [carHighMileage, setcarHighMileage] = useState(122852);
    const [carLowPrice, setCarLowPrice] = useState(0);
    const [carHighPrice, setcarHighPrice] = useState(8630);

    useEffect(() => {
        getAllCarList();
        getSearchOptionCarList();
        getSearchTypeCar();
        const search = window.location.search;
        const query = queryString.parse(search);
        let getItemCarBrand = localStorage.getItem('carBrand')
        setCarModel(query.model);

        if(query.brand === undefined) {

        } else {
            setCarBrand(query.brand);
        }

        if(query.model === undefined) {

        } else {
            setCarModel(query.model);
        }

        if(query.lowPrice === undefined) {

        } else {
            setCarLowPrice(query.lowPrice);
        }

        if(query.highPrice === undefined) {

        } else {
            setcarHighPrice(query.highPrice);
        }

        if(getItemCarBrand === null) {
        } else if(getItemCarBrand !== null) {
            setCarBrand(getItemCarBrand);
        }

        

        async function getSearchTypeCar() {
            const search = window.location.search;
            const query = queryString.parse(search);

            if(query.type === "small") {
                const {
                    data
                } = await axios.get(`/getCarType/소형차/${page}`);
                console.log(data);
                setResult(data)
                return;
            } else if(query.type === "medium") {
                const {
                    data
                } = await axios.get(`/getCarType/중형차/${page}`);
                console.log(data);
                setResult(data)
                return;
            } else if(query.type === "big") {
                const {
                    data
                } = await axios.get(`/getCarType/대형차/${page}`);
                console.log(data);
                setResult(data)
                return;
            }
        }

        async function getSearchOptionCarList() {
            if(carBrand != null && carType != null) {
                const {
                    data
                } = await axios.get(`/searchCarBrandType/${carBrand}/${carType}/${carLowYear}/${carHighYear}/${carLowMileage}/${carHighMileage}/${carLowPrice}/${carHighPrice}/${page}`);
                console.log(data);

                if(data.length === 0) {
                    alert('검색 목록이 없습니다.')
                    setPage(page - 1)
                    return;
                } else {
                    setResult(data);
                }
            } else if(carBrand != null) {
                const {
                    data
                } = await axios.get(`/searchCarBrand/${carBrand}/${carLowYear}/${carHighYear}/${carLowMileage}/${carHighMileage}/${carLowPrice}/${carHighPrice}/${page}`);
                console.log(data);
                
                if(data.length === 0) {
                    alert('검색 목록이 없습니다.')
                    setPage(page - 1)
                    return;
                } else {
                    setResult(data);
                }
            } 
            else if(carType != null) {
                const {
                    data
                } = await axios.get(`/searchCarType/${carType}/${carLowYear}/${carHighYear}/${carLowMileage}/${carHighMileage}/${carLowPrice}/${carHighPrice}/${page}`);
                console.log(data);

                if(data.length === 0) {
                    alert('검색 목록이 없습니다.')
                    setPage(page - 1)
                    return;
                } else {
                    setResult(data);
                }
            } else if(carBrand == null && carType == null) {
                const {
                    data
                } = await axios.get(`/searchCar/${carLowYear}/${carHighYear}/${carLowMileage}/${carHighMileage}/${carLowPrice}/${carHighPrice}/${page}`);
                console.log(data);

                if(data.length === 0) {
                    // alert('검색 목록이 없습니다.')
                    setPage(page - 1)
                    return;
                } else {
                    setResult(data);
                }
            } 

            if(carBrand != null) {
                if(carModel != null) {
                    const {
                        data
                    } = await axios.get(`/searchWantCarAll/${carBrand}/${carModel}/${page}`);
                    console.log(data);
                    // setResult(data);
                    // return;

                    if(data.length === 0) {
                        const {
                            data
                        } = await axios.get(`/searchCarBrand/${carBrand}/${carLowYear}/${carHighYear}/${carLowMileage}/${carHighMileage}/${carLowPrice}/${carHighPrice}/${page}`);
                        console.log(data);
                        setResult(data);
                        return
                    } else {
                        setResult(data);
                    }
                } 
            } 

            if(carModel != null) {
                const {
                    data
                } = await axios.get(`/searchCarInput/${carModel}/${page}`);
                console.log(data)

                if(data.length === 0) {
                    return
                } else {
                    setResult(data);
                    return;
                }
            } 
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [carType, carBrand, carModel, carLowYear, carHighYear, carLowMileage, carHighMileage, carLowPrice, carHighPrice]);

    const localStorageResetBtn=()=> {
        window.localStorage.clear();
        window.location.reload();

        LocalStorage.LocalStorage();
    }

    const getAllCarList=async()=> {
        LocalStorage.LocalStorage();

        const {
            data
        } = await axios.get(`/getAllCarFirstPage`);
        setCarData(data);
    }

    const handlePageChange=async(page)=> {
        setPage(page);
        localStorage.setItem("page", page);

        const search = window.location.search;
        const query = queryString.parse(search);

        if(query.type === "small") {
            const {
                data
            } = await axios.get(`/getCarType/소형차/${page}`);
            console.log(data);
            setResult(data)
            return;
        } else if(query.type === "medium") {
            const {
                data
            } = await axios.get(`/getCarType/중형차/${page}`);
            console.log(data);
            setResult(data)
            return;
        } else if(query.type === "big") {
            const {
                data
            } = await axios.get(`/getCarType/대형차/${page}`);
            console.log(data);
            setResult(data)
            return;
        }

        if(carBrand != null && carType != null) {
            const {
                data
            } = await axios.get(`/searchCarBrandType/${carBrand}/${carType}/${carLowYear}/${carHighYear}/${carLowMileage}/${carHighMileage}/${carLowPrice}/${carHighPrice}/${page}`);
            console.log(data);

            if(data.length === 0) {
                alert('검색 목록이 없습니다.')
                setPage(page - 1)
                return;
            } else {
                setResult(data);
            }
        } else if(carBrand == null && carType == null) {
            const {
                data
            } = await axios.get(`/searchCar/${carLowYear}/${carHighYear}/${carLowMileage}/${carHighMileage}/${carLowPrice}/${carHighPrice}/${page}`);
            console.log(data);

            if(data.length === 0) {
                alert('검색 목록이 없습니다.')
                setPage(page - 1)
                return;
            } else {
                setResult(data);
            }
        } else if(carBrand != null) {
            const {
                data
            } = await axios.get(`/searchCarBrand/${carBrand}/${carLowYear}/${carHighYear}/${carLowMileage}/${carHighMileage}/${carLowPrice}/${carHighPrice}/${page}`);
            console.log(data);

            if(data.length === 0) {
                alert('검색 목록이 없습니다.')
                setPage(page - 1)
                return;
            } else {
                setResult(data);
            }
        } else if(carType != null) {
            const {
                data
            } = await axios.get(`/searchCarType/${carType}/${carLowYear}/${carHighYear}/${carLowMileage}/${carHighMileage}/${carLowPrice}/${carHighPrice}/${page}`);
            console.log(data);

            if(data.length === 0) {
                alert('검색 목록이 없습니다.')
                setPage(page - 1)
                return;
            } else {
                setResult(data);
            }
        } 
    }

    const getCarModel=(e)=> {
        setSearchCarModel(e.target.value);
        console.log(e.target.value);
    }

    const searchInput=(e)=> {
        if(e.key === 'Enter') {
            console.log(carModel)
            window.location.href=`/search?model=${searchCarModel}&ie=utf-8`;
            window.localStorage.clear();
            LocalStorage.LocalStorage();
        }
    }

    const searchInputImg=()=> {
        console.log(carModel)
        window.location.href=`/search?model=${searchCarModel}&ie=utf-8`;
        window.localStorage.clear();
        LocalStorage.LocalStorage()
    }

    function getCarType(result) {
        setcarType(result);
    }

    function getCarBrand(result) {
        setCarBrand(result);
    }

    function getCarLowYear(result) {
        setCarLowYear(result);
    }

    function getCarHighYear(result) {
        setCarHighYear(result);
    }

    function getCarLowMileage(result) {
        setCarLowMileage(result);
    }

    function getCarHighMileage(result) {
        setcarHighMileage(result);
    }

    function getCarLowPrice(result) {
        setCarLowPrice(result)
    }

    function getCarHighPrice(result) {
        setcarHighPrice(result);
    }

    const searchResult = result.map(
        (data, index) => (
            <CarData
            key={index}
            id={data.id}
            carImg1={data.carImg1}
            name={data.name}
            price={data.price}
            brand={data.brand}
            year={data.year}
            mileage={data.mileage}
            carData={carData}
            ></CarData>
        )
    )

    return(
        <div id='search'>
            <div id='searchLeft'>
                <div id='searchLeftTypeDiv'>
                    <SearchLeftType getCarType={getCarType}/>
                </div>

                <div id='searchLeftBrandDiv'>
                    <SearchLeftBrand  getCarBrand={getCarBrand}/>
                </div>

                <div id='searchLeftYearDiv'>
                    <SearchLeftYear getCarLowYear={getCarLowYear} getCarHighYear={getCarHighYear}/>
                </div>
                
                <div id='searchLeftMileageDiv'>
                    <SearchLeftMileage  getCarLowMileage={getCarLowMileage} getCarHighMileage={getCarHighMileage}/>
                </div>

                <div id='searchLeftPriceDiv'>
                    <SearchLeftPrice getCarLowPrice={getCarLowPrice} getCarHighPrice={getCarHighPrice}></SearchLeftPrice>
                </div>
            </div>

            <div id='searchRight'>
                <div id='searchRightHeader'>
                    <div id='searchRightHeaderInner'>
                        <input placeholder="원하는 차량을 검색하세요." onChange={getCarModel} onKeyDown={searchInput}></input>

                        {/* 돋보기 이미지 */}
                        <button id="searchIconImg" onClick={searchInputImg}></button>
                        {/* 리셋 이미지 */}
                        <button id="searchResetImg" onClick={localStorageResetBtn}></button>
                    </div>
                </div>

                <div id='searchRightMain'>
                    <div id='searchRightMainHeader'>
                        <p>총 <span id='searchPageRightMainHeaderSpan'>48</span>대</p>
                    </div>

                    <div id='searchRightMainFooter'>
                        {searchResult}
                    </div>
                </div>

                <div id='searchRightFooter'>
                    <div id='searchPageRightBottom'>
                        <Pagination
                            activePage={page} // 현재 페이지
                            itemsCountPerPage={8} // 한 페이지랑 보여줄 아이템 갯수
                            totalItemsCount={58} // 총 아이템 갯수
                            pageRangeDisplayed={5} // paginator의 페이지 범위
                            prevPageText={"‹"} // "이전"을 나타낼 텍스트
                            nextPageText={"›"} // "다음"을 나타낼 텍스트
                            onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}