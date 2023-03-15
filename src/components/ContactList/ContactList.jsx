import PropTypes from 'prop-types';
import {ReactComponent as FvrSvgRed} from '../heart-red.svg'
import {ReactComponent as FvrSvgWht} from '../heart-white.svg'
import React from "react";
import {ListElement, ListItem, Button, BtnWrapper} from "./ContactList.styled.jsx"

export const ContactList = ({nameList, onDeleteContact, unFavorContact}) => {
    return (
        <ListElement>
            {nameList.map( contact => (
                <ListItem key={contact.id}>
                    {contact.name}: {contact.phoneNumber} 
                    <BtnWrapper>
                        {contact.favorites===true?<FvrSvgRed/>:<FvrSvgWht/>}
                        <input type="checkbox" checked={contact.favorites} onChange={() => unFavorContact(contact.id, contact.favorites)}/>
                        <Button type="button" onClick={()=> onDeleteContact(contact.id)}>Delete</Button>
                    </BtnWrapper>
                </ListItem>
            ))}
            
        </ListElement>
    )
}
ContactList.propTypes = {
    key: PropTypes.string,
    name: PropTypes.string,
    phoneNumber: PropTypes.number,
}