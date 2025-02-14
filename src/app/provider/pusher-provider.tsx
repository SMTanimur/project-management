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
import Pusher from 'pusher-js';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

interface PusherContextType {
  pusher: Pusher | null;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
}

const PusherContext = createContext<PusherContextType>({
  pusher: null,
  isConnected: false,
  connect: () => {},
  disconnect: () => {},
});

export const usePusher = () => useContext(PusherContext);

export function PusherProvider({ children }: { children: React.ReactNode }) {
  const pusherRef = useRef<Pusher | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { currentOrganizationId } = useGlobalLocalStateStore();
  const { data: user } = useUser();
  const queryClient = useQueryClient();
  const isInitialConnection = useRef(true);

  const updateUserStatus = useCallback(
    async (status: STATUS) => {
      try {
        await CHAT_API.UPDATE_USER_STATUS({
          userId: user?._id as string,
          status,
          lastSeen: new Date(),
        });
      } catch (error) {
        console.error('Error updating user status:', error);
      }
    },
    [user?._id]
  );

  const disconnect = useCallback(() => {
    if (pusherRef.current) {
      updateUserStatus(STATUS.OFFLINE);
      pusherRef.current.disconnect();
      pusherRef.current = null;
    }
    setIsConnected(false);
  }, [updateUserStatus]);

  const connect = useCallback(() => {
    if (!user?._id || !currentOrganizationId) return;
    if (pusherRef.current) return;

    const token = Cookies.get('Authentication');
    if (!token) {
      console.error('No authentication token found');
      return;
    }

    try {
      const pusherInstance = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        forceTLS: true,
        authEndpoint: `${baseURL}pusher/auth`,
        auth: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      pusherInstance.connection.bind('connected', () => {
        setIsConnected(true);
        updateUserStatus(STATUS.ONLINE);
        console.log('Connected to Pusher');
        if (!isInitialConnection.current) {
          toast.success('Connected to chat server');
        }
        isInitialConnection.current = false;
      });

      pusherInstance.connection.bind('disconnected', () => {
        setIsConnected(false);
        updateUserStatus(STATUS.OFFLINE);
        console.log('Disconnected from Pusher');
        if (!isInitialConnection.current) {
          toast.error('Disconnected from chat server');
        }
      });

      pusherInstance.connection.bind('error', (error: any) => {
        console.error('Pusher connection error:', error);
        if (!isInitialConnection.current) {
          toast.error('Connection error: ' + error.message);
        }
      });

      // Subscribe to user-specific channel
      const userChannel = pusherInstance.subscribe(`private-user-${user._id}`);
      userChannel.bind('userStatusChanged', (data: any) => {
        const { userId, status } = data;
        console.log(
          `User ${userId} is now ${status === STATUS.ONLINE ? 'online' : 'offline'}`
        );

        // Update chat lists to reflect new status
        queryClient.invalidateQueries({
          queryKey: [CHAT_API.GET_USER_CHATS.name, currentOrganizationId],
        });
        queryClient.invalidateQueries({
          queryKey: [CHAT_API.GET_CHAT_BY_ID.name],
        });
      });

      // Handle window events for online/offline status
      window.addEventListener('online', () => {
        if (pusherInstance.connection.state === 'disconnected') {
          pusherInstance.connect();
        }
      });

      window.addEventListener('offline', () => {
        updateUserStatus(STATUS.OFFLINE);
      });

      // Handle page visibility for status
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          if (
            navigator.onLine &&
            pusherInstance.connection.state === 'disconnected'
          ) {
            pusherInstance.connect();
          }
        } else {
          updateUserStatus(STATUS.OFFLINE);
        }
      });

      pusherRef.current = pusherInstance;
    } catch (error) {
      console.error('Error creating Pusher connection:', error);
      setIsConnected(false);
    }
  }, [currentOrganizationId, user?._id, queryClient, updateUserStatus]);

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
      pusher: pusherRef.current,
      isConnected,
      connect,
      disconnect,
    }),
    [connect, disconnect, isConnected]
  );

  return (
    <PusherContext.Provider value={value}>{children}</PusherContext.Provider>
  );
}
