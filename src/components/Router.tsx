import { Routes, Route } from 'react-router-dom'
import UserPage from '../pages/UserPage.tsx'
import Home from '../pages/Home.tsx'
import ErrorPage from 'src/pages/ErrorPage.tsx'

function Router() {
  return <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/userPage/:id' element={<UserPage />} />
    <Route path='*' element={<ErrorPage />} />
  </Routes>
}

export default Router