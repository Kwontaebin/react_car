import '../css/searchCartype.css';
import SmallCarIcon from '../../../images/smallCarIcon.svg';
import MediumCarIcon from '../../../images/mediumCarIcon.svg';
import BigCarIcon from '../../../images/bigCarIcon.svg';
import * as LocalStrage from '../../../search/js/LocalStrage';
// import axios from 'axios';

export default function SearchCarType() {
    const getSmallCarList=async()=> {
        window.location.href=`/search?type=small&ie=utf-8`;
        localStorage.setItem('type','소형차');
        LocalStrage.LocalStorage()
    }

    const getMediumCarList=async()=> {
        window.location.href=`/search?type=medium&ie=utf-8`;
        localStorage.setItem('type','중형차');
        LocalStrage.LocalStorage()
    }

    const getBigCarList=async()=> {
        window.location.href=`/search?type=big&ie=utf-8`;
        localStorage.setItem('type', '대형차');
        LocalStrage.LocalStorage()
    }

    return(
        <div id="searchCarType">
            <div id='searchCarSmallCar' onClick={getSmallCarList}>
                <img alt='' src={SmallCarIcon}></img>

                <p>소형차</p>
            </div>

            <div id='searchCarMediumCar' onClick={getMediumCarList}>
                <img alt='' src={MediumCarIcon}></img>

                <p>중형차</p>
            </div>
            
            <div id='searchCarBigCar' onClick={getBigCarList}>
                <img alt='' src={BigCarIcon}></img>
                
                <p>대형차</p>
            </div>
        </div>
    )
}