import './Header.css'

import { AiFillFileText } from 'react-icons/ai'

export default function Header() {
	return (
		<header>
			<div className="header-logo">
				<AiFillFileText style={{ transform: 'scale(4)', color: '#FFBA00'}}/> Keepr
			</div>
		</header>
	)
}
