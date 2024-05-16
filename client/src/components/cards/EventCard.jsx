import React from 'react'
import {NavLink} from 'react-router-dom'

const EventCard = ({cardInfo}) => {
  return (
    <section>
        <h2>{cardInfo.title}</h2>
        <p>{cardInfo.description}</p>

        <div>
            <NavLink to={'/'}>Register</NavLink>
            <NavLink to={'/'}>View</NavLink>
        </div>
    </section>
  )
}

export default EventCard