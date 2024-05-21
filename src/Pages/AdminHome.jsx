import React, { useState, useEffect } from 'react'
import './AdminStyling.css'
import { useSelector, useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefualtLayout'
import { getAllCars, deleteCar } from '../redux/Actions/carsActions'
import { alertsReducer } from '../redux/Reducers/alertReducer'
import { Col, Row, Divider, DatePicker, Checkbox, Drawer, Button } from 'antd'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner';
import moment from 'moment';
import { DeleteRowOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, message } from 'antd';
import { useParams } from "react-router-dom";
import CarTable from '../../src/components/Admin/CarsTable';
import UserTable from '../../src/components/Admin/UserTables';
import BookingTable from '../../src/components/Admin/BookingsTable';
import { getAllBookings } from '../redux/Actions/bookingActions';
import { getAllUsers } from '../redux/Actions/userActions';
import { usersReducer } from '../redux/Reducers/usersReducer';
import Analytics from '../components/Admin/Analytics';


const { RangePicker } = DatePicker
function AdminHome() {
    const  cars = useSelector((state) => state.cars.cars); // Assuming you have users and bookings data in your Redux state
    const  loading  = useSelector((state) => state.alertsReducer);
    const [totalCars, setTotalcars] = useState([]);
    const { carid } = useParams();
    const dispatch = useDispatch();
    const [currentView, setCurrentView] = useState('analytics');
    const  bookings  = useSelector(state => state.bookings.bookings);
    const  users  = useSelector(state => state.users.users);
    const  isAdmin  = useSelector((state) => state.users.users); // Assuming you have an isAdmin property in your usersReducer
  
    useEffect(() => {
      dispatch(getAllCars());
      // You may also dispatch actions to get users and bookings data here
    }, [dispatch]);
  
    useEffect(() => {
      setTotalcars(cars);
    }, [cars]);

    useEffect(() => {
        dispatch(getAllBookings())
        const bookingsData = getAllBookings();

        console.log(bookings)
        
      }, [])

      useEffect(() => {
        dispatch(getAllUsers())
        

        console.log(users)
        
      }, [])



  
    const handleButtonClick = (view) => {
      setCurrentView(view);
    };
  
    return (
      <div className='adminBg'>

      
        <DefaultLayout>
        <div className='adminHome'>
          {loading && <Spinner />}
  
          <div className='main'>
            {/* Side of content area */}
            <div className='sidebar bs1'>
              <div className='sideBarTitle'>
                <h1 className='adminh1'>Admin Panel</h1>
              </div>
  
              <div className='adminButtons'>
                <button
                  className='adminActionsButtons'
                  onClick={() => handleButtonClick('analytics')}
                >
                  Analytics
                </button>
                <button
                  className='adminActionsButtons'
                  onClick={() => handleButtonClick('cars')}
                >
                  Cars
                </button>
                <button
                  className='adminActionsButtons'
                  onClick={() => handleButtonClick('users')}
                >
                  Users
                </button>
                
              </div>
            </div>
  
            {/* Main section of content area */}
            <div className='mainbar'>
        
            
  
            <div className='adminHome'>
            {currentView === 'analytics' && <Analytics />}
              {currentView === 'cars' &&   <CarTable cars={totalCars} />}
              {currentView === 'users' &&    <UserTable users={users} />}
              {currentView === 'bookings' && <BookingTable bookings={bookings} />}
            </div>

                </div>
          </div>


          </div>
        </DefaultLayout>
     
      </div>
    );
  }
  
  export default AdminHome;


/*
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

                                    <div className='ant-icon mr-4'>

                                        <Link to={`/editcar/${car._id}`}><EditOutlined className='mr-3' style={{ color: 'green', cursor: 'pointer' }} /></Link>


                                        <Popconfirm
                                            title="Are you sure to delete this car?"
                                            onConfirm={() => {dispatch(deleteCar({carid} ))}}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <DeleteRowOutlined
                                                style={{ color: "red", cursor: "pointer" }}
                                            />
                                        </Popconfirm>

                                    </div>

                                </div>
                            </div>
                        </Col>
                    })}

                </Row>



*/