import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import { USER_ACTIVITY } from "src/_mocks_/datas_mocked.js";
import dataFetch from "./dataFetch";
import "../styles/UserBarChart.css";
import { useState, useEffect } from "react";
import User from "../utils/User.jsx";

interface ActivityType {
    day: string;
    kilogram: number;
    calories: number;
}

export default function UserBarChart({ userId }: { userId: string }) {
    const apiUrl = 'http://localhost:3000/user/' + userId + '/activity';
    const [userData, setUserData] = useState<ActivityType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDataFetch = await dataFetch(userId, apiUrl, USER_ACTIVITY);
                const user = new User(userDataFetch);
                setUserData(user.getActivityData())
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    },[userId,apiUrl]);

    const CustomBar = ({ fill, x, y, width, height, barRadius }: {
        fill?: string | undefined;
        x?: number | undefined;
        y?: number | undefined;
        width?: number | undefined;
        height?: number | undefined;
        barRadius: number;
    }) => {
        return (
            <g>
                {x !== undefined && y !== undefined && width !== undefined && height !== undefined && (
                    <path d={`M${x},${y + barRadius} 
                       L${x},${y + height} 
                       L${x + width},${y + height} 
                       L${x + width},${y + barRadius} 
                       Q${x + width},${y},${x + width - barRadius},${y} 
                       L${x + barRadius},${y} 
                       Q${x},${y},${x},${y + barRadius}`} fill={fill} />
                )};
            </g>
        );
    };

    return <div className="userBarChart">
        <h3>Activité quotidienne</h3>
        <BarChart
            width={800}
            height={250}
            data={userData}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#dedede' />
            <XAxis dataKey="day" tickLine={false} padding={{ left: -45, right: -45 }} axisLine={{ stroke: '#dedede' }} tick={{ dy: 20, fontSize: 14 }} />
            <YAxis orientation="right" dataKey="kilogram" type="number" tick={{ dx: 45, fontSize: 14 }} domain={["dataMin - 1", "dataMax + 1"]} allowDecimals={false} tickCount={10} tickLine={false} axisLine={false} />
            <YAxis yAxisId="left" hide={true} />
            <Tooltip cursor={{ fill: 'rgba(200, 196, 196, 0.5)' }} contentStyle={{ backgroundColor: '#E60000' }} itemStyle={{ color: '#ffffff', fontSize: '7px', paddingBottom: 10, textAlign: "center" }} formatter={(value, name) => [name === 'Poids (kg)' ? value + 'kg' : value + 'kCal']} labelFormatter={() => ""} />
            <Legend verticalAlign="top" wrapperStyle={{ top: 24, left: 255 }} height={36} iconType="circle" iconSize={8} formatter={(value) => <span style={{ marginLeft: 10, marginRight: 32, fontSize: 14, color: value !== '#74798c' ? value : '#74798c' }}>{value}</span>} />
            <Bar shape={<CustomBar barRadius={3.5} />} dataKey="kilogram" name="Poids (kg)" fill="#282D30" barSize={7} />
            <Bar yAxisId="left" shape={<CustomBar barRadius={3.5} />} dataKey="calories" name="Calories brulées (kCal)" fill="#E60000" barSize={7} />
        </BarChart>
    </div>
}