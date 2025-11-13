import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function ProductList({ filterName }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const productosData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProductos(productosData);
    };

    fetchProducts();
  }, []);

  // Filtrar productos por nombre (parcial, insensible a mayúsculas)
  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {productosFiltrados.length === 0 && <p>No hay productos que coincidan.</p>}
      {productosFiltrados.map(producto => (
        <div
          key={producto.id}
          style={{
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 8,
            backgroundColor: "#fff",
          }}
        >
          <strong>{producto.nombre}</strong> - ${producto.precio.toFixed(2)}
          {producto.supermercado && ` - ${producto.supermercado}`}
          {producto.fechaCompra && ` - ${producto.fechaCompra}`}
        </div>
      ))}
    </div>
  );
}

