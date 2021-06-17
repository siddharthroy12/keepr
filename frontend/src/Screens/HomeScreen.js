import { useSelector } from 'react-redux'
import Note from '../Components/Note'
import './HomeScreen.css'

export default function HomeScreen() {
	const notes = useSelector(state => state.notes)

	return (
		<main className="home">
			<div className="collection-grid">
				{notes.notes.map(note => <Note note={note} />)}
			</div>
		</main>
	)
}