import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SentimentAnalysis from "./pages/SentimentAnalysis";
import Features from './pages/Features'
import AboutUs from './pages/AboutUs'
import NotFound from './pages/NotFound.jsx'

import { 
  Route, 
  RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements, 
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <> 
      <Route path="/" element={<App/>}>
        <Route index element={<SentimentAnalysis/>}/>
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/features" element={<Features />} />
        <Route path="*" element={<NotFound />} />  
      </Route> 
    </>
  )
);  

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>,
)
