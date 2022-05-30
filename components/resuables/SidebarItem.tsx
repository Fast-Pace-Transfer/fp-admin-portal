/*
0.get item name and link
1.import Link component from next
*/ 
import {useRouter} from 'next/router'

type SidebarItemProp ={
    icon:object,
    title:string,
    route:string
}

const SidebarItem =({icon,title,route}:SidebarItemProp)=>{

    const router = useRouter()


    const handleClick = (e)=>{
        e.preventDefault()
    router.push(route)
    }


    return(
        <li className={router.pathname == route ? "active" : ""}>
        <a className="anchorTag" href={route} onClick={handleClick}>
        <>{icon} </> 
        <>{title}</>
        </a>
        </li>
       
    )

}

export default SidebarItem