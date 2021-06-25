import { useState } from 'react'
import ContentEditable from 'react-contenteditable'
import { AiOutlinePushpin, AiFillPushpin } from "react-icons/ai"

import COLORS from '../colors'
import './NoteEditor.css'

export default function NoteEditor({ note: prevNote, onSave }) {
	const [note, setNote] = useState(prevNote ? prevNote : {
		title: '',
		body: '',
		color: COLORS.White
	})

	return (
		<div className="note-editor" style={
			{
				backgroundColor: note.color ? note.color : 'white',
				color: note.color === COLORS.Black || note.color === COLORS.Brown ? 'white': 'black'
			}
		}>
			<div className="note-editor-top">
				<ContentEditable
					className="note-editor-title"
					html={note.title}
					placeholder="Title"
					onChange={(e) => setNote({...note, title: e.target.value})}
				/>
				<button className="icon-button" onClick={() => setNote({...note, pinned: !note.pinned})}>
					{note.pinned ? (
						<AiFillPushpin />
					) : (
						<AiOutlinePushpin />
					)}
				</button>
				
			</div>
			<ContentEditable
					className="note-editor-body"
					html={note.body}
					placeholder="Note"
					onChange={(e) => setNote({...note, body: e.target.value})}
				/>
			<div className="note-editor-bottom">
				<div className="note-editor-options">
				{Object.keys(COLORS).map(Color => (
					<button
						className={COLORS[Color] === note.color ? 'color-button color-button-selected' : 'color-button'}
						style={{backgroundColor: COLORS[Color]}}
						onClick={() => setNote({...note, color: COLORS[Color]})}
						key={Color}
					/>
				))}
				</div>
				<button
					className="btn-primary"
					onClick={() => onSave ? onSave(note) : null}
					disabled={note.title === '' && note.body === ''}
				>
					Save	
				</button>
			</div>
		</div>
	)
}
