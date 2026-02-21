import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ApplyJob from './pages/ApplyJob.jsx'
import Applications from './pages/Applications.jsx'
import { AppContext } from './context/AppContext'
import RecruiterLogin from './components/RecruiterLogin'
import Dashboard from './pages/Dashboard'
import AddJobs from './pages/AddJobs.jsx'
import ManageJobs from './pages/ManageJobs.jsx'
import ViewApplications from './pages/ViewApplications.jsx'
import 'quill/dist/quill.snow.css'

const App = () => {
  const { showRecruiterLogin } = useContext(AppContext)

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}

      <Routes>
  <Route path='/' element={<Home />} />
  <Route path='/apply-job/:id' element={<ApplyJob />} />
  <Route path='/applications' element={<Applications />} />

  <Route path='/dashboard' element={<Dashboard />}>
    <Route path='add-job' element={<AddJobs />} />
    <Route path='manage-jobs' element={<ManageJobs />} />
    <Route path='view-applications' element={<ViewApplications />} />
  </Route>
</Routes>
    </div>
  )
}

export default App
