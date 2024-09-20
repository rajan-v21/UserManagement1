import React, { useState} from 'react';

interface ProfileProps {
  user: {
    id: string;
    username: string;
    company: {
      name: string;
    };
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
    };
  };
  isEditing: boolean;
  onSave: (updatedDetails: any) => void;
}

const Profile = ({ user, isEditing, onSave }: ProfileProps) => {

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
          <strong>Username:</strong>
          <input
            type="text"
            name="username"
            value={editableDetails.username}
            onChange={handleInputChange}
            className="border p-1 ml-2"
          />
        </p><br/>
        <p>
          <strong>Company:</strong>
          <input
            type="text"
            name="company.name"
            value={editableDetails.company.name}
            onChange={handleInputChange}
            className="border p-1 ml-2"
          />
        </p><br/>
        <p>
          <strong>Address:</strong>
          <input
            type="text"
            name="address.street"
            value={editableDetails.address.street}
            onChange={handleInputChange}
            className="border p-1 ml-2"
          />
        </p><br/>
        <button type="submit" className="bg-green-500 text-white p-2 mt-2">
          Save
        </button>
      </form>
    );
  }

  return (
    <>
      <p>ID: {user.id}</p><br/>
      <p>Username: {user.username}</p><br/>
      <p>Company: {user.company.name}</p><br/>
      <p>
        Address: {user.address.street} {user.address.suite}, {user.address.city}, {user.address.zipcode}
      </p>
    </>
  );
};

export default Profile;
