import dataFetch from "./dataFetch";
import { useEffect, useState } from "react";
import "../styles/UserDataHeader.css";
import { USER_MAIN_DATA } from "src/_mocks_/datas_mocked.js"
import User from "../utils/User.tsx"

interface UserType {
    id: number;
    userInfos: {
        firstName: string;
        lastName: string;
        age: number;
    }
    score: number;
    keyData: {
        calorieCount: number;
        proteinCount: number;
        carbohydrateCount: number;
        lipidCount: number;
    }
}

export default function UserDataHeader({ userId }: { userId: string }) {
    const apiUrl = 'http://localhost:3000/user/' + userId;
    const [userData, setUserData] = useState<UserType | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDataFetch = await dataFetch(userId, apiUrl, USER_MAIN_DATA);
                const user = new User(userDataFetch);
                if (user.id !== undefined && user.userInfos && user.keyData) {
                    setUserData({
                        id: user.id,
                        userInfos: user.userInfos,
                        score: user.score || 0,
                        keyData: user.keyData
                    });
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    },[userId,apiUrl]);

    return (
        <div className="userDataHeader-container">
            {userData && (
                <>
                    <h2>Bonjour <span
                        className="userName">{userData.userInfos.firstName}</span></h2>
                    <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
                </>
            )}
        </div>
    );
}