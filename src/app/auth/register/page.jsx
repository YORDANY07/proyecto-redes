"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import styles from "../styles/register.module.css";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert("Passwords do not match");
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        D_userName: data.username,
        D_contrase_a: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/auth/login");
    }
  });

  console.log(errors);

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} className={styles.form}>
        <h1 className={styles.title}>Register</h1>

        <label htmlFor="username" className={styles.label}>
          Username:
        </label>
        <input
          type="text"
          {...register("username", {
            required: {
              value: true,
              message: "Username is required",
            },
          })}
          className={styles.input}
          placeholder="yourUser123"
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
          placeholder="********"
        />
        {errors.password && (
          <span className={styles.errorText}>{errors.password.message}</span>
        )}

        <label htmlFor="confirmPassword" className={styles.label}>
          Confirm Password:
        </label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Confirm Password is required",
            },
          })}
          className={styles.input}
          placeholder="********"
        />
        {errors.confirmPassword && (
          <span className={styles.errorText}>
            {errors.confirmPassword.message}
          </span>
        )}

        <button className={styles.button}>Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
