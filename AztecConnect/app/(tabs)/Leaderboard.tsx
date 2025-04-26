import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useLikedEvents } from './_layout';

export default function Leaderboard() {
  const { points } = useLikedEvents();

  // Fake competitors
  const competitors = [
    { name: 'Alex', points: 120 },
    { name: 'Sam', points: 90 },
    { name: 'Jordan', points: 70 },
    { name: 'Taylor', points: 50 },
    { name: 'You', points }, // Insert YOU dynamically here
  ];

  // Sort leaderboard by points descending
  const leaderboard = competitors.sort((a, b) => b.points - a.points);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={leaderboard}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Text style={styles.rank}>#{index + 1}</Text>
            <Text style={[styles.name, item.name === 'You' && styles.you]}>
              {item.name}
            </Text>
            <Text style={styles.points}>{item.points} pts</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#ddd' },
  rank: { fontSize: 18, fontWeight: 'bold', width: 30 },
  name: { fontSize: 18, flex: 1 },
  points: { fontSize: 16, color: '#555' },
  you: { color: '#007AFF', fontWeight: 'bold' }, // highlight "You"
});
