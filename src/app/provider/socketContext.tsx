'use client'

import { useUser } from '@/hooks';
import { useGlobalLocalStateStore } from '@/store';
import { STATUS } from '@/types';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  connect: () => {},
  disconnect: () => {},
});

export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const {currentOrganizationId}=useGlobalLocalStateStore()
  const { data } = useUser();

  const connect = () => {
    const socketInstance = io('http://localhost:3333', {
      withCredentials: true,
      autoConnect: true,
      path: '/socket.io',
    
      query: {userId:data?._id,organizationId:currentOrganizationId}
    });

    socketInstance.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to chat server');
      toast.success('Connected to chat server');
    });
  
    socketInstance.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from chat server');
      toast.error('Disconnected from chat server');
    });
  
    socketInstance.on('connect_error', (error) => {
      console.error('Connection error:', error);
      toast.error('Failed to connect to chat server');
    });

    setSocket(socketInstance);
    socketInstance.connect();
  };

  const disconnect = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  useEffect(() => {
    if (data) {
      connect();
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [data]);

  useEffect(() => {
 

    const handleUserStatusChange = (data:any) => {
      const { userId, status } = data;
      console.log(`User ${userId} is now ${status === STATUS.ONLINE ? 'online' : 'offline'}`);
      // Here you can update your UI state or context to reflect the user's status
    };

    // Listen for user status changes
    socket?.on('userStatusChanged', handleUserStatusChange);

    // Cleanup listener on component unmount
    return () => {
      socket?.off('userStatusChanged', handleUserStatusChange);
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, connect, disconnect }}>
      {children}
    </SocketContext.Provider>
  );
}