import Navbar from "../Component/Navbar";
import "../Styles/Homepage.css"
import EmployeeManagement from "../Component/EmployeeManagement";

const HomePage = () => {
    return ( 
        <div>
            <Navbar/>
            <EmployeeManagement/>
        </div>
     );
}
 
export default HomePage;