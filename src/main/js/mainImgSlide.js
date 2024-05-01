import '../css/mainImgSlide.css';
import SlideImg1 from '../../images/imgSlide1.png'
import SlideImg2 from '../../images/imgSlide2.png'
import SlideImg3 from '../../images/imgSlide3.png'
import SlideImg4 from '../../images/imgSlide4.png'
import SlideImg5 from '../../images/imgSlide5.png'
import SlideImg6 from '../../images/imgSlide6.png'
import { useEffect, useState } from 'react';
import $ from 'jquery';

export default function MainImgSlide() {
    const [currentImgNum, setcurrentImgNum] = useState(0);

    useEffect(() => {
        $("#selectBox ul li").click(function() {
            let idx = $("#selectBox ul li").index(this);
            setcurrentImgNum(idx);
            $("#selectBox ul li").removeClass('currentImg');
            $("#selectBox ul li").eq(idx).addClass('currentImg');

            $("#MainImgSlideDivContent img").removeClass('currentImg');
            $("#MainImgSlideDivContent img").eq(idx).addClass('currentImg');

            if($("#MainImgSlideDivContent img").hasClass("currentImg") === true) {
                $("#MainImgSlideDivContent img").hide();
                $("#MainImgSlideDivContent img").eq(idx).show();
            }
        })

        $("#slideImgNum>p:first").text(`${currentImgNum+1}`);
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentImgNum]);

    const downArrowImg=()=> {
        setcurrentImgNum(currentImgNum - 1);

        if(currentImgNum === 0) {
            setcurrentImgNum(5);
        }

        $("#selectBox ul li").removeClass('currentImg');
        $("#selectBox ul li").eq(currentImgNum -1).addClass('currentImg');

        $("#MainImgSlideDivContent img").removeClass('currentImg');
        $("#MainImgSlideDivContent img").eq(currentImgNum - 1).addClass('currentImg');

        $("#MainImgSlideDivContent img").hide();
        $("#MainImgSlideDivContent img").eq(currentImgNum - 1).show();
    }

    const upArrowImg=()=> {
        setcurrentImgNum(currentImgNum + 1);

        if(currentImgNum === 5) {
            setcurrentImgNum(0);
            $("#selectBox ul li").removeClass('currentImg');
            $("#MainImgSlideDivContent img").removeClass('currentImg');
            $("#selectBox ul li").eq(0).addClass('currentImg');
            $("#MainImgSlideDivContent img").eq(0).addClass('currentImg');
            $("#MainImgSlideDivContent img").eq(0).show();
        } else {
            $("#selectBox ul li").removeClass('currentImg');
            $("#selectBox ul li").eq(currentImgNum +1).addClass('currentImg');
    
            $("#MainImgSlideDivContent img").removeClass('currentImg');
            $("#MainImgSlideDivContent img").eq(currentImgNum + 1).addClass('currentImg');
    
            $("#MainImgSlideDivContent img").hide();
            $("#MainImgSlideDivContent img").eq(currentImgNum + 1).show();
        }
    }

    return(
        <div id='MainImgSlideDiv'>
            <div id='upArrowImg' onClick={upArrowImg}></div>
            
            <div id='MainImgSlideDivContent'>
                <img alt='' src={SlideImg1} id='slideImg' className='currentImg'></img>
                <img alt='' src={SlideImg2} id='slideImg'></img>
                <img alt='' src={SlideImg3} id='slideImg'></img>
                <img alt='' src={SlideImg4} id='slideImg'></img>
                <img alt='' src={SlideImg5} id='slideImg'></img>
                <img alt='' src={SlideImg6} id='slideImg'></img>
            </div>

            <div id='imgSlideStopImg'></div>
            <div id='imgSlideStartImg'></div>

            <div id='slideImgNum'>
                <p className='currentPageNum'>&nbsp;</p>
                <p>/ 6</p>
            </div>
            <div id='downArrowImg' onClick={downArrowImg}></div>

            <div id='selectBox'>
                <ul>
                    <li id='showSlideImg1' className='currentImg'>위클리특가</li>
                    <li>홈서비스 타임딜</li>
                    <li>직영점 보상판매</li>
                    <li>장기렌트</li>
                    <li>KW3 무료 기획전</li>
                    <li>KW6 무료 기획전</li>
                </ul>
            </div>
        </div>
    )
}