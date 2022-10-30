import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { State as ReduxState } from 'redux/auth/auth'
import Navigation from './Navigation'

const Layout = () => {

  const token = localStorage.getItem('token')

  const {authenticated} = useSelector((state: ReduxState) => state)

  if(!token && !authenticated){
    return <Navigate to="/login" />
  }

  return (
    <>
      <Navigation />
      <Outlet />
    </>
  )
}

export default Layout