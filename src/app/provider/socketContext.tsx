'use client';

import { useUser } from '@/hooks';
import { CHAT_API } from '@/services';
import { useGlobalLocalStateStore } from '@/store';
import { STATUS } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
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
  const { currentOrganizationId } = useGlobalLocalStateStore();
  const { data } = useUser();
  const queryClient = useQueryClient();
  const connect = () => {
    const socketInstance = io('http://localhost:3333', {
      withCredentials: true,
      autoConnect: true,
      path: '/socket.io',

      query: { userId: data?._id, organizationId: currentOrganizationId },
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

    socketInstance.on('connect_error', error => {
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
    const handleUserStatusChange = (data: any) => {
      const { userId, status } = data;
      console.log(
        `User ${userId} is now ${
          status === STATUS.ONLINE ? 'online' : 'offline'
        }`
      );
      queryClient.invalidateQueries({
        queryKey: [CHAT_API.GET_USER_CHATS.name, currentOrganizationId],
      });
      queryClient.invalidateQueries({
        queryKey: [CHAT_API.GET_CHAT_BY_ID.name],
      });
    };

    // Listen for user status changes
    socket?.on('userStatusChanged', handleUserStatusChange);

    // Cleanup listener on component unmount
    return () => {
      socket?.off('userStatusChanged', handleUserStatusChange);
    };
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{ socket, isConnected, connect, disconnect }}
    >
      {children}
    </SocketContext.Provider>
  );
}
