import React, { useState } from 'react'
import { auth, googleProvider } from '../../firebase'
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      onLogin()
    } catch(e) {
      console.error(e)
      setMsg('Error Google Login')
    }
  }

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      onLogin()
    } catch(e) {
      console.error(e)
      setMsg('Error login con email, intentando registro...')
      try {
        await createUserWithEmailAndPassword(auth, email, password)
        onLogin()
      } catch(err) {
        console.error(err)
        setMsg('Error al registrar usuario')
      }
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '24px auto', padding: 16, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2>Login</h2>
      <button onClick={handleGoogleLogin} style={{ marginBottom: 12, padding: '8px 12px' }}>Login con Google</button>
      <form onSubmit={handleEmailLogin} style={{ display: 'grid', gap: 8 }}>
        <input type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login con Email</button>
      </form>
      {msg && <div style={{ color: 'crimson', marginTop: 8 }}>{msg}</div>}
    </div>
  )
}
