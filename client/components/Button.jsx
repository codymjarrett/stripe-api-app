export const Button = ({ handleButtonClick, text }) => (
	<button
		className="bg-gray-900 hover:bg-gray-800 text-white w-full py-6 rounded-md"
		onClick={handleButtonClick}
	>
		{text}
	</button>
)
