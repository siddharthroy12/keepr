import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Note from '../Components/Note'
import NoteEditor from '../Components/NoteEditor'
import Modal from '../Components/Modal'
import { createNote } from '../Actions/notesActions'
import './HomeScreen.css'

export default function HomeScreen() {
	const notes = useSelector(state => state.notes)
	const [showModal, setShowModal] = useState(false)
	const dispatch = useDispatch()

	const pinnedNotes = notes.notes.filter(note => note.pinned)

	const onSave = (note) => {
		setShowModal(false)
		dispatch(createNote(note.title, note.body, note.color, note.pinned))
	}

	return (
		<main className="home">
			<div className="home-top">
				{showModal && (
					<Modal child={NoteEditor} close={() => setShowModal(false)} childProps={{onSave}} />
				)}
				<button onClick={() => setShowModal(true)} className="create-note-btn">
					Take a note...
				</button>
			</div>
			{pinnedNotes.length > 0 && (
				<>
				<p>Pinned Notes</p>
				<div className="collection-grid">
					{pinnedNotes.map(note => {
						if (!note.trashed) {
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
					if (!note.trashed && !note.pinned) {
						return <Note note={note} key={note._id} />
					}
					else return null
				})}
			</div>
		</main>
	)
}