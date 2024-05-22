import "./AsideMenu.css"
import AsideItem from "../AsideItem/AsideItem"
import { useState } from "react"

const AsideMenu = () => {

    const [selectedItem, setSelectedItem] = useState(null)

    const handleItemClick = (index) => {
        setSelectedItem(index)
    }

    return (
        <nav className="aside-menu">
            <div className="aside-menu-section">
                <h2>Menú profesores</h2>
                <ul>
                    <AsideItem href="/gestionar-examenes" selected={selectedItem === 0} onClick={() => handleItemClick(0)}>Gestionar examenes</AsideItem>
                </ul>
            </div>

            <div className="aside-menu-section">
                <h2>Menú estudiantes</h2>
                <ul>
                    <AsideItem href="/examenes" selected={selectedItem === 3} onClick={() => handleItemClick(3)}>Examenes</AsideItem>
                </ul>
            </div>

        </nav>
    )
}

export default AsideMenu