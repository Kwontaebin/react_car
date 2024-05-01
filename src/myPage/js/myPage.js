import '../css/myPage.css';
import '../css/myPagePagination.css'
import { useEffect, useState } from 'react';
import $ from 'jquery';
import axios from 'axios';
import cookie from 'react-cookies';
import FavoriteCarList from './favoriteCarList';
import BuyCarList from './buyCarList';

export default function MyPage() {
    let favoriteCarList = [];
    let buyCarList = [];

    const pageList = [1,2,3,4,5,6,7,8,9,10];

    const [ favoriteCarData, setFavoriteCarDataCarData ] = useState([]);
    const [ buyCarData, setBuyCarData ] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1);

    useEffect(() => {
        // 처음 들어가자 보이는 페이지
        getFirstPage()

        $("#myPageDivFooter #pageListDiv").eq(0).addClass('currentPageClass')

        $("#myPageDivHeader p").click(function() {
            let idx = $("#myPageDivHeader p").index(this);

            $("#myPageDivHeader p").removeClass('currentPageText')
            $("#myPageDivHeader p").eq(idx).addClass('currentPageText')
        })

        $("#myPageDivFooter #pageListDiv").click(function() {
            let idx = $("#myPageDivFooter #pageListDiv").index(this);
            setCurrentPage(idx + 1);

            $("#myPageDivFooter #pageListDiv").removeClass('currentPageClass')
            $("#myPageDivFooter #pageListDiv").eq(idx).addClass('currentPageClass')
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getFirstPage=async()=> {
        const id = cookie.load('id');
        const {
            data
        } = await axios.get(`/getFavoriteCarList/${id}/${currentPage}`);

        for(let i = 0; i < data.length; i++) {
            const result = await axios.get(`/getCarList/${data[i].carId}/${currentPage}`);
            favoriteCarList.push(result.data[0]);
        }

        setFavoriteCarDataCarData(favoriteCarList);
    }

    const getFavoriteCar=async()=> {
        $("#myPageBuyDivMain").hide();
        $("#myPageFavoriteDivMain").show();

        getFirstPage();
    }

    const getBuyCar=async()=> {
        $("#myPageFavoriteDivMain").hide();
        $("#myPageBuyDivMain").show();

        const id = cookie.load('id');

        const {
            data
        } = await axios.get(`/getBuyCarList/${id}/${currentPage}`);

        for(let i = 0; i < data.length; i++) {
            const result = await axios.get(`/getCarList/${data[i].carId}/${currentPage}`);
            buyCarList.push(result.data[0]);
        }

        setBuyCarData(buyCarList);
    }

    const changePage=async(e)=> {
        const id = cookie.load('id');
        const {
            data
        } = await axios.get(`/getFavoriteCarList/${id}/${currentPage}`);
        console.log(data.length);

        if(data.length === 0) {
            alert('다음 페이지가 없습니다.')
            setCurrentPage(currentPage - 1);
            return;
        }
    }

    const favoriteResult = favoriteCarData.map(
        (data, index) => (
            <FavoriteCarList
            key={index}
            id={data.id}
            carImg1={data.carImg1}
            name={data.name}
            price={data.price}
            brand={data.brand}
            year={data.year}
            mileage={data.mileage}
            ></FavoriteCarList>
        )
    )

    const buyResult = buyCarData.map(
        (data, index) => (
            <BuyCarList
            key={index}
            id={data.id}
            carImg1={data.carImg1}
            name={data.name}
            price={data.price}
            brand={data.brand}
            year={data.year}
            mileage={data.mileage}
            ></BuyCarList>
        )
    )

    return(
        <div id='myPageDiv'>
            <div id='myPageDivHeader'>
                <p className='currentPageText' onClick={getFavoriteCar}>관심목록</p>
                <p onClick={getBuyCar}>구매목록</p>
            </div>

            <div id='myPageFavoriteDivMain'>
                {favoriteResult}
            </div>

            <div id='myPageBuyDivMain'>
                {buyResult}
            </div>

            <div id='myPageDivFooter'>
                {pageList.map((page, idx) => {
                    return <div id='pageListDiv' valie={page} key={idx} onClick={changePage}>{page}</div>
                })}
            </div>
        </div>
    )
}