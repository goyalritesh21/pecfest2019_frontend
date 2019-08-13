import React from 'react';

const Input = (props) => {
    const { type, name, value, onChange, autoComplete } = props;

    const onInput = (e) => {
        const val = e.target.value;
        onChange(name, val);
    }

    return (
        <input
            type={type}
            className="form-control input"
            name={name}
            onChange={onInput}
            value={value}
            required
            spellCheck="false"
            autoComplete={autoComplete}
        />
    )
}

export default Input;