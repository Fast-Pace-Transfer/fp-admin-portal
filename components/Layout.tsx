/*
0.import Navbar 
1.import sidebar 
2.create content area
*/
import Navbar from "./NavBar"
import Sidebar from "./Sidebar"
import Footer from "./Footer"

const Layout =({children})=>{
    return (
        <div className="Layout">
            <Sidebar/>
            <div className="main">
                <Navbar/>
                <div className="content">
                {children}
                </div>
                <Footer/>

            </div>

        </div>
    )
}


export default Layout