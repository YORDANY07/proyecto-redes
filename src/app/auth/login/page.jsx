"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from "../styles/login.module.css";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [error, setError] = useState(null);

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      D_username: data.username,
      password: data.password,
      redirect: false,
    });

    if (res.error) {
      setError(res.error);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  });

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} className={styles.form}>
        {error && (
          <p className={styles.error}>{error}</p>
        )}
        <h1 className={styles.title}>Login</h1>
        <label htmlFor="email" className={styles.label}>
          username:
        </label>
        <input
          type="text"
          {...register("username", {
            required: {
              value: true,
              message: "Email is required",
            },
          })}
          className={styles.input}
          placeholder="user@email.com"
        />
        {errors.username && (
          <span className={styles.errorText}>{errors.username.message}</span>
        )}
        <label htmlFor="password" className={styles.label}>
          Password:
        </label>
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
          className={styles.input}
          placeholder="******"
        />
        {errors.password && (
          <span className={styles.errorText}>
            {errors.password.message}
          </span>
        )}
        <button className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
