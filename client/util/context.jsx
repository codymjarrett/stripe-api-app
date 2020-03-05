import { createContext, useEffect, useReducer } from 'react'

export const AppContext = createContext()

const initialState = {
	genderSelection: '',
	searchSelection: '',
	searchIsActive: false,
	data: [],
	filteredSearch: [],
	selectedShoe: {},
	cart: [],
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'SELECT_SHOE_GENDER':
			return {
				...state,
				genderSelection: action.payload,
			}
		case 'SEARCH_SELECTION':
			return {
				...state,
				searchSelection: action.payload,
			}
		case 'SEARCH_IS_ACTIVE':
			return {
				...state,
				searchIsActive: action.payload,
			}
		case 'SET_SHOE_DATA':
			return {
				...state,
				data: [action.payload],
			}
		case 'SET_FILTERED_SEARCH':
			return {
				...state,
				filteredSearch: action.payload,
			}
		case 'SET_SHOE_SIZE_TO_STATE':
			return {
				...state,
				selectedShoe: action.payload,
			}
		case 'ADD_ITEMS_TO_CART':
			return {
				...state,
				cart: state.cart.concat(action.payload)
			}
	}
}

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	return (
		<AppContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

export default AppProvider
