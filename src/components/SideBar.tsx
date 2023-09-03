import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom";

const SideBar = () => {
    const { pathname } = useLocation();
    const isContactPath = ["/", "/create-contact", ].includes(pathname) || pathname.startsWith("/detailed-contact") || pathname.startsWith("/edit-contact")
   
   return (<nav className='bg-gray-200 p-4'>
        <ul className='w-[200px] '>
            <li className={` ${isContactPath?"font-bold" :""} p-4 hover:font-bold`}>
                <Link to="/">Contact</Link>
            </li>
            <li className={`${pathname==="/charts-and-maps"?"font-bold":""} p-4 hover:font-bold`}>
                <Link to="/charts-and-maps">Charts and maps</Link>
            </li>
        </ul>
    </nav>)
}

export default SideBar
