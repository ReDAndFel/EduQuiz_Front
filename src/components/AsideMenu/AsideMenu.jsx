import "./AsideMenu.css"
import AsideItem from "../AsideItem/AsideItem"
import { useState } from "react"

const AsideMenu = () => {

    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (index) => {
        setSelectedItem(index);
    };

    return (
        <nav className="aside-menu">
            <ul>
                <AsideItem href="/" selected={selectedItem === 0} onClick={() => handleItemClick(0)}>Inicio</AsideItem>
                <AsideItem href="/" selected={selectedItem === 1} onClick={() => handleItemClick(1)}>Gestionar examenes</AsideItem>
                <AsideItem href="/" selected={selectedItem === 2} onClick={() => handleItemClick(2)}>Gestionar preguntas</AsideItem>
                <AsideItem href="/" selected={selectedItem === 3} onClick={() => handleItemClick(3)}>Gestionar bancos de pregunta</AsideItem>
                <AsideItem href="/" selected={selectedItem === 4} onClick={() => handleItemClick(4)}>Responder examenes</AsideItem>
            </ul>
        </nav>
    )
}

export default AsideMenu