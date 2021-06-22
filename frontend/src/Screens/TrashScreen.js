import { useSelector } from 'react-redux'
import Note from '../Components/Note'
import './TrashScreen.css'

export default function TrashScreen() {
	const notes = useSelector(state => state.notes)

	return (
		<main className="trash">
			<div className="collection-grid">
				{notes.notes.map(note => {
					if (note.trashed) {
						return <Note note={note} key={note._id}/>
					} else {
						return null
					}
				})}
			</div>
		</main>
	)
}