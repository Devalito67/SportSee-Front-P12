declare module 'src/_mocks_/datas_mocked.js' {
    interface UserInfo {
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

    interface UserData {
        id?: number;
        userId?: number;
        userInfos: UserInfo;
        todayScore?: number;
        score?: number;
        keyData: KeyData;
    }

    interface Session {
        day: string;
        kilogram: number;
        calories: number;
    }

    interface Activity {
        userId?: number;
        id?: number;
        sessions: Session[];
    }

    interface AverageSession {
        day: number;
        sessionLength: number;
    }

    interface AverageSessions {
        userId?: number;
        id?: number;
        sessions: AverageSession[];
    }

    interface Performance {
        userId?: number;
        id?: number;
        kind: { [key: number]: string };
        data: PerformanceData[];
    }

    export const USER_MAIN_DATA: UserData[];
    export const USER_ACTIVITY: Activity[];
    export const USER_AVERAGE_SESSIONS: AverageSessions[];
    export const USER_PERFORMANCE: Performance[];
}