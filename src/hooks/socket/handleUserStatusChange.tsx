"use client"

import { useSocket } from '@/app/provider/socketContext';
import { STATUS } from '@/types';
import React, { useEffect } from 'react';


export const UserStatusListener = () => {
  const { socket } = useSocket();
  console.log({socket})
  socket?.on('userStatusChanged', (data) => {
    console.log("sgdsgds")
    console.log('Received user status change:', data); // Log the received data
    console.log('Received user status change:', data); // Log the received data
    const { userId, status } = data;
    console.log(`User ${userId} is now ${status === STATUS.ONLINE ? 'online' : 'offline'}`);
  });
  useEffect(() => {
    if (!socket) return; // Ensure socket is available

    const handleUserStatusChange = (data:any) => {
      const { userId, status } = data;
      console.log(`User ${userId} is now ${status === STATUS.ONLINE ? 'online' : 'offline'}`);
      // Here you can update your UI state or context to reflect the user's status
    };

    // Listen for user status changes
    socket.on('userStatusChanged', handleUserStatusChange);

    // Cleanup listener on component unmount
    return () => {
      socket.off('userStatusChanged', handleUserStatusChange);
    };
  }, [socket]);

  return <div>sdgds</div>
};
