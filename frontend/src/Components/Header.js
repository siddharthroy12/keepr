import { useDispatch, useSelector } from 'react-redux'
import { fetchNotes } from '../Actions/notesActions'
import { BiRefresh } from 'react-icons/bi'
import { HiMenuAlt1 } from 'react-icons/hi'
import { FaFileAlt } from 'react-icons/fa'
import { toggleSideBar } from '../Actions/sideBarActions'
import './Header.css'

export default function Header() {
	const dispatch = useDispatch()
	const notesState = useSelector(state => state.notes)

	const onRefresh = () => {
		dispatch(fetchNotes())
	}

	const onToggle = () => {
		dispatch(toggleSideBar())
	}

	return (
		<header>
			<div className="header-left">
				<button className='icon-button' onClick={onToggle}>
					<HiMenuAlt1 />
				</button>
				<div className="header-logo">
					<FaFileAlt style={{ transform: 'scale(3)', color: '#FFBA00'}}/> Keepr
				</div>
			</div>
			
			<div className="header-right">
			<button
				className={notesState.loading ? 'icon-button spin': 'icon-button'}
				onClick={onRefresh}
				disabled={notesState.loading}>
				<BiRefresh />
			</button>
			</div>
		</header>
	)
}
