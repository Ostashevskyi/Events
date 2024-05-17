import { createContext, useEffect, useState } from "react";
import getAllEvents from "./api/getAllEvents";
import EventCard from "./components/cards/EventCard";
import Pagination from "./components/paginations/Pagination";
import SortSelect from "./components/selects/SortSelect";
import { useSearchParams } from "react-router-dom";

export const Context = createContext();

function App() {
  const [events, setEvents] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [length, setLength] = useState();
  const [activePage, setActivePage] = useState(1);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await getAllEvents(
          activePage - 1,
          searchParams.get("sort")
        );
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
  }, [activePage, searchParams]);

  return (
    <div className="max-w-[1440px] m-auto p-4">
      <main className="h-screen flex flex-col justify-center gap-5">
        <section className="flex justify-between">
          <h1 className="text-3xl">Events</h1>
          <SortSelect />
        </section>
        {loading ? (
          <p className="text-center">Loading...</p>
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
        {!events?.length && <p>Seems that there are no active events now </p>}
        {error && <p>{error}</p>}
      </main>
    </div>
  );
}

export default App;
