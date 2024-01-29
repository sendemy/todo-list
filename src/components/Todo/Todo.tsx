import { useEffect, useRef, useState } from 'react'
import { useDebounce } from '../../hooks'
import './Todo.scss'

type TodoProps = {
	id: number
	content: string
	type: string
	editTodo: (id: number, content: string) => void
	setTextAreaFocus: (
		ref: React.MutableRefObject<HTMLTextAreaElement | null>,
		id: number
	) => void
	deleteTodo: (id: number) => void
}

export default function Todo({
	content,
	type,
	id,
	editTodo,
	setTextAreaFocus,
	deleteTodo,
}: TodoProps) {
	const [inputValue, setInputValue] = useState<string>(content)
	const [style, setStyle] = useState({ display: 'none' })
	// const [toggleEdit, setToggleEdit] = useState(false)
	const textAreaRef = useRef(null)
	const debouncedInputValue = useDebounce<string>(inputValue, 500)

	const handleMouseEnterTextArea = () => {
		setStyle({ display: 'block' })
	}

	const handleMouseLeaveTextArea = () => {
		setStyle({ display: 'none' })
	}

	function handleMouseEnterMenu() {
		setStyle({ display: 'block' })
	}

	function handleMouseLeaveMenu() {
		setStyle({ display: 'none' })
	}

	function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setInputValue(e.target.value)
	}

	function handleDelete() {
		deleteTodo(id)
	}

	function handleFocusOut(e: React.FocusEvent<HTMLTextAreaElement, Element>) {
		// handleToggleEdit()

		if (e.target.value === '') {
			deleteTodo(id)
		}
	}

	// function handleToggleEdit() {
	// 	setToggleEdit(!toggleEdit)
	// }

	useEffect(() => {
		textAreaRef.current.style.height = 'auto'
		textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
	}, [inputValue])

	useEffect(() => {
		editTodo(id, debouncedInputValue)
	}, [debouncedInputValue])

	useEffect(() => {
		if (inputValue === '') {
			setTextAreaFocus(textAreaRef, id)
		}
	}, [])

	return (
		<div className='todo-container' draggable>
			<textarea
				onChange={(e) => handleChange(e)}
				onMouseEnter={handleMouseEnterTextArea}
				onMouseLeave={handleMouseLeaveTextArea}
				value={inputValue}
				ref={textAreaRef}
				onBlur={(e) => handleFocusOut(e)}
				// onClick={handleToggleEdit}
				// readOnly={toggleEdit}
				placeholder='Type something...'
				rows={1}
				className={`todo-textarea ${type}-todo`}
			/>
			<div
				className='todo-menu'
				onMouseEnter={handleMouseEnterMenu}
				onMouseLeave={handleMouseLeaveMenu}
				style={style}
			>
				<div>
					<button className='delete-btn' onClick={handleDelete}>
						<svg
							width='20px'
							height='20px'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M10 11V17'
								stroke='#000000'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M14 11V17'
								stroke='#000000'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M4 7H20'
								stroke='#000000'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z'
								stroke='#000000'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z'
								stroke='#000000'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	)
}
