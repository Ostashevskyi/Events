const getEventParticipants = async (event, fullName, email) => {
  const data = await fetch(
    `http://localhost:4000/api/participants/${event}?fullName=${
      !fullName ? "" : fullName
    }&email=${!email ? "" : email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return await data.json();
};

export default getEventParticipants;
