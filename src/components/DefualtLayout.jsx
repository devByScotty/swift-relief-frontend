import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Button, Space, Row, Col } from 'antd';

const DefaultLayout = (props) => {
  // Parse user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // Check if user is not null before accessing its properties
  const username = user ? user.username : null;

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/userbookings">Bookings</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/admin">Admin</Link>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          localStorage.removeItem('user');
          window.location.href = '/login';
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div className='header bs1'>
        <Row justify='center' gutter={16}>
          <Col lg={20} sm={24} xs={24}>
            <div className='headerContainer'>
              <div>
                <h1>Swift</h1>
              </div>

              <nav className="navbar">
                <ul className="navbar-list">
                  <li>
                    <Link to="/" className="navbar-link">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/cars" className="navbar-link">
                      Rent
                    </Link>
                  </li>
                  <li>
                    <Link to="/userbookings" className="navbar-link">
                      MyBookings
                    </Link>
                  </li>
                </ul>
              </nav>

              <Dropdown overlay={menu} placement='bottomCenter'>
                <Button>{username}</Button>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>

      <div className='content'>{props.children}</div>
    </div>
  );
};

export default DefaultLayout;
