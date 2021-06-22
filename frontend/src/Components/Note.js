import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { AiOutlinePushpin } from "react-icons/ai"
import { MdDelete, MdDeleteForever, MdRestore } from "react-icons/md"
import NoteEditor from "./NoteEditor"
import Modal from "./Modal"
import { updateNote, trashNote, restoreNote, deleteNote } from "../Actions/notesActions"
import COLORS from '../colors'
import './Note.css'

export default function Note({ note: initialNote }) {
	const [note, setNote] = useState(initialNote)
	const [showModal, setShowModal] = useState(false)
	const dispatch = useDispatch()

	useEffect(() => {
		setNote(initialNote)
	}, [initialNote])

	const onSave = (noteSaved) => {
		setNote(noteSaved)
		setShowModal(false)
		dispatch(updateNote(note._id, noteSaved.title, noteSaved.body, noteSaved.color ))
	}

	const onTrash = () => {
		dispatch(trashNote(note._id))
	}

	const onRestore = () => {
		dispatch(restoreNote(note._id))
	}

	const onDelete = () => {
		dispatch(deleteNote(note._id))
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
				<div className="note-overlay" onClick={() => (!note.trashed && !note.pending) ? setShowModal(true) : null}>
					{note.pending ? (
						<div className="note-bottom-buttons">
							<p>Pending...</p>
						</div>
					) : (
						<>
							<div className="note-top-buttons" onClick={ e => e.stopPropagation() }>
							{!note.trashed && (
								<button className="icon-button" style={{marginLeft: 'auto'}}>
									<AiOutlinePushpin />
								</button>
							)}
							</div>
							<div className="note-bottom-buttons" onClick={ e => e.stopPropagation() }>
								{!note.trashed ? (
									<>
										{Object.keys(COLORS).map(Color => (
											<button
												className={COLORS[Color] === note.color ? 'color-button color-button-selected' : 'color-button'}
												style={{backgroundColor: COLORS[Color], width: '1.5rem', height: '1.5rem'}}
												onClick={() => setNote({...note, color: COLORS[Color]})}
												key={Color}
											/>
										))}
										<button className="icon-button" style={{marginLeft: 'auto'}} onClick={onTrash}>
											<MdDelete />
										</button>
									</>
								) : (
									<>
										<button className="icon-button" onClick={onRestore}>
											<MdRestore />
										</button>
										<button className="icon-button" onClick={onDelete}>
											<MdDeleteForever />
										</button>
								</>
							)}
						</div>
						</>
					)}
				</div>
		</div>
	)
}
