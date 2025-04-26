import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      {/* SDSU Logo */}
      <Image source={require('../../assets/sdsu-logo.jpg')} style={styles.logo} resizeMode="contain" />

      {/* App Name */}
      <Text style={styles.appName}>AztecConnect</Text>

      {/* Description Box */}
      <View style={styles.descriptionBox}>
        <Text style={styles.descriptionHeader}>
          Unite. Connect. Thrive at SDSU.
        </Text>

        <Text style={styles.bulletPoint}>📅 Aggregate all campus events in one place</Text>
        <Text style={styles.bulletPoint}>🤝 See who's attending and make new friends</Text>
        <Text style={styles.bulletPoint}>🏆 Earn points, climb leaderboards, and unlock badges</Text>
        <Text style={styles.bulletPoint}>🎉 Make event discovery social, easy, and fun</Text>
      </View>

      {/* Get Started Button */}
      <TouchableOpacity style={styles.button} onPress={() => router.replace('/EventDashboard')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  logo: {
    width: width * 0.5,
    height: width * 0.3,
    marginBottom: 20,
  },

  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#C23038', // Mahogany
    marginBottom: 20,
  },

  descriptionBox: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    alignItems: 'flex-start',
  },

  bulletPoint: {
  fontSize: 15, // ⬅️ Smaller text (was 16)
  color: '#555',
  marginBottom: 12, // ⬅️ More breathing room (was 8)
},

descriptionHeader: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#C23038',
  marginBottom: 16, // ⬅️ More space after the header
  alignSelf: 'center',
  textAlign: 'center',
},


  button: {
    backgroundColor: '#C23038',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 3,
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
