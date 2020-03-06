import { useState, useEffect, useCallback, useContext } from 'react'
import Link from 'next/link'

import useWindowSize from './hooks/useWindowSize'
import { Hamburger } from '../svg/Hamburger'
import { MagGlass } from '../svg/MagGlass'
import { XMark } from '../svg/XMark'
import { ShoppingCart } from '../svg/ShoppingCart'
import {
	SEARCH_SELECTION,
	SEARCH_IS_ACTIVE,
	SET_SHOE_DATA,
	SET_FILTERED_SEARCH,
} from '../util/constants'

import { TopBanner } from './TopBanner'
import { SvgButton } from './SvgButton'

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
						<h1 className="text-xl cursor-pointer font-semibold">Shoe Shop</h1>
					</Link>
				)}
				<div className="flex items-center">
					<SvgButton classes="mr-4" handleOnClick={handleOnClick}>
						{renderToggleButton()}
					</SvgButton>
					<Link href="/cart">
						<div className="relative">
							<SvgButton classes="align-middle">
								<ShoppingCart height="26" width="26" />
							</SvgButton>
							{state.cart.length > 0 ? (
								<span className="absolute bg-orange-600 left-50 rounded-full w-4 text-center text-white text-xs -top-575 transform -translate-x-1/2">
									{state.cart.length}
								</span>
							) : null}
						</div>
					</Link>
				</div>
			</div>
			<nav></nav>
		</header>
	)
}
