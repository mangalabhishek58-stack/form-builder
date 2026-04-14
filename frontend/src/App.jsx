import { Routes, Route } from 'react-router-dom'
import LandingPage from "./pages/LandingPage/LandingPage"
import LoginPage from './pages/LoginandSignUp/LoginPage'
import SignUpPage from './pages/LoginandSignUp/SignUpPage'
import Dashboard from './pages/DashboardPage/Dashboard'
import NotFound from './pages/NotFound'
import SettingPage from './pages/SettingPage/SettingPage'
import FormTemplatesPage from './pages/FormTemplates/FormTemplatesPage'
import FormResponsePage from './pages/FormResponsePage/FormResponsePage'
function App() {

  return (
    <div>
      <Routes >
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/setting' element={<SettingPage />} />
        <Route path='/formtemplates/create' element={<FormTemplatesPage />} />
        <Route path='/formtemplates/update/:id' element={<FormTemplatesPage />} />
        <Route path='/form/:id' element={<FormResponsePage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      
    </div>
  )
}

export default App
