import '../css/viewDetail.css';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ViewDetailCar from './viewDetailCar';

export default function ViewDetail() {
    const [detailCar, setDetailCar] = useState([]);

    useEffect(() => {
        const search = window.location.search;
        const query = queryString.parse(search);

        getDetailCar(query.id);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getDetailCar=async(id)=> {
        const {
            data
        } = await axios.get(`/getDetailCar/${id}`);
        console.log(data);
        setDetailCar(data);
    }

    const result = detailCar.map(
        (data, index) => (
            <ViewDetailCar
            key={index}
            id={data.id}
            brand={data.brand}
            carImg1={data.carImg1}
            carImg2={data.carImg2}
            color={data.color}
            mileage={data.mileage}
            name={data.name}
            price={data.price}
            type={data.type}
            year={data.year}
            ></ViewDetailCar>
        )
    )

    return(
        <div id='viewDetail'>
            {result}
        </div>
    )
}