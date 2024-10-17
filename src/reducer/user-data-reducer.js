import { useReducer } from "react";

export const UserDataReducer = () => {
  const reducerFn = (state, action) => {
    switch (action.type) {
      case "UPDATE_VALUE":
        return {
          ...state,
          [action.payload.key]: action.payload.value,
        };
      case "CLEAN_VALUES":
        return {
          initialState,
        };
      default:
        return state;
    }
  };

  const initialState = {
    civility: "",
    society: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    street: "",
    postalCode: "",
    city: "",
    country: "",
    birthday: "",
  };
  const [userData, setUserData] = useReducer(reducerFn, initialState);

  return { userData: userData, setUserData: setUserData };
};
