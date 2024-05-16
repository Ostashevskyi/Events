
const getAllEvents = async () => {
  const data = await fetch('http://localhost:4000/api/events', {
    method: "GET",
    "Content-Type": "application/json"
  })

  return await data.json()
}

export default getAllEvents