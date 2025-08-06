import React from 'react'
import './App.css'
import { RouterProvider } from 'react-router'
import Home from './components/home'
import Paste from './components/paste'
import ViewPaste from './components/viewPaste'
import NavBar from './components/NavBar'
import { createBrowserRouter } from 'react-router'
const router = createBrowserRouter([
  {
    path: '/',
    element: <div>
      <NavBar />
      <Home /></div>,
  },
  {
    path: '/paste',
    element: <div>
      <NavBar />
      <Paste />
    </div>,
  },
  {
    path: '/paste/:id',
    element: <div>
      <NavBar />
      <ViewPaste />
    </div>,
  }
])
function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
