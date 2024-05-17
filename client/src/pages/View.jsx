import React, { createContext, useEffect, useState } from "react";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import getEventParticipants from "../api/getEventParticipants";
import ParticipantCard from "../components/cards/ParticipantCard";
import SearchParticipantForm from "../components/forms/SearchParticipantForm";

export const SearchContext = createContext();

const View = () => {
  const { event } = useParams();
  const [participants, setParticipants] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fullName = searchParams.get("fullName");
    const email = searchParams.get("email");

    const fetchParticipants = async () => {
      try {
        setLoading(true);
        const participants = await getEventParticipants(event, fullName, email);
        setParticipants(participants);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [searchParams]);

  return (
    <div className="max-w-[1440px] m-auto p-4">
      <div className="h-screen flex flex-col justify-center gap-5">
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
            <NavLink to={"/"}>Back to events</NavLink>
          </div>
        ) : (
          <div>
            <p className="text-xl">No registered participants</p>
            <NavLink to={`/register/${event}`} className="text-2xl">
              Be the first one!
            </NavLink>
          </div>
        )}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default View;
