import React from 'react';

type FieldProps = {
    placeholder?: string;
    variable?: string;
    value: string;
    onChange: (value: string) => void;
};

const Field: React.FC<FieldProps> = ({ placeholder, variable, value, onChange }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    }


    return (

        <div>
            <label htmlFor={`field-${variable}`}>{variable}: </label>
            <input type="text" id={`field-${variable}`} value={value} onChange={handleChange} placeholder={placeholder}/>
        </div>
    );
};

export default Field;