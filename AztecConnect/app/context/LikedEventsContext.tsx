import { createContext, useState, useContext } from 'react';

type EventType = {
  title: string;
  organization: string;
  location: string;
  datetime: string;
};

type LikedEventsContextType = {
  likedEvents: EventType[];
  addEvent: (event: EventType) => void;
};

const LikedEventsContext = createContext<LikedEventsContextType | undefined>(undefined);

export function LikedEventsProvider({ children }: { children: React.ReactNode }) {
  const [likedEvents, setLikedEvents] = useState<EventType[]>([]);

  const addEvent = (event: EventType) => {
    setLikedEvents((prev) => [...prev, event]);
  };

  return (
    <LikedEventsContext.Provider value={{ likedEvents, addEvent }}>
      {children}
    </LikedEventsContext.Provider>
  );
}

export function useLikedEvents() {
  const context = useContext(LikedEventsContext);
  if (!context) {
    throw new Error('useLikedEvents must be used within a LikedEventsProvider');
  }
  return context;
}
