import '../css/searchLeftMileage.css';
import '../css/searchLeft.css';
import $ from 'jquery';

export default function SearchLeftMileage(props) {
    const lowMileageList = [10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000, 130000]
    const highMileageList = [10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000, 130000]

    const searchLeftMileageLow=()=> {
        $("#searchLeftMileageBottom #searchLefttMileageLowList").show();
    }

    const searchLeftMileageHigh=()=> {
        $("#searchLeftMileageBottom #searchLefttMileageHighList").show();
    }

    const getLowMileage=(e)=> {
        $("#searchLeftMileageBottom #searchLeftMileageLow").val(e.target.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'km');
        $("#searchLeftMileageBottom #searchLefttMileageLowList").hide();

        let highMileage = localStorage.getItem('highMileage');

        if(highMileage === null) {
            localStorage.setItem('lowMileage', e.target.value);
        } else if(parseInt(e.target.value) > parseInt(highMileage)) {
            localStorage.setItem('highMileage',e.target.value);
            localStorage.setItem('lowMileage', highMileage);

            $("#searchLeftMileageBottom #searchLeftMileageLow").val(highMileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'km');
            $("#searchLeftMileageBottom #searchLeftMileageHigh").val(e.target.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'km');

            props.getCarHighMileage(e.target.value)
            props.getCarLowMileage(highMileage);
        } else {
            localStorage.setItem('lowMileage', e.target.value)
            props.getCarHighMileage(highMileage)
            props.getCarLowMileage(e.target.value);
        }
    }

    const getHighMileage=(e)=> {
        $("#searchLeftMileageBottom #searchLeftMileageHigh").val(e.target.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'km');
        $("#searchLeftMileageBottom #searchLefttMileageHighList").hide();

        let lowMileage = localStorage.getItem('lowMileage');
        
        if(parseInt(e.target.value) < parseInt(lowMileage)) {
            localStorage.setItem('highMileage',lowMileage);
            localStorage.setItem('lowMileage', e.target.value);

            $("#searchLeftMileageBottom #searchLeftMileageLow").val(e.target.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'km');
            $("#searchLeftMileageBottom #searchLeftMileageHigh").val(lowMileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'km');

            props.getCarHighMileage(lowMileage)
            props.getCarLowMileage(e.target.value)
        } else {
            localStorage.setItem('highMileage', e.target.value);
            props.getCarLowMileage(lowMileage)
            props.getCarHighMileage(e.target.value)
        }
    }

    return(
        <div id='searchLeftMileage'>
            <div className='searchLeftHeader'>
                <p>주행거리</p>
            </div>
            
            <div id='searchLeftMileageBottom'>
                <input id='searchLeftMileageLow' onClick={searchLeftMileageLow} defaultValue='최소' readOnly></input>
                <input id='searchLeftMileageHigh' onClick={searchLeftMileageHigh}  defaultValue='최대' readOnly></input>

                <div id='searchLefttMileageLowList'>
                    {lowMileageList.map((mileage, idx) => {
                        return <input readOnly value={mileage} key={idx} onClick={getLowMileage}></input>
                    })}
                </div>

                <div id='searchLefttMileageHighList'>
                    {highMileageList.map((mileage, idx) => {
                        return <input readOnly value={mileage} key={idx} onClick={getHighMileage}></input>
                    })}
                </div>
            </div>
        </div>
    )
}