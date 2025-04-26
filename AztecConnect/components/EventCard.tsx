import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { format, parseISO, isValid } from 'date-fns';

const { width, height } = Dimensions.get('window');

export type EventCategory = "Food" | "Graduation" | "Sports" | "Esports" | "Wellness" | "Career";

type EventCardProps = {
  title: string;
  organization: string;
  location: string;
  datetime: string;
  attendeeCount: number;
  category: EventCategory;
};

// Preloaded local images mapped by category
const categoryImages: Record<EventCategory, any> = {
  Food: require('../assets/events/Food.png'),
  Graduation: require('../assets/events/Graduation.png'),
  Sports: require('../assets/events/Sports.png'),
  Esports: require('../assets/events/Esports.png'),
  Wellness: require('../assets/events/Wellness.png'),
  Career: require('../assets/events/Career.png'),
};

export default function EventCard({ title, organization, location, datetime, attendeeCount, category }: EventCardProps) {
  let displayDate = "Date Unavailable";

  if (datetime) {
    const parsed = parseISO(datetime);
    if (isValid(parsed)) {
      displayDate = format(parsed, "PPpp");
    }
  }

  const selectedImage = categoryImages[category];

  return (
    <View style={styles.card}>
      <Image source={selectedImage} style={styles.image} resizeMode="cover" />

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{organization}</Text>
        <Text style={styles.details}>📍 {location}</Text>
        <Text style={styles.details}>🗓️ {displayDate}</Text>
        <Text style={styles.details}>👥 {attendeeCount} attending</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: height * 0.60, 
  },
  textContainer: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#C23038',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  details: {
    fontSize: 14,
    color: '#777',
    marginBottom: 2,
  },
});
