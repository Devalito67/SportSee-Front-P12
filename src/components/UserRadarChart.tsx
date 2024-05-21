import { RadarChart, PolarGrid, Radar, PolarAngleAxis } from "recharts";
import { USER_PERFORMANCE } from "src/_mocks_/datas_mocked.js";
import "../styles/UserRadarChart.css"
import dataFetch from "./dataFetch";
import { useEffect, useState } from "react";
import User from "../utils/User.jsx";

interface PerformanceType {
    kind: string;
    value: number;
}

export default function UserRadarChart({ userId }: { userId: string }) {
    const apiUrl = 'http://localhost:3000/user/' + userId + '/performance';
    const [userData, setUserData] = useState<PerformanceType[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDataFetch = await dataFetch(userId, apiUrl, USER_PERFORMANCE);
                const user = new User(userDataFetch);
                setUserData(user.getPerformanceData());
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };
        fetchData();
    },[userId,apiUrl]);

    return <div className="userRadarChart">
        <RadarChart outerRadius={90} width={258} height={263} data={userData} >
            <PolarGrid radialLines={false} />
            <PolarAngleAxis dataKey="kind" dy={3} className="a" stroke="#ffffff" tickLine={false} tickFormatter={(value) => {
                switch (value) {
                    case 'cardio':
                        return 'Cardio';
                    case 'energy':
                        return 'Energie';
                    case 'endurance':
                        return 'Endurance';
                    case 'strength':
                        return 'Force';
                    case 'speed':
                        return 'Vitesse';
                    case 'intensity':
                        return 'Intensité';
                    default:
                        return value;
                }
            }} />
            <Radar dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.7} />
        </RadarChart>
    </div>
}