const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Database path
const DB_PATH = path.join(__dirname, 'data', 'todos.json');

// Read todos
app.get('/api/todos', async (req, res) => {
  console.log('GET /api/todos - Fetching all todos');
  try {
    const data = await fs.readFile(DB_PATH, 'utf8');
    console.log('Successfully retrieved todos');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading todos:', error);
    res.status(500).json({ error: 'Error reading todos' });
  }
});

// Create todo
app.post('/api/todos', async (req, res) => {
  console.log('POST /api/todos - Creating new todo:', req.body);
  try {
    const { title } = req.body;
    const data = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
    
    const newTodo = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    data.todos.push(newTodo);
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
    
    console.log('Successfully created todo:', newTodo);
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Error creating todo' });
  }
});

// Delete todo
app.delete('/api/todos/:id', async (req, res) => {
  console.log('DELETE /api/todos/:id - Deleting todo:', req.params.id);
  try {
    const { id } = req.params;
    const data = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
    const updatedData = data.todos.filter(todo => todo.id !== id);
    await fs.writeFile(DB_PATH, JSON.stringify({ todos: updatedData }, null, 2));
    console.log('Successfully deleted todo:', req.params.id);
    res.status(200).json({ message: 'Todo deleted' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Error deleting todo' });
  }
});

// Update todo
app.put('/api/todos/:id', async (req, res) => {
  console.log('PUT /api/todos/:id - Updating todo:', req.params.id, req.body);
  try {
    const { id } = req.params;
    const { completed } = req.body;
    
    const data = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
    const todoIndex = data.todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    data.todos[todoIndex] = {
      ...data.todos[todoIndex],
      completed
    };
    
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
    console.log('Successfully updated todo:', data.todos[todoIndex]);
    res.json(data.todos[todoIndex]);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Error updating todo' });
  }
});


// Check API status
app.get('/api/', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});