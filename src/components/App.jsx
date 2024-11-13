import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App =()=>{
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
   const storedData = localStorage.getItem('contacts');
   return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  
  }, [contacts]);

  const addContact = (name, number) => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.trim().toLowerCase()
      )
    ) {
      alert('Contact with this name already exists!');
      return;
    }
    if (name && number) {
      const newcontact = { name, id: nanoid(), number };

      setContacts( [...contacts, newcontact],);
    }
  };

 const handleFilter = ev => {
   setFilter(ev.target.value.toLowerCase());
  };
 const getContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };
 const handleDeleteContact = id => {
    setContacts(prevState => (
    prevState.filter((contact) => contact.id !== id)
    ));
  };




    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm addContact={addContact} />
        <h2>Contacts</h2>

        <Filter filter={filter} Searchquery={handleFilter} />
        <ContactList
          contacts={getContacts()}
          onDeleteContact={handleDeleteContact}
        />
      </div>
    );
  }

