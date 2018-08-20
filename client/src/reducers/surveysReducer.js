import { FETCH_SURVEYS } from "../constant";

const initialState = []

export default (state = initialState, { type, payload }) => {
	switch (type) {
	case FETCH_SURVEYS:
		return payload
	default:
		return state
	}
};



