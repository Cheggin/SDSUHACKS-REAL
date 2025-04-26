import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLikedEvents } from './_layout';
import { EventCategory } from '../../components/EventCard';

type EventType = {
  title: string;
  organization: string;
  location: string;
  datetime: string;
  attendeeCount: number;
  category: EventCategory;
};

export default function MyEvents() {
  const { likedEvents, removeEvent, clearEvents, points } = useLikedEvents();

  if (likedEvents.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No events added yet. Swipe right to save an event!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.points}>Points: {points}</Text>

      <TouchableOpacity onPress={clearEvents} style={styles.clearButton}>
        <Text style={styles.clearText}>Clear All Events</Text>
      </TouchableOpacity>

      <FlatList
        data={likedEvents}
        keyExtractor={(item) => item.title + item.datetime}
        renderItem={({ item }) => {
          const event = item as EventType;

          return (
            <View style={styles.eventItem}>
              <View style={styles.eventInfo}>
                <Text style={styles.title}>{event.title}</Text>
                <Text style={styles.subtitle}>{event.organization}</Text>
                <Text style={styles.details}>{event.location}</Text>
                <Text style={styles.details}>{new Date(event.datetime).toLocaleDateString()}</Text>
                <Text style={styles.details}>{event.attendeeCount} attending</Text>
              </View>
              <TouchableOpacity onPress={() => removeEvent(event)} style={styles.removeButton}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  emptyText: { fontSize: 18, color: '#666', textAlign: 'center', marginTop: 50 },
  points: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  clearButton: { backgroundColor: '#C23038', padding: 10, borderRadius: 8, marginBottom: 16, alignItems: 'center' },
  clearText: { color: 'white', fontWeight: 'bold' },
  eventItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  eventInfo: {
    marginBottom: 8,
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 16, fontWeight: '600', color: '#555', marginBottom: 4 },
  details: { fontSize: 14, color: '#777' },
  removeButton: {
    backgroundColor: '#ddd',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  removeText: { color: '#333', fontWeight: 'bold' },
});
