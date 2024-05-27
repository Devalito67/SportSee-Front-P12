import { UserData, Activity, AverageSessions, Performance } from 'src/_mocks_/datas_mocked.js';

export default async function dataFetch(userId: string, apiUrl: string, dataUsers: (UserData | Activity | AverageSessions | Performance)[]) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données');
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Erreur: Les données sont des données de substitution!!!');
    const userData = dataUsers.find((user) => user.userId === parseInt(userId) || user.id === parseInt(userId));
    return { data: userData };
  }
}
