/*
0. import Notification components
1. Import user components
2. Style
*/
import useAuth from "../hooks/useAuth"
import Button from "./resuables/Button"



const Navbar =()=>{ 
    const {logout}=useAuth()

    return(
        <nav>
            {/* <Button title="Logout" action={logout}/> */}
            <h2>Hello Navbar</h2>
            <h2>Hello Navbar</h2>
        </nav>
    )
}

export default Navbar