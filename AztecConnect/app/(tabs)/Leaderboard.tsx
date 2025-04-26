import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useLikedEvents } from './_layout';

export default function Leaderboard() {
  const { points } = useLikedEvents();

  const users = [
    { name: 'AztecKing', points: 135 },
    { name: 'CampusStar', points: 120 },
    { name: 'EventMaster', points: 110 },
    { name: 'You', points }, // 👈 Your dynamic points
    { name: 'SwiftScholar', points: 80 },
    { name: 'FiestaFan', points: 70 },
    { name: 'SDSUExplorer', points: 65 },
  ];

  const sortedUsers = users.sort((a, b) => b.points - a.points);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Leaderboard</Text>

      <FlatList
        data={sortedUsers}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => {
          const isYou = item.name === 'You';
          return (
            <View style={[styles.userCard, isYou && styles.highlightCard]}>
              <Text style={[styles.rank, isYou && styles.highlightText]}>
                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
              </Text>
              <View style={styles.userInfo}>
                <Text style={[styles.userName, isYou && styles.highlightText]}>{item.name}</Text>
                <Text style={[styles.userPoints, isYou && styles.highlightText]}>{item.points} pts</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 50, paddingHorizontal: 16 },
  header: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#C23038', marginBottom: 20 },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  highlightCard: {
    backgroundColor: '#fff8dc', // Light gold (cornsilk)
    borderWidth: 1,
    borderColor: '#C23038',
  },
  rank: {
    fontSize: 24,
    fontWeight: 'bold',
    width: 50,
    textAlign: 'center',
    color: '#C23038',
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  userPoints: {
    fontSize: 16,
    color: '#777',
    marginTop: 4,
  },
  highlightText: {
    color: '#C23038', // Mahogany
    fontWeight: 'bold',
  },
});
