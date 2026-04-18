import { useState, useEffect } from 'react';

const ParentDashboard = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <header style={{ 
        backgroundColor: '#28a745', 
        color: 'white', 
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1>Tableau de bord Parent</h1>
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
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2>Bienvenue dans votre espace parent</h2>
          <p>Voici les informations de votre compte :</p>
          
          <div style={{ marginTop: '2rem' }}>
            <h3>Informations du compte</h3>
            <div style={{ 
              backgroundColor: '#f8f9fa', 
              padding: '1rem', 
              borderRadius: '4px',
              marginTop: '1rem'
            }}>
              <p><strong>Nom:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Rôle:</strong> {user?.role === 'PARENT' ? 'Parent' : user?.role}</p>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h3>Actions disponibles</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '1rem',
              marginTop: '1rem'
            }}>
              <div style={{
                backgroundColor: '#e3f2fd',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #bbdefb'
              }}>
                <h4>📚 Suivi scolaire</h4>
                <p>Consultez les notes et le progrès de vos enfants.</p>
              </div>
              
              <div style={{
                backgroundColor: '#f3e5f5',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #e1bee7'
              }}>
                <h4>📅 Calendrier</h4>
                <p>Voir les événements et les rendez-vous importants.</p>
              </div>
              
              <div style={{
                backgroundColor: '#e8f5e8',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #c8e6c9'
              }}>
                <h4>💬 Communication</h4>
                <p>Communiquez avec les enseignants et l'administration.</p>
              </div>
              
              <div style={{
                backgroundColor: '#fff3e0',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #ffe0b2'
              }}>
                <h4>📄 Documents</h4>
                <p>Accédez aux documents importants et aux formulaires.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParentDashboard;
