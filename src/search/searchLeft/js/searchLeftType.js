import '../css/searchLeftType.css';
import '../css/searchLeft.css';

export default function SearchLeftType(props) {
    const typeList = ['소형차', '중형차', '대형차'];

    const getCarType=(e)=> {
        props.getCarType(e.target.value);

        localStorage.setItem('carType', e.target.value);
    }
    
    return(
        <div id='searchLeftType'>
            <div className='searchLeftHeader'>
                <p>차종</p>
            </div>

            <div id='searchLeftTypeBottom'>
                {typeList.map((type, idx) => {
                        return <input readOnly onClick={getCarType} value={type} key={idx}></input>
                })}
                </div>
        </div>
    )
}