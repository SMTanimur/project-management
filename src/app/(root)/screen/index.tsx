'use client';
import { useUser } from '@/hooks';
import { useGlobalLocalStateStore } from '@/store';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { HomeSection, OrganizationSection } from '../components';

export const HomepageScreen = () => {
  const router = useRouter();
  const { data } = useUser();
  const { currentOrganizationId } = useGlobalLocalStateStore();
  useEffect(() => {
    if (data && !currentOrganizationId) {
      router.push('/dashboard');
    }
  }, [data, !currentOrganizationId]);
  return data && currentOrganizationId ? <OrganizationSection /> : <HomeSection />;
};
