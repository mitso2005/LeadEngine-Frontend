import React, { useState } from 'react';

type FieldProps = {
    placeholder?: string; // Optional placeholder prop
    variable?: string; // Optional variable prop
};

const Field: React.FC<FieldProps> = ({ placeholder, variable }) => {

    const [value, setValue] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }


    return (

        <div>
            <label htmlFor="field">{variable}:  </label>
            <input type="text" id="field" value={value} onChange={handleChange} placeholder={placeholder}/>
        </div>
    );
};

export default Field;