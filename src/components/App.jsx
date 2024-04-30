import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts ? JSON.parse(savedContacts) : [
      { id: 'id-1', name: 'Rosie Manzano', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Klide', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Cheese', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Steele', number: '227-91-26' },
    ];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const duplicateContact = contacts.find(
      contact => contact.name === newContact.name
    );

    if (duplicateContact) {
      alert(`${newContact.name} is already in your contacts.`);
      return;
    }

    setContacts(prevContacts => [...prevContacts, { ...newContact, id: nanoid() }]);
    Notify.success(`${newContact.name} is successfully added to your contacts!`, { position: 'center-top' });
  };

  const deleteContact = id => {
    const contactToDelete = contacts.find(contact => contact.id === id);
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
    Notify.success(`${contactToDelete.name} was successfully deleted from your contacts!`, { position: 'center-top' });
  };

  const filterContact = () => {
    const filterLowerCase = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterLowerCase)
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} contacts={contacts} />

      <h2>Contacts</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <ContactList
        filterContact={filterContact}
        deleteContact={deleteContact}
        contacts={contacts}
      />
    </div>
  );
};

export default App;
