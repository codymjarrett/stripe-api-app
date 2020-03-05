import { useContext, useEffect } from 'react'
import { ShoeSearchResult } from './ShoeSearchResult'
import { AppContext } from '../util/context'

export const ShoeSearch = () => {
    const { state, dispatch } = useContext(AppContext)
	useEffect(() => {}, [state])
	return (
		<>
			{state.searchSelection.length > 0 ? (
				<div className="fixed bg-white top-6r left-0 right-0 -bottom-0">
					<ul className="p-4">
						{state.filteredSearch.map(({ id, name, image }) => (
							<ShoeSearchResult id={id} name={name} image={image} />
						))}
					</ul>
				</div>
			) : null}
		</>
	)
}
