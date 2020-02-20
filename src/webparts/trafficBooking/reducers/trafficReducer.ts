
const trafficReducer = (state = { list: {} }, action) => {
   switch (action.type) {
      case 'ADD_ITEM':
         return { ...state, list: { ...state.list, [action.payload.Id]: action.payload } };

      case 'EDIT_ITEM':
         return { ...state, list: { ...state.list, [action.payload.Id]: action.payload } };

      case 'READ_ITEM':
         return { ...state, list: { ...state.list, [action.payload.Id]: action.payload } };

      case 'DELETE_ITEM':
         return { ...state };   

      case 'FETCH_LIST':
         return { ...state, list: { ...state.list, ...action.payload } };   
         
      default:
         return state;
   }
   
};

export default trafficReducer;