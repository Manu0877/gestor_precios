import React, { useState, useEffect } from 'react'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import Login from './components/auth/Login'
import { auth } from './firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'

export default function App() {
  const [user, setUser] = useState(null)
  const [filterName, setFilterName] = useState('')
  

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser)
    return unsub
  }, [])

  if(!user) return <Login onLogin={() => {}} />

  return (
    <div style={{ maxWidth: 900, margin: '24px auto', padding: 16, fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Gestor precios</h1>
      <div style={{ textAlign: 'right', marginBottom: 12 }}>
        <button onClick={() => signOut(auth)} style={{ padding: '6px 10px' }}>Cerrar sesión</button>
      </div>

      <section style={{ margin: '16px 0', padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
        <h2>Añadir producto</h2>
        <ProductForm />
      </section>

      <section style={{ margin: '16px 0', padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
        <h2>Buscar productos</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input
            placeholder="Filtrar por nombre (parte del nombre)"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            style={{ flex: 1, padding: 8 }}
          />
          
          <button onClick={() => { setFilterName('') }} style={{ padding: '8px 12px' }}>
            Limpiar filtros
          </button>
        </div>
      </section>

      <section style={{ margin: '16px 0' }}>
        <ProductList filterName={filterName} />
      </section>
    </div>
  )
}
