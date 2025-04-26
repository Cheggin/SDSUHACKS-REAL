import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useState } from 'react';
import EventCard, { EventCategory } from '../../components/EventCard';
import eventsData from '../../assets/events.json';
import { useLikedEvents } from './_layout';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('window');

type EventType = {
  title: string;
  organization: string;
  location: string;
  datetime: string;
  attendeeCount: number;
  category: EventCategory;
};

export default function EventDashboard() {
  const { addEvent } = useLikedEvents();
  const [events, setEvents] = useState(eventsData as EventType[]);
  const [cardIndex, setCardIndex] = useState(0);

  const handleSwipedRight = (index: number) => {
    if (index >= 0 && index < events.length) {
      addEvent(events[index]);
      Toast.show({
        type: 'success',
        text1: 'Saved!',
      });
    }
  };

  return (
    <View style={styles.container}>
      {cardIndex >= events.length ? (
        <View style={styles.noMoreContainer}>
          <Text style={styles.noMoreText}>🎉 No more events to show!</Text>
        </View>
      ) : (
        <View style={styles.swiperWrapper}>
          <Swiper
            cards={events}
            cardIndex={cardIndex}
            renderCard={(itemRaw) => {
              const item = itemRaw as EventType;
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
            backgroundColor="transparent"
            onSwipedRight={(index) => {
              handleSwipedRight(index);
            }}
            onSwiped={(index) => {
              setCardIndex(index + 1);
            }}
            disableTopSwipe
            disableBottomSwipe
            verticalSwipe={false}
            animateCardOpacity
            animateOverlayLabelsOpacity
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5',
  },

  swiperWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardContainer: {
    width: width * 0.9,
    height: height * 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },

  noMoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noMoreText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#C23038',
  },
});
