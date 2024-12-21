"use client"
import { useSocket } from '@/app/provider/socketContext';
import { useEffect, useState } from 'react';

export function useSocketWithRetry() {
  const { socket, connect } = useSocket();
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 5;

  useEffect(() => {
    if (!socket) return;

    const handleError = (error: Error) => {
      console.error('Socket error:', error);
      if (retryCount < maxRetries) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          connect();
        }, Math.min(1000 * Math.pow(2, retryCount), 10000));
      }
    };

    socket.on('error', handleError);
    socket.on('connect_error', handleError);

    return () => {
      socket.off('error', handleError);
      socket.off('connect_error', handleError);
    };
  }, [socket, retryCount]);

  return { retryCount, maxRetries };
}