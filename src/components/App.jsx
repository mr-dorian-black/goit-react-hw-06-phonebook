import { selectFilters, selectContacts } from 'redux/selectors';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { StyledTitle } from './Filter/Filter.styled';
import { useSelector } from 'react-redux';

export const App = () => {
  const filter = useSelector(selectFilters);
  const contacts = useSelector(selectContacts);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      {filteredContacts.length ? (
        <>
          <StyledTitle>Find contacts by name</StyledTitle>
          <ContactList items={filteredContacts} />
        </>
      ) : (
        <StyledTitle>There are no contacts yet!</StyledTitle>
      )}
    </div>
  );
};
