import './Modal.css'

export default function Modal({ child: Child, childProps, close }) {
	return (
		<div className="modal" onClick={() => close()}>
			<div onClick={e => {
				e.stopPropagation()
			}}>
				<Child {...childProps}/>
			</div>
		</div>
	)
}
