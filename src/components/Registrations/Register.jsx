import React from 'react'
import { Row, Col, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../../redux/Actions/userActions';
import Spinner from '../Spinner';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import './Register.css'
AOS.init();



const Register = () => {

  const dispatch = useDispatch();
  const loading  = useSelector(state => state.loading)


  function onFinish(values) {
    // Prevent default form submission
  
    console.log(values);
    dispatch(userRegister(values));
  }




  return (

    <div className='login' style={{ position: 'relative' }}>

      {loading === true && (<Spinner />)}


      <Row gutter={16} className='d-flex align-items-center'>

       

        <Col lg={8} className='text-left p-5'>

          <div className='login-container-2'>

            <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>

              <h1>Register</h1>
              <hr />

              <Form.Item name='username' label='Username' rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name='name' label='Name' rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name='surname' label='Surname' rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name='email' label='Email' rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name='password' label='Password' rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item
                name='confirmPassword'
                label='Confirm Password'
                dependencies={['password']}
                hasFeedback
                rules={[
                  { required: true },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords do not match.'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <button className='btn1 mt-2 mb-2'>Register</button>

              <br />

              <Link to='/login' color='black'>Click Here to Login</Link>
              <Link to='/' color='black'>Click Here to Home</Link>
              

            </Form>
          </div>
        </Col>


      </Row>


    </div>
  )
}

export default Register;