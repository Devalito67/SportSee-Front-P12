import { useParams } from "react-router-dom";
import UserBarChart from "../components/UserBarChart";
import UserRadarChart from "../components/UserRadarChart";
import UserPieChart from "../components/UserPieChart";
import UserAreaChart from "../components/UserAreaChart";
import UserDataCard from "../components/UserDataCard";
import UserDataHeader from "../components/UserDataHeader";
import "../styles/UserPage.css";

export default function UserPage() {
    const { id } = useParams();
    return <div className="userDataContainer">
        <UserDataHeader userId={id} />
        <div className="userDataInfos">
            <div className="userChartsContainer">
                <UserBarChart userId={id} />
                <div className="chartsContainer">
                    <UserAreaChart userId={id} />
                    <UserRadarChart userId={id} />
                    <UserPieChart userId={id} />
                </div>
            </div>
            <UserDataCard userId={id} />
        </div>
    </div>
}