import { Tabs } from 'expo-router';
import { createContext, useContext, useState } from 'react';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons'; // ✅ Icon import

// Event type
import type { EventCategory } from '../../components/EventCard';

export type EventType = {
  title: string;
  organization: string;
  location: string;
  datetime: string;
  attendeeCount: number;
  category: EventCategory;
};

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
    setPoints((prev) => Math.max(prev - 5, 0));
  };

  const clearEvents = () => {
    setLikedEvents([]);
    setPoints(0);
  };

  return (
    <>
      <LikedEventsContext.Provider value={{ likedEvents, points, addEvent, removeEvent, clearEvents }}>
        <Tabs
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap = 'home';

              if (route.name === 'index') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'EventDashboard') {
                iconName = focused ? 'calendar' : 'calendar-outline';
              } else if (route.name === 'my-events') {
                iconName = focused ? 'heart' : 'heart-outline';
              } else if (route.name === 'Leaderboard') {
                iconName = focused ? 'trophy' : 'trophy-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#C23038', // Mahogany
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tabs.Screen name="index" options={{ title: 'Home' }} />
          <Tabs.Screen name="EventDashboard" options={{ title: 'Events' }} />
          <Tabs.Screen name="my-events" options={{ title: 'My Events' }} />
          <Tabs.Screen name="Leaderboard" options={{ title: 'Leaderboard' }} />
        </Tabs>
      </LikedEventsContext.Provider>
      <Toast />
    </>
  );
}
