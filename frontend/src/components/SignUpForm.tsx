'use client'

import React, { FormEvent } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import LoginButton from './SignUpButton'; // Adjust the path as necessary
import { authenticate } from '@/lib/loginActions';
import signUpAction from './SignUpAction';
import PendingSubmitButton from '../PendingSubmitButton';

type InputErrorsT = {
    username?: string[];
    email?: string[];
    password?: string[];
};

type SignUpFormInitialStateT = {
    error: false;
};

type SignUpFormErrorStateT = {
    error: true;
    message: string;
    inputErrors?: InputErrorsT;
};

export type SignUpFormStateT = SignUpFormInitialStateT | SignUpFormErrorStateT;

const initialState: SignUpFormInitialStateT = {
    error: false,
};

export default function SignUpForm() {
    const [state, formAction] = useFormState<SignUpFormStateT, FormData>(
        signUpAction,
        initialState
    ); 
    return <form action={formAction} className="space-y-4">
        <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
            <input
                name="username"
                type="text"
                required
                id="username"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        </div>
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
                name="email"
                type="email"
                required
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        </div>
        <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input
                name="password"
                type="password"
                required
                id="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        </div>
        <LoginButton />
    </form>
    ;
}


