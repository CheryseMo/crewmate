import React from 'react';
import { useParams, Link } from 'react-router-dom';

function CrewmateDetail({ crewmates }) {
  const { id } = useParams();
  const crewmate = crewmates.find(c => c.id === id);

  if (!crewmate) return <p>Crewmate not found.</p>;

  return (
    <div>
      <h2>{crewmate.name}</h2>
      <p>Category: {crewmate.category}</p>
      <p>Attribute: {crewmate.attribute}</p>
      <p>Created: {new Date(crewmate.createdAt).toLocaleString()}</p>
      <Link to={`/edit/${id}`}>✏️ Edit</Link>
    </div>
  );
}

export default CrewmateDetail;
