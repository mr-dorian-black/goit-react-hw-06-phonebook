import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import { StyledTitle } from './Filter/Filter.styled';

export const App = props => {
  const [contacts, setContacts] = useState(() => {
    const storageContacts = localStorage.getItem('contacts');
    if (storageContacts !== null) {
      return JSON.parse(storageContacts);
    }
    return [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      return alert(`${newContact.name} is already in contacts!`);
    }

    setContacts(prevState => {
      return [...prevState, { ...newContact, id: nanoid() }];
    });
  };

  const onFilterChange = evt => {
    setFilter(evt.target.value);
  };

  const deleteContact = id => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== id);
    });
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <ContactForm onAddContact={addContact} />
      <h2>Contacts</h2>
      <Filter onChange={onFilterChange} />
      {filteredContacts.length ? (
        <>
          <StyledTitle>Find contacts by name</StyledTitle>
          <ContactList items={filteredContacts} onDelete={deleteContact} />
        </>
      ) : (
        <StyledTitle>There are no contacts yet!</StyledTitle>
      )}
    </div>
  );
};
