import React, { useState } from 'react';
import styles from './Form.module.css';

export const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = ev => {
    const { name, value } = ev.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    addContact(name, number);
    setName('');
    setNumber('');
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleInputChange}
        required
      />
      <label>Number</label>
      <input
        type="tel"
        name="number"
        value={number}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};
