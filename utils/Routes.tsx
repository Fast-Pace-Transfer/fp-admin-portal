import { SidebarCategoryProp } from "../components/resuables/SidebarCategory"
import jwt from 'jsonwebtoken'
import cookie from 'js-cookie'
// const key ="abdibidbadasdnbiq"
type pages ={
    title:string
    sub:{
        icon:string
        title:string
        route:string
    }[]
}[]
const Admin:pages=[
    {
        title:'Transaction',
        sub:[{
            icon:'',
            title:'Dashboard',
            route:'/'
        }
        ]
    },
    {
        title:'Developers',
        sub:[
            {
                icon:'',
                title:'API keys',
                route:'/api_keys' 
            }
        ]
    },
    
]


const Pages = ()=>{
    if(cookie.get("auth")==="true"){
        const nRole = jwt.decode(cookie.get('role')) as {[key:string]:string}
    console.log('role',nRole);
    switch (nRole.role) {
        case 'Admin':
            return Admin
            break;
    
        default:
            throw new Error('Invalid Role')
            break;
    }
    }
    return 
    
}


export default Pages