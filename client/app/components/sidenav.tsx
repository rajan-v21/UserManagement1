"use client";

import { useEffect, useState } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from '../api/queries';
import { useRouter, useSearchParams } from "next/navigation";

interface SideNavProps {
  onSelectUser: (user: string | null) => void;
}

export default function SideNav({ onSelectUser }: SideNavProps) {
  const { data, loading, error } = useQuery(GET_ALL_USERS);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentUser = searchParams.get("user");

  useEffect(() => {
    onSelectUser(currentUser); // Notify the parent component of the selected user
  }, [currentUser]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const users = data?.getAllUsers || [];

  const handleUserSelect = (userId: string) => {
    // Update URL with selected user without refreshing
    const userIdParam = encodeURIComponent(userId); // Encode userId for the URL
    router.push(`/?user=${userIdParam}`,{ shallow: true });

    // Notify parent component about the selected user
    onSelectUser(userId);
  };

  return (
    <div className="flex flex-col space-y-2">
      {users.map((user: { id: string, name: string }) => {

        const isActive = currentUser === user.id; // Compare actual names

        return (
          <div
            key={user.id}
            className={isActive ? 'flex items-center mx-[0.5rem] gap-2 rounded-md p-3 text-sm font-medium cursor-pointer bg-blue-600 text-white  hover:bg-blue-600 hover:text-white' :
              'flex items-center mx-[0.5rem] gap-2 rounded-md p-3 text-sm font-medium cursor-pointer bg-gray-50  hover:bg-sky-100 hover:text-blue-600'
            }
            onClick={() => handleUserSelect(user.id)}
          >
            <UserIcon className="w-6 h-6" />
            <span>{user.name}</span>
          </div>
        );
      })}
    </div>
  );
}
