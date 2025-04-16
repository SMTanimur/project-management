'use client';

import Cookies from 'js-cookie';

export const getCookie = (name?: string) => {
  return Cookies.get(name ?? 'Authentication');
};

export const setCookie = (name: string, value: string) => {
  Cookies.set(name, value);
};
