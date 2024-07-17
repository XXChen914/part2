const PersonForm = (props) => {
  const { onSubmit, onNameChange, onNumberChange, value } = props;
  return (
    <form onSubmit={onSubmit}>
      <div>
        Name: <input onChange={onNameChange} value={value.name} />
      </div>
      <div>
        Number: <input onChange={onNumberChange} value={value.number} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
