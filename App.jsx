import { useState } from 'react'
import LoginComponent from './LoginComponent'
import SignUp from './CreateAccountComponent'
import './App.css'
import AddServerForm from './NewServerFormComponent'

function App() {


  return (
    <>
      <LoginComponent/>
      <SignUp/>
      <AddServerForm/>
    </>
  )
}

export default App
