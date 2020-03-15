export const Button = ({ handleButtonClick, text, large, small, round }) => (
	<button
		className={`bg-gray-900 hover:bg-gray-800 text-white w-full ${round &&
			'rounded-full'} rounded-md ${small && 'py-2'} ${large && 'py-6'}`}
		onClick={handleButtonClick}
	>
		{text}
	</button>
)
