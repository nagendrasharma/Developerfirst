import { GET_TEXTREELS, TEXTREEL_ERROR, ADD_TEXTREEL, DELETE_TEXTREEL, LIKE_TEXTREEL, UNLIKE_TEXTREEL } from '../actions/types';

const initialState = {
  textReels: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TEXTREELS:
      return {
        ...state,
        textReels: payload,
        loading: false
      };
    case ADD_TEXTREEL:
      return {
        ...state,
        textReels: [payload, ...state.textReels],
        loading: false
      };
    case DELETE_TEXTREEL:
      return {
        ...state,
        textReels: state.textReels.filter(textReel => textReel._id !== payload),
        loading: false
      };
    case LIKE_TEXTREEL:
    case UNLIKE_TEXTREEL:
      return {
        ...state,
        textReels: state.textReels.map(textReel =>
          textReel._id === payload.id ? { ...textReel, likes: payload.likes } : textReel
        ),
        loading: false
      };
    case TEXTREEL_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
