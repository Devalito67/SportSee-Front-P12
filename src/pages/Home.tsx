import "../styles/Home.css"
import { Link } from "react-router-dom"

export default function Home() {

    return <div className="home">
        <Link to="/userPage/12">
            <button >
                Karl
            </button>
        </Link>
        <Link to="/userPage/18">
            <button>
                Cécilia
            </button>
        </Link>
    </div>
}