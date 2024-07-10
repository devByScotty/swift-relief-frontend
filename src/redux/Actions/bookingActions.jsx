import axios from "axios";
import { message } from "antd";

 export const bookCar = (reqObj) => async dispatch => {

    dispatch({type: 'LOADING', payload: true})

    try{      

        const response = await axios.post('/api/booking/bookcar' , reqObj);
        dispatch({type:'LOADING',payload:false})

        console.log(response.data);

        setTimeout(() => {
            message.success('Your car is booked successfully')
        }, 500)
       
        message.success('Your car is booked successfully')
        
        window.location.href='/userbookings'


    }
    catch (error){
        console.log(error);
        dispatch({type:'LOADING' , payload: false})
        message.error('Something went wrong , please try later')

    }
}


export const getAllBookings =()=>async dispatch=>{

    dispatch({type: 'LOADING' , payload:true})
  
    try 
    {
        const response = await axios.get('/api/booking/getallbookings' )
        dispatch({type: 'GET_ALL_BOOKINGS', payload:response.data})
        //console.log(response.data)
        dispatch({type: 'LOADING' , payload:false})
    } 
    catch (error) 
    
    {
        console.log(error)
        dispatch({type: 'LOADING' , payload:false})
    }
  
  }