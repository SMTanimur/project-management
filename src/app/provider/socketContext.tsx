'use client';

import { baseURL } from '@/api';
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
import Cookies from 'js-cookie';

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
  const connectAttempts = useRef(0);
  const MAX_RECONNECT_ATTEMPTS = 5;
  const isInitialConnection = useRef(true);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    setIsConnected(false);
    connectAttempts.current = 0;
  }, []);

  const connect = useCallback(() => {
    if (!user?._id || !currentOrganizationId) return;
    if (socketRef.current?.connected) return;
    if (connectAttempts.current >= MAX_RECONNECT_ATTEMPTS) {
      console.log('Max reconnection attempts reached');
      return;
    }

    // Cleanup any existing socket
    if (socketRef.current) {
      disconnect();
    }

    const token = Cookies.get('Authentication');
    if (!token) {
      console.error('No authentication token found');
      return;
    }

    try {
      const socketInstance = io(baseURL, {
        withCredentials: true,
        autoConnect: false,
        path: '/socket.io/',
        transports: ['polling', 'websocket'],
        auth: {
          token,
        },
        query: {
          userId: user._id,
          organizationId: currentOrganizationId,
        },
        reconnection: true,
        reconnectionAttempts: 3,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 10000,
        forceNew: true,
        secure: true,
        rejectUnauthorized: false,
        extraHeaders: {
          'Access-Control-Allow-Credentials': 'true',
          Origin: window.location.origin,
        },
      });

      // Add better error handling
      socketInstance.on('connect_error', error => {
        console.error('Connection error:', error);
        if (!isInitialConnection.current) {
          toast.error('Connection error: ' + error.message);
        }
      });

      socketInstance.io.on('error', error => {
        console.error('Transport error:', error);
        if (!isInitialConnection.current) {
          toast.error('Transport error occurred');
        }
      });

      socketInstance.io.on('reconnect_failed', () => {
        console.error('Failed to reconnect after all attempts');
        if (!isInitialConnection.current) {
          toast.error('Unable to connect to chat server');
        }
      });

      socketInstance.on('connect', () => {
        setIsConnected(true);
        connectAttempts.current = 0;
        console.log('Connected to chat server');
        if (!isInitialConnection.current) {
          toast.success('Connected to chat server');
        }
        isInitialConnection.current = false;
      });

      socketInstance.on('disconnect', reason => {
        setIsConnected(false);
        console.log('Disconnected from chat server:', reason);

        // Don't attempt to reconnect for certain disconnect reasons
        if (
          reason === 'io server disconnect' ||
          reason === 'io client disconnect'
        ) {
          console.log(
            'Disconnected by server or client, not attempting reconnect'
          );
          return;
        }

        // Only show toast and attempt reconnect if it wasn't a manual disconnect
        if (!isInitialConnection.current) {
          toast.error('Disconnected from chat server');

          // Try to reconnect after delay if under max attempts
          if (connectAttempts.current < MAX_RECONNECT_ATTEMPTS) {
            reconnectTimeoutRef.current = setTimeout(() => {
              connectAttempts.current += 1;
              console.log(`Reconnection attempt ${connectAttempts.current}`);
              connect();
            }, 5000); // Increased delay to prevent rapid reconnection attempts
          }
        }
      });

      socketInstance.on('userStatusChanged', (data: any) => {
        const { userId, status } = data;
        console.log(
          `User ${userId} is now ${status === STATUS.ONLINE ? 'online' : 'offline'}`
        );

        queryClient.invalidateQueries({
          queryKey: [CHAT_API.GET_USER_CHATS.name, currentOrganizationId],
        });
        queryClient.invalidateQueries({
          queryKey: [CHAT_API.GET_CHAT_BY_ID.name],
        });
      });

      socketRef.current = socketInstance;
      socketInstance.connect();
    } catch (error) {
      console.error('Error creating socket connection:', error);
      setIsConnected(false);
    }
  }, [currentOrganizationId, user?._id, queryClient, disconnect]);

  useEffect(() => {
    if (user?._id && currentOrganizationId) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [connect, disconnect, user?._id, currentOrganizationId]);

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
