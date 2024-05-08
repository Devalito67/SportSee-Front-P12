import dataFetch from "./dataFetch";
import { useEffect, useState } from "react";
import "../styles/UserDataHeader.css";
import { USER_MAIN_DATA } from "../_mocks_/datas_mocked.js"

export default function UserDataHeader({ userId }) {
    const apiUrl = 'http://localhost:3000/user/' + userId;
    const [dataCards, setDataCards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await dataFetch(userId, apiUrl, USER_MAIN_DATA);
                console.log("fetchedData", fetchedData.data.userInfos);
                const mappedDataCards = { prénom : fetchedData.data.userInfos.firstName
                   
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
        <div className="userDataHeader-container">
            <h2>Bonjour <span className="userName">{dataCards.prénom}</span></h2>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
    );
}