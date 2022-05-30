/*
0.import category component
1.pass list of routes 
2.
*/ 
import Image from "next/image"
import { useEffect, useState } from "react";
// import icon from '../public/favicon.ico'
import SidebarCategory from "./resuables/SidebarCategory"

let link=[]

const Sidebar = ()=>{
const [links,setLinks] = useState([])
    useEffect(()=>{
        let links = [{
        icon:'',
        title:"Link",
        route:"https://google.com"
    },{
        icon:'',
        title:"Facebook",
        route:"/" 
    }]
        link.push(...links);

        setLinks(link)
    },[links])
    
// console.log('size',links.length);

    return(
        <div className="sidebar">
            <h2>Hello sidebar</h2>
           <SidebarCategory title="Transactions" list={links} />
        </div>
    )


}

export default Sidebar