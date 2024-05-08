import { AreaChart, Tooltip, XAxis, YAxis, CartesianGrid, Area } from "recharts";
import { USER_AVERAGE_SESSIONS } from "../_mocks_/datas_mocked.js";
import dataFetch from "./dataFetch.js";
import "../styles/UserAreaChart.css";
import { useState, useEffect } from "react";

const CustomTooltip = ({ active, payload, label, ...otherProps }) => {
    if (payload && payload.length) {
        
        const point = otherProps.points[1]; // Obtenir les données du point actif
        console.log("point", point);
        const x = point.x; // Coordonnée x du point actif
        console.log("x", x);
        const width = 500; // Largeur du tooltip personnalisé
        const height = 500; // Hauteur du tooltip personnalisé
        return (
            <g>
                <rect x={x} y={0} width={width} height={height} strokeWidth={0} fill="rgba(0, 0, 0, 0.0975"  />


            </g>
        );
    }

    return null;
};

export default function UserAreaChart({ userId }) {
    const apiUrl = 'http://localhost:3000/user/' + userId + '/average-sessions';
    const [averageSession, setAverageSession] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await dataFetch(userId, apiUrl, USER_AVERAGE_SESSIONS);
                const mappedAverageSession = await fetchedData.data.sessions.map(item => ({
                    day: item.day,
                    sessionLength: item.sessionLength,
                }))

                console.log(fetchedData);
                setAverageSession(mappedAverageSession);
                console.log(averageSession)
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    }, []);

    return <div className="userAreaChart">
<h3>Durée moyenne des sessions</h3>
        <AreaChart
            width={258}
            height={263}
            data={averageSession}
           margin={ {top: 63, bottom: 16}}
        >
             <defs>

    <linearGradient id="strokeGradient" x1="1" y1="0" x2="0" y2="0">
      <stop offset="5%" stopColor="#ffffff" stopOpacity={1}/>
      <stop offset="95%" stopColor="#ffffff" stopOpacity={0.4}/>
    </linearGradient>
  </defs>
            <CartesianGrid horizontal={false} vertical={false} />
            <XAxis dataKey="day" axisLine={false} tick={{fill:"#ffffff", opacity:"0.504", fontSize:12}} tickLine={false} padding={ {left: 14, right: 14}} tickFormatter={(value) => {
                switch (value) {
                    case 1 :
                        return 'L';
                    case 2:
                        return 'M';
                    case 3:
                        return 'M';
                    case 4:
                        return 'J';
                    case 5:
                        return 'V';
                    case 6:
                        return 'S';
                    case 7:
                        return 'D';
                    default:
                        return value;
                }
            }} />
            <YAxis hide={true} domain={["dataMin - 10", "dataMax + 10"]}/>
            <Tooltip allowEscapeViewBox={ {x: true, y: true }} itemStyle={{ color: '#000000', fontSize: '8px', fontWeight: '500' }} cursor={<CustomTooltip />} formatter={(value, name) => [name === 'sessionLength' ? value + ' min' : value + 'kCal']} labelFormatter={() => ""} />
            <Area type="bump" dataKey="sessionLength" stroke="url(#strokeGradient)" fill="rgba(255, 255, 255, 0.1)" strokeWidth={2} dot={false} activeDot={{ r: 4, stroke: "rgba(255, 255, 255, 0.2)", strokeWidth: 10 }} />
        </AreaChart>
    </div>
}