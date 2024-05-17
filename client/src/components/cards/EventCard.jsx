import React from "react";
import { NavLink } from "react-router-dom";

const EventCard = ({ cardInfo }) => {
  const { title, description, organizer, eventDate } = cardInfo;
  return (
    <section className="border border-[#ccc] p-2 rounded-lg shadow-md flex flex-col gap-2">
      <h2 className="text-2xl min-h-16">{title}</h2>
      <p className="text-base">{description}</p>
      <p className="text-sm text-[#555]">Date: {eventDate}</p>
      <p className="text-sm text-[#555]">Organizer: {organizer}</p>
      <div className="flex justify-between">
        <NavLink to={"/"}>Register</NavLink>
        <NavLink to={"/"}>View</NavLink>
      </div>
    </section>
  );
};

export default EventCard;
