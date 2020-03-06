export const SvgButton = ({ children, handleOnClick, classes }) => (
	<button
		className={classes}
		onClick={handleOnClick ? () => handleOnClick() : null}
		
	>
		{children}
	</button>
)
