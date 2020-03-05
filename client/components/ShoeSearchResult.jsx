import Link from 'next/link'

export const ShoeSearchResult = ({ id, image, name }) => (
	<li className="border-b-2 cursor-pointer p-4">
		<Link href={`/shoe/${id}`}>
			<div className="flex ml-8">
				<img className="block mr-4 w-24" src={image} alt={name} />
				<div className="self-center font-semibold">{name}</div>
			</div>
		</Link>
	</li>
)
