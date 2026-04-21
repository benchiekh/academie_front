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
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #e9ecef 100%)',
      position: 'relative'
    }}>
      {/* Header moderne */}
      <header style={{ 
        background: 'linear-gradient(135deg, #dc3545, #c82333)', 
        color: 'white', 
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 20px rgba(220, 53, 69, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Motif handball en arrière-plan */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255, 255, 255, 0.05) 10px,
            rgba(255, 255, 255, 0.05) 20px
          )`
        }} />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative', zIndex: 1 }}>
          <div style={{
            width: '50px',
            height: '50px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid white'
          }}>
            <span style={{ fontSize: '1.5rem' }}>🏐</span>
          </div>
          <div>
            <h1 style={{ 
              margin: 0, 
              fontSize: '1.8rem',
              fontWeight: 'bold'
            }}>
              Tableau de Bord
            </h1>
            <p style={{ 
              margin: 0, 
              fontSize: '0.9rem',
              opacity: 0.9
            }}>
              Académie Handball Tebourba
            </p>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative', zIndex: 1 }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>👤</span>
            <span>{user?.name}</span>
          </div>
          <button 
            onClick={logout}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            <span>🚪</span>
            Déconnexion
          </button>
        </div>
      </header>

      <main style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Cartes de statistiques */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem', 
          marginBottom: '2rem' 
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(220, 53, 69, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: 'linear-gradient(135deg, #dc3545, #c82333)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem'
            }}>
              👨‍👩‍👧‍👦
            </div>
            <div>
              <h3 style={{ margin: 0, color: '#6c757d', fontSize: '0.9rem' }}>Parents</h3>
              <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#dc3545' }}>
                {parents.length}
              </p>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(220, 53, 69, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: 'linear-gradient(135deg, #28a745, #20c997)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem'
            }}>
              📅
            </div>
            <div>
              <h3 style={{ margin: 0, color: '#6c757d', fontSize: '0.9rem' }}>Aujourd'hui</h3>
              <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold', color: '#28a745' }}>
                {new Date().toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>
        </div>

        {/* Section gestion des parents */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '2rem', 
          borderRadius: '16px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(220, 53, 69, 0.2)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <div>
              <h2 style={{ 
                margin: 0, 
                color: '#212529',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}>
                Gestion des Parents
              </h2>
              <p style={{ 
                margin: '0.5rem 0 0 0', 
                color: '#6c757d',
                fontSize: '0.95rem'
              }}>
                Créez et gérez les comptes parents
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              style={{
                background: showCreateForm 
                  ? 'linear-gradient(135deg, #6c757d, #5a6268)' 
                  : 'linear-gradient(135deg, #dc3545, #c82333)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(220, 53, 69, 0.3)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(220, 53, 69, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(220, 53, 69, 0.3)';
              }}
            >
              <span>{showCreateForm ? '❌' : '➕'}</span>
              {showCreateForm ? 'Annuler' : 'Créer un compte parent'}
            </button>
          </div>

          {message && (
            <div style={{
              backgroundColor: '#d4edda',
              color: '#155724',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '2rem',
              border: '1px solid #c3e6cb',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>✅</span>
              {message}
            </div>
          )}

          {showCreateForm && (
            <div style={{
              backgroundColor: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
              padding: '2rem',
              borderRadius: '12px',
              marginBottom: '2rem',
              border: '1px solid #dee2e6'
            }}>
              <h3 style={{ 
                margin: '0 0 1.5rem 0', 
                color: '#212529',
                fontSize: '1.3rem',
                fontWeight: 'bold'
              }}>
                Créer un nouveau compte parent
              </h3>
              <form onSubmit={createParent}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#495057', fontWeight: '500' }}>
                      Nom complet
                    </label>
                    <input
                      type="text"
                      value={newParent.name}
                      onChange={(e) => setNewParent({...newParent, name: e.target.value})}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e9ecef',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#dc3545';
                        e.target.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e9ecef';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#495057', fontWeight: '500' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={newParent.email}
                      onChange={(e) => setNewParent({...newParent, email: e.target.value})}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e9ecef',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#dc3545';
                        e.target.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e9ecef';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#495057', fontWeight: '500' }}>
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    value={newParent.password}
                    onChange={(e) => setNewParent({...newParent, password: e.target.value})}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e9ecef',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#dc3545';
                      e.target.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e9ecef';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #dc3545, #c82333)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 2rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(220, 53, 69, 0.3)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(220, 53, 69, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(220, 53, 69, 0.3)';
                  }}
                >
                  <span>✅</span>
                  Créer le compte
                </button>
              </form>
            </div>
          )}

          {/* Tableau des parents */}
          <div>
            <h3 style={{ 
              margin: '0 0 1.5rem 0', 
              color: '#212529',
              fontSize: '1.3rem',
              fontWeight: 'bold'
            }}>
              Liste des Parents ({parents.length})
            </h3>
            {parents.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '3rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '12px',
                border: '2px dashed #dee2e6'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
                <p style={{ 
                  margin: 0, 
                  color: '#6c757d',
                  fontSize: '1.1rem'
                }}>
                  Aucun parent inscrit pour le moment
                </p>
                <p style={{ 
                  margin: '0.5rem 0 0 0', 
                  color: '#adb5bd',
                  fontSize: '0.9rem'
                }}>
                  Cliquez sur "Créer un compte parent" pour commencer
                </p>
              </div>
            ) : (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #e9ecef'
              }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse'
                }}>
                  <thead>
                    <tr style={{ 
                      background: 'linear-gradient(135deg, #dc3545, #c82333)',
                      color: 'white'
                    }}>
                      <th style={{ 
                        padding: '1rem', 
                        textAlign: 'left', 
                        fontWeight: '600',
                        fontSize: '0.9rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span>👤</span>
                          Nom
                        </div>
                      </th>
                      <th style={{ 
                        padding: '1rem', 
                        textAlign: 'left', 
                        fontWeight: '600',
                        fontSize: '0.9rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span>📧</span>
                          Email
                        </div>
                      </th>
                      <th style={{ 
                        padding: '1rem', 
                        textAlign: 'left', 
                        fontWeight: '600',
                        fontSize: '0.9rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span>📅</span>
                          Date d'inscription
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {parents.map((parent, index) => (
                      <tr key={parent.id} style={{
                        backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f9fa',
                        transition: 'background-color 0.3s ease'
                      }}>
                        <td style={{ 
                          padding: '1rem', 
                          borderBottom: '1px solid #e9ecef',
                          fontWeight: '500'
                        }}>
                          {parent.name}
                        </td>
                        <td style={{ 
                          padding: '1rem', 
                          borderBottom: '1px solid #e9ecef',
                          color: '#495057'
                        }}>
                          {parent.email}
                        </td>
                        <td style={{ 
                          padding: '1rem', 
                          borderBottom: '1px solid #e9ecef',
                          color: '#6c757d',
                          fontSize: '0.9rem'
                        }}>
                          {new Date(parent.createdAt).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
