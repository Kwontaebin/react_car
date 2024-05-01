import '../css/myPageCarList.css';

export default function MyPageCarList(props) {
    const { id, carImg1, name, price, brand, year, mileage } = props;

    const viewDetailCar=()=> {
        window.location.href=`/detailCar?id=${id}&ie=utf-8`;
    }

    return(
        <div id='myPageCarList'>
            <div id='myPageCarListInner' onClick={viewDetailCar}>
                {/* 이미지 */}
                <div id='myPageCarListInnerImg'>
                    <img alt='' src={`${carImg1}`}></img>
                </div>

                {/* 이름, 가격 */}
                <div id='myPageCarListInnerName'>
                    <p id='carNameText'>{name}</p>
                </div>

                <div id='myPageCarListInnerPrice'>
                    <p id='carPriceText'>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}만원</p>
                </div>

                <div id='myPageCarListInnerFooter'>
                    <p>{brand}</p>
                    <p>{year}년</p>
                    <p>{mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}km</p>
                </div>
            </div>
        </div>
    )
}