interface UserData {
    id: number;
    userInfos: UserInfos;
    score: number;
    keyData: KeyData;
}

interface UserInfos {
    firstName: string;
    lastName: string;
    age: number;
}

interface KeyData {
    calorieCount: number;
    proteinCount: number;
    carbohydrateCount: number;
    lipidCount: number;
}

interface Session {
    day: string;
    kilogram: number;
    calories: number;
}

interface AverageSession {
    day: number;
    sessionLength: number;
}

interface Performance {
    kind: { [key: number]: string };
    data: { value: number; kind: number }[];
}


class User {
    id: number;
    userInfos: UserInfos;
    score: number;
    keyData: KeyData;
    sessions: Session[];
    averageSessions: AverageSession[];
    performances: Performance[];

    constructor(userData: UserData) {
        this.id = userData.data.id || userData.data.userId;
        this.userInfos = userData.data.userInfos;
        this.score = userData.data.todayScore || userData.data.score;
        this.keyData = userData.data.keyData;
        this.sessions = userData.data.sessions;
        this.averageSessions = userData.data.sessions;
        this.performances = userData.data;
    }

    getKeyData() {
        return { 
            Calories:  { value: this.keyData.calorieCount, image: "calories-icon.png" },
            Protéines:  { value: this.keyData.proteinCount, image: "protein-icon.png" },
            Glucides:  { value: this.keyData.carbohydrateCount, image: "carbs-icon.png" },
            Lipides:  { value: this.keyData.lipidCount, image: "fat-icon.png" }
        }
    }

    getScore() {
        return [
            { name: "userScore", value: (this.score * 100), fill: "#ff0000"},
        { name: "globalScore", value: (100 - this.score * 100), fill: "#fbfbfb" }
    ]
        
    }

    getActivityData() {
        return this.sessions.map(session => ({ day: session.day.split("-")[2].trim().replace(/^0/, ''), kilogram: session.kilogram, calories: session.calories }));
    }

    getAverageSessionLengthData() {
        return this.averageSessions.map(session => ({ day: session.day, sessionLength: session.sessionLength }));
    }

    getPerformanceData() {
        return this.performances.data.map(performance => ({ kind: this.performances.kind[performance.kind], value: performance.value })).reverse();
    }
}

export default User;