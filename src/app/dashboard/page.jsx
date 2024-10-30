"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles/dashboard.module.css";

function DashboardPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const users = await res.json();
        setData(users);
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (id) => {
    try {
      const res = await fetch("/api/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      setData(data.filter((user) => user.C_idUser !== id));
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Usuarios</h1>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.header}>
              <th className={styles.colum}>ID</th>
              <th className={styles.colum}>Nombre de Usuario</th>
              <th className={styles.colum}>Contraseña</th>
              <th className={styles.colum}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.C_idUser} className={styles.row}>
                <td className={styles.cell}>{user.C_idUser}</td>
                <td className={styles.cell}>{user.D_userName}</td>
                <td className={styles.cell}>{user.D_contrase_a}</td>
                <td className={styles.cell}>
                  <button
                    onClick={() => deleteUser(user.C_idUser)}
                    className={styles.deleteButton}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardPage;
