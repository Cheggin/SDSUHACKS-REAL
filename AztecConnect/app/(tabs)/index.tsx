import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/sdsu-logo.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.appName}>AztecConnect</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/EventDashboard')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', padding: 20 },
  logo: { width: 200, height: 100, marginBottom: 20 },
  appName: { fontSize: 32, fontWeight: 'bold', color: '#C23038', marginBottom: 30 },
  button: {
    backgroundColor: '#C23038', 
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold',
  },
});
