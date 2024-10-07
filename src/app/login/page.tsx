// app/login/page.tsx

"use client";

import { signIn } from "next-auth/react";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "./components/LoginForm";

export default  function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/posts");
    }
  };

  const handleLoginWithGitHub = async () => {
    const res = await signIn("github", { redirect: false });
    if (!res?.error) {
      router.push("/posts");
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h1>Login</h1>
      <LoginForm handleSubmit={handleSubmit} handleLoginWithGitHub={handleLoginWithGitHub} error={error} />
    </div>
  );
};


