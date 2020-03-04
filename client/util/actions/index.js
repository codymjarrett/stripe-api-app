import { SELECT_SHOE_GENDER } from '../constants'

export const selectShoeGender = (dispatch, payload) => {
	dispatch({
		type: SELECT_SHOE_GENDER,
		payload,
	})
}
