"use client";   
import { signIn } from "next-auth/react";
import { FormEvent } from "react";

export async function authenticate(_currentState: unknown, formData: FormData) {
    try {
      const formDataObj: { [key: string]: string } = {};
      formData.forEach((value, key) => {
        formDataObj[key] = value.toString();
      });
      await signIn('credentials', { ...formDataObj })
    window.location.href = '/posts';
    } catch (error) {
      if (error) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.'
          default:
            return 'Something went wrong.'
        }
      }
      throw error
    }
}

export async function authenticateThirdParty(method: "github" | "google") {
    console.log('Authenticating with', method)
    try {
      await signIn(method);
      window.location.href = '/posts';

    } catch (error) {
      if (error) {
        console.error('Error:', error)
        switch (error.type) {
          case 'OAuthSignin':
            return 'Invalid credentials.'
          default:
            return 'Something went wrong.'
        }
      }
      throw error
    }
}