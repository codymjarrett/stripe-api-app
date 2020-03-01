export const Hamburger = ({ color, width, height }) => (
	<svg
		className="cursor-pointer"
		width={width}
		height={height}
		fill={color}
		viewBox="0 0 24 24"
	>
		<path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
	</svg>
)
