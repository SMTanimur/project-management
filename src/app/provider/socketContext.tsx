'use client'

import { useUser } from '@/hooks';
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
  const { data } = useUser();
console.log({data})
  const connect = () => {
    const socketInstance = io(process.env.NEXT_PUBLIC_WS_URL!, {
      withCredentials: true,
      autoConnect: false,
      path: '/socket.io',
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

  return (
    <SocketContext.Provider value={{ socket, isConnected, connect, disconnect }}>
      {children}
    </SocketContext.Provider>
  );
}