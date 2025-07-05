
import './index.css'

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App.jsx'
import store from './Redux/store.js'
import {Toaster} from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <Provider store={store}>
 <App />
 <Toaster/>
 </Provider>
 </BrowserRouter>
   
  
)
