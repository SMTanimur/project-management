import React from 'react';
import { HomepageScreen } from './(organizaions)/screen';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components';

const HoomePage = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Orga</CardTitle>
          <CardDescription>
            Orga is your source for quality auto parts, advice and accessories.
            View family care tips, shop online for home delivery, or pick up in
            one of our 4000 convenient store locations in 30 minutes or less.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Home Page</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default HoomePage;
