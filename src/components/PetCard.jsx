const PetCard = ({ pet, onAdopt }) => (
  <div
    style={{
      border: '1px solid #ccc',
      padding: '20px',
      margin: '20px auto',
      width: '300px',
      textAlign: 'center',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    }}
  >
    <h3>{pet.name}</h3>
    <p><strong>Type:</strong> {pet.type}</p>
    <p>{pet.description}</p>
    <p>
      <strong>Status:</strong> {pet.adopted ? 'Adopted' : 'Available'}
    </p>
    {!pet.adopted && (
      <button
        onClick={() => onAdopt(pet.id)}
        style={{
          padding: '8px 16px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Adopt
      </button>
    )}
  </div>
);

export default PetCard;
