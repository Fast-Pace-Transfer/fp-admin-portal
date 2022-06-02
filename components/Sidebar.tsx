/*
0.import category component
1.pass list of routes 
2.
*/ 
// import Image from "next/image"
import { useEffect, useState,useContext } from "react";
// import icon from '../public/favicon.ico'
import useAuth from "../hooks/useAuth";
import SidebarCategory from "./resuables/SidebarCategory"
import cookie from 'js-cookie'
import { genRandCode } from "../utils";

// let link=[]

const Sidebar = ()=>{

const {pages}= useAuth()
const [links,setLinks] = useState([])

    useEffect(()=>{

        let link=[]
      if(cookie.get("auth")==="true"){
          link.push(...pages);
          setLinks(link)
      }
        

        
    },[pages])
    
// console.log('size',links.length);

    return(
        <div className="sidebar">
            <h2>sidebar</h2>
            <div className="links">
                {links.map(route=>{
                return <SidebarCategory key={genRandCode(4)} title={route.title} list={route.sub} />
            })}
            </div>
            
           
        </div>
    )


}

export default Sidebar