import '../css/carData.css';

export default function CarData(props) {
    const { id, carImg1, name, price, brand, year, mileage } = props;

    const viewDetailCar=()=> {
        window.location.href=`/detailCar?id=${id}&ie=utf-8`;
    }

    return(
        <div id='carDataDiv'>
            <div id='carDataDivInner' onClick={viewDetailCar}>
                {/* 이미지 */}
                <div id='carDataDivInnerImg'>
                    <img alt='' src={`${carImg1}`}></img>
                </div>

                {/* 이름, 가격 */}
                <div id='carDataDivInnerName'>
                    <p id='carNameText'>{name}</p>
                </div>

                <div id='carDataDivInnerPrice'>
                    <p id='carPriceText'>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}만원</p>
                </div>

                <div id='carDataDivInnerFooter'>
                    <p>{brand}</p>
                    <p>{year}년</p>
                    <p>{mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}km</p>
                </div>
            </div>
        </div>
    )
}