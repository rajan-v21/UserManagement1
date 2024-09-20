"use client";

import { useQuery, useApolloClient } from '@apollo/client';
import { GET_USER } from './api/queries';
import { Button } from '@progress/kendo-react-buttons';
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Profile from './components/UserDetails/profile';
import Contact from './components/UserDetails/contact';

interface HomeProps {
  selectedUser: string | null;
}

export default function Home({ selectedUser }: HomeProps) {

  const [showProfile, setShowProfile] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const router = useRouter();
  const client = useApolloClient(); // Apollo Client instance to update cache

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: selectedUser },
    skip: !selectedUser,
    fetchPolicy: 'cache-first',
  });

  if (!selectedUser) {
    return <div>Select a user to see details.</div>;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleToggleProfileView = () => {
    setShowProfile(true);
    setIsEditingProfile(false);
  };

  const handleToggleContactView = () => {
    setShowProfile(false);
    setIsEditingContact(false);
  };

  const handleEditClick = () => {
    if(showProfile){
      setIsEditingProfile(true);
      router.push(`/?user=${selectedUser}&edit-profile`, { shallow: true }); // Update URL without reloading the page
    } else {
      setIsEditingContact(true);
      router.push(`/?user=${selectedUser}&edit-contact`, { shallow: true }); // Update URL without reloading the page
    }
    
    
  };

  const handleSave = (updatedDetails: any) => {
    console.log("Saved details:", updatedDetails);
    if(showProfile){
      setIsEditingProfile(false);
    } else {
      setIsEditingContact(false); 
    }

    // Update the Apollo cache manually to reflect changes on the UI
    client.writeQuery({
      query: GET_USER,
      variables: { id: selectedUser },
      data: {
        getUser: updatedDetails, // The updated details of the user
      },
    });


    router.push(`/?user=${selectedUser}`, { shallow: true }); // Reset URL after saving
  };

  const user = data?.getUser || {};

  const blueButton = "flex h-[48px] w-[200px] grow items-center justify-center gap-2 rounded-md bg-blue-500 text-white p-3 text-md font-bold hover:bg-blue-700 hover:text-white md:flex-none md:justify-center md:p-2 md:px-3 my-4";
  const yellowButton = "flex h-[48px] w-[200px] grow items-center justify-center gap-2 rounded-md bg-yellow-400 text-white p-3 text-md font-bold hover:bg-yellow-600 hover:text-white md:flex-none md:justify-center md:p-2 md:px-3 my-4 cursor-pointer";

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
            {showProfile ? (
              <Profile
                user={user}
                isEditing={isEditingProfile} // Pass edit state
                onSave={handleSave} // Pass save handler
              />
            ) : (
              <Contact
                user={user}
                isEditing={isEditingContact} // Pass edit state
                onSave={handleSave} // Pass save handler
              />
            )}
          </div>
        </div>
        {!isEditingProfile && !isEditingContact && (
          <div className={yellowButton} onClick={handleEditClick}>
            <PencilSquareIcon className="w-6 h-6" />
            <span>Edit</span>
          </div>
        )}
      </div>
    </div>
  );
}
