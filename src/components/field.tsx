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
        <div className="flex flex-col gap-1">
            <label
                htmlFor={`field-${variable}`}
                className="text-xs font-semibold uppercase tracking-wider text-[#051729]/60"
            >
                {variable}
            </label>
            <input
                type="text"
                id={`field-${variable}`}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className="border border-[#b7cee2] rounded-lg px-4 py-2.5 text-sm text-[#051729] bg-[#f3f7f8] placeholder-[#051729]/30 focus:outline-none focus:ring-2 focus:ring-[#051729]/30 focus:border-[#051729] transition"
            />
        </div>
    );
};

export default Field;