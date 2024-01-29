import { useEffect, useRef, useState } from 'react'
import { useDebounce } from '../../hooks'
import './Todo.scss'

type TodoProps = {
	id: number
	content: string
	type: 'to-do' | 'in-progress' | 'completed'
	editTodo: (id: number, [propName, value]: Array<string>) => void
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
	const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
	const debouncedInputValue = useDebounce<string>(inputValue, 500)

	const handleMouseEnterTextArea = () => {
		setStyle({ display: 'flex' })
	}

	const handleMouseLeaveTextArea = () => {
		setStyle({ display: 'none' })
	}

	// hover menu acts glitchy without these ones
	function handleMouseEnterMenu() {
		setStyle({ display: 'flex' })
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
		// deleting the todo on focus leave if it's empty
		if (e.target.value === '') {
			deleteTodo(id)
		}
	}

	function handleMoveTodo(type: 'to-do' | 'in-progress' | 'completed') {
		editTodo(id, ['type', type])
	}

	useEffect(() => {
		// textarea autoresize
		textAreaRef.current!.style.height = 'auto'
		textAreaRef.current!.style.height = textAreaRef.current!.scrollHeight + 'px'
	}, [inputValue])

	useEffect(() => {
		editTodo(id, ['content', debouncedInputValue])
	}, [debouncedInputValue])

	useEffect(() => {
		// force focus when rendered
		if (inputValue === '') {
			setTextAreaFocus(textAreaRef, id)
		}

		textAreaRef.current!.style.height = 'auto'
		textAreaRef.current!.style.height = textAreaRef.current!.scrollHeight + 'px'
	}, [])

	return (
		<div className={`todo-container ${type}-todo`}>
			<textarea
				onChange={(e) => handleChange(e)}
				onMouseEnter={handleMouseEnterTextArea}
				onMouseLeave={handleMouseLeaveTextArea}
				value={inputValue}
				ref={textAreaRef}
				onBlur={(e) => handleFocusOut(e)}
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
				{type !== 'to-do' && (
					<div className='menu-option'>
						<button
							onClick={() => handleMoveTodo('to-do')}
							className='move-btn'
						>
							<svg
								width='20px'
								height='20px'
								viewBox='0 0 16 16'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
							>
								<path fill='#f4d5d5' d='M8 3a5 5 0 100 10A5 5 0 008 3z' />
							</svg>
						</button>
					</div>
				)}
				{type !== 'in-progress' && (
					<div className='menu-option'>
						<button
							onClick={() => handleMoveTodo('in-progress')}
							title='Move todo'
							className='move-btn'
						>
							<svg
								width='20px'
								height='20px'
								viewBox='0 0 16 16'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
							>
								<path fill='#f6eac4' d='M8 3a5 5 0 100 10A5 5 0 008 3z' />
							</svg>
						</button>
					</div>
				)}
				{type !== 'completed' && (
					<div className='menu-option'>
						<button
							onClick={() => handleMoveTodo('completed')}
							title='Move todo'
							className='move-btn'
						>
							<svg
								width='20px'
								height='20px'
								viewBox='0 0 16 16'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
							>
								<path fill='#dee7dc' d='M8 3a5 5 0 100 10A5 5 0 008 3z' />
							</svg>
						</button>
					</div>
				)}
				<div className='menu-option'>
					<button
						className='delete-btn'
						title='Delete todo'
						onClick={handleDelete}
					>
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
