const initialData = {
    users: [],
  };
  
  export const usersReducer = (state = initialData, action) => {
    switch (action.type) {
      case 'GET_ALL_USERS': {
        const usersWithAdminProperty = action.payload.map((user) => ({
          ...user,
          isAdmin: user.role === 'admin', // Assuming role is a property in your user data
        }));
  
        return {
          ...state,
          users: usersWithAdminProperty,
        };
      }
  
      default:
        return state;
    }
  };


/*
const initialData = {

    users: [], 

};

export const usersReducer = (state = initialData, action) => {
    switch(action.type) {

        case 'GET_ALL_USERS' : {
            return{
             ...state,
             users: action.payload
            }

    }
  
    default: return state

}



*/