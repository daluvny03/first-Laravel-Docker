import { useEffect, useState } from 'react'
import api from './services/api'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    due_date: '',
  })

  const [editingId, setEditingId] = useState(null)

  const fetchTasks = () => {
    api.get('/tasks')
      .then((response) => {
        setTasks(response.data)
      })
      .catch((error) => {
        console.error('Gagal mengambil tasks:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (editingId) {
      api.put(`/tasks/${editingId}`, form)
        .then(() => {
          setEditingId(null)

          setForm({
            title: '',
            description: '',
            status: 'todo',
            priority: 'medium',
            due_date: '',
          })

          fetchTasks()
        })
        .catch((error) => {
          console.error('Gagal mengupdate task:', error)
        })

      return
    }

    api.post('/tasks', form)
      .then(() => {
        setForm({
          title: '',
          description: '',
          status: 'todo',
          priority: 'medium',
          due_date: '',
        })

        fetchTasks()
      })
      .catch((error) => {
        console.error('Gagal membuat task:', error)
      })
  }

  const handleDelete = (id) => {
    api.delete(`/tasks/${id}`)
      .then(() => {
        fetchTasks()
      })
      .catch((error) => {
        console.error('Gagal menghapus task:', error)
      })
  }

  const handleEdit = (task) => {
    setEditingId(task.id)

    setForm({
      title: task.title,
      description: task.description || '',
      status: task.status,
      priority: task.priority,
      due_date: task.due_date || '',
    })
  }

  return (
    <div>
      <h1>Task Management</h1>

      <h2>Tambah Task</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <br />
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>Description</label>
          <br />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>Status</label>
          <br />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <br />

        <div>
          <label>Priority</label>
          <br />
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <br />

        <div>
          <label>Due Date</label>
          <br />
          <input
            type="date"
            name="due_date"
            value={form.due_date}
            onChange={handleChange}
          />
        </div>

        <br />

        <button type="submit">
          {editingId ? 'Update Task' : 'Tambah Task'}
        </button>
      </form>

      <hr />

      <h2>Daftar Task</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {tasks.map((task) => (
            <div key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
              <p>Priority: {task.priority}</p>
              <p>Deadline: {task.due_date || '-'}</p>

              <button onClick={() => handleDelete(task.id)}>
                Delete
              </button>

              <button onClick={() => handleEdit(task)}>
                Edit
              </button>

              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App