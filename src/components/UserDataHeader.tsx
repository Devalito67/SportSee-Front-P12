import dataFetch from "./dataFetch";
import { useEffect, useState } from "react";
import "../styles/UserDataHeader.css";
import { USER_MAIN_DATA } from "../_mocks_/datas_mocked.js"
import User from "../utils/User.tsx"

export default function UserDataHeader({ userId }) {
    const apiUrl = 'http://localhost:3000/user/' + userId;
    const [userData, setUserData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDataFetch = await dataFetch(userId, apiUrl, USER_MAIN_DATA);
                const user = new User(userDataFetch); 
                setUserData(user);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    }, [userId, apiUrl, userData]);

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