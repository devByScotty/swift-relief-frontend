import React, { useState, useEffect } from 'react'
import DefaultLayout from '../DefualtLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookings } from '../../redux/Actions/bookingActions';
import { getAllCars } from "../../redux/Actions/carsActions";
import { bookingsReducer } from '../../redux/Reducers/bookingReducer'
import { carsReducer } from '../../redux/Reducers/carsReducer';
import { Row, Col } from 'antd';
import moment from 'moment'
import './UserBookings.css'



const UserBookings = () => {

  const dispatch = useDispatch();

  const bookings = useSelector(state => state.bookings.bookings);
  const cars = useSelector(state => state.cars.cars);

  const user = JSON.parse(localStorage.getItem('user'));

  /*const sortedBookings = bookings
  .filter((o) => o.user === user._id)
  .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); */

  useEffect(() => {
    dispatch(getAllBookings())
    dispatch(getAllCars())

    // console.log(bookings[0].car.name);


  }, [])

  useEffect(() => {
    // Check if bookings[0] is available before accessing its properties
    if (bookings.length > 0 && bookings[0].car) {
      // console.log(bookings[0].car.name);
    }
  }, [bookings]);



  return (
    <DefaultLayout>

      <div className='userBookings'>


        <div className='userData'>
          <h3 className='text-center mt-2'>My Bookings</h3>


          <Row justify='center' gutter={16}>

            <Col lg={16} sm={24}>



              {/* Display all the bookings */}


              {bookings.map((booking) => (
                <Row key={booking._id} className='bookingRows bs1 text-right' gutter={4}>
                  <Col lg={6} sm={24}>
                    {booking.car && booking.car.image && (
                      <img src={booking.car.image} alt={booking.car.name} style={{ borderRadius: 5 }} height='140' className='p-2' />
                    )}
                  </Col>
                  <Col lg={6} sm={24}>
                    <p><b>{booking.car?.name || 'N/A'}</b></p>
                    <p><b>Total hours: {booking.totalHours || 'N/A'}</b></p>
                    <p><b>Rent per hour: {booking.car?.rentPerHour || 'N/A'}</b></p>
                    <p><b>Total amount: {booking.totalAmount || 'N/A'}</b></p>
                  </Col>
                  <Col lg={12} sm={24}>
                    <p>Date of Booking : <b>{moment(booking.createdAt).format('MMM DD YYYY')}</b></p>
                    {booking.bookedTimeSlots.length > 0 && (
                      <>
                        <p>From : <b>{booking.bookedTimeSlots[0].from || 'N/A'}</b></p>
                        <p>To : <b>{booking.bookedTimeSlots[0].to || 'N/A'}</b></p>
                      </>
                    )}
                  </Col>
                </Row>
              ))}


            </Col>
          </Row>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default UserBookings