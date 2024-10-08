import React, { useState } from 'react';

interface ContactProps {
  user: {
    email: string;
    phone: string;
    website: string;
  };
  isEditing: boolean;
  onSave: (updatedDetails: any) => void;
}

const Contact = ({ user, isEditing, onSave }: ContactProps) => {

  const [editableDetails, setEditableDetails] = useState(user);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(editableDetails);
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit}>
        <p>
          <strong>Email:</strong>
          <input
            type="text"
            name="email"
            value={editableDetails.email}
            onChange={handleInputChange}
            className="border p-1 ml-2"
          />
        </p><br/>
        <p>
          <strong>Phone:</strong>
          <input
            type="text"
            name="phone"
            value={editableDetails.phone}
            onChange={handleInputChange}
            className="border p-1 ml-2"
          />
        </p><br/>
        <p>
          <strong>Website:</strong>
          <input
            type="text"
            name="website"
            value={editableDetails.website}
            onChange={handleInputChange}
            className="border p-1 ml-2"
          />
        </p><br/>
        <button type="submit" className="flex h-[48px] w-[200px] grow items-center justify-center gap-2 rounded-md bg-green-500 text-white p-3 text-md font-bold hover:bg-green-600 hover:text-white md:flex-none md:justify-center md:p-2 md:px-3 my-4 cursor-pointer">
          Save
        </button>
      </form>
    );
  }

  return (
    <>
      <p>Email: {user.email}</p><br/>
      <p>Phone: {user.phone}</p><br/>
      <p>Website: {user.website}</p>
    </>
  );
};

export default Contact;
