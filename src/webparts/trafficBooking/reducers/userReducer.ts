export interface userProps {
   name: string;
   accessControl: {};
   userActiveDirectory: {};
   userActiveGroups: {};
   allApplicationUsers: {};
}

const initialState: userProps = {
   name: '',
   accessControl: {},
   userActiveDirectory: {},
   userActiveGroups: {},
   allApplicationUsers: {}
};



const userReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'GET_NAME':
         return {...state, name: action.payload};
         
      case 'CHANGE_NAME':
         return {...state, name: action.payload};

      case 'GET_CURRENTUSER_GROUP':
            return {...state, accessControl: action.payload};

      case 'GET_ALL_ACTIVE_USERS':
            return {...state, userActiveDirectory: action.payload };

      case 'GET_ALL_USER_GROUPS':
            return {...state, userActiveGroups: action.payload };

       case 'GET_ALL_USERS_INSIDE_GROUPS':
            return {...state, allApplicationUsers: { ...state.allApplicationUsers, ...action.payload } };
            
      default:
         return state;
   }
};

export default userReducer;