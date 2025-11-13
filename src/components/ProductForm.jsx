import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function ProductForm() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [supermercado, setSupermercado] = useState(""); // nuevo campo
  const [fechaCompra, setFechaCompra] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !precio || !supermercado || !fechaCompra) {
      alert("Completa todos los campos");
      return;
    }

    const nuevoProducto = {
      nombre,
      precio: parseFloat(precio),
      supermercado,
      fechaCompra,
    };

    try {
      await addDoc(collection(db, "productos"), nuevoProducto);
      setNombre("");
      setPrecio("");
      setSupermercado("");
      setFechaCompra("");
      alert("Producto añadido correctamente");
    } catch (error) {
      console.error("Error al añadir producto:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 12 }}
    >
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
      />
      <input
        type="text"
        placeholder="Supermercado"
        value={supermercado}
        onChange={(e) => setSupermercado(e.target.value)}
        style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
      />
      <input
        type="date"
        placeholder="Fecha de compra"
        value={fechaCompra}
        onChange={(e) => setFechaCompra(e.target.value)}
        style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 16px",
          borderRadius: 4,
          border: "none",
          backgroundColor: "#1976d2",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Añadir producto
      </button>
    </form>
  );
}
