import React from 'react';

const Note = ({note}) => {
  return (
    <li>
      {note.title} - {note.created_at} - {note.updated_at}
    </li>
  );
};

export default Note;
