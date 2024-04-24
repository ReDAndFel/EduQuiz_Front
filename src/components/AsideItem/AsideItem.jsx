import { Link } from "react-router-dom"
import "./AsideItem.css"

const AsideItem = ({ href, children, selected, onClick }) => {
    return (
        <li className={`aside-item${selected ? " selected":""}`} onClick={onClick}>
            <Link to={href}>{children}</Link>
        </li>
    )
}

export default AsideItem