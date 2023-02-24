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

export const TechniciansList = ({ handleEdit }) => {
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
    content = technicians.map((technician, index) => (
    <div className='col s12 m6 l3' key={index}>
      <TechnicianCard id={technician.id} technician={technician} handleDelete={handleDelete} handleEdit={handleEdit} />
    </div>
    ))
  } else if (technicianStatus === 'failed') {
    content = <div>{error}</div>
  }

  if(query && search.length > 0) {
    content = search.map((technician, index) => (
      <div className='col s12 m6 l3' key={index}>
        <TechnicianCard id={technician.id} technician={technician} handleDelete={handleDelete} handleEdit={handleEdit} />
      </div>
     ))
  } else if (query && search.length === 0) {
    content = 
    <div className='row main-container center-align'>
      <h4>No results...</h4>
    </div>
  }

  return (
    <div className='row' style={{width: '80%'}}>
        {content}
    </div>
  )
}