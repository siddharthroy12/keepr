import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import Note from '../Components/Note'
import COLORS from '../colors'

export default function ColorScreen() {
	const { color } = useParams()
	const notes = useSelector(state => state.notes)
	const pinnedNotes = notes.notes.filter(note => note.pinned && note.color === COLORS[color])
	const isEmpty = !(notes.notes.filter(note => note.color === COLORS[color]).length > 0)

	return (
		<div className="color-screen" style={{padding: '2rem'}}>
			{pinnedNotes.length > 0 && (
				<>
				<p>Pinned Notes</p>
				<div className="collection-grid">
					{pinnedNotes.map(note => {
						if (!note.trashed && note.color === COLORS[color]) {
							return <Note note={note} key={note._id} />
						}
						else return null
					})}
				</div>
				<p>Others</p>
				</>
			)}
			<div className="collection-grid">
				{notes.notes.map(note => {
					if (!note.trashed && !note.pinned && note.color === COLORS[color]) {
						return <Note note={note} key={note._id} />
					}
					else return null
				})}
			</div>
			{isEmpty && <p>No note found with this color</p>}
		</div>
	)
}
