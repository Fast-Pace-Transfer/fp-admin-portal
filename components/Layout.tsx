/*
0.import Navbar 
1.import sidebar 
2.create content area
*/
import Navbar from "./NavBar"
import Sidebar from "./SIdebar"
import Footer from "./Footer"

const Layout =({children})=>{
    return (
        <div className="Layout">
            <div><Sidebar/></div>
            <div>
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