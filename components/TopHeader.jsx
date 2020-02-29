import { useState, useEffect, useCallback } from 'react'
import { XMark } from '../svg/XMark'
import useWindowSize from './hooks/useWindowSize'
const defaultSVGDimension = { width: 12, height: 12 }

export const TopHeader = () => {
	const [topIsShown, setTopIsShown] = useState(true)
	const [windowSize, setWindowSize] = useState()
	const [svgDimensions, setSvgDimensions] = useState(defaultSVGDimension)

	const size = useWindowSize()
	const memoWindowSizer = useCallback(() => {
		// console.log(size)
		setWindowSize(size)
	})

	useEffect(() => {
		window.addEventListener('resize', memoWindowSizer)
		if (windowSize) {
			if (windowSize.width < 768) {
				setSvgDimensions(defaultSVGDimension)
			} else if (windowSize.width > 768) {
				setSvgDimensions({ width: 16, height: 16 })
			}
		}
		// figure out how to actually remove listener
		return () => window.removeEventListener('resize', memoWindowSizer)
	}, [size])

	return (
		<div
			className={`bg-gradient-brand justify-between ${
				topIsShown ? 'flex' : 'hidden'
			}`}
		>
			<div className="p-2 text-white md:py-4">Welcome to this site!</div>
			<button className="mr-4" onClick={() => setTopIsShown(false)}>
				<XMark
					color="white"
					width={svgDimensions.width}
					height={svgDimensions.height}
				/>
			</button>
		</div>
	)
}
