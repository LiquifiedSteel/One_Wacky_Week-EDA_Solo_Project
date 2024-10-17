import { combineReducers } from "redux";

const adminUsers = (state = [0], action) => {
    switch (action.type) {
        case 'LOAD_USERS':
          return action.payload;
        default:
          return state;
      }
}

const adminPayments = (state = [0], action) => {
    switch (action.type) {
        case 'LOAD_PAYMENTS':
          return action.payload;
        default:
          return state;
      }
}

const adminQuestions = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_ANSWERS':
          return action.payload;
        default:
          return state;
      }
}

export default combineReducers({
    adminUsers,
    adminPayments,
    adminQuestions,
});

