import styled from "@emotion/styled";
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from "react";
import {LabelEl, LabelElFavorite, Button} from "./ContactForm.styled.jsx"
import * as Yup from 'yup';

const Input = styled(Field)`
    width: 150px;
`

const InputCheckBox = styled(Field)`
    width: 15px;
    margin-right: 10px;
`
const FormTag = styled(Form)`
    width: 350px;
`

const nameErrorMessage = "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan";
const phoneErrorMessage = "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +";

const schema = Yup.object({
    name: Yup.string()
                .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/, nameErrorMessage)
                .required('Required'),

    phoneNumber: Yup.string()
                .required('Required')
                .matches(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/, phoneErrorMessage),

    favorites: Yup.boolean(),
})

const initialValues = {
    name:'',
    phoneNumber:'',
    favorites: false,
}

export const ContactForm = ({onSubmitProps}) => { 

    const handleSubmit = (values, action) => {
        onSubmitProps(values)
        action.resetForm();
    }

    return(
    <>  
            <Formik
                initialValues={initialValues}  
                validationSchema={schema}
                onSubmit={handleSubmit}
            >   
        {({values, handleChange})  =>  
            (<FormTag> 
                <fieldset>
                    <LabelEl>
                        Name
                        <Input type="text" name="name" value={values.name} onChange={handleChange}/>
                        <ErrorMessage component="div" name="name"/>
                    </LabelEl>
                    <LabelEl>
                        Number
                        <Input type="tel" name="phoneNumber" value={values.phoneNumber} onChange={handleChange} />
                            <ErrorMessage component="div" name="phoneNumber"/>
                    </LabelEl>

                    <LabelElFavorite>
                        <InputCheckBox type="checkbox" name="favorites"/> Add to favorites
                    </LabelElFavorite>
                    <Button type="submit">Add contact</Button> 
                </fieldset>
            </FormTag>)}
        </Formik>
    </>
    )
}

ContactForm.propTypes = {
    name: PropTypes.string,
    phoneNumber: PropTypes.number,
    favorites: PropTypes.bool,
}