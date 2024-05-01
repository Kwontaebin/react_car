import '../css/recommendCar.css';
import { useEffect } from 'react';

export default function RecommendCar(props) {
    const { id, carImg1, name, price, year, mileage, brand, recommendCarCurrendPage } = props;

    useEffect(() => {

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recommendCarCurrendPage]);

    const viewDetailCar=()=> {
        window.location.href=`/detailCar?id=${id}&ie=utf-8`;
    }

    return(
        <div id='recommendCarDiv' onClick={viewDetailCar}>
            <div id='recommendCarDivImg'>
                    <img alt='' src={`${carImg1}`}></img>
            </div>

            <div id='recommendCarDivName'>
                <h3>{name}</h3>
            </div>

            <div id='recommendCarDivPrice'>
                <h2>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}만원</h2>
            </div>

            <div id='recommendCarDivMain'>
                <p>{brand}</p>
                <p>{year}년</p>
                <p>{mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}km</p>
            </div>
        </div>
    )
}