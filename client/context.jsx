import { createContext, useEffect, useReducer } from 'react'
import { inventory } from './data'

export const AppContext = createContext()

const initialState = Object.assign({}, inventory,{searchIsActive: false})

// const parseShoeNames = state => {
// 	const arrayFromInventory = [state.mens, state.women]
// 	return arrayFromInventory
// 		.map(item => item.shoes)[0]
// 		.map(item => item.name)
// 		.concat(
// 			arrayFromInventory.map(item => item.shoes)[1].map(item => item.name)
// 		)
// }

const reducer = (state, action) => {
	switch (action.type) {
		// case 'SEARCH':
		// 	// console.log(action.payload)
		// 	return parseShoeNames(state).filter(shoe =>
		// 		shoe.toLowerCase().includes(action.payload)
		// 	)
		case 'SEARCH_IS_ACTIVE':
			return {
				...state,
				searchIsActive: true
			}
		case 'SEARCH_NOT_ACTIVE':
			return {
				...state,
				searchIsActive: false
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
