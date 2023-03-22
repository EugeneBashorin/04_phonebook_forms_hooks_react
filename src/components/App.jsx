import { Component } from "react";
import {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { ContactForm  } from "./ContactForm/ContactForm.jsx";
import { ContactList } from "./ContactList/ContactList";
import { FilterComponent } from "./FilterComponent/FilterComponent";
import { nanoid } from 'nanoid';
import {SectionBlock} from "./App.styled.jsx"
//was 96 strings
export function App(){

  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts'))??[]
  );
  const [filterField, setFilterField] = useState("");
  const [favorites, setFavorites] = useState(false);
  //DidMount
  useEffect(() => {
    const tempContacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(tempContacts);
    if(!parsedContacts){
      return;
    }
    setContacts(parsedContacts);
  },[]);  
  //DidUpdate
  useEffect(()=>{
     try { 
        localStorage.setItem("contacts", JSON.stringify(contacts))
      } catch (error) {
        console.log("Something go wrong with set to localStorage: ",error.message)
      }
  },[contacts, favorites]);

  const formSubmitHandler = data => {
    if(contacts.find(contact => contact.name.toLowerCase() === data.name.toLowerCase())){
      alert(`${data.name} is already in contacts.`)
      return;
    }
    setContacts((prevState) => ([{id: nanoid(), name: data.name, phoneNumber: data.phoneNumber, favorites: data.favorites}, ...prevState]))
  }

  const showFilteredList = (event) =>{
    switch(event.target.name){
      case "favorites":
        setFavorites(event.currentTarget.checked);
        break;
      case "filter":
        setFilterField(event.currentTarget.value);
        break;
      default:
        return;    
    }
  }

  const deleteContact = idContact => {
     setContacts((prevState)=>prevState.filter(contact => contact.id !== idContact))   
  }

  const editFavoriteStatus = (idContact, boolState) => {
    setContacts(prevState => 
      prevState.map(contactData =>
        contactData.id === idContact
        ?{...contactData, favorites : !boolState}
        : contactData
        )
      )
    }

  const normalizeFilter = filterField.toLowerCase();
  let filteredContactsArr = favorites === false
    ? contacts.filter(contact => contact.name.toLowerCase().includes(normalizeFilter))
    : contacts.filter(contact => contact.favorites === true && contact.name.toLowerCase().includes(normalizeFilter))

  return(
      <>
        <SectionBlock>
        <h1>Phonebook</h1>
        <ContactForm onSubmitProps={formSubmitHandler}/>
        </SectionBlock>
        <SectionBlock>
        <h2>Contacts</h2>
        <FilterComponent value={filterField} checked={favorites} onChange={showFilteredList}/>
        <ContactList nameList={filteredContactsArr} onDeleteContact={deleteContact} editFavorContact={editFavoriteStatus}/>
        </SectionBlock>
      </>
  );
}

App.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string,
  state: PropTypes.object,
}