import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Actions/loginActions'
import { fetchNotes } from '../Actions/notesActions'
import { useHistory } from 'react-router'
import { BiRefresh } from 'react-icons/bi'
import { HiMenuAlt1 } from 'react-icons/hi'
import { MdCancel, MdSearch, MdPerson, MdExitToApp, MdInsertDriveFile } from 'react-icons/md'
import { toggleSideBar } from '../Actions/sideBarActions'
import { useLocation } from 'react-router'
import './Header.css'

export default function Header() {
	const dispatch = useDispatch()
	const history = useHistory()
	const notesState = useSelector(state => state.notes)
	const loginState = useSelector(state => state.login)
	const [searchString, setSearchString] = useState('')
	const [showAccountDetail, setShowAccountDetail] = useState(false)
	const location = useLocation()
	const [showShadow, setShowShadow] = useState(window.scrollY > 0)

	const onScroll = () => {
		if (window.scrollY > 0) {
			setShowShadow(true)
		} else {
			setShowShadow(false)
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', onScroll)

		return () => {
			window.removeEventListener('scroll', onScroll)
		}
	}, [])

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

	const onLogout = () => {
		dispatch(logout())
	}

	return (
		<header style={{boxShadow: showShadow ? '0px 1px 6px -1px grey' : null}}>
			<div className="header-left">
				<button className='icon-button' onClick={onToggle}>
					<HiMenuAlt1 />
				</button>
				<div className="header-logo">
					<MdInsertDriveFile style={{ transform: 'scale(4)', color: '#FFBA00'}}/> Keepr
				</div>
			</div>
			<div className="header-center">
				<div className="search-bar-container">
					<MdSearch style={{width: '2rem', height: '2rem'}}/>
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
			<button
				onClick={() => setShowAccountDetail(prev => !prev)}
				className="icon-button">
				<MdPerson />
			</button>
			{showAccountDetail && (
				<div className="account-detail">
					<p>{loginState.info.username}</p>
					<button
					className="icon-button"
					onClick={onLogout}>
						<MdExitToApp />
					</button>
				</div>
			)}
			</div>
		</header>
	)
}
