import React from 'react';
import classes from './Inpute.modal.css'

const Input = ({ name, value, placeholder, onChange }) => {
    return (
        <input className={classes.Input} name={name} placeholder={placeholder} onChange={onChange} value={value} />
    );
}

export default Input;