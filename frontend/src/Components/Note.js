import './Note.css'

export default function Note({ note }) {
	return (
		<div className="note">
			<p className="note-title">{note.title}</p>
			<p className="note-body">{note.body}</p>
			<div className="note-overlay">
				<p>p</p>
			</div>
		</div>
	)
}
