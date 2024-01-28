import { useEffect, useRef, useState } from 'react'
import { useDebounce } from '../../hooks'
import './Todo.scss'

type TodoProps = {
	id: number
	content: string
	type: string
	editTodo: (id: number, content: string) => void
	setTextAreaFocus: (ref, id) => void
}

export default function Todo({
	content,
	type,
	id,
	editTodo,
	setTextAreaFocus,
}: TodoProps) {
	const [inputValue, setInputValue] = useState<string>(content)
	const textAreaRef = useRef(null)
	const debouncedInputValue = useDebounce<string>(inputValue, 500)

	function handleChange(e) {
		setInputValue(e.target.value)
	}

	const resizeTextArea = () => {
		textAreaRef.current.style.height = 'auto'
		textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
	}

	useEffect(resizeTextArea, [inputValue])

	useEffect(() => {
		editTodo(id, debouncedInputValue)
	}, [debouncedInputValue])

	useEffect(() => {
		if (inputValue === '') {
			// textAreaRef.current.focus()
			setTextAreaFocus(textAreaRef, id)
		}
	}, [])

	return (
		<>
			<textarea
				onChange={(e) => handleChange(e)}
				value={inputValue}
				ref={textAreaRef}
				placeholder='Type something...'
				rows={1}
				className={`todo-container ${type}-todo`}
			/>
		</>
	)
}
