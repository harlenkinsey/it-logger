import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectAllTechnicians, fetchTechnicians } from './techniciansSlice';


const TechnicianBlock = ({ technician }) => {
  return (
    <div>
      <h3>{technician.name}</h3>
      <h4>{technician.age}</h4>
      <h4>{technician.certification}</h4>
    </div>
  )
}

export const TechniciansList = () => {
  const dispatch = useDispatch()
  const technicians = useSelector(selectAllTechnicians)

  const technicianStatus = useSelector(state => state.technicians.status)
  const error = useSelector(state => state.technicians.error)

  useEffect(() => {
    if (technicianStatus === 'idle') {
      dispatch(fetchTechnicians())
    }
  }, [technicianStatus, dispatch])

  let content

  if(technicianStatus === 'loading') {
    content = 'loading...'
  } else if (technicianStatus === 'succeeded') {
    content = technicians.map(technician => (
     <TechnicianBlock key={technician.id} technician={technician} />
    ))
  } else if (technicianStatus === 'failed') {
    content = <div>{error}</div>
  }
  
  return (
    <section>
      {content}
    </section>
  )
}