import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/Routes'
import './index.scss'


const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <RouterProvider router={routes}/>
    </React.StrictMode>
  )
}

