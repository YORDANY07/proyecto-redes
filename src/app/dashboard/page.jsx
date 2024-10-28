"use client";
import React, { useEffect, useState } from "react";

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
    <div>
      <h1>Usuarios</h1>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={headerStyle}>ID</th>
            <th style={headerStyle}>Nombre de Usuario</th>
            <th style={headerStyle}>Contraseña</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.C_idUser} style={rowStyle}>
              <td style={cellStyle}>{user.C_idUser}</td>
              <td style={cellStyle}>{user.D_userName}</td>
              <td style={cellStyle}>{user.D_contrase_a}</td>
              <td style={cellStyle}>
                <button onClick={() => deleteUser(user.C_idUser)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const headerStyle = {
  borderBottom: "2px solid #333",
  padding: "8px",
  textAlign: "left",
  backgroundColor: "#000000",
};

const rowStyle = {
  borderBottom: "1px solid #ddd",
};

const cellStyle = {
  padding: "8px",
};

export default DashboardPage;
