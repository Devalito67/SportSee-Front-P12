import { RadarChart, PolarGrid, Radar, PolarAngleAxis } from "recharts";
import { USER_PERFORMANCE } from "../_mocks_/datas_mocked.js";
import "../styles/UserRadarChart.css"
import dataFetch from "./dataFetch";
import { useEffect, useState } from "react";

export default function UserRadarChart({ userId }) {
    const apiUrl = 'http://localhost:3000/user/' + userId + '/performance';

    const [performances, setPerformances] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await dataFetch(userId, apiUrl, USER_PERFORMANCE);
                console.log(fetchedData.data.kind);
                const userPerformances = await fetchedData.data.data
                    .map((item) => ({
                        kind: fetchedData.data.kind[item.kind],
                        value: item.value
                    }))
                    .reverse();
                setPerformances(userPerformances);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    }, [apiUrl, userId]);



    return <div className="userRadarChart">
        <RadarChart outerRadius={90} width={258} height={263} data={performances} >
            <PolarGrid radialLines={false}/>
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