import { useEffect, useState } from "react";
import getAllEvents from "./api/getAllEvents";
import EventCard from "./components/cards/EventCard";

function App() {
  const [events, setEvents] = useState()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchEvents = async () => {
        try {
          setLoading(true)
          const data =  await getAllEvents();
          setEvents(data)
        } catch (error) {
          setError(error)
        }finally {
          setLoading(false)
        }
      }
  
      fetchEvents();
  }, [])



  return (
    <div>
      <main >
        {loading && <p>Loading</p>}
        {error && <p>{error}</p>}
          {events?.map((event) => (
            <EventCard key={event._id} cardInfo={event}/>
          ))}
      </main>
    </div>
  );
}

export default App;
