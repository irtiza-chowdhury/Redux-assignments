import {
  FROMDESTINATION,
  TODESTINATION,
  GUESTNUM,
  CLASSTYPE,
  JOURNEYDATE,
} from "./actionType";

const initialState = {
  fromDestination: null,
  toDestination: null,
  guest: null,
  classType: null,
  dateJourney: null,
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case FROMDESTINATION:
      return {
        ...state,
        fromDestination: action.payload,
      };
    case TODESTINATION:
      return {
        ...state,
        toDestination: action.payload,
      };
    case GUESTNUM:
      return {
        ...state,
        guest: action.payload,
      };
    case CLASSTYPE:
      return {
        ...state,

        classType: action.payload,
      };
    case JOURNEYDATE:
      return {
        ...state,
        dateJourney: action.payload,
      };

    default:
      return state;
  }
};
export default bookReducer;
