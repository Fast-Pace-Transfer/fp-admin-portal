/*
0. import Notification components
1. Import user components
2. Style
*/
import useAuth from "../hooks/useAuth"
import Button from "./resuables/Button"
import Notification from "./Notification"



const Navbar =()=>{ 
    const {logout}=useAuth()

    return(
        <nav>
            {/* <Button title="Logout" action={logout}/> */}
            {/* notification */}
            <section>
        <Notification/>
            </section>
            {/* user */}
            <section>

            </section>
        </nav>
    )
}

export default Navbar