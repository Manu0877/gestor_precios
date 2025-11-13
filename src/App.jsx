import React, { useState, useEffect } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import Login from './components/auth/Login';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function App() {
  const [user, setUser] = useState(null);
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  if (!user) return <Login onLogin={() => {}} />;

  // ===== Estilos =====
  const containerStyle = {
    maxWidth: 900,
    margin: '24px auto',
    padding: 16,
    fontFamily: 'Arial, sans-serif',
  };

  const headerStyle = { textAlign: 'center', marginBottom: 24 };

  const sectionStyle = {
    margin: '16px 0',
    padding: 16,
    border: '1px solid #ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  };

  const filterContainerStyle = {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    marginTop: 8,
  };

  const inputStyle = {
    flex: 1,
    padding: 8,
    borderRadius: 4,
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    padding: '8px 12px',
    borderRadius: 4,
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#1976d2',
    color: '#fff',
  };

  const logoutStyle = {
    textAlign: 'right',
    marginBottom: 12,
  };

  // ===== Render =====
  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Gestor de Precios</h1>

      <div style={logoutStyle}>
        <button onClick={() => signOut(auth)} style={{ ...buttonStyle, backgroundColor: '#d32f2f' }}>
          Cerrar sesión
        </button>
      </div>

      <section style={sectionStyle}>
        <h2>Añadir Producto</h2>
        <ProductForm />
      </section>

      <section style={sectionStyle}>
        <h2>Buscar Productos</h2>
        <div style={filterContainerStyle}>
          <input
            placeholder="Filtrar por nombre"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            style={inputStyle}
          />
          <button onClick={() => setFilterName('')} style={buttonStyle}>
            Limpiar filtros
          </button>
        </div>
      </section>

      <section style={{ margin: '16px 0' }}>
        <ProductList filterName={filterName} />
      </section>
    </div>
  );
}

