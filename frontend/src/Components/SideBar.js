import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { AiOutlineFileText } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import './SideBar.css'

export default function SideBar() {
	const sideBarState = useSelector(state => state.sideBar)
	const location = useLocation()

	return (
		<aside className="side-bar" style={{ width: sideBarState.expand ? '20rem' : '5rem' }}>
			<nav>
				<ul>
					<li className={location.pathname === '/' ? "nav-item nav-item-active" : "nav-item"}>
						<Link to='/'>
							<div className="nav-item-icon">
								<AiOutlineFileText />
							</div>
							<div className="nav-item-label">
								Notes
							</div>
						</Link>
					</li>
					<li className={location.pathname === '/trash' ? "nav-item nav-item-active" : "nav-item"}>
						<Link to='/trash'>
							<div className="nav-item-icon">
								<MdDelete />
							</div>
							<div className="nav-item-label">
								Trash
							</div>
						</Link>
					</li>
				</ul>
			</nav>
		</aside>
	)
}
