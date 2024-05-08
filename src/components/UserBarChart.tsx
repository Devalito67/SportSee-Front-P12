import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import { USER_ACTIVITY } from "../_mocks_/datas_mocked.js";
import dataFetch from "./dataFetch";
import "../styles/UserBarChart.css";
import { useState, useEffect } from "react";

export default function UserBarChart({ userId }) {
    const apiUrl = 'http://localhost:3000/user/' + userId + '/activity';
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await dataFetch(userId, apiUrl, USER_ACTIVITY);
                console.log(fetchedData);
                const mappedSessions = await fetchedData.data.sessions.map((item) => ({
                    kilogram: item.kilogram,
                    calories: item.calories,
                    day: item.day.split("-")[2].trim().replace(/^0/, ''),
                }));
                setSessions(mappedSessions);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    }, []);

    const CustomBar = ({ fill, x, y, width, height, barRadius }: {
        fill: string;
        x: number;
        y: number;
        width: number;
        height: number;
        barRadius: number;
    }) => {
        return (
            <g>
                <path d={`M${x},${y + barRadius} 
                       L${x},${y + height} 
                       L${x + width},${y + height} 
                       L${x + width},${y + barRadius} 
                       Q${x + width},${y},${x + width - barRadius},${y} 
                       L${x + barRadius},${y} 
                       Q${x},${y},${x},${y + barRadius}`} fill={fill} />
            </g>
        );
    };

    return <div className="userBarChart">
        <h3>Activité quotidienne</h3>
        <BarChart
            width={800}
            height={250}
            data={sessions}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#dedede'/>
            <XAxis dataKey="day" tickLine={false} padding={{ left: -45, right: -45 }} axisLine={ {stroke: '#dedede'} } tick={{dy: 20, fontSize: 14}}/>
            <YAxis orientation="right" dataKey="kilogram" type="number" tick={{dx: 45, fontSize: 14}} domain={["dataMin - 1" , "dataMax + 1"]} allowDecimals={false} tickCount={10} tickLine={false} axisLine={false}/>
            <YAxis yAxisId="left" hide={true}/>
            <Tooltip cursor={{ fill: 'rgba(200, 196, 196, 0.5)' }} contentStyle={{ backgroundColor: '#E60000' }} itemStyle={{ color: '#ffffff', fontSize: '7px', paddingBottom: 10, textAlign: "center"}} formatter={(value, name) => [name === 'Poids (kg)' ? value +'kg' : value +'kCal']} labelFormatter={() => ""} />
            <Legend verticalAlign="top" wrapperStyle={{ top: 24, left: 255}} height={36} iconType="circle" iconSize={8} formatter={(value, index) => <span style={{ marginLeft: 10, marginRight: 32, fontSize: 14, color: index === 0 ? '#74798c' : '#74798c' }}>{value}</span>}/>
            <Bar shape={<CustomBar barRadius={3.5} />} dataKey="kilogram" name="Poids (kg)" fill="#282D30" barSize={7} />
            <Bar yAxisId="left" shape={<CustomBar barRadius={3.5} />} dataKey="calories" name="Calories brulées (kCal)" fill="#E60000" barSize={7} />
        </BarChart>
    </div>
}