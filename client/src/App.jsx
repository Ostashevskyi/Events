import { createContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import getAllEvents from "./api/getAllEvents";
import EventCard from "./components/cards/EventCard";
import SortSelect from "./components/selects/SortSelect";
import { useSearchParams } from "react-router-dom";

export const Context = createContext();

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [length, setLength] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [searchParams] = useSearchParams();

  const fetchEvents = async (page, reset = false) => {
    try {
      setLoading(true);
      const data = await getAllEvents(page, searchParams.get("sort"));
      const { events: newEvents, length: totalLength } = data;

      if (reset) {
        setEvents(newEvents);
      } else {
        setEvents((prevEvents) => [...prevEvents, ...newEvents]);
      }

      setLength(totalLength);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setActivePage(0);
    fetchEvents(0, true);
  }, [searchParams]);

  useEffect(() => {
    if (activePage > 0) {
      fetchEvents(activePage);
    }
  }, [activePage]);

  const refresh = () => {
    setEvents([]);
    setActivePage(0);
    fetchEvents(0, true);
  };

  return (
    <div className="max-w-[1440px] h-screen m-auto p-4">
      <main className="h-full">
        <section className="flex mt-5 justify-between mb-5">
          <h1 className="text-3xl">Events</h1>
          <SortSelect />
        </section>
        {loading && activePage === 0 ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="max-h-screen ">
            <InfiniteScroll
              dataLength={events.length}
              next={() => setActivePage((prevPage) => prevPage + 1)}
              hasMore={events.length < length}
              loader={<h4 className="text-center mt-5">Scroll to load more</h4>}
              endMessage={<p className="text-center mt-5">No more events</p>}
              refreshFunction={refresh}
              pullDownToRefresh
              scrollThreshold={1}
              pullDownToRefreshThreshold={50}
              pullDownToRefreshContent={
                <h3 style={{ textAlign: "center" }}>Pull down to refresh</h3>
              }
              releaseToRefreshContent={
                <h3 style={{ textAlign: "center" }}>Release to refresh</h3>
              }
            >
              <div className="grid grid-cols-1 gap-4">
                {events.map((event) => (
                  <EventCard key={event._id} cardInfo={event} />
                ))}
              </div>
            </InfiniteScroll>
          </div>
        )}
        {!events.length && !loading && (
          <p>Seems that there are no active events now</p>
        )}
        {error && <p>{error.message}</p>}
      </main>
    </div>
  );
}

export default App;
