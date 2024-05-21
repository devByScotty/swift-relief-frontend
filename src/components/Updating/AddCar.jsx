import React, { useEffect } from 'react'
import DefaultLayout from '../DefualtLayout'
import { Row, Col, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addCar, getAllCars } from '../../redux/Actions/carsActions';
import { Link } from 'react-router-dom';
import './AddCar.css';


const AddCar = () => {

    const dispatch = useDispatch()
    const  loading  = useSelector(state => state.alertsReducer)

    useEffect(() => {
        dispatch(getAllCars())
    }, [])

    function onFinish(values) {

        dispatch(addCar(values))
        console.log(values)

    }

    return (

        <DefaultLayout>
            <div className='editCarBg'>

            <div className='editCar'>
                <Row justify='center mt-5'>

                    <Col lg={12} sm={24}>

                        <Form className='editForm' layout='vertical' onFinish={onFinish}>

                            <h3>Add New Car</h3>

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

                            <button className='btn1-2 btn1 center'>ADD CAR</button>
                                <Link to={'/admin'}>
                                    <button className='btn1 center'>BACK TO ADMIN PAGE</button>
                                </Link>

                        </Form>


                    </Col>

                </Row>
                </div>
            </div>
        </DefaultLayout>


    )
}

export default AddCar