import axios from 'axios'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import Note from '../Components/Note'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import genConfig from '../Utils/genConfig'

export default function SearchScreen() {
	const [notes, setNotes] = useState([])
	const [loading, setLoading] = useState(true)
	const location = useLocation()

	useEffect(() => {
		setLoading(true)
		let unmounted = false
		let source = axios.CancelToken.source()

		axios.get(`/api/notes/search${location.search}`, { cancelToken: source.token, ...genConfig() })
			.then(a => {
				if (!unmounted) {
					setLoading(false)
					setNotes(a.data)
				}
			}).catch(err => {
				if (!unmounted) {
					setLoading(false)
				}
			})

		return function () {
			unmounted = true
      source.cancel("Cancelling in cleanup")
		}
	}, [location])

	return (
		<div style={{padding: '2rem'}}>
			{loading=== true && <AiOutlineLoading3Quarters className="center-horizontal spin" style={{fontSize: '2rem'}}/>}
			{notes.map(note => <Note note={note} key={note._id}/>)}
			{
				loading === false && notes.length === 0 ? (
					<p className="center-horizontal">No Matching Results</p>
				) : null
			}
		</div>
	)
}
