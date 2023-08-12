import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
import {
  getDatabase,
  ref,
  push,
  set,
  get,
  limitToLast,
  orderByChild,
  query,
} from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCVXbnXLwNFM-5Q63qJHiWCMWD9lsFlorM',
  authDomain: 'rpsleaderboard-d2d14.firebaseapp.com',
  databaseURL:
    'https://rpsleaderboard-d2d14-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'rpsleaderboard-d2d14',
  storageBucket: 'rpsleaderboard-d2d14.appspot.com',
  messagingSenderId: '552386929926',
  appId: '1:552386929926:web:1e307b05ed3f42a144aa87',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const leaderboardRef = ref(db, 'Leaderboard');

export async function checkAndUpdateTop10({ name, score, avatar }) {
  const leaderboardQuery = query(
    leaderboardRef,
    orderByChild('score'),
    limitToLast(10)
  );

  try {
    const snapshot = await get(leaderboardQuery);
    const leaderboardData = snapshot.val();

    if (!leaderboardData || Object.keys(leaderboardData).length < 10) {
      console.log(
        'The leaderboard has fewer than 10 entries or is empty. Add the new entry directly.'
      );
      const newEntryRef = push(leaderboardRef);
      await set(newEntryRef, { name, score, avatar });
      console.log('New entry added to the leaderboard!');
    } else {
      const leaderboardEntries = Object.entries(leaderboardData);
      const top10Entries = leaderboardEntries.slice(0, 10);

      let lowestScoreEntryIndex = -1;
      let lowestScore = null; // Initialize with null or any other appropriate value

      for (let i = 0; i < top10Entries.length; i++) {
        const entry = top10Entries[i];
        if (lowestScore === null || entry[1].score < lowestScore) {
          lowestScoreEntryIndex = i;
          lowestScore = entry[1].score;
        }
      }

      if (score > lowestScore) {
        console.log('New entry is in the top 10!');

        // Update the entry with the lowest score if there are 10 entries
        if (lowestScoreEntryIndex !== -1) {
          const lowestScoreEntryKey = top10Entries[lowestScoreEntryIndex][0];
          const updatedEntryRef = ref(db, `Leaderboard/${lowestScoreEntryKey}`);

          await set(updatedEntryRef, { name, score, avatar });
          console.log('Entry with the lowest score updated successfully!');
        }
      } else {
        console.log('New entry is not in the top 10.');
      }
    }

    // Retrieve the updated top 10 leaderboard entries
    const updatedSnapshot = await get(leaderboardQuery);
    const updatedLeaderboardData = updatedSnapshot.val();
    const updatedLeaderboardEntries = Object.entries(updatedLeaderboardData);

    // Sort the entries based on score in descending order
    const sortedTop10Entries = updatedLeaderboardEntries
      .sort((a, b) => b[1].score - a[1].score)
      .slice(0, 10);

    console.log('Updated top 10 leaderboard entries:');

    sortedTop10Entries.forEach((entry, index) => {
      console.log(
        `#${index + 1}: Name: ${entry[1].name}, Score: ${
          entry[1].score
        }, Avatar: ${entry[1].avatar}`
      );
    });

    return sortedTop10Entries;
  } catch (error) {
    console.error('Error retrieving or updating leaderboard data:', error);
    throw error;
  }
}
