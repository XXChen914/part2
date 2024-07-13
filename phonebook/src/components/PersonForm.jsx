const PersonForm = (props) => {
  const { onSubmit, onNameChange, onNumberChange, val } = props;
  return (
    <form onSubmit={onSubmit}>
      <div>
        Name: <input onChange={onNameChange} value={val.name} />
      </div>
      <div>
        Number: <input onChange={onNumberChange} value={val.number} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
