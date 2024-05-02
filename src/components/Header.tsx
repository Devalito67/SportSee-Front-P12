import { Link } from "react-router-dom"
import "../styles/Header.css"

export default function Header() {

    return <div className="header">
        <img src="../src/assets/logo.png" alt="logo" />
        <nav>
            <Link to="/">Accueil</Link>
            <Link to="/profil">Profil</Link>
            <Link to="/settings">Réglage</Link>
            <Link to="/community">Communauté</Link>
            </nav>
    </div>
}