import { useState } from "react";
import Header from "./components/Header";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");

  const isExisting = (name) => {
    return persons.some((p) => p.name === name);
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (isExisting(newPerson.name)) {
      alert(`${newPerson.name} is already added to the phonebook`);
    } else {
      const addedPerson = {
        id: String(persons.length + 1),
        ...newPerson,
      };
      setPersons(persons.concat(addedPerson));
      setNewPerson({ name: "", number: "" });
    }
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setNewPerson((prev) => ({ ...prev, name: newName }));
  };

  const handleNumberChange = (event) => {
    const newNumber = event.target.value;
    setNewPerson((prev) => ({ ...prev, number: newNumber }));
  };

  const handleFilter = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter);
  };

  const filteredPersons = filter
    ? persons.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  return (
    <div>
      <Header text={"Phonebook"} />
      <Filter onChange={handleFilter} val={filter} />
      <Header text={"Add a new"} />
      <PersonForm
        onSubmit={addPerson}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        val={newPerson}
      />
      <Header text={"Numbers"} />
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
