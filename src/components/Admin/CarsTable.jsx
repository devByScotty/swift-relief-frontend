// CarTable.js
import React , { useState, useEffect } from 'react';
import { Button, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { deleteCar, getAllCars } from "../../redux/Actions/carsActions";
import { carsReducer } from "../../redux/Reducers/carsReducer";
import { useSelector, useDispatch } from "react-redux";

const CarTable = ({ cars, onDelete, onEdit }) => {


  const { carid } = useParams();
  const carsReducer  = useSelector((state) => state.cars.cars);
  const  loading  = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalcars] = useState([]);
  const dispatch = useDispatch();


  const handleDelete = (carId) => {
    // Call the onDelete function with the carId
    onDelete(carId);
    message.success('Car deleted successfully!');
  };

  const handleEdit = (carId) => {
    // Call the onEdit function with the carId
    onEdit(carId);
  };

  return (

    <div>
      <table className="car-table">
        {/* ... (same as before) */}

        <thead>
          <tr>
           
            <th>Name</th>
            <th>Image</th>
            <th>Capacity</th>
            <th>Fuel Type</th>
            <th>Rent Per Hour</th>
            <th>Operations</th>
          </tr>
        </thead>



        <tbody>
          {cars.map((car) => (
            <tr key={car._id}>
              
              <td>{car.name}</td>
              <td>
                <img src={car.image} alt={car.name} className="car-image" />
              </td>

              <td>{car.capacity}</td>
              <td>{car.fuelType}</td>
              <td>{car.rentPerHour}</td>
              <td>
                <Link to={`/editcar/${car._id}`}>
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                  >
                    Edit

                  </Button>
                </Link>
                <Popconfirm
                  title="Are you sure to delete this car?"
                  onConfirm={()=>{dispatch(deleteCar({carid : car._id}))}}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="danger" icon={<DeleteOutlined />}>
                    Delete
                  </Button>
                </Popconfirm>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='addCARbUTTON'>


        <Link to="/addcar">
          <button className='btn1 center' style={{ width: '100%', margin: '10px' }}>
            Add A Car
          </button>
        </Link>

      </div>

    </div>
  );
};

export default CarTable;


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