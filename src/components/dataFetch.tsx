export default async function dataFetch(userId: string, apiUrl: string, dataUsers: any[]) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données');
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Erreur:', error);
    const userData = dataUsers.find((user) => user.userId === parseInt(userId) || user.id === parseInt(userId));
    return { data: userData };
  }
}
