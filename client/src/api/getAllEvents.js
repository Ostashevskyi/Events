const getAllEvents = async (page, sortBy) => {
  const data = await fetch(
    `http://localhost:4000/api/events/${page}?sort=${sortBy}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return await data.json();
};

export default getAllEvents;
