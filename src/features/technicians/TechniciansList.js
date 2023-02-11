import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectAllTechnicians, 
  selectError, 
  selectStatus,
  selectSearch,
  selectQuery,
  fetchTechnicians,
  deleteTechnician 
} from './techniciansSlice';

import { TechnicianCard } from './TechnicianCard';

export const TechniciansList = () => {
  const dispatch = useDispatch()
  const technicians = useSelector(selectAllTechnicians)
  const search = useSelector(selectSearch)
  const query = useSelector(selectQuery)

  const technicianStatus = useSelector(selectStatus)
  const error = useSelector(selectError)

  useEffect(() => {
    if (technicianStatus === 'idle') {
      dispatch(fetchTechnicians())
    }
  }, [technicianStatus, dispatch])

  const handleDelete = id => {
    dispatch(deleteTechnician(id));
    dispatch(fetchTechnicians());
  }

  let content

  if(technicianStatus === 'loading') {
    content = 
    <div className='row main-container center-align'>
      <h4>loading...</h4>
    </div>
  } else if (technicianStatus === 'succeeded') {
    content = technicians.map(technician => (
     <TechnicianCard key={technician.id} technician={technician} handleDelete={handleDelete} />
    ))
  } else if (technicianStatus === 'failed') {
    content = <div>{error}</div>
  }

  if(query && search.length > 0) {
    content = search.map(technician => (
      <TechnicianCard key={technician.id} technician={technician} handleDelete={handleDelete} />
     ))
  } else if (query && search.length === 0) {
    content = 
    <div className='row main-container center-align'>
      <h4>No results...</h4>
    </div>
  }

  return (
    <section>
      {content}
    </section>
  )
}