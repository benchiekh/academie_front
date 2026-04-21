import { useState, useEffect } from 'react';
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

const LoginResponsive = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageStatus, setImageStatus] = useState<string>('Vérification...');
  const [screenSize, setScreenSize] = useState<'mobile-small' | 'mobile' | 'tablet' | 'desktop' | 'desktop-large'>('desktop');

  useEffect(() => {
    // Détection de la taille d'écran avec plus de breakpoints
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setScreenSize('mobile-small');
      } else if (width < 768) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else if (width < 1440) {
        setScreenSize('desktop');
      } else {
        setScreenSize('desktop-large');
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);

    // Vérifier si l'image existe
    const checkImage = () => {
      const img = new Image();
      img.onload = () => {
        setImageStatus('Image trouvée et chargée !');
      };
      img.onerror = () => {
        setImageStatus('Image NON trouvée - Vérifiez le chemin et le nom');
      };
      img.src = '/background-login.jpg';
    };
    
    checkImage();

    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

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

  // Styles responsives
  const getContainerStyles = () => {
    const base = {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative' as const,
      overflow: 'hidden',
      margin: 0,
      padding: 0
    };

    return base;
  };

  const getFormStyles = () => {
    const base = {
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(25px) saturate(1.8)',
      borderRadius: '16px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
      position: 'relative' as const,
      zIndex: 2,
      border: '1px solid rgba(255, 255, 255, 0.5)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: 'translateY(0)',
      overflow: 'hidden',
      maxHeight: '90vh'
    };

    if (screenSize === 'mobile-small') {
      return {
        ...base,
        width: '92%',
        maxWidth: '280px',
        padding: '1rem',
        margin: '0.5rem auto',
        borderRadius: '12px'
      };
    } else if (screenSize === 'mobile') {
      return {
        ...base,
        width: '88%',
        maxWidth: '320px',
        padding: '1.2rem',
        margin: '1rem auto',
        borderRadius: '14px'
      };
    } else if (screenSize === 'tablet') {
      return {
        ...base,
        width: '85%',
        maxWidth: '380px',
        padding: '1.4rem',
        margin: 'auto',
        borderRadius: '16px'
      };
    } else if (screenSize === 'desktop') {
      return {
        ...base,
        width: '80%',
        maxWidth: '420px',
        padding: '1.6rem',
        margin: 'auto',
        borderRadius: '18px'
      };
    } else {
      return {
        ...base,
        width: '75%',
        maxWidth: '460px',
        padding: '1.8rem',
        margin: 'auto',
        borderRadius: '20px'
      };
    }
  };

  const getLogoStyles = () => {
    const base = {
      position: 'absolute' as const,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 2,
      textAlign: 'center' as const
    };

    if (screenSize === 'mobile-small') {
      return {
        ...base,
        top: '0.5rem'
      };
    } else if (screenSize === 'mobile') {
      return {
        ...base,
        top: '1rem'
      };
    } else if (screenSize === 'tablet') {
      return {
        ...base,
        top: '1.5rem'
      };
    } else {
      return {
        ...base,
        top: '2rem'
      };
    }
  };

  const getLogoContainerStyles = () => {
    const base = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      border: '4px solid rgba(255, 255, 255, 0.9)',
      boxShadow: '0 8px 25px rgba(220, 53, 69, 0.4), 0 4px 12px rgba(220, 53, 69, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
      margin: '0 auto',
      background: 'linear-gradient(135deg, rgba(220, 53, 69, 0.9), rgba(200, 35, 51, 0.95))',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: 'scale(1)',
      position: 'relative' as const
    };

    if (screenSize === 'mobile-small') {
      return {
        ...base,
        width: '40px',
        height: '40px',
        marginBottom: '0.5rem',
        borderWidth: '3px'
      };
    } else if (screenSize === 'mobile') {
      return {
        ...base,
        width: '50px',
        height: '50px',
        marginBottom: '0.6rem',
        borderWidth: '3px'
      };
    } else if (screenSize === 'tablet') {
      return {
        ...base,
        width: '55px',
        height: '55px',
        marginBottom: '0.7rem',
        borderWidth: '4px'
      };
    } else {
      return {
        ...base,
        width: '60px',
        height: '60px',
        marginBottom: '0.8rem',
        borderWidth: '4px'
      };
    }
  };

  const getLogoTextStyles = () => {
    const base = {
      color: 'white',
      fontWeight: '900' as const,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
      letterSpacing: '-0.02em',
      transition: 'all 0.3s ease',
      transform: 'scale(1)'
    };

    if (screenSize === 'mobile-small') {
      return {
        ...base,
        fontSize: '1rem'
      };
    } else if (screenSize === 'mobile') {
      return {
        ...base,
        fontSize: '1.2rem'
      };
    } else if (screenSize === 'tablet') {
      return {
        ...base,
        fontSize: '1.35rem'
      };
    } else {
      return {
        ...base,
        fontSize: '1.5rem'
      };
    }
  };

  const getTitleStyles = () => {
    const base = {
      color: 'white',
      margin: '0',
      fontWeight: '700' as const,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      textShadow: '0 3px 6px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3)',
      letterSpacing: '0.01em',
      transition: 'all 0.3s ease',
      lineHeight: '1.2'
    };

    if (screenSize === 'mobile-small') {
      return {
        ...base,
        fontSize: '0.95rem'
      };
    } else if (screenSize === 'mobile') {
      return {
        ...base,
        fontSize: '1.1rem'
      };
    } else if (screenSize === 'tablet') {
      return {
        ...base,
        fontSize: '1.25rem'
      };
    } else {
      return {
        ...base,
        fontSize: '1.4rem'
      };
    }
  };

  return (
    <div style={getContainerStyles()}>
      {/* Image d'arrière-plan */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/background-login.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
          opacity: 0.9
        }}
      />
      
      {/* Overlay dégradé */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(220, 53, 69, 0.4), rgba(200, 35, 51, 0.5))',
        zIndex: 1
      }} />
      
      {/* Logo/Emblème de l'académie */}
      <div style={getLogoStyles()}>
        <div style={getLogoContainerStyles()}>
          <span style={getLogoTextStyles()}>HT</span>
        </div>
        <h1 style={getTitleStyles()}>
          Académie Handball Tebourba
        </h1>
      </div>

      <div style={getFormStyles()}>
        {/* Icône handball */}
        <div style={{
          textAlign: 'center',
          marginBottom: screenSize === 'mobile-small' ? '0.8rem' : 
                      screenSize === 'mobile' ? '1rem' : 
                      screenSize === 'tablet' ? '1.1rem' : '1.2rem'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: screenSize === 'mobile-small' ? '32px' : 
                  screenSize === 'mobile' ? '40px' : 
                  screenSize === 'tablet' ? '44px' : '48px',
            height: screenSize === 'mobile-small' ? '32px' : 
                   screenSize === 'mobile' ? '40px' : 
                   screenSize === 'tablet' ? '44px' : '48px',
            background: 'linear-gradient(135deg, #dc3545, #c82333)',
            borderRadius: '10px',
            marginBottom: screenSize === 'mobile-small' ? '0.6rem' : 
                         screenSize === 'mobile' ? '0.8rem' : 
                         screenSize === 'tablet' ? '0.9rem' : '1rem',
            boxShadow: '0 4px 12px rgba(220, 53, 69, 0.25), 0 2px 6px rgba(220, 53, 69, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: 'translateY(0)',
            position: 'relative' as const
          }}>
            <span style={{ 
              color: 'white', 
              fontSize: screenSize === 'mobile-small' ? '0.8rem' : 
                       screenSize === 'mobile' ? '1rem' : 
                       screenSize === 'tablet' ? '1.1rem' : '1.2rem',
              fontWeight: '700' as const,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
            }}>HB</span>
          </div>
          <h2 style={{ 
            margin: 0,
            color: '#212529',
            fontSize: screenSize === 'mobile-small' ? '0.85rem' : 
                     screenSize === 'mobile' ? '1rem' : 
                     screenSize === 'tablet' ? '1.1rem' : '1.2rem',
            fontWeight: '700' as const,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            marginBottom: screenSize === 'mobile-small' ? '0.15rem' : '0.2rem'
          }}>
            Espace Membre
          </h2>
          <p style={{
            margin: 0,
            color: '#6c757d',
            fontSize: screenSize === 'mobile-small' ? '0.6rem' : 
                     screenSize === 'mobile' ? '0.65rem' : 
                     screenSize === 'tablet' ? '0.7rem' : '0.75rem',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontWeight: '400' as const,
            opacity: 0.7
          }}>
            Connectez-vous à votre espace
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: screenSize === 'mobile-small' ? '0.6rem' : 
                           screenSize === 'mobile' ? '0.8rem' : 
                           screenSize === 'tablet' ? '0.9rem' : '1rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: screenSize === 'mobile-small' ? '0.2rem' : '0.3rem', 
              color: '#343a40',
              fontWeight: '600' as const,
              fontSize: screenSize === 'mobile-small' ? '0.65rem' : 
                       screenSize === 'mobile' ? '0.7rem' : 
                       screenSize === 'tablet' ? '0.75rem' : '0.8rem',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '0.01em'
            }}>
              Adresse Email
            </label>
            <div style={{ position: 'relative' as const }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: screenSize === 'mobile-small' ? '0.7rem 0.9rem' : 
                         screenSize === 'mobile' ? '0.8rem 1rem' : 
                         screenSize === 'tablet' ? '0.9rem 1.1rem' : '1rem 1.2rem',
                  border: '2px solid #e9ecef',
                  borderRadius: '10px',
                  fontSize: screenSize === 'mobile-small' ? '0.8rem' : 
                           screenSize === 'mobile' ? '0.85rem' : 
                           screenSize === 'tablet' ? '0.9rem' : '0.95rem',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  outline: 'none',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.7)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#dc3545';
                  e.target.style.boxShadow = '0 0 0 4px rgba(220, 53, 69, 0.1), 0 4px 12px rgba(220, 53, 69, 0.15)';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e9ecef';
                  e.target.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.7)';
                  e.target.style.transform = 'translateY(0)';
                }}
                placeholder="admin@academie.com"
              />
            </div>
          </div>

          <div style={{ marginBottom: screenSize === 'mobile-small' ? '0.6rem' : 
                           screenSize === 'mobile' ? '0.8rem' : 
                           screenSize === 'tablet' ? '0.9rem' : '1rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: screenSize === 'mobile-small' ? '0.2rem' : '0.3rem', 
              color: '#343a40',
              fontWeight: '600' as const,
              fontSize: screenSize === 'mobile-small' ? '0.65rem' : 
                       screenSize === 'mobile' ? '0.7rem' : 
                       screenSize === 'tablet' ? '0.75rem' : '0.8rem',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '0.01em'
            }}>
              Mot de passe
            </label>
            <div style={{ position: 'relative' as const }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: screenSize === 'mobile-small' ? '0.7rem 0.9rem' : 
                         screenSize === 'mobile' ? '0.8rem 1rem' : 
                         screenSize === 'tablet' ? '0.9rem 1.1rem' : '1rem 1.2rem',
                  border: '2px solid #e9ecef',
                  borderRadius: '10px',
                  fontSize: screenSize === 'mobile-small' ? '0.8rem' : 
                           screenSize === 'mobile' ? '0.85rem' : 
                           screenSize === 'tablet' ? '0.9rem' : '0.95rem',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  outline: 'none',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.7)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#dc3545';
                  e.target.style.boxShadow = '0 0 0 4px rgba(220, 53, 69, 0.1), 0 4px 12px rgba(220, 53, 69, 0.15)';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e9ecef';
                  e.target.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.7)';
                  e.target.style.transform = 'translateY(0)';
                }}
                placeholder="admin123"
              />
            </div>
          </div>

          {error && (
            <div style={{
              backgroundColor: '#f8d7da',
              color: '#721c24',
              padding: screenSize === 'mobile' ? '0.8rem' : '1rem',
              borderRadius: '8px',
              marginBottom: screenSize === 'mobile' ? '1rem' : '1.5rem',
              border: '1px solid #f5c6cb',
              fontSize: screenSize === 'mobile' ? '0.8rem' : '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>!</span>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: screenSize === 'mobile-small' ? '0.9rem 1.2rem' : 
                     screenSize === 'mobile' ? '1rem 1.3rem' : 
                     screenSize === 'tablet' ? '1.1rem 1.4rem' : '1.2rem 1.5rem',
              border: 'none',
              borderRadius: '12px',
              fontSize: screenSize === 'mobile-small' ? '0.9rem' : 
                       screenSize === 'mobile' ? '0.95rem' : 
                       screenSize === 'tablet' ? '1rem' : '1.05rem',
              fontWeight: '700' as const,
              cursor: loading ? 'not-allowed' : 'pointer',
              background: loading 
                ? 'linear-gradient(135deg, #6c757d, #5a6268)' 
                : 'linear-gradient(135deg, #dc3545, #c82333)',
              color: 'white',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: loading 
                ? '0 2px 8px rgba(108, 117, 125, 0.2)' 
                : '0 6px 20px rgba(220, 53, 69, 0.3), 0 3px 10px rgba(220, 53, 69, 0.2)',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '0.02em',
              position: 'relative' as const,
              overflow: 'hidden',
              transform: 'translateY(0)'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.background = 'linear-gradient(135deg, #c82333, #bd2130)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(220, 53, 69, 0.4), 0 4px 15px rgba(220, 53, 69, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.background = 'linear-gradient(135deg, #dc3545, #c82333)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(220, 53, 69, 0.3), 0 3px 10px rgba(220, 53, 69, 0.2)';
              }
            }}
            onMouseDown={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(220, 53, 69, 0.3), 0 2px 8px rgba(220, 53, 69, 0.2)';
              }
            }}
            onMouseUp={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(220, 53, 69, 0.4), 0 4px 15px rgba(220, 53, 69, 0.3)';
              }
            }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <span style={{ 
                  display: 'inline-block',
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></span>
                Connexion en cours...
              </span>
            ) : (
              'Se connecter'
            )}
          </button>

        </form>

        <div style={{ 
          marginTop: screenSize === 'mobile-small' ? '0.6rem' : 
                     screenSize === 'mobile' ? '0.8rem' : 
                     screenSize === 'tablet' ? '1rem' : '1.2rem', 
          padding: screenSize === 'mobile-small' ? '0.6rem' : 
                  screenSize === 'mobile' ? '0.8rem' : 
                  screenSize === 'tablet' ? '0.9rem' : '1rem', 
          background: 'linear-gradient(135deg, rgba(220, 53, 69, 0.08), rgba(200, 35, 51, 0.12))', 
          borderRadius: '12px',
          fontSize: screenSize === 'mobile-small' ? '0.65rem' : 
                   screenSize === 'mobile' ? '0.7rem' : 
                   screenSize === 'tablet' ? '0.75rem' : '0.8rem',
          color: '#495057',
          border: '1px solid rgba(220, 53, 69, 0.15)',
          textAlign: 'left',
          boxShadow: '0 3px 8px rgba(220, 53, 69, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{ 
            marginBottom: screenSize === 'mobile-small' ? '0.4rem' : '0.5rem',
            fontSize: screenSize === 'mobile-small' ? '0.7rem' : 
                     screenSize === 'mobile' ? '0.75rem' : 
                     screenSize === 'tablet' ? '0.8rem' : '0.85rem',
            color: '#212529',
            display: 'flex',
            alignItems: 'center',
            gap: screenSize === 'mobile-small' ? '0.25rem' : '0.4rem',
            fontWeight: '500' as const,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            <span style={{ 
              color: '#dc3545', 
              fontWeight: '700' as const,
              fontSize: screenSize === 'mobile-small' ? '0.7rem' : 
                       screenSize === 'mobile' ? '0.75rem' : 
                       screenSize === 'tablet' ? '0.8rem' : '0.85rem',
              textShadow: '0 1px 2px rgba(220, 53, 69, 0.1)'
            }}>coach :</span>
            <span style={{ 
              fontWeight: '600' as const,
              fontSize: screenSize === 'mobile-small' ? '0.65rem' : 
                       screenSize === 'mobile' ? '0.7rem' : 
                       screenSize === 'tablet' ? '0.75rem' : '0.8rem',
              letterSpacing: '0.01em'
            }}>ihe ben chiekh ahmed</span>
          </div>
          <div style={{ 
            fontSize: screenSize === 'mobile-small' ? '0.7rem' : 
                     screenSize === 'mobile' ? '0.75rem' : 
                     screenSize === 'tablet' ? '0.8rem' : '0.85rem',
            color: '#212529',
            display: 'flex',
            alignItems: 'center',
            gap: screenSize === 'mobile-small' ? '0.25rem' : '0.4rem',
            padding: screenSize === 'mobile-small' ? '0.3rem' : '0.4rem',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            borderRadius: '6px',
            border: '1px solid rgba(220, 53, 69, 0.1)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontWeight: '500' as const
          }}>
            <span style={{ 
              color: '#dc3545', 
              fontWeight: '700' as const,
              fontSize: screenSize === 'mobile-small' ? '0.7rem' : 
                       screenSize === 'mobile' ? '0.75rem' : 
                       screenSize === 'tablet' ? '0.8rem' : '0.85rem',
              textShadow: '0 1px 2px rgba(220, 53, 69, 0.1)'
            }}>contact :</span>
            <span style={{ 
              fontWeight: '600' as const,
              fontSize: screenSize === 'mobile-small' ? '0.65rem' : 
                       screenSize === 'mobile' ? '0.7rem' : 
                       screenSize === 'tablet' ? '0.75rem' : '0.8rem',
              letterSpacing: '0.01em'
            }}>53319343</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginResponsive;
