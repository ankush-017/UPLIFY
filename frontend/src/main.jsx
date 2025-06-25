import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Internships from './Pages/Internships.jsx'
import About from './Pages/About.jsx'
import Apply from './Pages/Apply.jsx'
import Contact from './Pages/Contact.jsx'
import Login from './Components/Login.jsx'
import Resources from './Components/Resources.jsx'
import store from './Store/store.js'
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async'
import CareerRoadMap from './Pages/CareerRoadMap.jsx'
import BuildResume from './Pages/BuildResume.jsx'
import ProjectLibrary from './Pages/ProjectLibrary.jsx'
import PeerGroup from './Pages/PeerGroup.jsx'
import UplifyInternship from './Pages/UplifyInternship.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="internships" element={<Internships />} />
        <Route path="about" element={<About />} />
        <Route path="apply" element={<Apply />} />
        <Route path="blog" element={<Contact />} />
        <Route path="resources" element={<Resources />} />
        <Route path="peer-group" element={<PeerGroup />} />
        <Route path="uplify-internship" element={<UplifyInternship />} />
        <Route path="projects-libray" element={<ProjectLibrary />} />
        <Route path="resume-builder" element={<BuildResume />} />
        <Route path="career-roadmaps" element={<CareerRoadMap />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store} >
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </StrictMode>,
)