import { useContext, useEffect } from 'react'
import { hero } from '../images/hero'
import Link from 'next/link'
import { AppContext } from '../util/context'
import { SET_FILTERED_SEARCH } from '../util/constants'

export const Hero = () => {
	const { state, dispatch } = useContext(AppContext)
	useEffect(() => {
	
	}, [state])

	return (
		<div className="relative">
			{state.searchSelection.length > 0 ? (
				<div className="fixed bg-white top-6r left-0 right-0 -bottom-0">
					<ul className="p-4">
						{state.filteredSearch.map(({ id, name, image }) => (
							<li className="border-b-2 cursor-pointer p-4">
								<Link href={`/shoe/${id}`}>
									<div className="flex ml-8">
										<img className="block mr-4 w-24" src={image} alt={name} />
										<div className="self-center font-semibold">
											{name}
										</div>
									</div>
								</Link>
							</li>
						))}
					</ul>
				</div>
			) : null}
			<div
				className="h-56 bg-cover border-t-2 border-b-2 border-sapphire"
				style={{ backgroundImage: `url(${hero})` }}
			></div>
		</div>
	)
}
