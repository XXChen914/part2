const Search = ({onChange, value}) => {
  return (
    <div>
      Find Countries <input onChange={onChange} value={value} type="text" />
    </div>
  );
};

export default Search;
