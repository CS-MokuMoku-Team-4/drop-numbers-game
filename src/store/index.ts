import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import myAppReducer from './myApp';

const store = configureStore({
  reducer: {
    myApp: myAppReducer,
  },
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export default store;