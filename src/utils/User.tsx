interface UserData {
    data: {
        id?: number;
        userInfos?: UserInfos;
        score?: number;
        todayScore?: number;
        keyData?: KeyData;
        sessions?: Session[] | AverageSession[];
        kind: { [key: number]: string };
        data: { value: number; kind: number }[];
    };
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

interface ScoreType {
    name: string;
    value: number;
    fill: string;
}

class User {
    id?: number;
    userInfos?: UserInfos;
    score?: number;
    keyData?: KeyData;
    sessions?: Session[];
    averageSessions?: AverageSession[];
    performances?: Performance;

    constructor(userData: UserData) {
        if (userData.data) {
            if (userData.data.id !== undefined) {
                this.id = userData.data.id;
            }
            if (userData.data.userInfos) {
                this.userInfos = userData.data.userInfos;
            }
            if (userData.data.todayScore !== undefined) {
                this.score = userData.data.todayScore;
            } else if (userData.data.score !== undefined) {
                this.score = userData.data.score;
            } else {
                this.score = 0;
            }
            if (userData.data.keyData) {
                this.keyData = userData.data.keyData;
            }
            if (userData.data.sessions) {
                if ((userData.data.sessions as Session[])[0]?.kilogram !== undefined) {
                    this.sessions = userData.data.sessions as Session[];
                } else if ((userData.data.sessions as AverageSession[])[0]?.sessionLength !== undefined) {
                    this.averageSessions = userData.data.sessions as AverageSession[];
                }
            }
            this.performances = {
                kind: userData.data.kind,
                data: userData.data.data
            };
        }
    }

    getScore(): ScoreType[] {
        const scoreValue = (this.score || 0) * 100;
        return [
            { name: 'completed', value: scoreValue, fill: '#ff0000' },
            { name: 'not completed', value: 100 - scoreValue, fill: '#ffffff' },
        ];
    }

    getPerformanceData() {
        if (!this.performances) return [];
        return this.performances.data.map(performance => ({
            kind: this.performances?.kind[performance.kind] || "",
            value: performance.value,
        })).reverse();
    }

    getActivityData() {
        if (!this.sessions) return [];
        return this.sessions.map(session => ({
            day: session.day.split("-")[2].trim().replace(/^0/, ''),
            kilogram: session.kilogram,
            calories: session.calories
        }));
    }

    getAverageSessionLengthData() {
        if (!this.averageSessions) return [];
        return this.averageSessions.map(session => ({
            day: session.day,
            sessionLength: session.sessionLength
        }));
    }

    getKeyData() {
        if (!this.keyData) return null;
        return {
            Calories: { value: this.keyData.calorieCount, image: "calories-icon.png" },
            Protéines: { value: this.keyData.proteinCount, image: "protein-icon.png" },
            Glucides: { value: this.keyData.carbohydrateCount, image: "carbs-icon.png" },
            Lipides: { value: this.keyData.lipidCount, image: "fat-icon.png" }
        }
    }
}
export default User