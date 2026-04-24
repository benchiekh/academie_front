
const ResponsiveTest = () => {
  return (
    <div style={{
      padding: '2rem',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <h1 style={{
        textAlign: 'center',
        color: '#dc3545',
        marginBottom: '2rem',
        fontSize: '2rem'
      }}>
        Test de Responsive Design
      </h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(220, 53, 69, 0.2)'
        }}>
          <h3 style={{ color: '#dc3545', marginBottom: '1rem' }}>📱 Mobile</h3>
          <p>Test d'affichage sur mobile - les éléments doivent s'adapter correctement</p>
        </div>
        
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(220, 53, 69, 0.2)'
        }}>
          <h3 style={{ color: '#dc3545', marginBottom: '1rem' }}>💻 Desktop</h3>
          <p>Test d'affichage sur desktop - l'interface doit être optimale</p>
        </div>
        
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(220, 53, 69, 0.2)'
        }}>
          <h3 style={{ color: '#dc3545', marginBottom: '1rem' }}>🖥️ Large Screen</h3>
          <p>Test d'affichage sur grand écran - l'interface doit bien s'étirer</p>
        </div>
      </div>
      
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(220, 53, 69, 0.2)'
      }}>
        <h2 style={{ color: '#dc3545', marginBottom: '1rem' }}>🎯 Thème Handball Tebourba</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '1rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #dc3545, #c82333)',
            color: 'white',
            padding: '1rem',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            🏐 Couleur Rouge
          </div>
          <div style={{
            backgroundColor: 'white',
            color: '#dc3545',
            padding: '1rem',
            borderRadius: '8px',
            border: '2px solid #dc3545',
            textAlign: 'center'
          }}>
            ⚪ Couleur Blanche
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
            color: '#495057',
            padding: '1rem',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            🎨 Gradients Modernes
          </div>
        </div>
      </div>
      
      <div style={{
        textAlign: 'center',
        marginTop: '2rem',
        padding: '2rem',
        backgroundColor: 'rgba(220, 53, 69, 0.1)',
        borderRadius: '16px'
      }}>
        <h3 style={{ color: '#dc3545', marginBottom: '1rem' }}>✅ Tests Complétés</h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          L'interface est maintenant responsive avec le thème <strong>Académie Handball Tebourba</strong> et les couleurs rouge et blanc.
        </p>
      </div>
    </div>
  );
};

export default ResponsiveTest;
