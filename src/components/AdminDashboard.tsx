import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const [parents, setParents] = useState<User[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newParent, setNewParent] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchParents();
  }, []);

  const fetchParents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/auth/parents', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setParents(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des parents:', error);
    }
  };

  const createParent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/auth/create-parent', newParent, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Compte parent créé avec succès');
      setNewParent({ name: '', email: '', password: '' });
      setShowCreateForm(false);
      fetchParents();
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Erreur lors de la création');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <header style={{ 
        backgroundColor: '#007bff', 
        color: 'white', 
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1>Tableau de bord Administrateur</h1>
        <div>
          <span style={{ marginRight: '1rem' }}>Bienvenue, {user?.name}</span>
          <button 
            onClick={logout}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Déconnexion
          </button>
        </div>
      </header>

      <main style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2>Gestion des Parents</h2>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '4px',
              cursor: 'pointer',
              marginBottom: '1rem'
            }}
          >
            {showCreateForm ? 'Annuler' : 'Créer un compte parent'}
          </button>

          {message && (
            <div style={{
              backgroundColor: '#d4edda',
              color: '#155724',
              padding: '0.75rem',
              borderRadius: '4px',
              marginBottom: '1rem',
              border: '1px solid #c3e6cb'
            }}>
              {message}
            </div>
          )}

          {showCreateForm && (
            <div style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              marginBottom: '2rem'
            }}>
              <h3>Créer un nouveau compte parent</h3>
              <form onSubmit={createParent}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                    Nom
                  </label>
                  <input
                    type="text"
                    value={newParent.name}
                    onChange={(e) => setNewParent({...newParent, name: e.target.value})}
                    required
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #ddd',
                      borderRadius: '4px'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={newParent.email}
                    onChange={(e) => setNewParent({...newParent, email: e.target.value})}
                    required
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #ddd',
                      borderRadius: '4px'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    value={newParent.password}
                    onChange={(e) => setNewParent({...newParent, password: e.target.value})}
                    required
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #ddd',
                      borderRadius: '4px'
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Créer
                </button>
              </form>
            </div>
          )}
        </div>

        <div>
          <h3>Liste des Parents ({parents.length})</h3>
          {parents.length === 0 ? (
            <p>Aucun parent inscrit pour le moment.</p>
          ) : (
            <table style={{
              width: '100%',
              backgroundColor: 'white',
              borderCollapse: 'collapse',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Nom</th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Email</th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Date d'inscription</th>
                </tr>
              </thead>
              <tbody>
                {parents.map((parent) => (
                  <tr key={parent.id}>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>{parent.name}</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>{parent.email}</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
                      {new Date(parent.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
