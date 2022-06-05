import { SidebarCategoryProp } from "../components/resuables/SidebarCategory"
import jwt from 'jsonwebtoken'
// import cookie from 'js-cookie'
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

const base_url=process.env.Host_BASE_URL;
console.log(process.env.Host_BASE_URL)
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
        title:'Payments',
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

const Client:pages=[
    {
        title:'Transaction',
        sub:[{
            icon:dashboard,
            title:'Dashboard',
            route:'/'
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

const Other:pages=[
    {
        title:"Extra",
        sub:[
            {
                icon:docs,
                title:"Documentation",
                route:'https://documenter.getpostman.com/view/17812328/Uz5GowQ4'
            }
        ]
    }
]


const Role =async ()=>{
    const res = await fetch(`/api/auth/user`)
    let data = await res.json()

    let role=data.role
    
console.log('role here',role)
     return role

}


const Pages = ()=>{
                

    let role
       const rol= Role().then(data=>{
        role= data
    })            
                    
           if(!role){
     
    switch (role) {
        case 'Admin':
            return Admin
            break;
        case 'Client':
            return Client
            break;
        default:
            return Other
            break;
    }
    }
    
}


export default Pages