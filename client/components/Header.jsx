import { useState, useEffect, useCallback, useContext } from 'react'
import Link from 'next/link'

import useWindowSize from './hooks/useWindowSize'
import { Hamburger } from '../svg/Hamburger'
import { MagGlass } from '../svg/MagGlass'
import { XMark } from '../svg/XMark'
import {
	SEARCH_SELECTION,
	SEARCH_IS_ACTIVE,
	SEARCH_NOT_ACTIVE,
} from '../util/constants'

import { TopBanner } from './TopBanner'
import { SvgButton } from '../svg/SvgButton'

import { AppContext } from '../util/context'

// working on gql
export const Header = () => {
	const [windowSize, setWindowSize] = useState()
	const { state, dispatch } = useContext(AppContext)

	const size = useWindowSize()

	// useEffect(() => {
	// 	if (state.searchSelection.length > 0) {
	// 		dispatch({ type: SEARCH_IS_ACTIVE, payload: true })
	// 	} else if (state.searchSelection.length === 0) {
	// 		dispatch({ type: SEARCH_IS_ACTIVE, payload: false })
	// 	}
	// }, [state])

	const memoWindowSizer = useCallback(() => {
		// console.log(size)
		setWindowSize(size)
	})

	const handleOnClick = () => {
		dispatch({
			type: SEARCH_IS_ACTIVE,
			payload: !state.searchIsActive,
		})
		// setSearchActive(!searchActive)
		// if (searchActive) {
		// 	dispatch({
		// 		type: SEARCH_SELECTION,
		// 		payload: '',
		// 	})
		// }
	}

	const renderToggleButton = () => {
		if (state.searchIsActive === false) {
			return <MagGlass height="24" width="24" />
		} else if (state.searchIsActive === true) {
			return <XMark height="24" width="24" />
		}
	}

	const handleOnChange = e => {
		dispatch({
			type: SEARCH_SELECTION,
			payload: e.target.value,
		})
		if (e.target.value.length > 0) {
			dispatch({ type: SEARCH_IS_ACTIVE, payload: true })
		}
		if (e.target.value === '') {
			dispatch({ type: SEARCH_IS_ACTIVE, payload: false })
		}
	}

	// const handleSearch = e => {
	// 	if (e.key === 'Enter') {
	// 		dispatch({
	// 			type: SEARCH,
	// 			payload: searchInput,
	// 		})
	// 	}
	// }

	return (
		<header>
			<TopBanner
				windowSize={windowSize}
				size={size}
				memoWindowSizer={memoWindowSizer}
			/>
			<div className="flex justify-between p-4">
				{/* /**
				 * !LOOK INTO HOC FOR THIS LATER
				 */}
				<SvgButton>
					<Hamburger height="24" width="24" />
				</SvgButton>
				{state.searchIsActive ? (
					<div className="flex-1 mx-4 bg-gray-100 border-solid border-2 border-black">
						<input
							className="w-full"
							onChange={e => handleOnChange(e)}
							// onKeyPress={e => handleSearch(e)}
							type="text"
							placeholder="Search for shoe name"
						/>
					</div>
				) : (
					<Link href="/">
						<h1 className="cursor-pointer">Name of this site!</h1>
					</Link>
				)}
				<SvgButton handleOnClick={handleOnClick}>
					{renderToggleButton()}
				</SvgButton>
			</div>
			<nav></nav>
		</header>
	)
}
