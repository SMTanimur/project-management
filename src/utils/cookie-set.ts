'use server';

import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

export const setAuthCookie = (response: Response) => {
  const setCookieHeader = response.headers.get('Set-Cookie');
  if (setCookieHeader) {
    const token = setCookieHeader.split(';')[0].split('=')[1];
    cookies().set({
      name: 'Authentication',
      value: token,
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(token).exp! * 1000),
    });
  }
};

export const getHeaders = () => ({
  Cookie: cookies().toString(),
});
