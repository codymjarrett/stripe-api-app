import { useState, useEffect } from 'react'
import { XMark } from '../svg/XMark'
// import useWindowSize from './hooks/useWindowSize'
const defaultSVGDimension = { width: 12, height: 12 }

export const TopBanner = ({ windowSize, size, memoWindowSizer }) => {
	const [topIsShown, setTopIsShown] = useState(true)
	const [svgDimensions, setSvgDimensions] = useState(defaultSVGDimension)


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
			className={`bg-gradient-brand relative ${
				topIsShown ? 'block' : 'hidden'
			}`}
		>
			<div className="p-2 text-center text-white md:py-4">
				Welcome to this site!
			</div>
			<button
				className="absolute top-50 right-1r transform -translate-y-1/2"
				onClick={() => setTopIsShown(false)}
			>
				<XMark
					color="white"
					width={svgDimensions.width}
					height={svgDimensions.height}
				/>
			</button>
		</div>
	)
}
