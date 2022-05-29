/*
0.get item name and link
1.import Link component from next
*/ 
import Link from 'next/link'

type SidebarItemProp ={
    title:string,
    route:string
}

const SidebarItem =({title,route}:SidebarItemProp)=>{

    return(
        <>
         <Link href={route}><a > {title}</a></Link>
        </>
    )

}

export default SidebarItem