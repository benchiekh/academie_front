import { useState, useEffect } from 'react';

interface Child {
  id: number;
  name: string;
  age: number;
  category: string;
  photo?: string;
  performance: {
    goals: number;
    assists: number;
    matches: number;
    training: number;
  };
}

const ParentDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [selectedChild, setSelectedChild] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'schedule'>('overview');

  // Données simulées pour les enfants
  const [children] = useState<Child[]>([
    {
      id: 1,
      name: 'Mohamed Ali',
      age: 14,
      category: 'U14',
      photo: '',
      performance: {
        goals: 23,
        assists: 15,
        matches: 12,
        training: 28
      }
    },
    {
      id: 2,
      name: 'Sarah Ben',
      age: 12,
      category: 'U12',
      photo: '',
      performance: {
        goals: 18,
        assists: 12,
        matches: 10,
        training: 25
      }
    }
  ]);

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

  const selectedChildData = children.find(child => child.id === selectedChild) || children[0];

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
            
          </div>
          <div>
            <h1 style={{ 
              margin: 0, 
              fontSize: '1.8rem',
              fontWeight: 'bold'
            }}>
              Espace Parent
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
            
            Déconnexion
          </button>
        </div>
      </header>

      <main style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Message de bienvenue */}
        <div style={{
          background: 'linear-gradient(135deg, #dc3545, #c82333)',
          color: 'white',
          padding: '2rem',
          borderRadius: '16px',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 8px 30px rgba(220, 53, 69, 0.3)'
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
              rgba(255, 255, 255, 0.03) 10px,
              rgba(255, 255, 255, 0.03) 20px
            )`
          }} />
          
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px solid white',
              fontSize: '2rem'
            }}>
              
            </div>
            <div>
              <h2 style={{ 
                margin: 0, 
                fontSize: '2rem',
                fontWeight: 'bold'
              }}>
                Bienvenue, {user?.name} !
              </h2>
              <p style={{ 
                margin: '0.5rem 0 0 0', 
                fontSize: '1.1rem',
                opacity: 0.9
              }}>
                Suivez le parcours de vos enfants à l'Académie Handball Tebourba
              </p>
            </div>
          </div>
        </div>

        {/* Sélection des enfants */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '2rem', 
          borderRadius: '16px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(220, 53, 69, 0.2)',
          marginBottom: '2rem'
        }}>
          <h3 style={{ 
            margin: '0 0 1.5rem 0', 
            color: '#212529',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            Vos Enfants
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1rem' 
          }}>
            {children.map((child) => (
              <div
                key={child.id}
                onClick={() => setSelectedChild(child.id)}
                style={{
                  background: selectedChild === child.id 
                    ? 'linear-gradient(135deg, #dc3545, #c82333)'
                    : 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                  color: selectedChild === child.id ? 'white' : '#212529',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: selectedChild === child.id 
                    ? '2px solid #dc3545'
                    : '1px solid #dee2e6',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  if (selectedChild !== child.id) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedChild !== child.id) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: selectedChild === child.id 
                      ? 'rgba(255, 255, 255, 0.2)'
                      : 'rgba(220, 53, 69, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    border: selectedChild === child.id 
                      ? '2px solid white'
                      : '2px solid #dc3545'
                  }}>
                    {child.photo}
                  </div>
                  <div>
                    <h4 style={{ 
                      margin: 0, 
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }}>
                      {child.name}
                    </h4>
                    <p style={{ 
                      margin: '0.25rem 0 0 0', 
                      fontSize: '0.9rem',
                      opacity: 0.8
                    }}>
                      {child.age} ans - Catégorie {child.category}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation par onglets */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '16px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(220, 53, 69, 0.2)',
          overflow: 'hidden',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
            borderBottom: '1px solid #dee2e6'
          }}>
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: '' },
              { id: 'performance', label: 'Performance', icon: '' },
              { id: 'schedule', label: 'Planning', icon: '' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  flex: 1,
                  padding: '1rem',
                  background: activeTab === tab.id 
                    ? 'linear-gradient(135deg, #dc3545, #c82333)'
                    : 'transparent',
                  color: activeTab === tab.id ? 'white' : '#495057',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
                onMouseOver={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
                  }
                }}
                onMouseOut={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ padding: '2rem' }}>
            {activeTab === 'overview' && (
              <div>
                <h3 style={{ 
                  margin: '0 0 1.5rem 0', 
                  color: '#212529',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}>
                  Vue d'ensemble - {selectedChildData.name}
                </h3>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '1rem' 
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid #90caf9'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ fontSize: '1.5rem' }}></span>
                      <span style={{ color: '#1565c0', fontSize: '0.9rem' }}>Buts marqués</span>
                    </div>
                    <p style={{ 
                      margin: 0, 
                      fontSize: '2rem', 
                      fontWeight: 'bold', 
                      color: '#1565c0' 
                    }}>
                      {selectedChildData.performance.goals}
                    </p>
                  </div>
                  
                  <div style={{
                    background: 'linear-gradient(135deg, #e8f5e8, #c8e6c9)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid #a5d6a7'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ fontSize: '1.5rem' }}></span>
                      <span style={{ color: '#388e3c', fontSize: '0.9rem' }}>Passes décisives</span>
                    </div>
                    <p style={{ 
                      margin: 0, 
                      fontSize: '2rem', 
                      fontWeight: 'bold', 
                      color: '#388e3c' 
                    }}>
                      {selectedChildData.performance.assists}
                    </p>
                  </div>
                  
                  <div style={{
                    background: 'linear-gradient(135deg, #fff3e0, #ffe0b2)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid #ffcc02'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ fontSize: '1.5rem' }}></span>
                      <span style={{ color: '#ef6c00', fontSize: '0.9rem' }}>Matchs joués</span>
                    </div>
                    <p style={{ 
                      margin: 0, 
                      fontSize: '2rem', 
                      fontWeight: 'bold', 
                      color: '#ef6c00' 
                    }}>
                      {selectedChildData.performance.matches}
                    </p>
                  </div>
                  
                  <div style={{
                    background: 'linear-gradient(135deg, #f3e5f5, #e1bee7)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid #ce93d8'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ fontSize: '1.5rem' }}></span>
                      <span style={{ color: '#7b1fa2', fontSize: '0.9rem' }}>Entraînements</span>
                    </div>
                    <p style={{ 
                      margin: 0, 
                      fontSize: '2rem', 
                      fontWeight: 'bold', 
                      color: '#7b1fa2' 
                    }}>
                      {selectedChildData.performance.training}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'performance' && (
              <div>
                <h3 style={{ 
                  margin: '0 0 1.5rem 0', 
                  color: '#212529',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}>
                  Performance - {selectedChildData.name}
                </h3>
                
                <div style={{
                  background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '1px solid #dee2e6'
                }}>
                  <div style={{ marginBottom: '2rem' }}>
                    <h4 style={{ color: '#495057', marginBottom: '1rem' }}>Progression mensuelle</h4>
                    <div style={{
                      height: '200px',
                      background: 'linear-gradient(135deg, #dc3545, #c82333)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }}>
                      Graphique de performance
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1rem'
                  }}>
                    <div style={{
                      backgroundColor: 'white',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: '1px solid #dee2e6'
                    }}>
                      <h5 style={{ color: '#dc3545', margin: '0 0 0.5rem 0' }}>Points forts</h5>
                      <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#495057' }}>
                        <li>Vitesse et agilité</li>
                        <li>Tir précis</li>
                        <li>Bonne vision de jeu</li>
                      </ul>
                    </div>
                    
                    <div style={{
                      backgroundColor: 'white',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: '1px solid #dee2e6'
                    }}>
                      <h5 style={{ color: '#dc3545', margin: '0 0 0.5rem 0' }}>Axes d'amélioration</h5>
                      <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#495057' }}>
                        <li>Endurance</li>
                        <li>Défense individuelle</li>
                        <li>Passes longues</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div>
                <h3 style={{ 
                  margin: '0 0 1.5rem 0', 
                  color: '#212529',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}>
                  Planning - {selectedChildData.name}
                </h3>
                
                <div style={{
                  background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '1px solid #dee2e6'
                }}>
                  <div style={{
                    display: 'grid',
                    gap: '1rem'
                  }}>
                    {[
                      { day: 'Lundi', time: '17:00-19:00', type: 'Entraînement', location: 'Salle A' },
                      { day: 'Mercredi', time: '17:00-19:00', type: 'Entraînement', location: 'Salle B' },
                      { day: 'Vendredi', time: '16:00-18:00', type: 'Match', location: 'Stade Principal' },
                      { day: 'Samedi', time: '10:00-12:00', type: 'Entraînement', location: 'Salle A' }
                    ].map((session, index) => (
                      <div key={index} style={{
                        backgroundColor: 'white',
                        padding: '1rem',
                        borderRadius: '8px',
                        border: '1px solid #dee2e6',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: session.type === 'Match' 
                              ? 'linear-gradient(135deg, #dc3545, #c82333)'
                              : 'linear-gradient(135deg, #28a745, #20c997)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '1rem'
                          }}>
                            {session.type === 'Match' ? '' : ''}
                          </div>
                          <div>
                            <h5 style={{ margin: 0, color: '#212529', fontWeight: 'bold' }}>
                              {session.day}
                            </h5>
                            <p style={{ margin: 0, color: '#6c757d', fontSize: '0.9rem' }}>
                              {session.time} - {session.location}
                            </p>
                          </div>
                        </div>
                        <div style={{
                          backgroundColor: session.type === 'Match' 
                            ? 'rgba(220, 53, 69, 0.1)'
                            : 'rgba(40, 167, 69, 0.1)',
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          color: session.type === 'Match' ? '#dc3545' : '#28a745'
                        }}>
                          {session.type}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Services disponibles */}
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(220, 53, 69, 0.2)'
        }}>
          <h3 style={{ 
            margin: '0 0 1.5rem 0', 
            color: '#212529',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            Services pour les Parents
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '1.5rem'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid #90caf9',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(33, 150, 243, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                padding: '0.5rem',
                borderRadius: '8px'
              }}>
                <span style={{ fontSize: '1.2rem' }}></span>
              </div>
              <h4 style={{ 
                margin: '0 0 1rem 0', 
                color: '#1565c0',
                fontSize: '1.3rem',
                fontWeight: 'bold'
              }}>
                Suivi Scolaire
              </h4>
              <p style={{ 
                margin: 0, 
                color: '#1976d2',
                fontSize: '1rem',
                lineHeight: '1.5'
              }}>
                Consultez les notes, les bulletins et le progrès de vos enfants
              </p>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, #f3e5f5, #e1bee7)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid #ce93d8',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(156, 39, 176, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                backgroundColor: 'rgba(156, 39, 176, 0.1)',
                padding: '0.5rem',
                borderRadius: '8px'
              }}>
                <span style={{ fontSize: '1.2rem' }}></span>
              </div>
              <h4 style={{ 
                margin: '0 0 1rem 0', 
                color: '#7b1fa2',
                fontSize: '1.3rem',
                fontWeight: 'bold'
              }}>
                Calendrier
              </h4>
              <p style={{ 
                margin: 0, 
                color: '#8e24aa',
                fontSize: '1rem',
                lineHeight: '1.5'
              }}>
                Accédez aux événements, entraînements et rendez-vous importants
              </p>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, #e8f5e8, #c8e6c9)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid #a5d6a7',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(76, 175, 80, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                padding: '0.5rem',
                borderRadius: '8px'
              }}>
                <span style={{ fontSize: '1.2rem' }}></span>
              </div>
              <h4 style={{ 
                margin: '0 0 1rem 0', 
                color: '#388e3c',
                fontSize: '1.3rem',
                fontWeight: 'bold'
              }}>
                Communication
              </h4>
              <p style={{ 
                margin: 0, 
                color: '#43a047',
                fontSize: '1rem',
                lineHeight: '1.5'
              }}>
                Contactez les entraîneurs et l'administration
              </p>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, #fff3e0, #ffe0b2)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid #ffcc02',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(255, 152, 0, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                backgroundColor: 'rgba(255, 152, 0, 0.1)',
                padding: '0.5rem',
                borderRadius: '8px'
              }}>
                <span style={{ fontSize: '1.2rem' }}></span>
              </div>
              <h4 style={{ 
                margin: '0 0 1rem 0', 
                color: '#ef6c00',
                fontSize: '1.3rem',
                fontWeight: 'bold'
              }}>
                Documents
              </h4>
              <p style={{ 
                margin: 0, 
                color: '#f57c00',
                fontSize: '1rem',
                lineHeight: '1.5'
              }}>
                Accédez aux certificats et formulaires
              </p>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, #e8f5e8, #c8e6c9)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid #a5d6a7',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(76, 175, 80, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                padding: '0.5rem',
                borderRadius: '8px'
              }}>
                <span style={{ fontSize: '1.2rem' }}></span>
              </div>
              <h4 style={{ 
                margin: '0 0 1rem 0', 
                color: '#388e3c',
                fontSize: '1.3rem',
                fontWeight: 'bold'
              }}>
                Paiements
              </h4>
              <p style={{ 
                margin: 0, 
                color: '#43a047',
                fontSize: '1rem',
                lineHeight: '1.5'
              }}>
                Gérez les frais d'inscription et d'entraînement
              </p>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, #f3e5f5, #e1bee7)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid #ce93d8',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(156, 39, 176, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                backgroundColor: 'rgba(156, 39, 176, 0.1)',
                padding: '0.5rem',
                borderRadius: '8px'
              }}>
                <span style={{ fontSize: '1.2rem' }}></span>
              </div>
              <h4 style={{ 
                margin: '0 0 1rem 0', 
                color: '#7b1fa2',
                fontSize: '1.3rem',
                fontWeight: 'bold'
              }}>
                Événements
              </h4>
              <p style={{ 
                margin: 0, 
                color: '#8e24aa',
                fontSize: '1rem',
                lineHeight: '1.5'
              }}>
                Tournois, compétitions et activités spéciales
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParentDashboard;
