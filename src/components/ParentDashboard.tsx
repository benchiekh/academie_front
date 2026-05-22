import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';

interface Enfant {
  id: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  sexe: string;
  categories?: { nom: string };
  categorie?: { nom: string };
}

interface Entrainement {
  id: number;
  titre: string;
  dateHeure: string;
  duree: number;
  lieu: string;
  categories?: { nom: string };
  categorie?: { nom: string };
}

interface Paiement {
  id: number;
  montant: number;
  mois: string;
  annee: number;
  statut: string;
  enfants?: { nom: string; prenom: string };
  enfant?: { nom: string; prenom: string };
}

interface Presence {
  id: number;
  present: boolean;
  entrainements?: { titre: string; dateHeure: string };
  entrainement?: { titre: string; dateHeure: string };
}

const ParentDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [enfants, setEnfants] = useState<Enfant[]>([]);
  const [entrainements, setEntrainements] = useState<Entrainement[]>([]);
  const [paiements, setPaiements] = useState<Paiement[]>([]);
  const [presences, setPresences] = useState<Presence[]>([]);
  const [selectedEnfant, setSelectedEnfant] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'enfants' | 'entrainements' | 'paiements'>('enfants');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      loadData(parsed.id);
    }
  }, []);

  const loadData = async (parentId: number) => {
    setLoading(true);
    try {
      const [enfantsRes, entraRes, paiRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/enfants?parentId=${parentId}`).catch(() => ({ data: { enfants: [] } })),
        axios.get(`${API_BASE_URL}/entrainements`).catch(() => ({ data: { entrainements: [] } })),
        axios.get(`${API_BASE_URL}/paiements?parentId=${parentId}`).catch(() => ({ data: { paiements: [] } })),
      ]);
      const enfantsList = enfantsRes.data.enfants || enfantsRes.data || [];
      setEnfants(enfantsList);
      setEntrainements(entraRes.data.entrainements || entraRes.data || []);
      setPaiements(paiRes.data.paiements || paiRes.data || []);

      if (enfantsList.length > 0 && !selectedEnfant) {
        setSelectedEnfant(enfantsList[0].id);
        loadPresences(enfantsList[0].id);
      }
    } catch (error) {
      console.error('Erreur chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPresences = async (enfantId: number) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/presences?enfantId=${enfantId}`);
      setPresences(res.data.presences || res.data || []);
    } catch (error) {
      console.error('Erreur presences:', error);
    }
  };

  const selectEnfant = (id: number) => {
    setSelectedEnfant(id);
    loadPresences(id);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const getAge = (dateNaissance: string) => {
    const today = new Date();
    const birth = new Date(dateNaissance);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const cardStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    marginBottom: '1rem',
  };

  const tabBtnStyle = (tab: string) => ({
    padding: '0.7rem 1.5rem',
    border: 'none',
    borderBottom: activeTab === tab ? '3px solid #dc3545' : '3px solid transparent',
    background: activeTab === tab ? 'rgba(220, 53, 69, 0.1)' : 'transparent',
    color: activeTab === tab ? '#dc3545' : '#666',
    cursor: 'pointer',
    fontWeight: activeTab === tab ? 'bold' as const : 'normal' as const,
    fontSize: '0.9rem',
  });

  const selectedChild = enfants.find(e => e.id === selectedEnfant);
  const totalPresences = presences.filter(p => p.present).length;
  const totalSeances = presences.length;

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>Chargement...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #dc3545, #c82333)',
        color: 'white',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Espace Parent</h1>
          <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.9 }}>Academie Handball Tebourba</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>{user?.name}</span>
          <button onClick={logout} style={{
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
          }}>
            Deconnexion
          </button>
        </div>
      </header>

      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Bienvenue */}
        <div style={{ ...cardStyle, background: 'linear-gradient(135deg, #dc3545, #c82333)', color: 'white' }}>
          <h2 style={{ margin: '0 0 0.5rem' }}>Bienvenue, {user?.name} !</h2>
          <p style={{ margin: 0, opacity: 0.9 }}>
            {enfants.length > 0
              ? `Vous avez ${enfants.length} enfant(s) inscrit(s) a l'academie.`
              : "Aucun enfant inscrit pour le moment. Contactez l'administration."}
          </p>
        </div>

        {/* Enfant selector */}
        {enfants.length > 0 && (
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
            {enfants.map(enfant => (
              <div
                key={enfant.id}
                onClick={() => selectEnfant(enfant.id)}
                style={{
                  ...cardStyle,
                  cursor: 'pointer',
                  border: selectedEnfant === enfant.id ? '2px solid #dc3545' : '2px solid transparent',
                  minWidth: '180px',
                  textAlign: 'center',
                  marginBottom: 0,
                }}
              >
                <div style={{
                  width: '50px', height: '50px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #dc3545, #c82333)',
                  color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 0.5rem', fontSize: '1.2rem', fontWeight: 'bold',
                }}>
                  {enfant.prenom[0]}{enfant.nom[0]}
                </div>
                <h4 style={{ margin: '0 0 0.3rem' }}>{enfant.prenom} {enfant.nom}</h4>
                <p style={{ margin: 0, color: '#666', fontSize: '0.85rem' }}>
                  {getAge(enfant.dateNaissance)} ans - {enfant.categories?.nom || enfant.categorie?.nom || ''}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Stats cards for selected child */}
        {selectedChild && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ ...cardStyle, textAlign: 'center', borderLeft: '4px solid #007bff' }}>
              <h3 style={{ color: '#007bff', margin: '0', fontSize: '1.8rem' }}>{totalPresences}/{totalSeances}</h3>
              <p style={{ color: '#666', margin: '0.3rem 0 0' }}>Presences</p>
            </div>
            <div style={{ ...cardStyle, textAlign: 'center', borderLeft: '4px solid #28a745' }}>
              <h3 style={{ color: '#28a745', margin: '0', fontSize: '1.8rem' }}>
                {paiements.filter(p => p.statut === 'PAYE' && (p.enfants || p.enfant)).length}
              </h3>
              <p style={{ color: '#666', margin: '0.3rem 0 0' }}>Paiements effectues</p>
            </div>
            <div style={{ ...cardStyle, textAlign: 'center', borderLeft: '4px solid #ffc107' }}>
              <h3 style={{ color: '#ffc107', margin: '0', fontSize: '1.8rem' }}>
                {paiements.filter(p => p.statut === 'EN_ATTENTE').length}
              </h3>
              <p style={{ color: '#666', margin: '0.3rem 0 0' }}>Paiements en attente</p>
            </div>
          </div>
        )}

        {/* Tabs */}
        {enfants.length > 0 && (
          <>
            <nav style={{ background: 'white', display: 'flex', borderRadius: '12px 12px 0 0', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <button onClick={() => setActiveTab('enfants')} style={tabBtnStyle('enfants')}>Mes Enfants</button>
              <button onClick={() => setActiveTab('entrainements')} style={tabBtnStyle('entrainements')}>Entrainements</button>
              <button onClick={() => setActiveTab('paiements')} style={tabBtnStyle('paiements')}>Paiements</button>
            </nav>

            <div style={{ ...cardStyle, borderRadius: '0 0 12px 12px', marginTop: 0 }}>
              {/* Enfants Tab */}
              {activeTab === 'enfants' && (
                <div>
                  <h3 style={{ marginTop: 0 }}>Informations sur vos enfants</h3>
                  {enfants.map(enfant => (
                    <div key={enfant.id} style={{ padding: '1rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ margin: '0 0 0.3rem' }}>{enfant.prenom} {enfant.nom}</h4>
                        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                          Age: {getAge(enfant.dateNaissance)} ans | Sexe: {enfant.sexe === 'M' ? 'Masculin' : 'Feminin'} | Categorie: {enfant.categories?.nom || enfant.categorie?.nom || '-'}
                        </p>
                      </div>
                      <div style={{
                        padding: '0.3rem 0.8rem',
                        background: '#d4edda',
                        color: '#155724',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                      }}>
                        Inscrit
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Entrainements Tab */}
              {activeTab === 'entrainements' && (
                <div>
                  <h3 style={{ marginTop: 0 }}>Planning des entrainements</h3>
                  {entrainements.length > 0 ? (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid #eee' }}>
                          <th style={{ padding: '0.8rem', textAlign: 'left' }}>Titre</th>
                          <th style={{ padding: '0.8rem', textAlign: 'left' }}>Date & Heure</th>
                          <th style={{ padding: '0.8rem', textAlign: 'left' }}>Duree</th>
                          <th style={{ padding: '0.8rem', textAlign: 'left' }}>Lieu</th>
                          <th style={{ padding: '0.8rem', textAlign: 'left' }}>Categorie</th>
                        </tr>
                      </thead>
                      <tbody>
                        {entrainements.map(e => (
                          <tr key={e.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '0.8rem' }}>{e.titre}</td>
                            <td style={{ padding: '0.8rem' }}>{new Date(e.dateHeure).toLocaleString('fr-FR')}</td>
                            <td style={{ padding: '0.8rem' }}>{e.duree} min</td>
                            <td style={{ padding: '0.8rem' }}>{e.lieu || '-'}</td>
                            <td style={{ padding: '0.8rem' }}>{e.categories?.nom || e.categorie?.nom || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p style={{ color: '#999', textAlign: 'center' }}>Aucun entrainement planifie pour le moment.</p>
                  )}
                </div>
              )}

              {/* Paiements Tab */}
              {activeTab === 'paiements' && (
                <div>
                  <h3 style={{ marginTop: 0 }}>Historique des paiements</h3>
                  {paiements.length > 0 ? (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid #eee' }}>
                          <th style={{ padding: '0.8rem', textAlign: 'left' }}>Enfant</th>
                          <th style={{ padding: '0.8rem', textAlign: 'left' }}>Mois</th>
                          <th style={{ padding: '0.8rem', textAlign: 'left' }}>Montant</th>
                          <th style={{ padding: '0.8rem', textAlign: 'left' }}>Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paiements.map(p => (
                          <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '0.8rem' }}>{p.enfants ? `${p.enfants.prenom} ${p.enfants.nom}` : p.enfant ? `${p.enfant.prenom} ${p.enfant.nom}` : '-'}</td>
                            <td style={{ padding: '0.8rem' }}>{p.mois} {p.annee}</td>
                            <td style={{ padding: '0.8rem' }}>{p.montant} DT</td>
                            <td style={{ padding: '0.8rem' }}>
                              <span style={{
                                padding: '0.3rem 0.6rem',
                                borderRadius: '12px',
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                                background: p.statut === 'PAYE' ? '#d4edda' : p.statut === 'EN_RETARD' ? '#f8d7da' : '#fff3cd',
                                color: p.statut === 'PAYE' ? '#155724' : p.statut === 'EN_RETARD' ? '#721c24' : '#856404',
                              }}>
                                {p.statut === 'PAYE' ? 'Paye' : p.statut === 'EN_RETARD' ? 'En retard' : 'En attente'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p style={{ color: '#999', textAlign: 'center' }}>Aucun paiement enregistre.</p>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ParentDashboard;
