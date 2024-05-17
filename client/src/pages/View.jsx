import React, { createContext, useEffect, useState } from "react";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import getEventParticipants from "../api/getEventParticipants";
import ParticipantCard from "../components/cards/ParticipantCard";
import SearchParticipantForm from "../components/forms/SearchParticipantForm";
import LineChart from "../components/charts/LineChart";

export const SearchContext = createContext();

const View = () => {
  const { event } = useParams();
  const [participants, setParticipants] = useState();
  const [todayParticipants, setTodayParticipants] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fullName = searchParams.get("fullName");
    const email = searchParams.get("email");

    const fetchParticipants = async () => {
      try {
        setLoading(true);
        const { participants, todayParticipants } = await getEventParticipants(
          event,
          fullName,
          email
        );
        setParticipants(participants);
        setTodayParticipants(todayParticipants);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [searchParams]);

  return (
    <div className="max-w-[1440px] m-auto p-4 flex flex-col gap-20">
      <div className="flex mt-10 flex-col justify-center gap-5">
        <section className="flex items-center justify-between">
          <h1 className="text-2xl">{event} participants</h1>
          <SearchParticipantForm />
        </section>
        {loading && participants?.length ? (
          <p>Loading...</p>
        ) : participants?.length ? (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-4 gap-4 ">
              {participants.map((participant) => (
                <ParticipantCard
                  key={participant._id}
                  participantName={participant.fullName}
                  participantEmail={participant.email}
                />
              ))}
            </div>
            <NavLink to={"/"}>{"<- Back to events"}</NavLink>
          </div>
        ) : (
          <div>
            <p className="text-xl">No registered participants</p>
            <NavLink to={`/register/${event}`} className="text-2xl underline">
              Be the first one! Click to register
            </NavLink>
            <p className="mt-4">
              <NavLink to={"/"}>{"<- Back to events"}</NavLink>
            </p>
          </div>
        )}
        {error && <p>{error}</p>}
      </div>
      <div>
        <LineChart todayParticipants={todayParticipants} event={event} />
      </div>
    </div>
  );
};

export default View;
