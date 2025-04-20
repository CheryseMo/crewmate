import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categoryAttributeMap } from '../utils/attributeOptions';

function CrewmateEdit({ crewmates, setCrewmates }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const crewmate = crewmates.find(c => c.id === id);

  const [name, setName] = useState(crewmate?.name || '');
  const [attribute, setAttribute] = useState(crewmate?.attribute || '');
  const availableAttrs = categoryAttributeMap[crewmate?.category] || [];

  if (!crewmate) return <p>Crewmate not found.</p>;

  const handleUpdate = (e) => {
    e.preventDefault();
    const updated = crewmates.map(c =>
      c.id === id ? { ...c, name, attribute } : c
    );
    setCrewmates(updated);
    navigate('/');
  };

  const handleDelete = () => {
    const filtered = crewmates.filter(c => c.id !== id);
    setCrewmates(filtered);
    navigate('/');
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Edit Crewmate</h2>
      <p>Category: {crewmate.category}</p>

      <input value={name} onChange={(e) => setName(e.target.value)} required />

      <div>
        {availableAttrs.map(attr => (
          <button key={attr} type="button" onClick={() => setAttribute(attr)}>
            {attr} {attribute === attr && '✔️'}
          </button>
        ))}
      </div>

      <button type="submit">Save</button>
      <button type="button" onClick={handleDelete}>🗑️ Delete</button>
    </form>
  );
}

export default CrewmateEdit;
