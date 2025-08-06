import React from 'react';
import { useSelector } from 'react-redux';
const Paste = () => {

  const pastes = useSelector((state) => state.paste.paste);
  const searchTerm = '';
  const filterData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()) || paste.content.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      {filterData.map((paste, idx) => (
        <div key={idx}>
          <h3>{paste.title}</h3>
          <p>{paste.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Paste;
