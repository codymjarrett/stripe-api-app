import { useState, useEffect, useCallback, useContext } from 'react'
import Link from 'next/link'

import useWindowSize from './hooks/useWindowSize'
import { Hamburger } from '../svg/Hamburger'
import { MagGlass } from '../svg/MagGlass'
import { XMark } from '../svg/XMark'
import {
	SEARCH_SELECTION,
	SEARCH_IS_ACTIVE,
	SET_SHOE_DATA,
	SET_FILTERED_SEARCH,
} from '../util/constants'

import { TopBanner } from './TopBanner'
import { SvgButton } from '../svg/SvgButton'

import { AppContext } from '../util/context'
import { useQuery } from '@apollo/react-hooks'
import { SHOES_QUERY } from '../graphql/shoes.query'
import {
	setShoeData,
	setSearchIsActive,
	setFilteredSearch,
	setSearchSelection,
} from '../util/actions'

export const Header = () => {
	const [windowSize, setWindowSize] = useState()
	const { state, dispatch } = useContext(AppContext)
	const { data, loading, error } = useQuery(SHOES_QUERY)

	const size = useWindowSize()

	useEffect(() => {
		setShoeData(dispatch, data)
	}, [data])

	const memoWindowSizer = useCallback(() => {
		setWindowSize(size)
	})

	const handleOnClick = () => {
		setSearchIsActive(dispatch, !state.searchIsActive)
		if (state.searchIsActive) {
			setFilteredSearch(dispatch, [])
			setSearchSelection(dispatch, '')
		}
	}

	const renderToggleButton = () => {
		if (state.searchIsActive === false) {
			return <MagGlass height="24" width="24" />
		} else if (state.searchIsActive === true) {
			return <XMark height="24" width="24" />
		}
	}

	const filterSearchData = (state, string) => {
		return state.data[0].getAllShoes.filter(shoe =>
			shoe.name.toLowerCase().includes(string.toLowerCase())
		)
	}

	const handleOnChange = e => {
		setSearchSelection(dispatch, e.target.value)
		const filteredSearchResults = filterSearchData(state, e.target.value)
		setFilteredSearch(dispatch, filteredSearchResults)

		if (e.target.value.length > 0) {
			setSearchIsActive(dispatch, true)
		}
		if (e.target.value === '') {
			setSearchIsActive(dispatch, false)
		}
	}

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
