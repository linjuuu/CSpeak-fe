import { createStore } from 'redux';

const initialState = {
  accessToken: '',
  refreshToken: '',
  username : '',
  selfID : '',
  CsID : ''
};

const reducer = (state = initialState, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case 'SET_ACCESS_TOKEN':
      return {
        ...state,
        accessToken: action.payload
      };

    case 'SET_REFRESH_TOKEN':
      return {
        ...state,
        refreshToken: action.payload
      };

    case 'SET_USERNAME':
      return {
        ...state,
        username: action.payload
      };
    case 'SET_SELFID':
        return {
          ...state,
          selfID: action.payload
        };
    case 'SET_CSID':
        return {
          ...state,
          CsID: action.payload
        };
    case 'SET_INITSELF':
      return {
        ...state,
        initSelf: action.payload
      };
    case 'SET_INITCS':
        return {
          ...state,
          initCS: action.payload
        };
    case 'SET_TOPICCS':
      return {
        ...state,
        topicCS: action.payload
      };

    default:
      return state;
  }
};

const store = createStore(reducer);


export default store;