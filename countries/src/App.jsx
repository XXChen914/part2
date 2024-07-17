import { useState, useEffect} from "react";
import countries from "./services/countries";
import Search from "./components/Search";
import Countries from "./components/Countries";

function App() {
  const [query, setQuery] = useState('');
  const [countriesFound, setCountriesFound] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    countries
      .getAll()
      .then((res) => {
        setAllCountries(res);
      })
      .catch((err) => {
        setError("Failed to fetch all countries")
        console.log("error", error);
      });
  }, []);

  const handleChange = (event) => {
    const name = event.target.value;
    setQuery(name);
    searchCountry(name.toLowerCase());
  };

  const searchCountry = (name) => {
    const found = allCountries.filter(
      (country) =>
        country.name.common.toLowerCase().includes(name) ||
        country.name.official.toLowerCase().includes(name)
    );
    setCountriesFound(found);
  };

  return (
    <>
      <Search onChange={handleChange} value={query} />
      {error ? (
        <div>{error}</div>
      ) : (
        <Countries countriesFound={countriesFound} />
      )}
    </>
  );
}

export default App;
