import { useSelector } from 'react-redux'
import { AiOutlineFileText } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import './SideBar.css'

export default function SideBar() {
	const sideBarState = useSelector(state => state.sideBar)
	return (
		<aside className="side-bar" style={{ width: sideBarState.expand ? '20rem' : '5rem' }}>
			<nav>
				<ul>
					<li className="nav-item nav-item-active">
						<div className="nav-item-icon">
							<AiOutlineFileText />
						</div>
						<div className="nav-item-label">
							Notes
						</div>
					</li>
					<li className="nav-item">
						<div className="nav-item-icon">
							<MdDelete />
						</div>
						<div className="nav-item-label">
							Notes
						</div>
					</li>
				</ul>
			</nav>
		</aside>
	)
}
