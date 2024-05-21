import React, { useState, useEffect } from 'react'
import DefaultLayout from '../DefualtLayout'
import { Row, Col, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { editCar, getAllCars } from '../../redux/Actions/carsActions';
import { alertsReducer } from '../../redux/Reducers/alertReducer'
import { carsReducer } from '../../redux/Reducers/carsReducer'
import { Link, useParams } from "react-router-dom";
import './EditCar.css';


const EditCar = ({ match }) => {

    const  cars  = useSelector((state) => state.cars.cars)
    const { carid } = useParams();
    const dispatch = useDispatch();
    const  loading = useSelector((state) => state.alertsReducer);
    const [car, setCar] = useState();
    const [totalcars, setTotalCars] = useState([]);

    useEffect(() => {


        if (cars === 0) {
            dispatch(getAllCars());

        }

        else {
            setTotalCars(cars)
            setCar(cars.find((o) => o._id === carid));
            //console.log(car)

        }


    }, [cars])

    function onFinish(values) {

        values._id = carid;

        dispatch(editCar(values))
        console.log(values)

    }

    return (
        <DefaultLayout>
            <div className='editCarBg'>

                <div className='editCar'>
                    <Row justify='center mt-5'>

                        <Col lg={12} sm={24} xs={24} className='p-2'>

                            {totalcars.length > 0 && (<Form initialValues={car} className='editForm' layout='vertical' onFinish={onFinish}>

                                <h3>Edit Car</h3>
                                {car.name}
                                {cars.length}
                                <hr />


                                <Form.Item name='name' label='Car name' rules={[{ required: true }]}>

                                    <Input />

                                </Form.Item>

                                <Form.Item name='image' label='Image url' rules={[{ required: true }]}>

                                    <Input />

                                </Form.Item>

                                <Form.Item name='rentPerHour' label='Rent per hour' rules={[{ required: true }]}>

                                    <Input />

                                </Form.Item>

                                <Form.Item name='capacity' label='Capacity' rules={[{ required: true }]}>

                                    <Input />

                                </Form.Item>

                                <Form.Item name='fuelType' label='Fuel Type' rules={[{ required: true }]}>

                                    <Input />

                                </Form.Item>


                                <button className='btn1-2 btn1 center'>EDIT CAR</button>
                                <Link to={'/admin'}>
                                    <button className='btn1 center'>BACK TO ADMIN PAGE</button>
                                </Link>
                            </Form>)}


                        </Col>

                    </Row>

                </div>

            </div>
        </DefaultLayout>
    )
}

export default EditCar