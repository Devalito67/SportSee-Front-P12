import "src/styles/UserDataCard.css";
import dataFetch from "./dataFetch";
import { useEffect, useState } from "react";
import User from "../utils/User.jsx";
import { USER_MAIN_DATA } from "src/_mocks_/datas_mocked.js";

interface KeyDataTypes {
    Calories: {
        value: number;
        image: string;
    };
    Protéines: {
        value: number;
        image: string;
    };
    Glucides: {
        value: number;
        image: string;
    };
    Lipides: {
        value: number;
        image: string;
    };
}


export default function UserDataCard({ userId }: { userId: string }) {
    const apiUrl = 'http://localhost:3000/user/' + userId;
    const [userData, setUserData] = useState<KeyDataTypes | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDataFetch = await dataFetch(userId, apiUrl, USER_MAIN_DATA);
                const user = new User(userDataFetch);
                setUserData(user.getKeyData());
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    }, [userId,apiUrl]);

    return (
        <div className="cards-container">
            {userData && (
                <>
                    {Object.keys(userData).map((key, index) => (
                        <div key={index} className="userDataCard">
                            <img src={`/src/assets/${userData[key as keyof KeyDataTypes].image}`} alt={key} />
                            <div className="userDataCard-info">
                                <h2>{userData[key as keyof KeyDataTypes].value} g</h2>
                                <p>{key}</p>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

