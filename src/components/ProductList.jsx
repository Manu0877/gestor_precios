import React, { useEffect, useState } from 'react'
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot
} from 'firebase/firestore'
import { db } from '../firebase'

export default function ProductList({ filterName, filterMarket }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    const colRef = collection(db, 'products')

    let unsub = null
    try {
      if (filterMarket) {
        const q = query(colRef, where('market', '==', filterMarket), orderBy('createdAt', 'desc'))
        unsub = onSnapshot(q, (snap) => {
          const items = snap.docs.map(d => ({ id: d.id, ...d.data() }))
          setProducts(items)
          setLoading(false)
        })
      } else {
        const q = query(colRef, orderBy('createdAt', 'desc'))
        unsub = onSnapshot(q, (snap) => {
          let items = snap.docs.map(d => ({ id: d.id, ...d.data() }))
          if (filterName && filterName.trim()) {
            const lower = filterName.trim().toLowerCase()
            items = items.filter(it => (it.name || '').toLowerCase().includes(lower))
          }
          setProducts(items)
          setLoading(false)
        })
      }
    } catch (err) {
      console.error(err)
      setLoading(false)
    }

    return () => { if (unsub) unsub() }
  }, [filterMarket, filterName])

  if (loading) return <div>Cargando productos…</div>

  return (
    <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
      <h3>Listado ({products.length})</h3>
      {products.length === 0 && <div>No hay productos que coincidan.</div>}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>
            <th style={{ padding: '8px' }}>Nombre</th>
            <th style={{ padding: '8px' }}>Precio</th>
            <th style={{ padding: '8px' }}>Supermercado</th>
            <th style={{ padding: '8px' }}>Creado</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} style={{ borderBottom: '1px solid #f2f2f2' }}>
              <td style={{ padding: '8px' }}>{p.name}</td>
              <td style={{ padding: '8px' }}>{p.price != null ? p.price.toFixed(2) : ''} €</td>
              <td style={{ padding: '8px' }}>{p.market}</td>
              <td style={{ padding: '8px' }}>{p.createdAt && p.createdAt.toDate ? p.createdAt.toDate().toLocaleString() : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
