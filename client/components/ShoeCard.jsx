export const ShoeCard = ({ image, name, price }) => (
	<div className="w-40 cursor-pointer" >
		<img className="border-solid border-2 border-gray-200" src={image} alt="" />
		<div className="bg-gray-200 p-2">
			<p className="">{name}</p>
			<strong className="block text-center mt-2">${price}</strong>
		</div>
	</div>
)