import { PieChart, Pie, Cell } from "recharts";
import { USER_MAIN_DATA } from "../_mocks_/datas_mocked.js";
import dataFetch from "./dataFetch.js";
import "../styles/UserPieChart.css";
import { useState, useEffect } from "react";
import User from "../utils/User.jsx";

export default function UserPieChart({ userId }) {
    const apiUrl = 'http://localhost:3000/user/' + userId;
    const [userData, setUserData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDataFetch = await dataFetch(userId, apiUrl, USER_MAIN_DATA);
                const user = new User(userDataFetch)
                console.log("user", user.getScore())
                setUserData(user.getScore());
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    }, [userId, apiUrl]);


    return <div className="userPieChart">
        <h3>Score</h3>
        <div className="userScore-container">
            <p className="userScore-value">{userData ? `${userData[0].value}%` : null}</p>
            <p>de votre objectif</p>
        </div>
        <PieChart width={218} height={218}>
            <Pie data={userData} cx="50%" cy="50%" innerRadius={75} outerRadius={85} paddingAngle={0} dataKey="value" cornerRadius={5} startAngle={90} endAngle={450}>
                {userData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                ))
                }
            </Pie>

        </PieChart>
    </div>

}