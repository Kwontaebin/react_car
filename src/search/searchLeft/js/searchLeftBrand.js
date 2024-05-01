import '../css/searchLeftBrand.css';
import '../css/searchLeft.css';

export default function SearchLeftBrand(props) {
    const getBrand=(e)=> {
        props.getCarBrand(e.target.value);
        localStorage.setItem('carBrand', e.target.value);
    }

    return(
        <div id='searchLeftBrand'>
            <div className='searchLeftHeader'>
                <p>제조사/모델</p>
            </div>

            {/* height = 170px */}
            <div id='searchLeftBrandBottom'style={{height:"200px"}}>
                {/* bmw */}
                <div id='searchLeftBrandBmw'>
                    <input type='radio' name='brand' id='BrandBmw' value='bmw' onChange={getBrand}></input>
                    <label htmlFor='BrandBmw'>bmw</label>

                    <p>3대</p>
                </div>

                {/* 기아 */}
                <div id='searchLeftBrandKia'>
                    <input type='radio' name='brand' id='BrandKia' value='기아' onChange={getBrand}></input>
                    <label htmlFor='BrandKia'>기아</label>

                    <p>6대</p>
                </div>

                {/* 미니 쿠퍼 */}
                <div id='searchLeftBrandMini'>
                    <input type='radio' name='brand' id='BrandMini' value='미니 쿠퍼' onChange={getBrand}></input>
                    <label htmlFor='BrandMini'>미니 쿠퍼</label>

                    <p>2대</p>
                </div>

                {/* 벤츠 */}
                <div id='searchLeftBrandBenz'>
                    <input type='radio' name='brand' id='BrandBenz' value='벤츠' onChange={getBrand}></input>
                    <label htmlFor='BrandBenz'>벤츠</label>

                    <p>7대</p>
                </div>

                {/* 볼보 */}
                <div id='searchLeftBrandBolbo'>
                    <input type='radio' name='brand' id='BrandBolbo' value='볼보' onChange={getBrand}></input>
                    <label htmlFor='BrandBolbo'>볼보</label>

                    <p>2대</p>
                </div>

                {/* 삼성 */}
                <div id='searchLeftBrandSamsung'>
                    <input type='radio' name='brand' id='BrandSamsung' value='삼성' onChange={getBrand}></input>
                    <label htmlFor='BrandSamsung'>삼성</label>

                    <p>3대</p>
                </div>

                {/* 쉐보레 */}
                <div id='searchLeftBrandChevrolet'>
                    <input type='radio' name='brand' id='BrandChevrolet' value='쉐보레' onChange={getBrand}></input>
                    <label htmlFor='BrandChevrolet'>쉐보레</label>

                    <p>3대</p>
                </div>

                {/* 아우디 */}
                <div id='searchLeftBrandAudi'>
                    <input type='radio' name='brand' id='BrandAudi' value='아우디' onChange={getBrand}></input>
                    <label htmlFor='BrandAudi'>아우디</label>

                    <p>6대</p>
                </div>

                {/* 제네시스 */}
                <div id='searchLeftBrandGenesis'>
                    <input type='radio' name='brand' id='BrandGenesis' value='제네시스' onChange={getBrand}></input>
                    <label htmlFor='BrandGenesis'>제네시스</label>

                    <p>3대</p>
                </div>

                {/* 현대 */}
                <div id='searchLeftBrandHyundai'>
                    <input type='radio' name='brand' id='BrandHyundai' value='현대' onChange={getBrand}></input>
                    <label htmlFor='BrandHyundai'>현대</label>

                    <p>13대</p>
                </div>
                
            </div>
        </div>
    )
}