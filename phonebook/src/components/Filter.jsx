const Filter = ({ onChange, val }) => {
  return (
    <div>
      Filter shown with: <input onChange={onChange} value={val} />
    </div>
  );
};

export default Filter;
