import '../css/searchLeftYear.css';
import '../css/searchLeft.css';
import $ from 'jquery';

export default function SearchLeftYear(props) {
    const lowYear = [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011];
    const highYear = [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011];

    const searchLeftYearLow=()=> {
        $("#searchLeftYearBottom #searchLeftYearLowList").show();
    }

    const searchLeftYearHigh=()=> {
        $("#searchLeftYearBottom #searchLeftYearHighList").show();
    }

    const getLowYear=(e)=> {
        props.getCarLowYear(e.target.value)
        $("#searchLeftYearBottom #searchLeftYearLow").val(e.target.value + '년');
        $("#searchLeftYearBottom #searchLeftYearLowList").hide();

        let highYear = localStorage.getItem('highYear');
        
        if(highYear === null) {
            localStorage.setItem('lowYear', e.target.value);
        } else if(e.target.value > highYear) {
            localStorage.setItem('highYear',e.target.value);
            localStorage.setItem('lowYear', highYear);

            $("#searchLeftYearBottom #searchLeftYearLow").val(highYear + '년');
            $("#searchLeftYearBottom #searchLeftYearHigh").val(e.target.value + '년');
            props.getCarLowYear(highYear);
            props.getCarHighYear(e.target.value)
        } else {
            localStorage.setItem('lowYear', e.target.value)
            props.getCarHighYear(highYear)
            props.getCarLowYear(e.target.value)
        }
    }

    const getHighYear=(e)=> {
        props.getCarHighYear(e.target.value)
        $("#searchLeftYearBottom #searchLeftYearHigh").val(e.target.value + '년');
        $("#searchLeftYearBottom #searchLeftYearHighList").hide();

        let lowYear = localStorage.getItem('lowYear');

        if(e.target.value < lowYear) {
            localStorage.setItem('highYear',lowYear);
            localStorage.setItem('lowYear', e.target.value);

            $("#searchLeftYearBottom #searchLeftYearLow").val(e.target.value + '년');
            $("#searchLeftYearBottom #searchLeftYearHigh").val(lowYear + '년');
            props.getCarHighYear(lowYear)
            props.getCarLowYear(e.target.value);
        } else {
            localStorage.setItem('highYear', e.target.value);
            props.getCarLowYear(lowYear);
            props.getCarHighYear(e.target.value)
        }
    }

    return(
        <div id='searchLeftYear'>
            <div className='searchLeftHeader'>
                <p>연식</p>
            </div>

            <div id='searchLeftYearBottom'>
                <input id='searchLeftYearLow' onClick={searchLeftYearLow} defaultValue='최소' readOnly></input>
                <input id='searchLeftYearHigh' onClick={searchLeftYearHigh} defaultValue='최대' readOnly></input>

                <div id='searchLeftYearLowList'>
                    {lowYear.map((year, idx) => {
                        return <input readOnly placeholder={year} value={year} key={idx} onClick={getLowYear}></input>
                    })}
                </div>  

                <div id='searchLeftYearHighList'>
                    {highYear.map((year, idx) => {
                        return <input readOnly placeholder={year} value={year} key={idx} onClick={getHighYear}></input>
                    })}
                </div>
            </div>
        </div>
    )
}