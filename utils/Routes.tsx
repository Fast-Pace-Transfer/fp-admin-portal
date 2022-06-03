import { SidebarCategoryProp } from "../components/resuables/SidebarCategory"
import jwt from 'jsonwebtoken'
import cookie from 'js-cookie'
import { StaticImageData } from "next/image"
// icons
import dashboard from '../public/images/DashboardAsset_3.svg'
import apikey from '../public/images/APIKeysAsset_7.svg';
import apiDoc from '../public/images/APIDocumentationAsset_8.svg';
import docs from '../public/images/DocumentsAsset_6.svg';
import files from '../public/images/FileAsset_13.svg';
import report from '../public/images/ReportsAsset_5.svg';
import wallet from '../public/images/WalletAsset_4.svg';
// icons
// const key ="abdibidbadasdnbiq"
type pages ={
    title:string
    sub?:{
        icon:StaticImageData
        title:string
        route:string
    }[]
}[]
const Admin:pages=[
    {
        title:'Transaction',
        sub:[{
            icon:dashboard,
            title:'Dashboard',
            route:'/'
        },
        {
            icon:wallet,
            title:'Wallet',
            route:'/wallet'
        },
        {
            icon:apiDoc,
            title:'Transaction',
            route:'/transaction'
        }
        ]
    },
    {
        title:'Developers',
        sub:[
            {
                icon:apikey,
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