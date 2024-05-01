import '../css/searchLeftPrice.css';
import '../css/searchLeft.css';
import $ from 'jquery';

export default function SearchLeftPrice(props) {
    const lowPriceList = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000];
    const highPriceList = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000];

    const searchLeftPriceLow=()=> {
        $("#searchLeftPriceBottom #searchLeftPriceLowList").show();
    }

    const searchLeftPriceHigh=()=> {
        $("#searchLeftPriceBottom #searchLeftPriceHighList").show();
    }

    const getLowPrice=async(e)=> {
        console.log(e.target.value);
        $("#searchLeftPriceBottom #searchLeftPriceLow").val(e.target.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'만원');
        $("#searchLeftPriceBottom #searchLeftPriceLowList").hide();

        localStorage.setItem('lowPrice', e.target.value);

        let highPrice = localStorage.getItem('highPrice');

        if(highPrice === null) {
            localStorage.setItem('lowPrice', e.target.value);
        } else if(parseInt(e.target.value) > parseInt(highPrice)) {
            localStorage.setItem('highPrice',e.target.value);
            localStorage.setItem('lowPrice', highPrice);

            $("#searchLeftPriceBottom #searchLeftPriceLow").val(highPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'만원');
            $("#searchLeftPriceBottom #searchLeftPriceHigh").val(e.target.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'만원');

            props.getCarHighPrice(e.target.value);
            props.getCarLowPrice(highPrice);
        } else {
            localStorage.setItem('lowPrice', e.target.value)
            props.getCarHighPrice(highPrice);
            props.getCarLowPrice(e.target.value);
        }
    }

    const getHighPrice=async(e)=> {
        console.log(e.target.value);
        $("#searchLeftPriceBottom #searchLeftPriceHigh").val(e.target.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'만원');
        $("#searchLeftPriceBottom #searchLeftPriceHighList").hide();

        localStorage.setItem('highPrice', e.target.value);

        let lowPrice = localStorage.getItem('lowPrice');

        if(parseInt(e.target.value) < parseInt(lowPrice)) {
            localStorage.setItem('highPrice',lowPrice);
            localStorage.setItem('lowPrice', e.target.value);

            $("#searchLeftPriceBottom #searchLeftPriceLow").val(e.target.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'만원');
            $("#searchLeftPriceBottom #searchLeftPriceHigh").val(lowPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'만원');

            props.getCarLowPrice(e.target.value);
            props.getCarHighPrice(lowPrice);
        } else {
            localStorage.setItem('highPrice', e.target.value);
            props.getCarLowPrice(lowPrice);
            props.getCarHighPrice(e.target.value);
        }
    }

    return(
        <div id='searchLeftPrice'>
            <div className='searchLeftHeader'>
                <p>가격</p>
            </div>

            <div id='searchLeftPriceBottom'>
                <input id='searchLeftPriceLow' onClick={searchLeftPriceLow} defaultValue='최소' readOnly></input>
                <input id='searchLeftPriceHigh' onClick={searchLeftPriceHigh}  defaultValue='최대' readOnly></input>

                <div id='searchLeftPriceLowList'>
                    {lowPriceList.map((price, idx) => {
                        return <input readOnly value={price} key={idx} onClick={getLowPrice}></input>
                    })}
                </div>

                <div id='searchLeftPriceHighList'>
                    {highPriceList.map((price, idx) => {
                        return <input readOnly value={price} key={idx} onClick={getHighPrice}></input>
                    })}
                </div>
            </div>
        </div>
    )
}