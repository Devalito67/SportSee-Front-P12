export default async function dataFetch(userId, apiUrl, dataUsers) {
  let userData;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données');
    }
    userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Erreur:', error);

    const userData = dataUsers.find((user) => user.userId === parseInt(userId) || user.id === parseInt(userId));

    return { data: userData };
  }
}




/* try {
   const response = await fetch('http://localhost:3000/user/'+ userId +'/activity');
   if (!response.ok) {
     throw new Error('Erreur lors de la récupération des données');
   }
   const userActivityData = await response.json();
   console.log("userActivityData",userActivityData);
 } catch (error) {
   console.error('Erreur:', error);
   const userActivityDataMock = USER_ACTIVITY.filter((user) => user.userId === parseInt(userId));
   console.log("userActivityDataMock",userActivityDataMock);
 }
 try {
   const response = await fetch('http://localhost:3000/user/'+ userId +'/average-sessions');
   if (!response.ok) {
     throw new Error('Erreur lors de la récupération des données');
   }
   const userSessionData = await response.json();
   console.log("userSessionData", userSessionData);
 } catch (error) {
   console.error('Erreur:', error);
   const userSessionDataMock = USER_AVERAGE_SESSIONS.filter((user) => user.userId === parseInt(userId));
   console.log("userSessionDataMock",userSessionDataMock);
 }
 try {
   const response = await fetch('http://localhost:3000/user/'+ userId +'/performance');
   if (!response.ok) {
     throw new Error('Erreur lors de la récupération des données');
   }
   const userPerformanceData = await response.json();
   console.log(userPerformanceData);
 } catch (error) {
   console.error('Erreur:', error);
   const userPerformanceDataMock = USER_PERFORMANCE.filter((user) => user.userId === parseInt(userId));
   console.log("userPerformanceDataMock",userPerformanceDataMock);
 }
}*/
