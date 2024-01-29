import { useEffect, useState } from 'react'
import './App.scss'
import CreateTodo from './components/CreateTodo/CreateTodo'
import Todo from './components/Todo/Todo'

type TypeTodo = {
	id: number
	content: string
	type: 'to-do' | 'in-progress' | 'completed'
}

function App() {
	const [todos, setTodos] = useState<TypeTodo[]>([])

	// force focus on a created todo
	function handleSetTextAreaFocus(
		ref: React.MutableRefObject<HTMLTextAreaElement | null>,
		id: number
	) {
		if (todos.at(-1).id === id) {
			ref.current!.focus()
		}
	}

	function handleSendTodo(todo: TypeTodo) {
		if (localStorage.getItem('todos') === null) {
			setTodos(() => [todo])

			localStorage.setItem('todos', JSON.stringify([todo]))
		} else {
			localStorage.setItem('todos', JSON.stringify([...todos, todo]))
			setTodos((prevValue) => [...prevValue, todo])
		}
	}

	function handleEditTodo(id: number, [propName, value]: Array<string>) {
		const editedTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, [propName]: value } : todo
		)

		// pushing the todo object to the end of the array when changing the type
		if (propName === 'type') {
			const todoIndex = todos.findIndex((todo) => todo.id === id)

			editedTodos.push(editedTodos.splice(todoIndex, 1)[0])
		}

		setTodos(editedTodos)

		localStorage.setItem('todos', JSON.stringify(editedTodos))
	}

	function handleDeleteTodo(id: number) {
		const editedTodos = todos.filter((todo) => todo.id !== id)

		setTodos(editedTodos)

		localStorage.setItem('todos', JSON.stringify(editedTodos))
	}

	useEffect(() => {
		if (localStorage.getItem('todos')) {
			setTodos(JSON.parse(localStorage.getItem('todos') as string))
		}
	}, [])

	return (
		<div className='global-container'>
			<section className='description'>
				<h2>To-do List</h2>
				<ul>
					<li>Click on the todo to edit</li>
					<li>Edits save automatically</li>
					<li>Hover for more tools</li>
				</ul>
			</section>
			<main>
				<section className='todos-container to-do'>
					<div className='todos-container__title'>To-do</div>
					<div className='todos-container__todos'>
						{todos
							?.filter((todo) => todo.type === 'to-do')
							.map((todo) => (
								<Todo
									editTodo={handleEditTodo}
									setTextAreaFocus={handleSetTextAreaFocus}
									deleteTodo={handleDeleteTodo}
									id={todo.id}
									content={todo.content}
									type={todo.type}
									key={todo.id}
								/>
							))}
						<CreateTodo
							sendTodo={(todo: TypeTodo) => handleSendTodo(todo)}
							type={'to-do'}
						/>
					</div>
				</section>

				<section className='todos-container in-progress'>
					<div className='todos-container__title'>In progress</div>
					<div className='todos-container__todos'>
						{todos
							?.filter((todo) => todo.type === 'in-progress')
							.map((todo) => (
								<Todo
									editTodo={handleEditTodo}
									setTextAreaFocus={handleSetTextAreaFocus}
									deleteTodo={handleDeleteTodo}
									content={todo.content}
									type={todo.type}
									id={todo.id}
									key={todo.id}
								/>
							))}
						<CreateTodo
							sendTodo={(todo: TypeTodo) => handleSendTodo(todo)}
							type={'in-progress'}
						/>
					</div>
				</section>

				<section className='todos-container completed'>
					<div className='todos-container__title'>Complete</div>
					<div className='todos-container__todos'>
						{todos
							?.filter((todo) => todo.type === 'completed')
							.map((todo) => (
								<Todo
									editTodo={handleEditTodo}
									setTextAreaFocus={handleSetTextAreaFocus}
									deleteTodo={handleDeleteTodo}
									content={todo.content}
									type={todo.type}
									id={todo.id}
									key={todo.id}
								/>
							))}
						<CreateTodo
							sendTodo={(todo: TypeTodo) => handleSendTodo(todo)}
							type={'completed'}
						/>
					</div>
				</section>
			</main>
		</div>
	)
}

export default App
