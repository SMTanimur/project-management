'use client';

import { useGlobalLocalStateStore } from '@/store';
import React from 'react';
import { HomeSection, OrganizationSection } from '../components';


export const HomepageScreen = () => {

  const { currentOrganizationId } = useGlobalLocalStateStore();

 
  
  
 
  return  currentOrganizationId ? <OrganizationSection /> : <HomeSection />;
};
