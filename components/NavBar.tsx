/*
0. import Notification components
1. Import user components
2. Style
*/
import Button from "./resuables/Button"
import Notification from "./Notification"



const Navbar =()=>{ 

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