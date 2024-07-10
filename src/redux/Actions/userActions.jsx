import React from 'react'
import axios from 'axios'
import {message} from 'antd'
import { Button, Dropdown, Space } from 'antd';


// Action Types
const LOADING = 'LOADING';
const GET_ALL_USERS = 'GET_ALL_USERS';

// Action Creators
export const setLoading = (isLoading) => ({ type: LOADING, payload: isLoading });
export const getAllUsersSuccess = (users) => ({ type: GET_ALL_USERS, payload: users });

export const userLogin = (reqObj) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await axios.post('/api/users/login', reqObj);
    localStorage.setItem('user', JSON.stringify(response.data));
    message.success('Login success');
    dispatch(setLoading(false));
    // Dispatch an action to update state for successful login if needed
    window.location.href = '/';
  } catch (error) {
    console.error('Login error:', error);
    dispatch(setLoading(false));
    if (error.response.status === 401) {
      message.error('Invalid username or password');
    } else {
      message.error('Something went wrong');
    }
  }
};

export const userRegister = (reqObj) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await axios.post('/api/users/register', reqObj);
    message.success('Registration successful');
    // Dispatch an action to update state for successful registration if needed
    dispatch(setLoading(false));

    window.location.href = '/login';
  } catch (error) {
    console.error('Registration error:', error);
    dispatch(setLoading(false));
    console.log('Error Response:', error.response);
    // Handle specific errors based on status code or response data
    if (error.response.status === 400 && error.response.data.error.includes('duplicate key')) {
      message.error('Username already exists');
    } else {
      message.error('Something went wrong');
    }
  }
};

export const getAllUsers = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await axios.get('/api/users/getusers');
    dispatch(getAllUsersSuccess(response.data));
    dispatch(setLoading(false));
    console.log(response)
  } catch (error) {
    console.error('Get all users error:', error);
    dispatch(setLoading(false));
    message.error('Something went wrong');
  }
};
