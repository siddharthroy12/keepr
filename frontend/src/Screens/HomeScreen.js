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

	const onSave = (note) => {
		setShowModal(false)
		console.log(note)
		dispatch(createNote(note.title, note.body, note.color))
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
			<div className="collection-grid">
				{notes.notes.map(note => {
					if (!note.trashed) {
						return <Note note={note} key={note._id} />
					}
					else return null
				})}
			</div>
		</main>
	)
}