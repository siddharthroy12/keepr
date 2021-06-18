import { useState } from 'react'
import { useSelector } from 'react-redux'
import Note from '../Components/Note'
import NoteEditor from '../Components/NoteEditor'
import Modal from '../Components/Modal'
import './HomeScreen.css'

export default function HomeScreen() {
	const notes = useSelector(state => state.notes)
	const [showModal, setShowModal] = useState(false)

	return (
		<main className="home">
			<div className="home-top">
				{showModal && (
					<Modal child={NoteEditor} close={() => setShowModal(false)} />
				)}
				<button onClick={() => setShowModal(true)} className="create-note-btn">
					Take a note...
				</button>
			</div>
			<div className="collection-grid">
				{notes.notes.map(note => <Note note={note} />)}
			</div>
		</main>
	)
}