"use client";

import { useQuery } from '@apollo/client';
import { GET_USER } from './api/queries';
import { Button } from '@progress/kendo-react-buttons';
import React, { useEffect, useState } from 'react';
import { PencilIcon } from "@heroicons/react/24/outline";

interface HomeProps {
  selectedUser: string | null;
}

export default function Home({ selectedUser }: HomeProps) {

  const [showProfile, setShowProfile] = useState(true);

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: selectedUser },
    skip: !selectedUser,
  });

  if (!selectedUser) {
    return <div>Select a user to see details.</div>;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleToggleProfileView = () => {
    setShowProfile(true);
  };

  const handleToggleContactView = () => {
    setShowProfile(false);
  };

  const user = data?.getUser || {};

  const blueButton = "flex h-[48px] w-[200px] grow items-center justify-center gap-2 rounded-md bg-blue-500 text-white p-3 text-sm font-bold hover:bg-blue-700 hover:text-white md:flex-none md:justify-center md:p-2 md:px-3 my-4";
  const yellowButton = "flex h-[48px] w-[200px] grow items-center justify-center gap-2 text-sm rounded-md bg-yellow-500 text-white p-3 text-sm font-bold hover:bg-yellow-600 hover:text-white md:flex-none md:justify-center md:p-2 md:px-3 my-4 cursor-pointer";

  return (
    <div>
      <h3 className="text-2xl font-bold">{user.name}</h3><br/>      
      <div className="flex flex-col md:flex-row items-start gap-16">   
        <div className="flex flex-col space-y-4">
          <Button
            className={blueButton}
            onClick={handleToggleProfileView}
          >
            Profile
          </Button>
          <Button
            className={blueButton}
            onClick={handleToggleContactView}
          >
            Contact
          </Button>
        </div>

        <div
          style={{
            marginTop: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
            width: '60%',
          }}
        >
          <div className="p-6">

            {/* {showProfile ? <Profile user={user} /> : <Contact user={user} />} */}

            {showProfile ?
              <>
                <p>ID: {user.id}</p>
                <p>Username: {user.username}</p>
                <p>Company: {user.company.name}</p>
                <p>Address: {user.address.street} {user.address.suite} {user.address.city} {user.address.zipcode}</p>
              </>
            : <>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Website: {user.website}</p> 
              </>}
            </div>
          </div>
          <div
              className={yellowButton}
              // onClick={handleToggleContactView}
            >
              <PencilIcon className="w-6 h-6" />
              <span>Edit</span>
          </div>
      </div>
    </div>
  );
}
