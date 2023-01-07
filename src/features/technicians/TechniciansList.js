import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectAllTechnicians, 
  selectError, 
  selectStatus,
  selectSearch,
  selectQuery,
  fetchTechnicians 
} from './techniciansSlice';

const TechnicianBlock = ({ technician }) => {
  return (
    <div className='row main-container border-full'>
      <div className='col s4'>
        <h5 className='ellipsis center-align'>{technician.name}</h5>
      </div>
      <div className='col s4'>
        <h5 className='ellipsis center-align'>{technician.age}</h5>
      </div>
      <div className='col s4'>
        <h5 className='ellipsis center-align'>{technician.certification}</h5>
      </div>
    </div>
  )
}

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

  let content

  if(technicianStatus === 'loading') {
    content = 
    <div className='row main-container center-align'>
      <h4>loading...</h4>
    </div>
  } else if (technicianStatus === 'succeeded') {
    content = technicians.map(technician => (
     <TechnicianBlock key={technician.id} technician={technician} />
    ))
  } else if (technicianStatus === 'failed') {
    content = <div>{error}</div>
  }

  if(query && search.length > 0) {
    content = search.map(technician => (
      <TechnicianBlock key={technician.id} technician={technician} />
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