const getAllEvents = async (page) => {
  const data = await fetch(`http://localhost:4000/api/events/${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await data.json();
};

export default getAllEvents;
