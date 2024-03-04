import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import { CreatePost,Home } from './pages'
import {logo} from "./assets"
import LightBox from './components/LightBox'
import {motion} from "framer-motion"

function App() {
 


  return (
    <div>
       <motion.div transition={{duration:5}}>
          <LightBox />
      </motion.div>
      <header className="nav-bar">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>

        <Link to="/create-post" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">Create</Link>
      </header>

      <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>
      </main>
     
    </div>
  )
}
export default App
