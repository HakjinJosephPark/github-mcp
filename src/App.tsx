import { useState, useMemo } from 'react'
import type { Todo, FilterType } from './types/todo'
import { TodoFilter } from './components/TodoFilter'
import './App.css'

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: '1',
      text: 'Learn React',
      completed: false,
      createdAt: new Date()
    },
    {
      id: '2',
      text: 'Build Todo App',
      completed: true,
      createdAt: new Date()
    },
    {
      id: '3',
      text: 'Add Filter Feature',
      completed: false,
      createdAt: new Date()
    }
  ])
  
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all')
  const [newTodoText, setNewTodoText] = useState('')

  // 필터링된 todos 계산
  const filteredTodos = useMemo(() => {
    switch (currentFilter) {
      case 'active':
        return todos.filter(todo => !todo.completed)
      case 'completed':
        return todos.filter(todo => todo.completed)
      default:
        return todos
    }
  }, [todos, currentFilter])

  // 각 필터별 개수 계산
  const counts = useMemo(() => ({
    all: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length
  }), [todos])

  const addTodo = () => {
    if (newTodoText.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: newTodoText.trim(),
        completed: false,
        createdAt: new Date()
      }
      setTodos([...todos, newTodo])
      setNewTodoText('')
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="app">
      <h1>Todo App</h1>
      
      <div className="todo-input">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="새로운 할 일을 입력하세요..."
        />
        <button onClick={addTodo}>추가</button>
      </div>

      <TodoFilter
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
        counts={counts}
      />

      <div className="todo-list">
        {filteredTodos.map(todo => (
          <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className="todo-text">{todo.text}</span>
            <button 
              className="delete-btn"
              onClick={() => deleteTodo(todo.id)}
            >
              삭제
            </button>
          </div>
        ))}
        {filteredTodos.length === 0 && (
          <p className="empty-message">
            {currentFilter === 'active' && '완료되지 않은 할 일이 없습니다.'}
            {currentFilter === 'completed' && '완료된 할 일이 없습니다.'}
            {currentFilter === 'all' && '할 일이 없습니다.'}
          </p>
        )}
      </div>
    </div>
  )
}

export default App
