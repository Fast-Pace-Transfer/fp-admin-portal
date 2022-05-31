/*
0.import Navbar 
1.import sidebar 
2.create content area
*/
import Navbar from "../components/NavBar"
import Sidebar from "../components/Sidebar"
// import Footer from "../components/Footer"
import React from "react"

const Layout =({children})=>{
    return (
        <div className="Layout">
            <Sidebar/>
            <div className="main">
                <Navbar/>
                <div className="content">
                {children}
                </div>
                {/* <Footer/> */}

            </div>

        </div>
    )
}


export default Layout