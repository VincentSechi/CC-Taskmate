import { useState, useContext } from "react"
import { AuthContext } from "../AuthContext"

const Login = ({toggleForm}) => {
    const { login } = useContext(AuthContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password).catch(() => setError("Erreur lors de la connexion"))
    }

  return (
    <div className="login-container">
        <h2>Connexion</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nom d'utilisateur</label>
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Mot de passe</label>
                <input 
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Connexion</button>
        </form>
        <div onClick={toggleForm}>
            Inscription
        </div>
    </div>
  )
}

export default Login