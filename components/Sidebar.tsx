/*
0.import category component
1.pass list of routes 
2.
*/ 
// import Image from "next/image"
import { useEffect, useState,useContext } from "react";
// import icon from '../public/favicon.ico'
import style from '../styles/sidebar.module.css'
import { AuthContext } from "../hooks/useAuth";
import SidebarCategory from "./resuables/SidebarCategory"
// import cookie from 'js-cookie'
import { genRandCode } from "../utils";
import Image from "next/image";
import logo from '../public/images/fp_logo.png'
// let link=[]

const Sidebar = ()=>{

const {pages}= useContext(AuthContext)
console.log('route',pages)
const [links,setLinks] = useState([])

    useEffect(()=>{
         let link=[]
         
        if(pages){
            
          link.push(...pages);
          setLinks(link)

        
        }

       

        
    },[pages])
    
// console.log('size',links.length);

    return(
        <div className={style.sidebar}>
            <div style={{padding:'20%'}}>
                 <Image src={logo} width="150" height="30" layout="intrinsic" />
            </div>
           
            <div className="links">
                {links.map(route=>{
                return <SidebarCategory key={genRandCode(4)} title={route.title} list={route.sub} />
            })}
            </div>
            
           
        </div>
    )


}

export default Sidebar