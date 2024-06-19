import React from 'react'
import Header from './components/Header'
import AddTask from './components/AddTask'
import ShowTask from './components/ShowTask'
import Login from './components/Login'
import Register from './components/Register'
import { AuthContext } from './AuthContext'
import './App.css'
import { useState, useEffect, useContext } from 'react'
import { getAllTasks, addTask, updateTask, deleteTask } from './db'
export default function App() {

  const [tasklist, setTasklist] = useState(JSON.parse(localStorage.getItem("tasklist")) || [])
  const [task, setTask] = useState({})
  const [isRegister, setIsRegister] = useState(false)
  const {user, logout} = useContext(AuthContext)

  useEffect(() => {
    localStorage.setItem('tasklist', JSON.stringify(tasklist))
  }, [tasklist])
  
  const toggleForm = () => {
    setIsRegister(!isRegister)
  }

  
    useEffect(() => {
      if(user){
        const fetchTaks = async() => {
          const tasks = await getAllTasks();
          const userTasks  = tasks.filter(task => task.username === user.username)
          setTasklist(userTasks)
        }
        fetchTaks()
      }
    }, [])

  useEffect(() => {
    const saveTasks = async() => {
      await Promise.all(tasklist.map(task => updateTask(task)))
    }
    saveTasks();
  }, [])

  const hanleAddTask =  async(newTask) => {
    const id = await addTask(newTask)
    setTasklist([...tasklist, {...newTask, id}])
  }
  const handleDeleteTask =  async(id) => {
    await deleteTask(id)
    const updatedTasklist = tasklist.fitler(todo => todo.id !== id)
    setTasklist(updatedTasklist)
  }
  const handleUpdateTask =  async(taskToUpdate) => {
    await Promise.all(taskToUpdate.map(task => updateTask(task)))
    setTasklist(taskToUpdate)
    setTask({});
  }
  
  return (
    <div className='App'>
      <Header />
      {user ? (
      <>
        <AddTask 
          tasklist={tasklist}
          setTasklist={hanleAddTask}
          task={task}
          setTask={setTask}
          updateTask={handleUpdateTask}
        />
        <ShowTask 
          tasklist={tasklist}
          setTasklist={setTasklist}
          task={task}
          setTask={setTask}
          handleDeleteTask={handleDeleteTask}
        />
      </>
      ) : (
        <>
          {isRegister ? <Register toggleForm={toggleForm} /> : <Login toggleForm={toggleForm} />}
        </>
      )
      
    }
    </div>
  )
}
