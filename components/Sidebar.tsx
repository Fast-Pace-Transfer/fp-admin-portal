/*
0.import category component
1.pass list of routes 
2.
*/ 
// import Image from "next/image"
import { useEffect, useState,useContext } from "react";
// import icon from '../public/favicon.ico'
import { AuthContext } from "../hooks/useAuth";
import SidebarCategory from "./resuables/SidebarCategory"

// let link=[]

const Sidebar = ()=>{
const role='Admin'
const {pages}=useContext(AuthContext)
const [links,setLinks] = useState([])

    useEffect(()=>{
        let link=[]
        let links:{
            icon:string
            title:string
            route:string
        }[] = [{
        icon:'',
        title:"Link",
        route:"/login"
    },{
        icon:'',
        title:"Facebook",
        route:"/" 
    }]
        link.push(...links);

        setLinks(link)
    },[role])
    
// console.log('size',links.length);

    return(
        <div className="sidebar">
            <h2>Hello sidebar</h2>
           <SidebarCategory title="Transactions" list={links} />
        </div>
    )


}

export default Sidebar