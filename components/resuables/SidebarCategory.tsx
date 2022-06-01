/*
0. Set category title
1.import item component
2. list items
*/
import {genRandCode} from '../../utils/'
import SidebarItem from './SidebarItem'
import Image from 'next/image'

export type SidebarCategoryProp ={
    title:string,
    list:{
        icon:string,
        title:string,
        route:string
    }[]
}


const SidebarCategory =({title,list}:SidebarCategoryProp)=>{

    console.log(list)
    return (
        <div className='sidebarCategory'>
            <span className='title'>{title}</span>
            {list.map(link=><SidebarItem key={genRandCode(5)} icon={<Image src={`/${link.icon}`} width="15" height="15" />} title={link.title} route={link.route} />)}
             
        </div>
    )
}


export default SidebarCategory