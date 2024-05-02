import { Link } from "react-router-dom"
import "../styles/Sidebar.css"

export default function Sidebar() {

    return <div className="sidebar">
        <nav>
            <Link to="/"><img src="../src/assets/zen-icon.svg" alt="zen" /></Link>
            <Link to="/"><img src="../src/assets/swimm-icon.svg" alt="swimm" /></Link>
            <Link to="/"><img src="../src/assets/cycle-icon.svg" alt="cycle" /></Link>
            <Link to="/"><img src="../src/assets/muscle-icon.svg" alt="muscle" /></Link>
        </nav>
        <p>Copyright, SportSee 2020</p>
    </div>
}