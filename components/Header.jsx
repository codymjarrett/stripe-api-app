import { useState, useEffect, useCallback } from 'react'
import useWindowSize from './hooks/useWindowSize'
import { Hamburger } from '../svg/Hamburger'
import { MagGlass } from '../svg/MagGlass'

import { TopBanner } from './TopBanner'

export const Header = () => {
	const [windowSize, setWindowSize] = useState()

	const size = useWindowSize()

	const memoWindowSizer = useCallback(() => {
		// console.log(size)
		setWindowSize(size)
	})

	return (
		<header>
			<TopBanner
				windowSize={windowSize}
				size={size}
				memoWindowSizer={memoWindowSizer}
			/>
			<div className="flex justify-between p-4">
				<Hamburger height="24" width="24" />
                <h1>Name of this site!</h1>
				<MagGlass height="24" width="24" />
			</div>
			<nav></nav>
		</header>
	)
}
