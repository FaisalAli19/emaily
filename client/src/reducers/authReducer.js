import { FETCH_USER } from '../constant'

const initialState = null

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USER:
			return action.payload || false;
		default: return state;
	}
}

export default authReducer;