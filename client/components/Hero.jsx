import { useContext, useEffect } from 'react'
import { hero } from '../images/hero'
import { AppContext } from '../context'

export const Hero = () => {
	const { state, dispatch } = useContext(AppContext)
	useEffect(() => {}, [state])

	return (
		<div className="relative">
			{state.searchIsActive ? (
				<div className="absolute bg-white top-0 left-0 right-0 bottom-0">
					hello
				</div>
			) : null}
			<div
				className="h-56 bg-cover border-t-2 border-b-2 border-sapphire"
				style={{ backgroundImage: `url(${hero})` }}
			></div>
		</div>
	)
}
