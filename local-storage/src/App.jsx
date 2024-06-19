import React from 'react'
import Header from './components/Header'
import AddTask from './components/AddTask'
import ShowTask from './components/ShowTask'
import Login from './components/Login'
import Register from './components/Register'
import { AuthContext } from './AuthContext'
import './App.css'
import { useState, useEffect, useContext } from 'react'
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
  return (
    <div className='App'>
      <Header />
      {user ? (
      <>
        <AddTask 
          tasklist={tasklist}
          setTasklist={setTasklist}
          task={task}
          setTask={setTask}
        />
        <ShowTask 
          tasklist={tasklist}
          setTasklist={setTasklist}
          task={task}
          setTask={setTask}
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
