import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './CrewmateForm.css';

const CATEGORY_ATTRIBUTES = {
  'Project Manager': ['Leadership', 'Organization', 'Communication'],
  'Developer': ['JavaScript', 'React', 'Debugging'],
  'D&D Fighter': ['Strength', 'Endurance', 'Armor'],
  'D&D Mage': ['Intelligence', 'Mana', 'Spells']
};

function CrewmateForm({ editMode }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [crewmates, setCrewmates] = useState(
    JSON.parse(localStorage.getItem('crewmates')) || []
  );
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    attribute: ''
  });

  useEffect(() => {
    if (editMode && id) {
      const found = crewmates.find(c => c.id === id);
      if (found) setFormData(found);
    }
  }, [editMode, id, crewmates]);

const handleChange = e => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value,
    ...(name === 'category' && { attribute: '' }) 
  }));
};

  const handleSubmit = e => {
    e.preventDefault();
    let updatedCrewmates;
    if (editMode) {
      updatedCrewmates = crewmates.map(c => (c.id === id ? formData : c));
    } else {
      updatedCrewmates = [...crewmates, { ...formData, id: uuidv4(), createdAt: Date.now() }];
    }

    localStorage.setItem('crewmates', JSON.stringify(updatedCrewmates));
    setCrewmates(updatedCrewmates);
    window.location.href = '/';
    
  };

  const handleDelete = () => {
    const filtered = crewmates.filter(c => c.id !== id);
    localStorage.setItem('crewmates', JSON.stringify(filtered));
    window.location.href = '/';
  };

  const availableAttributes = CATEGORY_ATTRIBUTES[formData.category] || [];

  return (
    <form onSubmit={handleSubmit} className="crewmate-form">
      <h2>{editMode ? 'Edit Crewmate' : 'Add New Crewmate'}</h2>
      <label>Name</label>
      <input name="name" value={formData.name} onChange={handleChange} required />

      <label>Category</label>
      <select name="category" value={formData.category} onChange={handleChange} required>
        <option value="">Select a category</option>
        {Object.keys(CATEGORY_ATTRIBUTES).map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {formData.category && (
        <>
          <label>Attribute</label>
          <select name="attribute" value={formData.attribute} onChange={handleChange} required>
            <option value="">Select an attribute</option>
            {availableAttributes.map(attr => (
              <option key={attr} value={attr}>{attr}</option>
            ))}
          </select>
        </>
      )}

      <button type="submit">{editMode ? 'Update' : 'Create'}</button>
      {editMode && <button type="button" onClick={handleDelete}>Delete</button>}
    </form>
  );
}

export default CrewmateForm;