import React from "react";

const ParticipantCard = ({ participantEmail, participantName }) => {
  return (
    <section className="w-full border border-[#ccc] p-2 rounded-lg shadow-md flex flex-col gap-2">
      <h2 className="text-2xl min-h-16">{participantName}</h2>
      <p>{participantEmail}</p>
    </section>
  );
};

export default ParticipantCard;
