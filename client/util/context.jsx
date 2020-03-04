import { createContext, useEffect, useReducer } from 'react'

export const AppContext = createContext()

const initialState = {
	genderSelection: '',
	searchSelection: '',
	searchIsActive: false,
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
		// case 'SEARCH_NOT_ACTIVE':
		// 	return {
		// 		...state,
		// 		searchIsActive: false,
		// 	}
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
