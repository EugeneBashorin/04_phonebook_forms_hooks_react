import { Component } from "react";
import PropTypes from "prop-types";
import { ContactForm  } from "./ContactForm/ContactForm.jsx";
import { ContactList } from "./ContactList/ContactList";
import { FilterComponent } from "./FilterComponent/FilterComponent";
import { nanoid } from 'nanoid';
import {SectionBlock} from "./App.styled.jsx"

const INITIAL_STATE = {
  contacts: [ ],
  filter:"",
  favorites: false,
}

export class App extends Component {
  state = {...INITIAL_STATE}

  formSubmitHandler = data =>{
    if(!this.state.contacts.find(contact => contact.name.toLowerCase() === data.name.toLowerCase())){
      this.setState(prevState =>{
        return{
          contacts: [{id: nanoid(), name: data.name, phoneNumber: data.phoneNumber, favorites: data.favorites}, ...prevState.contacts]
        }
      }) 
    }else{
      alert(`${data.name} is already in contacts.`)
      return;
   }
  }

  changeFilter = event => {
    this.setState( 
      event.target.name === "favorites" ? {favorites: event.currentTarget.checked}
      : {filter: event.currentTarget.value}
      )
  }

  deleteContact = idContact => {
    this.setState( prevState => {
        return{
          contacts: prevState.contacts.filter(contact => contact.id !== idContact)
        }
      }
    )
  }
  unFavorite = (idContact, boolState) => {
    this.setState(prevState =>{
      return{
        contact: prevState.contacts.map(contact => {if(contact.id === idContact) contact.favorites = !boolState})
      }
    })

  }
  componentDidMount() {
    const tempContacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(tempContacts);
    if(parsedContacts){
      this.setState({contacts: parsedContacts})
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.state !== prevState){
      try { 
        localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
      } catch (error) {
        console.log("Something go wrong with set to localStorage: ",error.message)
      }
    }
  }

  render (){
    const normalizeFilter = this.state.filter.toLowerCase();
    const filteredData = this.state.favorites===false ? 
                         this.state.contacts.filter(contact => contact.name.toLowerCase().includes(normalizeFilter))
                          : this.state.contacts.filter(contact => contact.favorites === true && contact.name.toLowerCase().includes(normalizeFilter));
    return (
      <>
        <SectionBlock>
        <h1>Phonebook</h1>
        <ContactForm onSubmitProps={this.formSubmitHandler}/>
        </SectionBlock>
        <SectionBlock>
        <h2>Contacts</h2>
        <FilterComponent value={this.state.filter} checked={this.state.favorites} onChange={this.changeFilter}/>
        <ContactList nameList={filteredData} onDeleteContact={this.deleteContact} unFavorContact={this.unFavorite}/>
        </SectionBlock>
      </>
    )
  }
};

App.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string,
  state: PropTypes.object,
}