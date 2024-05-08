import { USER_MAIN_DATA } from "../_mocks_/datas_mocked.js";
import "../styles/UserDataCard.css";
import dataFetch from "./dataFetch";
import { useEffect, useState } from "react";

export default function UserDataCard({ userId }) {
    const apiUrl = 'http://localhost:3000/user/' + userId;
    const [dataCards, setDataCards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await dataFetch(userId, apiUrl, USER_MAIN_DATA);
                console.log("fetchedData", fetchedData.data.keyData);
                const mappedDataCards = {
                    Calories: {
                        value: fetchedData.data.keyData.calorieCount + "kCal",
                        image: "calories-icon.png"
                    },
                    Proteines: {
                        value: fetchedData.data.keyData.proteinCount + "g",
                        image: "protein-icon.png"
                    },
                    Glucides: {
                        value: fetchedData.data.keyData.carbohydrateCount + "g",
                        image: "carbs-icon.png"
                    },
                    Lipides: {
                        value: fetchedData.data.keyData.lipidCount + "g",
                        image: "fat-icon.png"
                    }
                };
                setDataCards(mappedDataCards);
                console.log("datacards", dataCards);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    }, [userId, apiUrl, dataCards]);

    return (
        <div className="cards-container">
            {Object.keys(dataCards).map((key, index) => (
                <div key={index} className="userDataCard">
                    <img src={`/src/assets/${dataCards[key].image}`} alt={key} />
                    <div className="userDataCard-info">
                    <h2>{dataCards[key].value}</h2> 
                    <p>{key}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

