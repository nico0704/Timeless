import { GET_EXPERIENCE, EXPERIENCE_ERROR } from "../actions/types";

const initialState = {
  experience: null,
  loading: true,
  error: {},
};

function experienceReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EXPERIENCE:
      return {
        ...state,
        experience: payload,
        loading: false,
      };
    case EXPERIENCE_ERROR: {
      return {
        ...state,
        error: payload,
        loading: false,
        experience: null,
      };
    }
  }
}

export default experienceReducer;
