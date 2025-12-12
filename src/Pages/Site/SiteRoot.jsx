import Header from '../../Layout/Site/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../../Layout/Site/Footer/Footer'

const SiteRoot = () => {
  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default SiteRoot
