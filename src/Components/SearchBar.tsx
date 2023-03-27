import React from 'react';

type SearchBarProps = {
    setInputs: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchBar(props: SearchBarProps) {
    const { setInputs } = props;

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs(e.target.value);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <input
                className={'bar'}
                text-align={'center'}
                type='text'
                placeholder={'Search...'}
                onChange={handleSearch}
            />
        </div>
    );
}
