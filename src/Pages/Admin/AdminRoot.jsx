import Header from '../../Layout/Admin/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../../Layout/Admin/Footer/Footer'

const AdminRoot = () => {
  return (
    <>
     <Header/>
     <Outlet/>
     <Footer/>
    </>
  )
}

export default AdminRoot
