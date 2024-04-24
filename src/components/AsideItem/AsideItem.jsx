import { Link } from "react-router-dom"
import "./AsideItem.css"

const AsideItem = ({ href, children }) => {
    return (
        <li className="aside-item">
            <Link to={href}>{children}</Link>
        </li>
    )
}

export default AsideItem