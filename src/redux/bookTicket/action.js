import { FROMDESTINATION ,TODESTINATION, GUESTNUM, CLASSTYPE, JOURNEYDATE } from "./actionType";

export const fromDestination = (value) => {
  return {
    type: FROMDESTINATION,
    payload : value
  };
};
export const toDestination = (value) => {
 
  return {
    type: TODESTINATION,
    payload : value
  };
};
export const guestNum = (value) => {
   
  return {
    type: GUESTNUM,
    payload : value
  };
};
export const classType = (value) => {
  
  return {
    type: CLASSTYPE,
    payload : value
  };
};
export const journeyDate = (value) => {
   
  return {
    type: JOURNEYDATE,
    payload : value
  };
};
