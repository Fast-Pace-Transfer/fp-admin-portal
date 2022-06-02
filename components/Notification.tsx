
import Link from 'next/link'
import { useState } from 'react'
import {genRandCode} from '../utils/index'
import note from '../public/favicon.ico'
import Image from 'next/image'

let data =[
    {
        title:"Balance low",
        link:"#"
    }
]

const Notification =()=>{
    const [isHidden,setIsHidden]=useState<boolean>(true)

    const showNotes=()=>{
        
        setIsHidden(prev=>!isHidden);
    }

    return(
        <div>
            <div className="notification" onClick={showNotes}>
                <Image src={note} width="25" height="25" />
            </div>
           <ul className='notifications' style={{display:isHidden?'none':'block'}}>
            {data.map(note=>{
                return(
                    <li key={genRandCode(4)}>
                        <Link href={note.link}>
                        <a href={note.link}>{note.title}</a>
                         </Link>
                        
                    </li>
                )
            })}
        </ul> 
        </div>
        
    )


}

export default Notification
