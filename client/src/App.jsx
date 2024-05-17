import { createContext, useEffect, useState } from "react";
import getAllEvents from "./api/getAllEvents";
import EventCard from "./components/cards/EventCard";
import Pagination from "./components/pagination/Pagination";

export const Context = createContext();

function App() {
  const [events, setEvents] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [length, setLength] = useState();
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await getAllEvents(activePage - 1);
        const { events, length } = data;
        setEvents(events);
        setLength(length);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [activePage]);

  return (
    <div className="max-w-[1440px] m-auto">
      <main className="h-screen flex flex-col justify-center gap-5">
        <h1 className="text-3xl">Events</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-4">
              {events?.map((event) => (
                <EventCard key={event._id} cardInfo={event} />
              ))}
            </div>
            <Context.Provider value={[activePage, setActivePage]}>
              <Pagination countOfEvents={length} />
            </Context.Provider>
          </>
        )}
        {error && <p>{error}</p>}
      </main>
    </div>
  );
}

export default App;
