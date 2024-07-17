import { useEffect, useState } from "react";
import Header from "./components/Header";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState({ content: "", type: "" });

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      });
  }, []);

  const isExisting = (person) => {
    return persons.find((p) => p.name === person.name);
  };

  const updateMessage = (content, type) => {
    setMessage({ content: content, type: type });
    setTimeout(() => {
      setMessage({ content: "", type: "" });
    }, 3000);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const found = isExisting(newPerson);

    if (found) {
      if (
        window.confirm(
          `${found.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(found.id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id === found.id ? returnedPerson : p))
            );
            updateMessage(`Updated ${returnedPerson.name}'s number`, "success")
          });
      }
    } else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewPerson({ name: "", number: "" });
          updateMessage(`Added ${returnedPerson.name}`, "success")
        });
    }
  };

  const handleNameChange = (event) => {
    setNewPerson(prev => ({ ...prev, name: event.target.value }));
  };

  const handleNumberChange = (event) => {
    setNewPerson(prev => ({ ...prev, number: event.target.value }));
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .del(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          updateMessage(`Deleted ${name}`, "success")
        })
        .catch((err) => {
          updateMessage(
            `Information if ${name} has already been removed from server`, "error"
          );
          console.log(err);
        });
    }
  };

  const filteredPersons = filter
    ? persons.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  return (
    <div>
      <Header text={"Phonebook"} />
      {message.content && <Notification message={message} />}
      <Filter onChange={handleFilter} val={filter} />
      <Header text={"Add a new"} />
      <PersonForm
        onSubmit={addPerson}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        value={newPerson}
      />
      <Header text={"Numbers"} />
      <Persons persons={filteredPersons} onDelete={handleDelete} />
    </div>
  );
};

export default App;
