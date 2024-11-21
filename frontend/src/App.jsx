import { useState, useEffect } from 'react'
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton 
} from '@mui/material'
import { Delete, CheckCircle } from '@mui/icons-material'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/todos`)
      setTodos(response.data.todos)
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    try {
      await axios.post(`${API_URL}/todos`, { title: newTodo })
      setNewTodo('')
      fetchTodos()
    } catch (error) {
      console.error('Error creating todo:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`)
      fetchTodos()
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  const handleToggleComplete = async (id, completed) => {
    try {
      console.log('Sending PUT request:', id, completed)
      const response = await axios.put(`${API_URL}/todos/${id}`, { completed: !completed })
      console.log('Response:', response.data)
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, completed: !completed } : todo
      ))
    } catch (error) {
      console.error('Error updating todo:', error)
      fetchTodos()
    }
  }

  return (
    <Container maxWidth="md" sx={{ 
      mt: 4,
      backgroundColor: '#f5f9ff', // Softer blue background
      padding: 4,
      borderRadius: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)'
    }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#1976d2' }}>
        Todo List
      </Typography>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Add new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          sx={{ mt: 1 }}
          fullWidth
        >
          Add Todo
        </Button>
      </form>

      <List sx={{ width: '100%' }}>
        <Typography variant="h6" sx={{ mt: 2, mb: 1, color: '#1976d2' }}>
          Active Tasks
        </Typography>
        {todos
          .filter(todo => !todo.completed)
          .map((todo) => (
            <ListItem 
              key={todo.id}
              sx={{ 
                padding: '16px 120px 16px 16px',  // Increased right padding for buttons
                width: '100%',                    // Ensure full width
                position: 'relative',             // Added for proper button positioning
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.04)'
                }
              }}
              secondaryAction={
                <div>    
                  <IconButton 
                    edge="end" 
                    onClick={() => handleToggleComplete(todo.id, todo.completed)}
                    sx={{ mr: 1 }}
                  >
                    <CheckCircle color={todo.completed ? "primary" : "action"} />
                  </IconButton>
                  <IconButton 
                    edge="end"
                    onClick={() => handleDelete(todo.id)}
                  >
                    <Delete />
                  </IconButton>
                </div>
              }
            >
              <ListItemText 
                primary={todo.title}
                secondary={new Date(todo.createdAt).toLocaleDateString()}
                sx={{ 
                  '.MuiListItemText-primary': { 
                    color: '#2c3e50',
                    textDecoration: todo.completed ? 'line-through' : 'none'
                  },
                  '.MuiListItemText-secondary': { color: '#5c6b7a' }
                }}
              />
            </ListItem>
          ))}

        <Typography variant="h6" sx={{ mt: 4, mb: 1, color: '#1976d2' }}>
          Completed Tasks
        </Typography>
        {todos
          .filter(todo => todo.completed)
          .map((todo) => (
            <ListItem 
              key={todo.id}
              sx={{ 
                padding: '16px 120px 16px 16px',  // Increased right padding for buttons
                width: '100%',                    // Ensure full width
                position: 'relative',             // Added for proper button positioning
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.04)'
                }
              }}
              secondaryAction={
                <div>    
                  <IconButton 
                    edge="end" 
                    onClick={() => handleToggleComplete(todo.id, todo.completed)}
                    sx={{ mr: 1 }}
                  >
                    <CheckCircle color={todo.completed ? "primary" : "action"} />
                  </IconButton>
                  <IconButton 
                    edge="end"
                    onClick={() => handleDelete(todo.id)}
                  >
                    <Delete />
                  </IconButton>
                </div>
              }
            >
              <ListItemText 
                primary={todo.title}
                secondary={new Date(todo.createdAt).toLocaleDateString()}
                sx={{ 
                  '.MuiListItemText-primary': { 
                    color: '#2c3e50',
                    textDecoration: todo.completed ? 'line-through' : 'none'
                  },
                  '.MuiListItemText-secondary': { color: '#5c6b7a' }
                }}
              />
            </ListItem>
          ))}
      </List>
    </Container>
  )
}

export default App
