import { useEffect, useRef, useState } from 'react'
import { useDebounce } from '../../hooks'
import './TodoTemplate.scss'

type TodoTemplateProps = {
	type: 'to-do' | 'in-progress' | 'completed'
	hideTemplate: (type: 'to-do' | 'in-progress' | 'completed') => void
	// editTodo: (id: number, content: string) => void
}

export default function TodoTemplate({
	type,
	hideTemplate,
}: // editTodo,
TodoTemplateProps) {
	const [inputValue, setInputValue] = useState<string | null>(null)
	const textAreaRef = useRef(null)
	const debouncedInputValue = useDebounce<string | null>(inputValue, 500)

	function handleChange(e) {
		setInputValue(e.target.value)
	}

	const resizeTextArea = () => {
		textAreaRef.current.style.height = 'auto'
		textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
	}

	useEffect(resizeTextArea, [inputValue])

	useEffect(() => {
		// editTodo(id, debouncedInputValue)
		if (debouncedInputValue) {
			console.log(debouncedInputValue)
			hideTemplate(type)
		}
	}, [debouncedInputValue])

	return (
		<>
			<textarea
				onChange={(e) => handleChange(e)}
				value={inputValue === null ? '' : inputValue}
				placeholder='Type something...'
				ref={textAreaRef}
				rows={1}
				className={`todo-container ${type}-todo`}
			/>
		</>
	)
}
