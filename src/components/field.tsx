import React, { useState } from 'react';

type FieldProps = {
    placeholder?: string; // Optional placeholder prop
};

const Field: React.FC<FieldProps> = ({ placeholder }) => {

    const [value, setValue] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }


    return (

        <div>
            <label htmlFor="field">Field:</label>
            <input type="text" id="field" value={value} onChange={handleChange} placeholder={placeholder}/>
            <p>Current value: {value}</p>
        </div>
    );
};

export default Field;