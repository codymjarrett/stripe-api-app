import { useState, useEffect, useCallback } from 'react'
import { TopHeader } from './TopHeader'

export const Header = () => {
	return (
		<header>
			<TopHeader />
			<nav></nav>
		</header>
	)
}
