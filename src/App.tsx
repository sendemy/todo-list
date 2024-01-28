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
	// const [showTemplate, setShowTemplate] = useState({
	// 	type: '',
	// 	show: false,
	// })

	// function handleHideTemplate(type: 'to-do' | 'in-progress' | 'completed') {
	// 	console.log(showTemplate)
	// 	console.log(12312)

	// 	setShowTemplate(() => ({ type: type, show: false }))
	// }

	function handleSetTextAreaFocus(ref, id) {
		if (todos.at(-1).id === id) {
			ref.current.focus()
		}
	}

	function handleSendTodo(todo: TypeTodo) {
		if (JSON.parse(localStorage.getItem('todos')) === null) {
			setTodos(() => [todo])

			localStorage.setItem('todos', JSON.stringify([todo]))
		} else {
			localStorage.setItem('todos', JSON.stringify([...todos, todo]))
			setTodos((prevValue) => [...prevValue, todo])
		}

		// setShowTemplate(() => ({ type: todo.type, show: true }))

		// console.log(document.querySelector('.todos-container.to-do'))
	}

	function handleEditTodo(id: number, content: string) {
		const editedTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, content: content } : todo
		)
		setTodos(editedTodos)

		localStorage.setItem('todos', JSON.stringify(editedTodos))
	}

	useEffect(() => {
		if (JSON.parse(localStorage.getItem('todos'))) {
			setTodos(JSON.parse(localStorage.getItem('todos')))
		}
	}, [])

	useEffect(() => {
		console.log(todos)
	}, [todos])

	return (
		<div className='global-container'>
			<div>
				<h2>To-do List</h2>
				<p>Click on the todo to edit</p>
			</div>
			<div className='todos-container to-do'>
				<div className='todos-container__title'>To-do</div>
				<div className='todos-container__todos'>
					{todos
						?.filter((todo) => todo.type === 'to-do')
						.map((todo) => (
							<Todo
								editTodo={handleEditTodo}
								setTextAreaFocus={handleSetTextAreaFocus}
								content={todo.content}
								type={todo.type}
								id={todo.id}
								key={todo.id}
							/>
						))}
					{/* {showTemplate.show && showTemplate.type === 'to-do' && (
						<TodoTemplate
							type={'to-do'}
							hideTemplate={(type) => handleHideTemplate(type)}
						/>
					)} */}
					<CreateTodo
						sendTodo={(todo: TypeTodo) => handleSendTodo(todo)}
						type={'to-do'}
					/>
				</div>
			</div>

			<div className='todos-container in-progress'>
				<div className='todos-container__title'>In progress</div>
				<div className='todos-container__todos'>
					{todos
						?.filter((todo) => todo.type === 'in-progress')
						.map((todo) => (
							<Todo
								editTodo={handleEditTodo}
								setTextAreaFocus={handleSetTextAreaFocus}
								content={todo.content}
								type={todo.type}
								id={todo.id}
								key={todo.id}
							/>
						))}
					{/* {showTemplate.show && showTemplate.type === 'in-progress' && (
						<TodoTemplate type={'in-progress'} />
					)} */}
					<CreateTodo
						sendTodo={(todo: TypeTodo) => handleSendTodo(todo)}
						type={'in-progress'}
					/>
				</div>
			</div>

			<div className='todos-container completed'>
				<div className='todos-container__title'>Complete</div>
				<div className='todos-container__todos'>
					{todos
						?.filter((todo) => todo.type === 'completed')
						.map((todo) => (
							<Todo
								editTodo={handleEditTodo}
								setTextAreaFocus={handleSetTextAreaFocus}
								content={todo.content}
								type={todo.type}
								id={todo.id}
								key={todo.id}
							/>
						))}
					{/* {showTemplate.show && showTemplate.type === 'completed' && (
						<TodoTemplate type={'completed'} />
					)} */}
					<CreateTodo
						sendTodo={(todo: TypeTodo) => handleSendTodo(todo)}
						type={'completed'}
					/>
				</div>
			</div>
		</div>
	)
}

export default App
