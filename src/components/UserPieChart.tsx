import { PieChart, Pie, Cell } from "recharts";
import { USER_MAIN_DATA } from "../_mocks_/datas_mocked.js";
import dataFetch from "./dataFetch.js";
import "../styles/UserPieChart.css";
import { useState, useEffect } from "react";

export default function UserPieChart({ userId }) {
    const apiUrl = 'http://localhost:3000/user/' + userId;
    const [score, setScore] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await dataFetch(userId, apiUrl, USER_MAIN_DATA);

                const mappedScore = [
                    { name: "userScore", value: (fetchedData.data.score * 100) || (fetchedData.data.todayScore * 100), fill: "#ff0000"},
                    { name: "globalScore", value: (100 - fetchedData.data.score * 100)  || (100 - fetchedData.data.todayScore * 100), fill: "#fbfbfb" }
                ];

                setScore(mappedScore);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    }, []);

    console.log("score", score)

    return <div className="userPieChart">
        <h3>Score</h3>
        <div className="userScore-container">
          <p className="userScore-value">{score ? `${score[0].value}%` : null}</p>
          <p>de votre objectif</p>  
        </div>
        <PieChart width={218} height={218}>
            <Pie data={score} cx="50%" cy="50%" innerRadius={75} outerRadius={85} paddingAngle={0} dataKey="value" cornerRadius={5} startAngle={90} endAngle={450}>
                {score?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))
                }
            </Pie>

        </PieChart>
    </div>

}