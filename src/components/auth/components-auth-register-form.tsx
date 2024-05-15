'use client';


import { useRouter } from 'next/navigation';
import React from 'react';
import { Input } from '../ui/input';
import { PasswordInput } from '../ui/password-input';
import { Button } from '../ui/button';
const ComponentsAuthRegisterForm = () => {
    const router = useRouter();

    const submitForm = (e: any) => {
        e.preventDefault();
        router.push('/');
    };
    return (
        <form className="space-y-5 dark:text-white" onSubmit={submitForm}>
            <div>
                <label htmlFor="Name">Name</label>
                <div className="relative text-white-dark">
                <Input  placeholder="large size"  />
                </div>
            </div>
            <div>
                <label htmlFor="Email">Email</label>
                <div className="relative text-white-dark">
                <Input  placeholder="large size"  />
                </div>
            </div>
            <div>
                <label htmlFor="Password">Password</label>
                <div className="relative text-white-dark">
                <PasswordInput
          placeholder="input password"
         
      />
                </div>
            </div>
            <div>
                <label className="flex cursor-pointer items-center">
                    <input type="checkbox" className="form-checkbox bg-white dark:bg-black" />
                    <span className="text-white-dark">Subscribe to weekly newsletter</span>
                </label>
            </div>
            <Button type="submit" className=" !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                Sign Up
            </Button>
        </form>
    );
};

export default ComponentsAuthRegisterForm;
