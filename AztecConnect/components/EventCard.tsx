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
  Food: require('../assets/events/event6.png'),
  Graduation: require('../assets/events/event1.png'),
  Sports: require('../assets/events/event3.png'),
  Esports: require('../assets/events/event5.png'),
  Wellness: require('../assets/events/event2.png'),
  Career: require('../assets/events/event4.png'),
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
      <View style={styles.overlay}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.details}>{organization}</Text>
        <Text style={styles.details}>Location: {location}</Text>
        <Text style={styles.details}>{displayDate}</Text>
        <Text style={styles.details}>Attendees: {attendeeCount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    height: height * 0.75,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  details: {
    fontSize: 18,
    color: '#eee',
  },
});
