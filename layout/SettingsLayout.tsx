/*
0.import Navbar 
1.import sidebar 
2.create content area
*/
// import Footer from "../components/Footer"
import React from "react"

const Layout =({children})=>{
    return (
        <div className="Layout">
                {children}
        </div>
    )
}


export default Layout