import Link from 'next/link'

export const ShoeCard = ({ image, name, price, id }) => (
	<Link href="/shoe/[shoeId]" as={`/shoe/${id}`}>
		<div className="cursor-pointer mb-4 w-36">
			<img
				className="border-solid border-2 border-gray-200"
				src={image}
				alt=""
			/>
			<div className="bg-gray-200 flex flex-col min-h-32 justify-evenly">
				<p className="text-center text-md">{name}</p>
				<strong className="block text-center mt-2">${price}</strong>
			</div>
		</div>
	</Link>
)
