'use client';

import { useUser } from '@/hooks';
import { CHAT_API } from '@/services';
import { useGlobalLocalStateStore } from '@/store';
import { STATUS } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { currentOrganizationId } = useGlobalLocalStateStore();
  const { data: user } = useUser();
  const queryClient = useQueryClient();
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  const connect = useCallback(() => {
    if (socketRef.current?.connected || !user?._id) return;

    const socketInstance = io(process.env.NEXT_PUBLIC_API_URL, {
      withCredentials: true,
      autoConnect: false,
      path: '/socket.io',
      query: {
        userId: user._id,
        organizationId: currentOrganizationId,
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
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

      // Try to reconnect after 3 seconds
      reconnectTimeoutRef.current = setTimeout(() => {
        if (!socketRef.current?.connected) {
          connect();
        }
      }, 3000);
    });

    socketInstance.on('connect_error', error => {
      console.error('Connection error:', error);
      toast.error('Failed to connect to chat server');
      setIsConnected(false);
    });

    socketInstance.on('userStatusChanged', (data: any) => {
      const { userId, status } = data;
      console.log(
        `User ${userId} is now ${status === STATUS.ONLINE ? 'online' : 'offline'}`
      );

      // Update user status in queries
      queryClient.invalidateQueries({
        queryKey: [CHAT_API.GET_USER_CHATS.name, currentOrganizationId],
      });
      queryClient.invalidateQueries({
        queryKey: [CHAT_API.GET_CHAT_BY_ID.name],
      });
    });

    socketRef.current = socketInstance;
    socketInstance.connect();
  }, [currentOrganizationId, user?._id, queryClient]);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
  }, []);

  useEffect(() => {
    if (user?._id) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [connect, disconnect, user?._id]);

  const value = useMemo(
    () => ({
      socket: socketRef.current,
      isConnected,
      connect,
      disconnect,
    }),
    [connect, disconnect, isConnected]
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}
