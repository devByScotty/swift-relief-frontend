import React from 'react';
import { Row, Col, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../redux/Actions/userActions';
import Spinner from '../Spinner';

import './Login.css';


const Login = () => {
  const dispatch = useDispatch();
  const  loading  = useSelector((state) => state.alertsReducer);

  function onFinish(values) {
    dispatch(userLogin(values));
    console.log('Success:', values);
  }

  return (
    <div className='login' style={{ position: 'relative' }}>
      {loading && <Spinner />}

      <Row gutter={16} className='d-flex align-items-center'>
        <Col lg={16} style={{ position: 'relative' }}></Col>

        <Col lg={8} className='text-left p-5'>
          <div className='login-container'>
            <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>
              <h1>Sign In</h1>
              <hr />

              <Form.Item name='username' label='Username' rules={[{ required: true }]}>
                <Input prefix={<UserOutlined className='prefix'/>} placeholder='Username' />
              </Form.Item>

              <Form.Item name='password' label='Password' rules={[{ required: true }]}>
                <Input.Password prefix={<LockOutlined  className='prefix'/>} placeholder='Password' />
              </Form.Item>

              <button className='btn1 mt-4 mb-3'>Login</button>

              <br />

              <Link to='/register'>Click Here to Register</Link>
              <Link to='/' style={{color:'black'}} > <p color='black'>Click Here to Home </p></Link>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
