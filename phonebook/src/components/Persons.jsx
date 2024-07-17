const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map((p) => (
        <p key={p.id}>
          {p.name} {p.number} {""}
          <button onClick={() => onDelete(p.id, p.name)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
