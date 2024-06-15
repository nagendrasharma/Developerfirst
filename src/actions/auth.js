import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/auth');
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const register = ({ username, email, password }) => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };
  const body = JSON.stringify({ username, email, password });

  try {
    const res = await axios.post('/api/users', body, config);
    await AsyncStorage.setItem('token', res.data.token);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    dispatch({ type: REGISTER_FAIL });
  }
};

export const login = (email, password) => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);
    await AsyncStorage.setItem('token', res.data.token);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

export const logout = () => async dispatch => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: LOGOUT });
};
