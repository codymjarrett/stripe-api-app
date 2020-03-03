import { useState, useEffect, useCallback, useContext } from 'react'
import useWindowSize from './hooks/useWindowSize'
import { Hamburger } from '../svg/Hamburger'
import { MagGlass } from '../svg/MagGlass'
import { XMark } from '../svg/XMark'
import { SEARCH, SEARCH_IS_ACTIVE, SEARCH_NOT_ACTIVE } from '../util/constants'

import { TopBanner } from './TopBanner'
import { SvgButton } from '../svg/SvgButton'

import { AppContext } from '../util/context'

// working on gql
export const Header = () => {
	const [windowSize, setWindowSize] = useState()
	const [searchActive, setSearchActive] = useState(false)
	const [searchInput, setSearchInput] = useState('')
	const { dispatch } = useContext(AppContext)

	const size = useWindowSize()

	const memoWindowSizer = useCallback(() => {
		// console.log(size)
		setWindowSize(size)
	})

	const handleOnClick = () => setSearchActive(!searchActive)

	const renderToggleButton = () => {
		if (searchActive === false) {
			return <MagGlass height="24" width="24" />
		} else if (searchActive === true) {
			return <XMark height="24" width="24" />
		}
	}

	const handleOnChange = e => {
		setSearchInput(e.target.value)
		if (searchInput.length > 0) {
			dispatch({ type: SEARCH_IS_ACTIVE })
		} else if (searchInput.length == 0 || searchInput === '') {
			dispatch({ type: SEARCH_NOT_ACTIVE })
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
				{searchActive ? (
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
					<h1>Name of this site!</h1>
				)}
				<SvgButton handleOnClick={handleOnClick}>
					{renderToggleButton()}
				</SvgButton>
			</div>
			<nav></nav>
		</header>
	)
}
