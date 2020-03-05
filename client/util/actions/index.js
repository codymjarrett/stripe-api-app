import { SELECT_SHOE_GENDER, SET_SHOE_DATA, SEARCH_IS_ACTIVE, SET_FILTERED_SEARCH, SEARCH_SELECTION } from '../constants'

export const selectShoeGender = (dispatch, payload) => {
	dispatch({
		type: SELECT_SHOE_GENDER,
		payload,
	})
}
export const setShoeData = (dispatch, payload) => {
	dispatch({
		type: SET_SHOE_DATA,
		payload,
	})
}
export const setSearchIsActive = (dispatch, payload) => {
	dispatch({
		type: SEARCH_IS_ACTIVE,
		payload,
	})
}
export const setFilteredSearch = (dispatch, payload) => {
	dispatch({
		type: SET_FILTERED_SEARCH,
		payload,
	})
}
export const setSearchSelection= (dispatch, payload) => {
	dispatch({
		type: SEARCH_SELECTION,
		payload,
	})
}
