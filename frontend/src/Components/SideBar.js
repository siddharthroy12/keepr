import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { HiColorSwatch } from 'react-icons/hi'
import { MdDelete, MdInsertDriveFile } from 'react-icons/md'

import COLORS from '../colors'

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
								<MdInsertDriveFile />
							</div>
							<div className="nav-item-label">
								Notes
							</div>
						</Link>
					</li>
					{
						Object.keys(COLORS).map(Color => {
							return (
								<li
									className={location.pathname === `/color/${Color}` ? "nav-item nav-item-active" : "nav-item"}
									key={Color}
									>
									<Link to={`/color/${Color}`}>
										<div className="nav-item-icon">
											<HiColorSwatch style={{
												color: COLORS[Color],
												backgroundColor: Color === 'White' ? 'black': 'white',
												borderRadius: '50px',
												padding: '1px'
											}}/>
										</div>
										<div className="nav-item-label">
											{Color}
										</div>
									</Link>
								</li>
							)
						})
					}
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
