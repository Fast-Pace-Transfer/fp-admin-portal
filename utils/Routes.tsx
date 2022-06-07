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
                route:'/docs'
            }
        ]
    }
]


const Role =async ()=>{

    const res = await fetch(`/api/auth/user`)

    let data = await res.json()


     return data.role.role

}


const Pages = ()=>{

    // Role().then(role=>{
    //     return role
    // })
    
    // console.log('role',Role().then(role=>{
    //     return role
    // }));
     let role='admin'
     
    switch (role) {
        case 'admin':
            return Admin
            break;
        case 'client':
            return Client
            break;
        default:
            return Other
            break;
    }
    
    
}


export default Pages