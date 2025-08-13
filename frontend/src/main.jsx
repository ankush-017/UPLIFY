import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Internships from './Pages/Internships.jsx'
import About from './Pages/About.jsx'
import Apply from './Pages/Apply.jsx'

import Login from './Components/Login.jsx'
import Resources from './Components/Resources.jsx'
import store from './Store/store.js'
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async'
import BuildResume from './Pages/BuildResume.jsx'
import ProjectLibrary from './Pages/ProjectLibrary.jsx'
import UplifyInternship from './Pages/UplifyInternship.jsx'
import Dashboard from './Components/Admin/Dashboard.jsx'
import AdminProtectedRoute from './Components/Admin/AdminProtectedRoute.jsx'
import AdminDashboard from './Components/Admin/AdminDashboard.jsx'
import AddInternships from './Components/Admin/Internships/AddInternships.jsx'
import AllInternships from './Components/Admin/Internships/AllInternships.jsx'
import Blogs from './Pages/Blogs.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'
import ApplicationForm from './Components/Admin/Internships/ApplicationForm.jsx'
import MyApplication from './Components/User/MyApplication.jsx'
import AddBlog from './Components/Admin/Blogs/AddBlog.jsx'
import AllBlogs from './Components/Admin/Blogs/AllBlogs.jsx'
import BlogDetails from './Components/BlogDetails.jsx'
import UpdateBlog from './Components/Admin/Blogs/UpdateBlog.jsx'
import UpdateInternship from './Components/Admin/Internships/UpdateInternship.jsx'
import AddResources from './Components/Admin/Resources/AddResources.jsx'
import AllResources from './Components/Admin/Resources/AllResources.jsx'
import UpdateResources from './Components/Admin/Resources/UpdateResources.jsx'
import MakePost from './Components/User/MakePost.jsx'
import UplifyCommunity from './Pages/UplifyCommunity.jsx'
import Frontend from './Components/Career/Frontend.jsx'
import Backend from './Components/Career/Backend.jsx'
import FullStackDeveloper from './Components/Career/FullStackDeveloper.jsx'
import AndroidDeveloper from './Components/Career/AndroidDeveloper.jsx'
import AIML from './Components/Career/AIML.jsx'
import DataScientist from './Components/Career/DataScientist.jsx'
import UiUx from './Components/Career/UiUx.jsx'
import CyberSecuirtyAnalyst from './Components/Career/CyberSecuirtyAnalyst.jsx'
import CareerRoadmaps from './Components/CareerRoadmaps.jsx'
import ViewApplicant from './Components/Admin/Internships/ViewApplicant.jsx'
// import UserAdmin from './Components/UserAdmin.jsx'
import CompanyCheck from './Components/CompanyCheck.jsx'
import HomeCompany from './CompanyPage/HomeCompany.jsx'
import RoleRouter from './Components/RoleRouter.jsx'
import InternshipCompany from './CompanyPage/InternshipCompany.jsx'
import PostInternship from './CompanyPage/PostInternship.jsx'
import TrackApplication from './CompanyPage/TrackApplication.jsx'
import JobApplicant from './CompanyPage/JobApplicant.jsx'
import UpdateInternCompany from './CompanyPage/UpdateInternCompany.jsx'
import { roleLoader } from './Components/Loader.js';
import UserProtected from './Components/UserAdmin.jsx'
import NotFound from './Components/NotFound.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Redirect logic only */}
      <Route index
        loader={roleLoader}
        element={<RoleRouter />} />

      {/* Auth Pages */}
      <Route path='guest' element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="internships" element={<Internships />} />
      <Route path="resources" element={<Resources />} />
      <Route path="blog" element={<Blogs />} />
      <Route path="blog/:id" element={<BlogDetails />} />
      <Route path="about" element={<About />} />

      {/* Student/User Routes */}
      <Route element={<UserProtected />}>
        <Route path="user">
          <Route index element={<Home />} />
          <Route path="internships" element={<Internships />} />
          <Route path="apply" element={<Apply />} />
          <Route path="blog" element={<Blogs />} />
          <Route path="blog/:id" element={<BlogDetails />} />
          <Route path="resources" element={<Resources />} />
          <Route path="uplify-internship" element={<UplifyInternship />} />
          <Route path="projects-libray" element={<ProjectLibrary />} />
          <Route path="resume-builder" element={<BuildResume />} />
          <Route path="career-roadmaps" element={<CareerRoadmaps />} />
          <Route path="career-roadmaps/frontend" element={<Frontend />} />
          <Route path="career-roadmaps/backend" element={<Backend />} />
          <Route path="career-roadmaps/fullstack-developer" element={<FullStackDeveloper />} />
          <Route path="career-roadmaps/android-developer" element={<AndroidDeveloper />} />
          <Route path="career-roadmaps/ai-ml-engineer" element={<AIML />} />
          <Route path="career-roadmaps/data-scientist" element={<DataScientist />} />
          <Route path="career-roadmaps/ui-ux-designer" element={<UiUx />} />
          <Route path="career-roadmaps/cybersecuirty-analyst" element={<CyberSecuirtyAnalyst />} />
          <Route path="internships/u/apply-internships/:id" element={<ApplicationForm />} />
        </Route>
      </Route>

      {/* Company Routes */}
      <Route path="company" element={<CompanyCheck />}>
        <Route index element={<HomeCompany />} />
        <Route path='internship' element={<InternshipCompany />} />
        <Route path='post-internship' element={<PostInternship />} />
        <Route path='track-application' element={<TrackApplication />} />
        <Route path='job-applicants/:id' element={<JobApplicant />} />
        <Route path='update-internship/:id' element={<UpdateInternCompany />} />
      </Route>

      {/* Admin Routes (Protected) */}
      <Route element={<AdminProtectedRoute />}>
        <Route path="admin" element={<AdminDashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="add-internships" element={<AddInternships />} />
          <Route path="all-internships" element={<AllInternships />} />
          <Route path="add-blogs" element={<AddBlog />} />
          <Route path="all-blogs" element={<AllBlogs />} />
          <Route path="add-resources" element={<AddResources />} />
          <Route path="all-resources" element={<AllResources />} />
          <Route path="update-blog/:id" element={<UpdateBlog />} />
          <Route path="update-internship/:id" element={<UpdateInternship />} />
          <Route path="update-resource/:id" element={<UpdateResources />} />
          <Route path="job-applicants/:id" element={<ViewApplicant />} />
        </Route>
      </Route>

      {/* Authenticated User Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="user/uplify-community" element={<UplifyCommunity />} />
        <Route path="user/uplify-community/make-post" element={<MakePost />} />
        <Route path="user/applications" element={<MyApplication />} />
      </Route>
      <Route path="*" element={<NotFound />} />
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