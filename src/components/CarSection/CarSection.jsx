import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DefaultLayout from '../DefualtLayout';
import { getAllCars } from '../../redux/Actions/carsActions';
import { Col, Row, DatePicker, Button } from 'antd';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';
import './CarSection.css';
const { RangePicker } = DatePicker


const CarSection = () => {
  const dispatch = useDispatch();

  // State for the cars data and error message
  const cars = useSelector((state) => state.cars.cars);
  const carErrorMessage = useSelector((state) => state.cars.errorMessage);
  const loading = useSelector(state => state.alertsReducer)
  const [totalCars, setTotalcars] = useState([])

  // Fetch all cars on component mount
  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  useEffect(() => {

    setTotalcars(cars)

  }, [cars])

  console.log(cars);

  function setFilter(values) {
    const selectedFrom = new Date(values[0]);
    const selectedTo = new Date(values[1]);

    const availableCars = cars.filter((car) => {
      if (!car || !car.bookedTimeSlots || car.bookedTimeSlots.length === 0) {
        return true; // Car is available if it has no bookings or is undefined/null
      }

      const isOverlap = car.bookedTimeSlots.some((booking) => {
        if (!booking) return false; // Skip if booking is undefined/null

        const bookingFrom = new Date(booking.from);
        const bookingTo = new Date(booking.to);

        return (
          selectedFrom <= bookingTo &&
          selectedTo >= bookingFrom
        );
      });

      return !isOverlap;
    });

    setTotalcars(availableCars);
  }


  return (
    <div className='Home'>

      <DefaultLayout>
        <div className='homeData'>

          <Row className='mt-4' justify='center'>

            <Col lg={20} sm={24} className='d-flex justify-content-between'>
              <h5 className="mb-3">See Avaible Booking Slots</h5>

              <RangePicker showTime={{ format: 'HH:mm' }} format='MMM DD YYYY HH:mm' onChange={setFilter} />

            </Col>

          </Row>

          {loading == true && (<Spinner />)}



          <Row justify='center' gutter={16}>

            {totalCars.map(car => {
              return <Col lg={5} sm={24} xs={24}>
                <div className="car p-2 bs1">
                  <img src={car.image} className="carimg" />

                  <div className="car-content d-flex align-items-center justify-content-between">

                    <div className='text-left pl-2'>
                      <p>{car.name}</p>
                      <p> Rent Per Hour {car.rentPerHour} /-</p>
                    </div>

                    <div>
                      <button className="btn1 mr-2"><Link to={`/booking/${car._id}`}>Book Now</Link></button>
                    </div>

                  </div>
                </div>
              </Col>
            })}

          </Row>
        </div>
      </DefaultLayout>
    </div>
  );
};

export default CarSection;
