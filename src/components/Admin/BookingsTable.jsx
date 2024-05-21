// BookingTable.js
import React from 'react';
import { Button, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './BookingsTable.css'; // Import the CSS file



const BookingTable = ({ bookings, onDelete, onEdit }) => {
    const handleDelete = (bookingId) => {
        // Call the onDelete function with the bookingId
        onDelete(bookingId);
        message.success('Booking deleted successfully!');
    };

    const handleEdit = (bookingId) => {
        // Call the onEdit function with the bookingId
        onEdit(bookingId);
    };

    return (
        <table className="booking-table">
            <thead>
                <tr>

                  
                    <th>Total Hours</th>
                    <th>Total Amount</th>
                    <th>Driver Required</th>
                   
                </tr>
            </thead>
            <tbody>
                {bookings.map((booking) => (
                    <tr key={booking._id}>
                        
                        <td>{booking.totalHours}</td>
                        <td>{booking.totalAmount}</td>
                        <td>{booking.driverRequired ? 'Yes' : 'No'}</td>

                       
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default BookingTable;
