import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import './BookingCar.css'
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from '../DefualtLayout';
import Spinner from "../Spinner";
import { getAllCars } from '../../redux/Actions/carsActions';
import moment from "moment";
import { bookCar } from "../../redux/Actions/bookingActions";
import StripeCheckout from 'react-stripe-checkout';
import { useParams } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
const { RangePicker } = DatePicker;

AOS.init()

function BookingCar({ match }) {
  const cars = useSelector((state) => state.cars.cars);
  const  loading  = useSelector((state) => state.loading);
  const [car, setcar] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const { carid } = useParams();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setdriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
    } else {
      setcar(cars.find((o) => o._id == carid));
    }
  }, [cars]);

  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour);
    if (driver) {
      setTotalAmount(totalAmount + 30 * totalHours);
    }
  }, [driver, totalHours]);

  function selectTimeSlots(values) {
    setFrom(values[0].format("MMM DD YYYY HH:mm"));
    setTo(values[1].format("MMM DD YYYY HH:mm"));

    //moment('Dec 14 2023 00:00', 'MMM DD YYYY HH:mm', true)

    setTotalHours(values[1].diff(values[0], "hours"));
  }



  function onToken(token) {
    dispatch(getAllCars(cars));
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: carid,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    dispatch(bookCar(reqObj));
  }

  return (
    <div className="bookingcar">
      <DefaultLayout>
        {loading && <Spinner />}
        <Row
          justify="center"
          className="mt-10 d-flex align-items-center"
          style={{ minHeight: "90vh" }}
        >
          <Col lg={10} sm={24} xs={24} className='p-3'>
            <img src={car.image} className="carimg2 bs1 w-100" data-aos='flip-left' data-aos-duration='1500' />
          </Col>

          <Col lg={10} sm={24} xs={24} className="text-right">
            <Divider type="horizontal" dashed>
              Car Info
            </Divider>
            <div style={{ textAlign: "right" }}>
              <p>{car.name}</p>
              <p>{car.rentPerHour} Rent Per hour /-</p>
              <p>Fuel Type : {car.fuelType}</p>
              <p>Max Persons : {car.capacity}</p>
            </div>

            <Divider type="horizontal" dashed>
              Select Time Slots
            </Divider>
            <div className="slots" style={{ textAlign: "right" }} >
            <RangePicker
              showTime={{ format: "HH:mm" }}
              format="MMM DD YYYY HH:mm"
              onChange={selectTimeSlots}
            />
            <br />
            <button
              className="btn1 mt-4"
              onClick={() => {
                setShowModal(true);
              }}
              style={{ marginTop:"20px" }}
            >
              See Booked Slots
            </button>
            </div>
            
            
              <div className='see-below' style={{ textAlign: "right" }}>
                <p>
                  Total Hours : <b>{totalHours}</b>
                </p>
                <p>
                  Rent Per Hour : <b>{car.rentPerHour}</b>
                </p>
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      setdriver(true);
                    } else {
                      setdriver(false);
                    }
                  }}
                >
                  Driver Required
                </Checkbox>



                <h3>Total Amount : {totalAmount}</h3>



                <StripeCheckout
                  shippingAddress
                  billingAddress
                  amount={totalAmount * 100}
                  token={onToken}
                  currency='zar'
                  stripeKey="pk_test_51OOhA8BUkrXmUNq1wElfvCkOGWOJYWUkvzcZ8pZ5rL91i3IjX1zR08H4FfoWCxvykxxCu51gYMmLzA96UopjCiU0004UgtfJPN"
                >

                  <button className="btn1" >BookNow</button>

                </StripeCheckout>



              </div>
            
          </Col>

          {/* {car.name && (
                  <Modal
                    visible={showModal}
                    closable={false}
                    footer={false}
                    title="Booked time slots"
                  >
                    <div className="p-2">
                      {car.bookedTimeSlots.map((slot) => {
                        return (
                          <button className="btn1 mt-2">
                            {slot.from} - {slot.to}
                          </button>
                        );
                      })}

                      <div className="text-right mt-5">
                        <button
                          className="btn1"
                          onClick={() => {
                            setShowModal(false);
                          }}
                        >
                          CLOSE
                         </button>
                      </div>
                    </div>
                  </Modal>
                )}
                            */}


          <Modal visible={showModal} footer={false} closable={false} title='Booked time slots'>

            {car && car.bookedTimeSlots && (

              <div className='p-2'>

                {car.bookedTimeSlots.map((slot) => (

                  <button className="btn1 mt-2">{slot.from} - {slot.to}</button>
                ))}

              </div>

            )}

            <div className="text-right mt-2">

              <button className="btn1" onClick={() => { setShowModal(false) }}>CLOSE</button>

            </div>

          </Modal>


        </Row>
      </DefaultLayout>
    </div>
  );
}

export default BookingCar;