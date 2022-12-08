import React from 'react'
import { useSelector } from 'react-redux'

export const TechniciansList = () => {
  const technicians = useSelector(state => state.technicians)

  const renderedTechnicians = technicians.map(technician => (
    <article className='' key={technician.id}>
      
      <h3>{technician.name}</h3>
      <h3>{technician.age}</h3>
      <h3>{technician.certification}</h3>
      
    </article>
  ))

  return (
    <section className=''>
      <h2>Technicians</h2>
      {renderedTechnicians}
    </section>
  )
}