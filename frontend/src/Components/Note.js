import { useState } from "react"
import { useDispatch } from "react-redux"
import { AiOutlinePushpin } from "react-icons/ai"
import { MdDelete } from "react-icons/md"
import NoteEditor from "./NoteEditor"
import Modal from "./Modal"
import { updateNote } from "../Actions/notesActions"
import COLORS from '../colors'
import './Note.css'

export default function Note({ note: initialNote }) {
	const [note, setNote] = useState(initialNote)
	const [showModal, setShowModal] = useState(false)
	const dispatch = useDispatch()

	const onSave = (noteSaved) => {
		setNote(noteSaved)
		setShowModal(false)
		dispatch(updateNote(note._id, noteSaved.title, noteSaved.body, noteSaved.color ))
	}

	return (
		<div className="note" style={
			{
				backgroundColor: note.color ? note.color : 'none',
				color: note.color === COLORS.Black || note.color === COLORS.Brown ? 'white': 'black'
			}
		}>
			{showModal && <Modal child={NoteEditor} close={() => setShowModal(false)} childProps={{onSave, note}} />}
				<p className="note-title" dangerouslySetInnerHTML={{ __html: note.title }} />
				<p className="note-body" dangerouslySetInnerHTML={{ __html: note.body }} />
				<div className="note-overlay" onClick={() => setShowModal(true)}>
					<div className="note-top-buttons" onClick={ e => e.stopPropagation() }>
						<button className="icon-button" style={{marginLeft: 'auto'}}>
							<AiOutlinePushpin />
						</button>
					</div>
					<div className="note-bottom-buttons" onClick={ e => e.stopPropagation() }>
						{Object.keys(COLORS).map(Color => (
							<button
								className={COLORS[Color] === note.color ? 'color-button color-button-selected' : 'color-button'}
								style={{backgroundColor: COLORS[Color], width: '1.5rem', height: '1.5rem'}}
								onClick={() => setNote({...note, color: COLORS[Color]})}
								key={Color}
							/>
						))}
						<button className="icon-button" style={{marginLeft: 'auto'}}>
							<MdDelete />
						</button>
					</div>
				</div>
		</div>
	)
}
