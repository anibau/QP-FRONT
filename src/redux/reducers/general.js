import {
    FETCHING_DATA,
    SET_ADDRESS
  } from '../constants';

  const initialState = {
    displayGetParking: false,
    displayGetParkingInfo: false,
    displayGetParkingLoading: false,
    successGetParking: false,
    parkingList: [],
    displayGetTends: false,
    displayGetTendsInfo: false,
    displayGetTendsLoading: false,
    successGetTends: false,
    tendsList: [],
    displayGetServices: false,
    displayGetServicesInfo: false,
    displayGetServicesLoading: false,
    successGetServices: false,
    servicesList: [],
    address: '',
    latitude: 0,
    longitude: 0
  }
  export default function (state = initialState, action) {
    switch (action.type) {
      case FETCHING_DATA:
        return ({ ...state, ...action.payload })
      case SET_ADDRESS:
        return ({ ...state, ...action.payload })
      default:
        return state
    }
  }