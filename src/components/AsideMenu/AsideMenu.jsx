import "./AsideMenu.css"
import AsideItem from "../AsideItem/AsideItem"

const AsideMenu = () => {
    return (
        <nav className="aside-menu">
            <ul>
                <AsideItem href="/">Inicio</AsideItem>
                <AsideItem href="/">Gestionar examenes</AsideItem>
                <AsideItem href="/">Gestionar preguntas</AsideItem>
                <AsideItem href="/">Gestionar bancos de pregunta</AsideItem>
                <AsideItem href="/">Responder examenes</AsideItem>
            </ul>
        </nav>
    )
}

export default AsideMenu