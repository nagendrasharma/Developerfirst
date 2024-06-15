import axios from 'axios';
import { GET_TEXTREELS, TEXTREEL_ERROR, ADD_TEXTREEL, DELETE_TEXTREEL, LIKE_TEXTREEL, UNLIKE_TEXTREEL } from './types';

export const getTextReels = () => async dispatch => {
  try {
    const res = await axios.get('/api/textReels');
    dispatch({ type: GET_TEXTREELS, payload: res.data });
  } catch (err) {
    dispatch({ type: TEXTREEL_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
  }
};

export const addTextReel = (content) => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };
  const body = JSON.stringify({ content });

  try {
    const res = await axios.post('/api/textReels', body, config);
    dispatch({ type: ADD_TEXTREEL, payload: res.data });
  } catch (err) {
    dispatch({ type: TEXTREEL_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
  }
};

export const likeTextReel = (id) => async dispatch => {
  try {
    const res = await axios.put(`/api/textReels/like/${id}`);
    dispatch({ type: LIKE_TEXTREEL, payload: { id, likes: res.data } });
  } catch (err) {
    dispatch({ type: TEXTREEL_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
  }
};

export const unlikeTextReel = (id) => async dispatch => {
  try {
    const res = await axios.put(`/api/textReels/unlike/${id}`);
    dispatch({ type: UNLIKE_TEXTREEL, payload: { id, likes: res.data } });
  } catch (err) {
    dispatch({ type: TEXTREEL_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
  }
};
