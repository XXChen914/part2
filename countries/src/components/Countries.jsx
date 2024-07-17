import { useState, useEffect } from "react";
import DisplayCountry from "./DisplayCountry";
import countries from "../services/countries";

const Countries = ({ countriesFound }) => {
  const [displayCountry, setDisplayCountry] = useState(null);

  useEffect(() => {
    if (countriesFound.length === 1) {
      display(countriesFound[0].name.common);
    } else {
      setDisplayCountry(null);
    }
  }, [countriesFound]);

  const display = (name) => {
    countries.getCountryByName(name.toLowerCase()).then((res) => {
      setDisplayCountry(res);
    });
  };

  if (displayCountry) {
    return <DisplayCountry country={displayCountry} />;
  }

  if (countriesFound.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } 
  if (countriesFound.length > 1) {
    return (
      <div>
        {countriesFound.map((country) => (
          <p key={country.name.common.toLowerCase()}>
            {country.name.common}{" "}
            <button onClick={() => display(country.name.common)}>
              show
            </button>
          </p>
        ))}
      </div>
    );
  } 
};

export default Countries;
