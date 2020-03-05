import { hero } from '../images/hero'

export const Hero = () => (
	<div>
		<div
			className="h-56 bg-cover border-t-2 border-b-2 border-sapphire"
			style={{ backgroundImage: `url(${hero})` }}
		></div>
	</div>
)
