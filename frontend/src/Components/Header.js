import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNotes } from '../Actions/notesActions'
import { useHistory } from 'react-router'
import { BiRefresh } from 'react-icons/bi'
import { HiMenuAlt1 } from 'react-icons/hi'
import { FaFileAlt } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'
import { toggleSideBar } from '../Actions/sideBarActions'
import { useLocation } from 'react-router'
import './Header.css'

export default function Header() {
	const dispatch = useDispatch()
	const history = useHistory()
	const notesState = useSelector(state => state.notes)
	const [searchString, setSearchString] = useState('')
	const location = useLocation()

	const onRefresh = () => {
		dispatch(fetchNotes())
	}

	const onToggle = () => {
		dispatch(toggleSideBar())
	}

	const onSearchInput = (e) => {
		setSearchString(e.target.value)

		if (e.target.value.length > 2) {
			history.push(`/search?search=${encodeURIComponent(e.target.value)}`)
		}
	}

	const notSearch = location.pathname !== '/search'

	const onSearchCancle = () => {
		history.push('/')
		setSearchString('')
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
			<div className="header-center">
				<div className="search-bar-container">
					<input 
						className="search-bar" type="text"
						value={searchString}
						placeholder="Search"
						onChange={onSearchInput}
					/>
					<button style={{display: (notSearch) ? 'none' : 'block'}} onClick={onSearchCancle}>
						<MdCancel className="icon-button"/>
					</button>
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
