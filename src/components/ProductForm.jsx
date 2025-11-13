import React, { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

export default function ProductForm() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [market, setMarket] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !market.trim() || !price) {
      setMsg('Rellena nombre, precio y supermercado.')
      return
    }
    const parsedPrice = parseFloat(price)
    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      setMsg('Precio inválido')
      return
    }

    setLoading(true)
    setMsg('')
    try {
      await addDoc(collection(db, 'products'), {
        name: name.trim(),
        price: parsedPrice,
        market: market.trim(),
        createdAt: serverTimestamp()
      })
      setName('')
      setPrice('')
      setMarket('')
      setMsg('Producto añadido ✅')
    } catch (err) {
      console.error(err)
      setMsg('Error al guardar')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8 }}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre del producto" />
      <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Precio (ej. 1.99)" />
      <input value={market} onChange={(e) => setMarket(e.target.value)} placeholder="Supermercado" />
      <div style={{ display: 'flex', gap: 8 }}>
        <button disabled={loading} type="submit" style={{ padding: '8px 12px' }}>
          {loading ? 'Guardando...' : 'Añadir'}
        </button>
        <button type="button" onClick={() => { setName(''); setPrice(''); setMarket(''); setMsg('') }} style={{ padding: '8px 12px' }}>
          Limpiar
        </button>
      </div>
      {msg && <div style={{ color: msg.includes('Error') ? 'crimson' : 'green' }}>{msg}</div>}
    </form>
  )
}
