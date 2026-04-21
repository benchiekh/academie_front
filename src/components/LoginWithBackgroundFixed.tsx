import { useState } from 'react';
import axios from 'axios';

interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
}

const LoginWithBackgroundFixed = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post<LoginResponse>('http://localhost:3000/auth/login', {
        email,
        password,
      });

      const { access_token, user } = response.data;
      
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'ADMIN') {
        window.location.href = '/admin-dashboard';
      } else {
        window.location.href = '/parent-dashboard';
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Image d'arrière-plan avec fallback */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url('/images/background-login.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: imageLoaded ? 'none' : 'blur(0px)',
          transition: 'filter 0.3s ease',
          zIndex: 0
        }}
        onLoad={() => setImageLoaded(true)}
      />
      
      {/* Overlay dégradé pour améliorer la lisibilité */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(220, 53, 69, 0.7), rgba(200, 35, 51, 0.8))',
        zIndex: 1
      }} />

      {/* Fallback si l'image ne charge pas */}
      {!imageLoaded && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #dc3545, #c82333)',
          zIndex: 0
        }} />
      )}
      
      {/* Logo/Emblème de l'académie */}
      <div style={{
        position: 'absolute',
        top: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2,
        textAlign: 'center'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem',
          boxShadow: '0 4px 15px rgba(220, 53, 69, 0.3)',
          border: '4px solid white',
          backdropFilter: 'blur(10px)'
        }}>
          <span style={{
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold',
            fontFamily: 'Arial, sans-serif'
          }}>HT</span>
        </div>
        <h1 style={{
          color: 'white',
          margin: 0,
          fontSize: '1.5rem',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)'
        }}>
          Académie Handball Tebourba
        </h1>
      </div>

      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        padding: '3rem',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: '450px',
        position: 'relative',
        zIndex: 2,
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}>
        {/* Icône handball */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '60px',
            height: '60px',
            backgroundColor: 'linear-gradient(135deg, #dc3545, #c82333)',
            borderRadius: '12px',
            marginBottom: '1rem',
            boxShadow: '0 4px 12px rgba(220, 53, 69, 0.3)'
          }}>
            <span style={{ color: 'white', fontSize: '1.5rem' }}>??</span>
          </div>
          <h2 style={{ 
            margin: 0,
            color: '#212529',
            fontSize: '1.8rem',
            fontWeight: '600'
          }}>
            Espace Membre
          </h2>
          <p style={{
            margin: '0.5rem 0 0 0',
            color: '#6c757d',
            fontSize: '0.95rem'
          }}>
            Connectez-vous à votre espace
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              color: '#495057',
              fontWeight: '500',
              fontSize: '0.9rem'
            }}>
              Adresse Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                outline: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.9)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#dc3545';
                e.target.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e9ecef';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="admin@academie.com"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              color: '#495057',
              fontWeight: '500',
              fontSize: '0.9rem'
            }}>
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                outline: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.9)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#dc3545';
                e.target.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e9ecef';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="admin123"
            />
          </div>

          {error && (
            <div style={{
              backgroundColor: '#f8d7da',
              color: '#721c24',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              border: '1px solid #f5c6cb',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>??</span>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              background: loading ? '#6c757d' : 'linear-gradient(135deg, #dc3545, #c82333)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: loading ? 'none' : '0 4px 15px rgba(220, 53, 69, 0.3)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(220, 53, 69, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(220, 53, 69, 0.3)';
              }
            }}
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>

        <div style={{ 
          marginTop: '2rem', 
          padding: '1.5rem', 
          background: 'linear-gradient(135deg, rgba(248, 249, 250, 0.9), rgba(233, 236, 239, 0.9))', 
          borderRadius: '12px',
          fontSize: '0.85rem',
          color: '#495057',
          border: '1px solid rgba(222, 226, 230, 0.5)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ color: '#dc3545' }}>??</span>
            <strong style={{ color: '#dc3545' }}>Accès Administrateur:</strong>
          </div>
          <div style={{ marginLeft: '1.5rem', lineHeight: '1.5' }}>
            <div><strong>Email:</strong> admin@academie.com</div>
            <div><strong>Mot de passe:</strong> admin123</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginWithBackgroundFixed;
