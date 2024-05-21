import React, { useState, useEffect } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill }
    from 'react-icons/bs'
import { BarChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer }
    from 'recharts';
import './Analytics.css';
import { Bar, Line } from '@ant-design/charts';
import { useParams } from "react-router-dom";
import { deleteCar, getAllCars } from "../../redux/Actions/carsActions";
import { getAllBookings } from "../../redux/Actions/bookingActions";
import { getAllUsers } from "../../redux/Actions/userActions";
import { carsReducer } from "../../redux/Reducers/carsReducer";
import { bookingsReducer } from "../../redux/Reducers/bookingReducer";
import { usersReducer } from "../../redux/Reducers/usersReducer";
import { useSelector, useDispatch } from "react-redux";


//bookingsReducer

const Analytics = () => {


    //
    const { carid } = useParams();
    const  cars  = useSelector((state) => state.cars.cars);
    const  bookings  = useSelector((state) => state.bookings.bookings);
    const  users  = useSelector((state) => state.users.users);
    const  loading  = useSelector((state) => state.alertsReducer);

    const dispatch = useDispatch();
    const [totalCars, setTotalcars] = useState([]);
    const [totalSales, setTotalSales] = useState(0);

    useEffect(() => {
        // Fetch data


        dispatch(getAllBookings());
        dispatch(getAllCars());
        dispatch(getAllUsers());


        // Calculate total sales




        const sales = 0;
        const barData = [];

        let totalSalesData = 0;

        for (let i = 0; i < bookings.length; i++) {
            const sales = bookings[i]?.totalAmount || 0; // Using optional chaining to handle possible undefined values
            console.log(`Sales for booking ${i + 1}: ${sales}`);
            totalSalesData += sales;
            barData[i] = sales;
            console.log(barData[i]);
           

        }

        console.log(totalSalesData)

        setTotalSales(totalSalesData)

    }, [dispatch]);


    // Sample data for pie chart





   

    const barChartData = [
        { type: 'Total Sales', value: totalSales },
    ];

    // Set up the Bar chart
    const barConfig = {
        data: barChartData,
        xField: 'type',
        yField: 'value',
        legend: false,
        label: {
            position: 'top',
            style: {
                fill: '#aaa',
            },
        },
    };

    // Prepare data for the Line chart
    const lineChartData = Array.from({ length: 12 }, (_, index) => {
        // Get the name of the month
        const month = new Date(2023, index, 1).toLocaleString('default', { month: 'long' });

        // Find the booking for this month
        const matchingBooking = bookings.find((booking) => {
            const bookingMonth = new Date(booking.createdAt).getMonth();
            return bookingMonth === index;
        });

        // Return an object with month and totalAmount
        return {
            month,
            totalAmount: matchingBooking ? matchingBooking.totalAmount : 0,
        };
    });

    return (
        <div>
            <main className='main-container'>


                <div className='main-cards'>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>TOTAL SALES</h3>
                            <BsFillArchiveFill className='card_icon' />
                        </div>
                        <h1>R {totalSales.toLocaleString()}</h1>
                    </div>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>TOTAL FLEET</h3>
                            <BsFillGrid3X3GapFill className='card_icon' />
                        </div>
                        <h1>{cars.length}</h1>
                    </div>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>CUSTOMERS</h3>
                            <BsPeopleFill className='card_icon' />
                        </div>
                        <h1>{users.length}</h1>
                    </div>
                  
                </div>

                <div className='charts'>
                    <Bar {...barConfig} />
                    {/* Line Chart */}
                    <Line
                        data={lineChartData}
                        xField="month"
                        yField="totalAmount"
                        legend={{ position: 'top' }}
                        height={500}
                        autoFit
                        xAxis={{
                            label: {
                                rotation: 0,
                            },
                        }}
                    />
                </div>


            </main>


        </div>
    );
};

export default Analytics;