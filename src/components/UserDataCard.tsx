import { USER_MAIN_DATA } from "../_mocks_/datas_mocked.js";
import "../styles/UserDataCard.css";
import dataFetch from "./dataFetch";
import { useEffect, useState } from "react";
import User from "../utils/User.jsx";

export default function UserDataCard({ userId }) {
    const apiUrl = 'http://localhost:3000/user/' + userId;
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDataFetch = await dataFetch(userId, apiUrl, USER_MAIN_DATA);
                const user = new User(userDataFetch); 
                console.log(user)
                setUserData(user.getKeyData());
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    }, [userId, apiUrl]);

    return (
        <div className="cards-container">
             {userData && (
             <>    
            {Object.keys(userData).map((key, index) => (
                <div key={index} className="userDataCard">
                    <img src={`/src/assets/${userData[key].image}`} alt={key} />
                    <div className="userDataCard-info">
                    <h2>{userData[key].value} g</h2> 
                    <p>{key}</p>
                    </div>
                </div>
            ))}
            </>
        )}
        </div>
    );
}

