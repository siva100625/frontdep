import { useEffect, useState } from 'react';
import api from '../api';

const Admin = () => {
  const [pets, setPets] = useState([]);
  const [form, setForm] = useState({ name: '', type: '', description: '' });
  const [editingPetId, setEditingPetId] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  useEffect(() => {
    const password = prompt("Enter admin password:");
    if (password === "123") {
      setAuthorized(true);
      fetchPets();
    } else {
      alert("Incorrect password! Access denied.");
    }
  }, []);
  const fetchPets = async () => {
    const res = await api.get('/pets');
    setPets(res.data);
  };

  // Add or update pet
  const addPet = async (e) => {
    e.preventDefault();
    if (editingPetId) {
      await api.put(`/pets/${editingPetId}`, form);
    } else {
      await api.post('/pets', form);
    }
    setForm({ name: '', type: '', description: '' });
    setEditingPetId(null);
    fetchPets();
  };

  // Delete pet
  const deletePet = async (id) => {
    await api.delete(`/pets/${id}`);
    fetchPets();
  };

  // Set form for editing
  const editPet = (pet) => {
    setForm({ name: pet.name, type: pet.type, description: pet.description });
    setEditingPetId(pet.id);
  };

  // If not authorized, return nothing
  if (!authorized) return null;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#1e1e1e',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '500px',
          padding: '2rem',
          backgroundColor: '#2c2c2c',
          color: 'white',
          borderRadius: '10px',
        }}
      >
        <h2 style={{ textAlign: 'center' }}>Admin Panel</h2>

        <form
          onSubmit={addPet}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            marginBottom: '1rem',
          }}
        >
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          />
          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <button type="submit">{editingPetId ? 'Update Pet' : 'Add Pet'}</button>
          {editingPetId && (
            <button
              type="button"
              onClick={() => {
                setForm({ name: '', type: '', description: '' });
                setEditingPetId(null);
              }}
            >
              Cancel
            </button>
          )}
        </form>

        <hr />

        <div>
          {pets.map((pet) => (
            <div
              key={pet.id}
              style={{
                border: '1px solid gray',
                margin: '0.5rem 0',
                padding: '0.5rem',
                borderRadius: '5px',
              }}
            >
              <p>
                <strong>{pet.name}</strong> - {pet.type} <br />
                {pet.description}
              </p>
              <button onClick={() => editPet(pet)} style={{ marginRight: '10px' }}>
                Edit
              </button>
              <button onClick={() => deletePet(pet.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
