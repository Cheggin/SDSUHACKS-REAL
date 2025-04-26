import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import EventCard, { EventCategory } from '../../components/EventCard'; 
import events from '../../assets/events.json';
import { useLikedEvents } from './_layout';

const { width } = Dimensions.get('window');

// Define EventType here because JSON is raw
type EventType = {
  title: string;
  organization: string;
  location: string;
  datetime: string;
  attendeeCount: number;
  category: EventCategory;
};

export default function EventDashboard() {
  const { addEvent, points } = useLikedEvents();

  return (
    <View style={styles.container}>
      <Text style={styles.points}>Points: {points}</Text>
      <Swiper
        cards={events}
        renderCard={(itemRaw) => {
          const item = itemRaw as EventType; // Force cast here!

          return (
            <View style={styles.cardContainer}>
              <EventCard
                title={item.title}
                organization={item.organization}
                location={item.location}
                datetime={item.datetime}
                attendeeCount={item.attendeeCount}
                category={item.category}
              />
            </View>
          );
        }}
        stackSize={3}
        cardIndex={0}
        backgroundColor={'#f5f5f5'}
        onSwipedRight={(cardIndex) => {
          if (cardIndex >= 0 && cardIndex < events.length) {
            addEvent(events[cardIndex] as EventType); // Safe here too
          }
        }}
        disableTopSwipe
        disableBottomSwipe
        verticalSwipe={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    paddingTop: 20,
  },
  cardContainer: {
    width: width * 0.9,
    height: '70%',
  },
  points: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
