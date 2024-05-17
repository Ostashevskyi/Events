import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import getEventParticipants from "../api/getEventParticipants";
import ParticipantCard from "../components/cards/ParticipantCard";

const View = () => {
  const { event } = useParams();
  const [participants, setParticipants] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        setLoading(true);
        const participants = await getEventParticipants(event);
        setParticipants(participants);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  return (
    <div className="max-w-[1440px] m-auto p-4">
      <div className="h-screen flex flex-col justify-center gap-5">
        <h1 className="text-2xl">{event} participants</h1>
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
            <p className="mt-4">
              <NavLink to={"/"}>Back to events</NavLink>
            </p>
          </div>
        )}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default View;
