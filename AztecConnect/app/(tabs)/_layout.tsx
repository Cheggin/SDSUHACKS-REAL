import { Tabs } from 'expo-router';
import { createContext, useContext, useState } from 'react';
import Toast from 'react-native-toast-message';

// Event type
import type { EventCategory } from '../../components/EventCard'; // Assuming _layout is in /tabs/

export type EventType = {
  title: string;
  organization: string;
  location: string;
  datetime: string;
  attendeeCount: number;
  category: EventCategory;
};


// Context type
type LikedEventsContextType = {
  likedEvents: EventType[];
  points: number;
  addEvent: (event: EventType) => void;
  removeEvent: (event: EventType) => void;
  clearEvents: () => void;
};

const LikedEventsContext = createContext<LikedEventsContextType | undefined>(undefined);

export function useLikedEvents() {
  const context = useContext(LikedEventsContext);
  if (!context) {
    throw new Error('useLikedEvents must be used inside LikedEventsProvider');
  }
  return context;
}

export default function TabsLayout() {
  const [likedEvents, setLikedEvents] = useState<EventType[]>([]);
  const [points, setPoints] = useState(0);

  const addEvent = (event: EventType) => {
    const alreadyLiked = likedEvents.some(
      (e) => e.title === event.title && e.datetime === event.datetime
    );
    if (!alreadyLiked) {
      setLikedEvents((prev) => [...prev, event]);
      setPoints((prev) => prev + 5);
      Toast.show({
        type: 'success',
        text1: 'Event Saved!',
      });
    }
  };

  const removeEvent = (event: EventType) => {
    setLikedEvents((prev) =>
      prev.filter(
        (e) => !(e.title === event.title && e.datetime === event.datetime)
      )
    );
    setPoints((prev) => Math.max(prev - 5, 0)); // Remove 5 points when deleting, not below 0
  };

  const clearEvents = () => {
    setLikedEvents([]);
    setPoints(0);
  };

  return (
    <>
      <LikedEventsContext.Provider value={{ likedEvents, points, addEvent, removeEvent, clearEvents }}>
        <Tabs>
          <Tabs.Screen name="index" options={{ title: 'Home' }} />
          <Tabs.Screen name="EventDashboard" options={{ title: 'Events' }} />
          <Tabs.Screen name="my-events" options={{ title: 'My Events' }} />
        </Tabs>
      </LikedEventsContext.Provider>
      <Toast />
    </>
  );
}
