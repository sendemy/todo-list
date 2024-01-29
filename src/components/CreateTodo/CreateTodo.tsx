import './CreateTodo.scss'

type TypeTodo = {
	id: number
	content: string
	type: 'to-do' | 'in-progress' | 'completed'
}

type CreateTodoProps = {
	sendTodo: (todo: TypeTodo) => void
	type: 'to-do' | 'in-progress' | 'completed'
}

export default function CreateTodo({ sendTodo, type }: CreateTodoProps) {
	function handleSendTodo() {
		sendTodo({
			id: Math.floor(Math.random() * 1000000),
			content: '',
			type: type,
		})
	}

	return (
		<button
			onClick={handleSendTodo}
			className={`add-todo-container ${type}-createTodo`}
		>
			<span className='add-todo-text'>+</span>
			<span className='add-todo-text'>New</span>
		</button>
	)
}
