const getEventParticipants = async (event) => {
  const data = await fetch(`http://localhost:4000/api/participants/${event}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await data.json();
};

export default getEventParticipants;
