import '../css/sell.css';
import '../css/sellDivInnerMain.css';
import { useState } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';

export default function Sell() {
    let [ mainImg, setMainImg ] = useState();
    let carImg;
    const [selectedFile, Set_selectedFile] = useState(null);
    const [carBrand, setCarBrand] = useState(null);
    const [carName, setCarName] = useState(null);
    const [carColor, setCarColor] = useState(null);
    const [carYear, setCarYear] = useState(null);
    const [carType, setCarType] = useState(null);
    const [carPrice, setCarPrice] = useState(null);
    const [carMileage, setCarMileage] = useState(null);

    const getCarBrandVlaue=(e)=> {
        setCarBrand(e.target.value);
    }

    const getCarNameVlaue=(e)=> {
        setCarName(e.target.value);
    }

    const getCarColorVlaue=(e)=> {
        setCarColor(e.target.value);
    }

    const getCarYearVlaue=(e)=> {
        setCarYear(e.target.value);
    }

    const getCarTypeVlaue=(e)=> {
        setCarType(e.target.value);
    }

    const getCarPriceVlaue=(e)=> {
        setCarPrice(e.target.value);
    }

    const getCarMileageVlaue=(e)=> {
        setCarMileage(e.target.value);
    }

    const fileInput=(e)=> {
        Set_selectedFile(e.target.files[0]);

        var reader = new FileReader();

        reader.onload = function(e) {
            setMainImg(e.target.result);
        };

        reader.readAsDataURL(e.target.files[0]);
    }

    const uploadBtn=async()=> {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const id = cookie.load('id');

        if(selectedFile == null) {
            alert('이미지를 넣어주세요');
            return;
        } else {
            const {
                data
            } = await axios.post('/api/upload', formData);
            console.log(data.file);
            carImg = `/upload/${data.file}`
        }

        if(id === undefined) {
            alert('다시 로그인 해주세요!');
        } else if(carBrand === null) {
            alert('브랜드를 입력하세요');
            return;
        } else if(carName === null) {
            alert('차량명을 입력하세요');
            return;
        } else if(carColor === null) {
            alert('색상을 입력하세요');
            return;
        } else if(carYear === null) {
            alert('연도를 입력하세요');
            return;
        } else if(carType === null) {
            alert('차종을 입력하세요');
            return;
        } else if(carPrice === null) {
            alert('가격을 입력하세요');
            return;
        } else if(carMileage === null) {
            alert('주행거리를 입력하세요');
            return;
        } else {
            const carUploadObj = { brand:carBrand, name:carName, color:carColor, year:carYear, type:carType, price:carPrice, mileage:carMileage, carImg1:carImg };
            const result = await axios.post(`/uploadCar`, carUploadObj);
            console.log(result);
            alert('차량등록 완료');
            return;
        }
    }

    return(
        <div id='sellDiv'>
            <div id='sellDivInner'>
                <div id='sellDivInnerHeader'>
                    <h2>내차팔기 신청하기</h2>
                </div>

                <div id='sellDivInnerMain'>
                    <div id='sellDivInnerMainImg'>
                        <div id='sellDivInnerMainImgInner'>
                            <img alt='' src={mainImg} id='imgPreview'></img>
                        </div>
                        <input type="file" id="inputFile" onChange={fileInput}/>
                    </div>

                    <div id='sellDivInnerMainBrand' className='sellDivInnerMainDiv'>
                        <p id='carBrandText'>브랜드</p>
                        <input placeholder='예) 현대' onChange={getCarBrandVlaue}></input>
                    </div>

                    <div id='sellDivInnerMainName' className='sellDivInnerMainDiv'>
                        <p id='carNameText'>차량명</p>
                        <input placeholder='예) 소나타' onChange={getCarNameVlaue}></input>
                    </div>

                    {/* color, year, type */}
                    <div id='sellDivInnerMainColorYearType' className='sellDivInnerMainDiv'>
                        <div id='sellDivInnerMainColor'>
                            <p id='carBrandText'>색상</p>

                            <input placeholder='예) 흰색' onChange={getCarColorVlaue}></input>
                        </div>

                        <div id='sellDivInnerMainYear'>
                            <p id='carBrandText'>연도</p>

                            <input placeholder='예) 2024' onChange={getCarYearVlaue}></input>
                        </div>

                        <div id='sellDivInnerMainType'>
                            <p id='carBrandText'>종류</p>
                            <input placeholder='예) 소형차' onChange={getCarTypeVlaue}></input>
                        </div>
                    </div>

                    <div id='sellDivInnerMainPriceMileage' className='sellDivInnerMainDiv'>
                        <div id='sellDivInnerMainPrice'>
                            <p id='carBrandText'>가격</p>

                            <input placeholder='예) 1500' onChange={getCarPriceVlaue}></input>
                        </div>

                        <div id='sellDivInnerMainMileage'>
                            <p id='carBrandText'>주행거리</p>

                            <input placeholder='예) 14000' onChange={getCarMileageVlaue}></input>
                        </div>
                    </div>

                    <div id='sellDivInnerMainFooter'>
                        <button onClick={uploadBtn}>신청</button>
                    </div>
                </div>
            </div>
        </div>
    )
}