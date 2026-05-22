import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

interface Categorie {
  id: number;
  nom: string;
  ageMin: number;
  ageMax: number;
  description: string;
}

interface Enfant {
  id: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  sexe: string;
  parentId: number;
  categorieId: number;
  categories?: { nom: string };
  categorie?: { nom: string };
}

interface Entrainement {
  id: number;
  titre: string;
  description: string;
  dateHeure: string;
  duree: number;
  lieu: string;
  categorieId: number;
  categories?: { nom: string };
  categorie?: { nom: string };
}

interface Paiement {
  id: number;
  montant: number;
  mois: string;
  annee: number;
  statut: string;
  methode: string;
  enfantId: number;
  parentId: number;
  enfants?: { nom: string; prenom: string };
  enfant?: { nom: string; prenom: string };
}

interface Stats {
  totalParents: number;
  totalEnfants: number;
  totalEntrainements: number;
  paiements: { total: number; paye: number; enAttente: number; enRetard: number };
}

type TabType = 'dashboard' | 'parents' | 'enfants' | 'entrainements' | 'paiements' | 'categories';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [parents, setParents] = useState<User[]>([]);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [enfants, setEnfants] = useState<Enfant[]>([]);
  const [entrainements, setEntrainements] = useState<Entrainement[]>([]);
  const [paiements, setPaiements] = useState<Paiement[]>([]);
  const [message, setMessage] = useState('');

  // Forms
  const [showParentForm, setShowParentForm] = useState(false);
  const [newParent, setNewParent] = useState({ name: '', email: '', password: '' });
  const [showEnfantForm, setShowEnfantForm] = useState(false);
  const [newEnfant, setNewEnfant] = useState({ nom: '', prenom: '', dateNaissance: '', sexe: 'M', parentId: '', categorieId: '' });
  const [showEntrainementForm, setShowEntrainementForm] = useState(false);
  const [newEntrainement, setNewEntrainement] = useState({ titre: '', description: '', dateHeure: '', duree: '90', lieu: '', categorieId: '' });
  const [showPaiementForm, setShowPaiementForm] = useState(false);
  const [newPaiement, setNewPaiement] = useState({ montant: '', mois: '', annee: new Date().getFullYear().toString(), statut: 'EN_ATTENTE', methode: '', enfantId: '', parentId: '' });
  const [showCategorieForm, setShowCategorieForm] = useState(false);
  const [newCategorie, setNewCategorie] = useState({ nom: '', ageMin: '', ageMax: '', description: '' });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
    loadAllData();
  }, []);

  const getHeaders = () => {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  };

  const loadAllData = async () => {
    try {
      const [statsRes, parentsRes, catsRes, enfantsRes, entraRes, paiRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/stats`).catch(() => ({ data: { stats: null } })),
        axios.get(`${API_BASE_URL}/auth/parents`, { headers: getHeaders() }).catch(() => ({ data: { parents: [] } })),
        axios.get(`${API_BASE_URL}/categories`).catch(() => ({ data: { categories: [] } })),
        axios.get(`${API_BASE_URL}/enfants`).catch(() => ({ data: { enfants: [] } })),
        axios.get(`${API_BASE_URL}/entrainements`).catch(() => ({ data: { entrainements: [] } })),
        axios.get(`${API_BASE_URL}/paiements`).catch(() => ({ data: { paiements: [] } })),
      ]);
      setStats(statsRes.data.stats);
      setParents(parentsRes.data.parents || []);
      setCategories(catsRes.data.categories || catsRes.data || []);
      setEnfants(enfantsRes.data.enfants || enfantsRes.data || []);
      setEntrainements(entraRes.data.entrainements || entraRes.data || []);
      setPaiements(paiRes.data.paiements || paiRes.data || []);
    } catch (error) {
      console.error('Erreur chargement donnees:', error);
    }
  };

  const showMsg = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  // CRUD Parents
  const createParent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/auth/create-parent`, newParent, { headers: getHeaders() });
      showMsg('Parent cree avec succes');
      setNewParent({ name: '', email: '', password: '' });
      setShowParentForm(false);
      loadAllData();
    } catch (error: any) {
      showMsg(error.response?.data?.error || 'Erreur creation');
    }
  };

  const deleteParent = async (id: number) => {
    if (!confirm('Supprimer ce parent ?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/auth/parents/${id}`, { headers: getHeaders() });
      showMsg('Parent supprime');
      loadAllData();
    } catch (error) {
      showMsg('Erreur suppression');
    }
  };

  // CRUD Enfants
  const createEnfant = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/enfants`, {
        ...newEnfant,
        parentId: parseInt(newEnfant.parentId),
        categorieId: parseInt(newEnfant.categorieId),
      }, { headers: getHeaders() });
      showMsg('Enfant ajoute avec succes');
      setNewEnfant({ nom: '', prenom: '', dateNaissance: '', sexe: 'M', parentId: '', categorieId: '' });
      setShowEnfantForm(false);
      loadAllData();
    } catch (error: any) {
      showMsg(error.response?.data?.error || 'Erreur creation');
    }
  };

  const deleteEnfant = async (id: number) => {
    if (!confirm('Supprimer cet enfant ?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/enfants/${id}`, { headers: getHeaders() });
      showMsg('Enfant supprime');
      loadAllData();
    } catch (error) {
      showMsg('Erreur suppression');
    }
  };

  // CRUD Entrainements
  const createEntrainement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/entrainements`, {
        ...newEntrainement,
        duree: parseInt(newEntrainement.duree),
        categorieId: parseInt(newEntrainement.categorieId),
      }, { headers: getHeaders() });
      showMsg('Entrainement cree avec succes');
      setNewEntrainement({ titre: '', description: '', dateHeure: '', duree: '90', lieu: '', categorieId: '' });
      setShowEntrainementForm(false);
      loadAllData();
    } catch (error: any) {
      showMsg(error.response?.data?.error || 'Erreur creation');
    }
  };

  const deleteEntrainement = async (id: number) => {
    if (!confirm('Supprimer cet entrainement ?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/entrainements/${id}`, { headers: getHeaders() });
      showMsg('Entrainement supprime');
      loadAllData();
    } catch (error) {
      showMsg('Erreur suppression');
    }
  };

  // CRUD Paiements
  const createPaiement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/paiements`, {
        ...newPaiement,
        montant: parseFloat(newPaiement.montant),
        annee: parseInt(newPaiement.annee),
        enfantId: parseInt(newPaiement.enfantId),
        parentId: parseInt(newPaiement.parentId),
      }, { headers: getHeaders() });
      showMsg('Paiement enregistre');
      setNewPaiement({ montant: '', mois: '', annee: new Date().getFullYear().toString(), statut: 'EN_ATTENTE', methode: '', enfantId: '', parentId: '' });
      setShowPaiementForm(false);
      loadAllData();
    } catch (error: any) {
      showMsg(error.response?.data?.error || 'Erreur creation');
    }
  };

  const deletePaiement = async (id: number) => {
    if (!confirm('Supprimer ce paiement ?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/paiements/${id}`, { headers: getHeaders() });
      showMsg('Paiement supprime');
      loadAllData();
    } catch (error) {
      showMsg('Erreur suppression');
    }
  };

  const updatePaiementStatut = async (id: number, statut: string) => {
    try {
      await axios.put(`${API_BASE_URL}/paiements/${id}`, { statut }, { headers: getHeaders() });
      showMsg('Statut mis a jour');
      loadAllData();
    } catch (error) {
      showMsg('Erreur mise a jour');
    }
  };

  // CRUD Categories
  const createCategorie = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/categories`, {
        ...newCategorie,
        ageMin: parseInt(newCategorie.ageMin),
        ageMax: parseInt(newCategorie.ageMax),
      }, { headers: getHeaders() });
      showMsg('Categorie creee');
      setNewCategorie({ nom: '', ageMin: '', ageMax: '', description: '' });
      setShowCategorieForm(false);
      loadAllData();
    } catch (error: any) {
      showMsg(error.response?.data?.error || 'Erreur creation');
    }
  };

  const deleteCategorie = async (id: number) => {
    if (!confirm('Supprimer cette categorie ?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/categories/${id}`, { headers: getHeaders() });
      showMsg('Categorie supprimee');
      loadAllData();
    } catch (error) {
      showMsg('Erreur suppression');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const tabStyle = (tab: TabType) => ({
    padding: '0.8rem 1.2rem',
    border: 'none',
    borderBottom: activeTab === tab ? '3px solid #dc3545' : '3px solid transparent',
    background: activeTab === tab ? 'rgba(220, 53, 69, 0.1)' : 'transparent',
    color: activeTab === tab ? '#dc3545' : '#666',
    cursor: 'pointer',
    fontWeight: activeTab === tab ? 'bold' as const : 'normal' as const,
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
  });

  const cardStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    marginBottom: '1rem',
  };

  const btnPrimary: React.CSSProperties = {
    background: 'linear-gradient(135deg, #dc3545, #c82333)',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  const btnDanger: React.CSSProperties = {
    background: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '0.4rem 0.8rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.8rem',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.6rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '0.9rem',
    marginBottom: '0.8rem',
    boxSizing: 'border-box',
  };

  const mois = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];

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
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Academie Handball Tebourba</h1>
          <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.9 }}>Tableau de bord administrateur</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>{user?.name}</span>
          <button onClick={logout} style={{ ...btnPrimary, background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}>
            Deconnexion
          </button>
        </div>
      </header>

      {/* Message notification */}
      {message && (
        <div style={{
          background: message.includes('Erreur') ? '#f8d7da' : '#d4edda',
          color: message.includes('Erreur') ? '#721c24' : '#155724',
          padding: '0.8rem 2rem',
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
          {message}
        </div>
      )}

      {/* Tabs */}
      <nav style={{ background: 'white', display: 'flex', gap: '0.5rem', padding: '0 2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflowX: 'auto' }}>
        <button onClick={() => setActiveTab('dashboard')} style={tabStyle('dashboard')}>Tableau de bord</button>
        <button onClick={() => setActiveTab('parents')} style={tabStyle('parents')}>Parents</button>
        <button onClick={() => setActiveTab('enfants')} style={tabStyle('enfants')}>Enfants</button>
        <button onClick={() => setActiveTab('categories')} style={tabStyle('categories')}>Categories</button>
        <button onClick={() => setActiveTab('entrainements')} style={tabStyle('entrainements')}>Entrainements</button>
        <button onClick={() => setActiveTab('paiements')} style={tabStyle('paiements')}>Paiements</button>
      </nav>

      <main style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>

        {/* ===== DASHBOARD TAB ===== */}
        {activeTab === 'dashboard' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ ...cardStyle, textAlign: 'center', borderLeft: '4px solid #dc3545' }}>
                <h3 style={{ color: '#dc3545', fontSize: '2rem', margin: '0' }}>{stats?.totalParents || parents.length}</h3>
                <p style={{ color: '#666', margin: '0.5rem 0 0' }}>Parents</p>
              </div>
              <div style={{ ...cardStyle, textAlign: 'center', borderLeft: '4px solid #28a745' }}>
                <h3 style={{ color: '#28a745', fontSize: '2rem', margin: '0' }}>{stats?.totalEnfants || enfants.length}</h3>
                <p style={{ color: '#666', margin: '0.5rem 0 0' }}>Enfants</p>
              </div>
              <div style={{ ...cardStyle, textAlign: 'center', borderLeft: '4px solid #007bff' }}>
                <h3 style={{ color: '#007bff', fontSize: '2rem', margin: '0' }}>{stats?.totalEntrainements || entrainements.length}</h3>
                <p style={{ color: '#666', margin: '0.5rem 0 0' }}>Entrainements</p>
              </div>
              <div style={{ ...cardStyle, textAlign: 'center', borderLeft: '4px solid #ffc107' }}>
                <h3 style={{ color: '#ffc107', fontSize: '2rem', margin: '0' }}>{stats?.paiements?.paye || 0}</h3>
                <p style={{ color: '#666', margin: '0.5rem 0 0' }}>Paiements effectues</p>
              </div>
            </div>
            <div style={cardStyle}>
              <h3 style={{ color: '#333', marginTop: 0 }}>Resume des paiements</h3>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div><span style={{ color: '#28a745', fontWeight: 'bold' }}>Payes:</span> {stats?.paiements?.paye || 0}</div>
                <div><span style={{ color: '#ffc107', fontWeight: 'bold' }}>En attente:</span> {stats?.paiements?.enAttente || 0}</div>
                <div><span style={{ color: '#dc3545', fontWeight: 'bold' }}>En retard:</span> {stats?.paiements?.enRetard || 0}</div>
              </div>
            </div>
          </div>
        )}

        {/* ===== PARENTS TAB ===== */}
        {activeTab === 'parents' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ margin: 0 }}>Gestion des Parents ({parents.length})</h2>
              <button onClick={() => setShowParentForm(!showParentForm)} style={btnPrimary}>
                {showParentForm ? 'Annuler' : '+ Nouveau Parent'}
              </button>
            </div>

            {showParentForm && (
              <div style={cardStyle}>
                <h3 style={{ marginTop: 0 }}>Creer un compte parent</h3>
                <form onSubmit={createParent}>
                  <input style={inputStyle} placeholder="Nom complet" value={newParent.name} onChange={e => setNewParent({ ...newParent, name: e.target.value })} required />
                  <input style={inputStyle} type="email" placeholder="Email" value={newParent.email} onChange={e => setNewParent({ ...newParent, email: e.target.value })} required />
                  <input style={inputStyle} type="password" placeholder="Mot de passe" value={newParent.password} onChange={e => setNewParent({ ...newParent, password: e.target.value })} required />
                  <button type="submit" style={btnPrimary}>Creer le compte</button>
                </form>
              </div>
            )}

            <div style={cardStyle}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #eee' }}>
                    <th style={{ padding: '0.8rem', textAlign: 'left' }}>Nom</th>
                    <th style={{ padding: '0.8rem', textAlign: 'left' }}>Email</th>
                    <th style={{ padding: '0.8rem', textAlign: 'left' }}>Date inscription</th>
                    <th style={{ padding: '0.8rem', textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {parents.map(parent => (
                    <tr key={parent.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '0.8rem' }}>{parent.name}</td>
                      <td style={{ padding: '0.8rem' }}>{parent.email}</td>
                      <td style={{ padding: '0.8rem' }}>{new Date(parent.createdAt).toLocaleDateString('fr-FR')}</td>
                      <td style={{ padding: '0.8rem', textAlign: 'center' }}>
                        <button onClick={() => deleteParent(parent.id)} style={btnDanger}>Supprimer</button>
                      </td>
                    </tr>
                  ))}
                  {parents.length === 0 && (
                    <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>Aucun parent enregistre</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===== ENFANTS TAB ===== */}
        {activeTab === 'enfants' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ margin: 0 }}>Gestion des Enfants ({enfants.length})</h2>
              <button onClick={() => setShowEnfantForm(!showEnfantForm)} style={btnPrimary}>
                {showEnfantForm ? 'Annuler' : '+ Nouvel Enfant'}
              </button>
            </div>

            {showEnfantForm && (
              <div style={cardStyle}>
                <h3 style={{ marginTop: 0 }}>Inscrire un enfant</h3>
                <form onSubmit={createEnfant}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <input style={inputStyle} placeholder="Nom" value={newEnfant.nom} onChange={e => setNewEnfant({ ...newEnfant, nom: e.target.value })} required />
                    <input style={inputStyle} placeholder="Prenom" value={newEnfant.prenom} onChange={e => setNewEnfant({ ...newEnfant, prenom: e.target.value })} required />
                    <input style={inputStyle} type="date" value={newEnfant.dateNaissance} onChange={e => setNewEnfant({ ...newEnfant, dateNaissance: e.target.value })} required />
                    <select style={inputStyle} value={newEnfant.sexe} onChange={e => setNewEnfant({ ...newEnfant, sexe: e.target.value })}>
                      <option value="M">Masculin</option>
                      <option value="F">Feminin</option>
                    </select>
                    <select style={inputStyle} value={newEnfant.parentId} onChange={e => setNewEnfant({ ...newEnfant, parentId: e.target.value })} required>
                      <option value="">-- Selectionner le parent --</option>
                      {parents.map(p => <option key={p.id} value={p.id}>{p.name} ({p.email})</option>)}
                    </select>
                    <select style={inputStyle} value={newEnfant.categorieId} onChange={e => setNewEnfant({ ...newEnfant, categorieId: e.target.value })} required>
                      <option value="">-- Selectionner la categorie --</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.nom} ({c.ageMin}-{c.ageMax} ans)</option>)}
                    </select>
                  </div>
                  <button type="submit" style={btnPrimary}>Inscrire</button>
                </form>
              </div>
            )}

            <div style={cardStyle}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #eee' }}>
                    <th style={{ padding: '0.8rem', textAlign: 'left' }}>Nom</th>
                    <th style={{ padding: '0.8rem', textAlign: 'left' }}>Prenom</th>
                    <th style={{ padding: '0.8rem', textAlign: 'left' }}>Date de naissance</th>
                    <th style={{ padding: '0.8rem', textAlign: 'left' }}>Sexe</th>
                    <th style={{ padding: '0.8rem', textAlign: 'left' }}>Categorie</th>
                    <th style={{ padding: '0.8rem', textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enfants.map(enfant => (
                    <tr key={enfant.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '0.8rem' }}>{enfant.nom}</td>
                      <td style={{ padding: '0.8rem' }}>{enfant.prenom}</td>
                      <td style={{ padding: '0.8rem' }}>{new Date(enfant.dateNaissance).toLocaleDateString('fr-FR')}</td>
                      <td style={{ padding: '0.8rem' }}>{enfant.sexe === 'M' ? 'Masculin' : 'Feminin'}</td>
                      <td style={{ padding: '0.8rem' }}>{enfant.categories?.nom || enfant.categorie?.nom || '-'}</td>
                      <td style={{ padding: '0.8rem', textAlign: 'center' }}>
                        <button onClick={() => deleteEnfant(enfant.id)} style={btnDanger}>Supprimer</button>
                      </td>
                    </tr>
                  ))}
                  {enfants.length === 0 && (
                    <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>Aucun enfant inscrit</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===== CATEGORIES TAB ===== */}
        {activeTab === 'categories' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ margin: 0 }}>Gestion des Categories ({categories.length})</h2>
              <button onClick={() => setShowCategorieForm(!showCategorieForm)} style={btnPrimary}>
                {showCategorieForm ? 'Annuler' : '+ Nouvelle Categorie'}
              </button>
            </div>

            {showCategorieForm && (
              <div style={cardStyle}>
                <h3 style={{ marginTop: 0 }}>Creer une categorie</h3>
                <form onSubmit={createCategorie}>
                  <input style={inputStyle} placeholder="Nom (ex: U10)" value={newCategorie.nom} onChange={e => setNewCategorie({ ...newCategorie, nom: e.target.value })} required />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <input style={inputStyle} type="number" placeholder="Age minimum" value={newCategorie.ageMin} onChange={e => setNewCategorie({ ...newCategorie, ageMin: e.target.value })} required />
                    <input style={inputStyle} type="number" placeholder="Age maximum" value={newCategorie.ageMax} onChange={e => setNewCategorie({ ...newCategorie, ageMax: e.target.value })} required />
                  </div>
                  <input style={inputStyle} placeholder="Description" value={newCategorie.description} onChange={e => setNewCategorie({ ...newCategorie, description: e.target.value })} />
                  <button type="submit" style={btnPrimary}>Creer</button>
                </form>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              {categories.map(cat => (
                <div key={cat.id} style={{ ...cardStyle, borderLeft: '4px solid #dc3545' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, color: '#dc3545' }}>{cat.nom}</h3>
                    <button onClick={() => deleteCategorie(cat.id)} style={btnDanger}>Supprimer</button>
                  </div>
                  <p style={{ color: '#666', margin: '0.5rem 0' }}>{cat.ageMin} - {cat.ageMax} ans</p>
                  <p style={{ color: '#999', margin: 0, fontSize: '0.85rem' }}>{cat.description}</p>
                </div>
              ))}
              {categories.length === 0 && (
                <div style={{ ...cardStyle, textAlign: 'center', color: '#999' }}>Aucune categorie</div>
              )}
            </div>
          </div>
        )}

        {/* ===== ENTRAINEMENTS TAB ===== */}
        {activeTab === 'entrainements' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ margin: 0 }}>Gestion des Entrainements ({entrainements.length})</h2>
              <button onClick={() => setShowEntrainementForm(!showEntrainementForm)} style={btnPrimary}>
                {showEntrainementForm ? 'Annuler' : '+ Nouvel Entrainement'}
              </button>
            </div>

            {showEntrainementForm && (
              <div style={cardStyle}>
                <h3 style={{ marginTop: 0 }}>Planifier un entrainement</h3>
                <form onSubmit={createEntrainement}>
                  <input style={inputStyle} placeholder="Titre" value={newEntrainement.titre} onChange={e => setNewEntrainement({ ...newEntrainement, titre: e.target.value })} required />
                  <input style={inputStyle} placeholder="Description" value={newEntrainement.description} onChange={e => setNewEntrainement({ ...newEntrainement, description: e.target.value })} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <input style={inputStyle} type="datetime-local" value={newEntrainement.dateHeure} onChange={e => setNewEntrainement({ ...newEntrainement, dateHeure: e.target.value })} required />
                    <input style={inputStyle} type="number" placeholder="Duree (min)" value={newEntrainement.duree} onChange={e => setNewEntrainement({ ...newEntrainement, duree: e.target.value })} required />
                    <input style={inputStyle} placeholder="Lieu" value={newEntrainement.lieu} onChange={e => setNewEntrainement({ ...newEntrainement, lieu: e.target.value })} />
                    <select style={inputStyle} value={newEntrainement.categorieId} onChange={e => setNewEntrainement({ ...newEntrainement, categorieId: e.target.value })} required>
                      <option value="">-- Categorie --</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
                    </select>
                  </div>
                  <button type="submit" style={btnPrimary}>Planifier</button>
                </form>
              </div>
            )}

            <div style={cardStyle}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #eee' }}>
                    <th style={{ padding: '0.8rem', textAlign: 'left' }}>Titre</th>
                    <th style={{ padding: '0.8rem', textAlign: 'left' }}>Date & Heure</th>
                    <th style={{ padding: '0.8rem', textAlign: 'left' }}>Duree</th>
                    <th style={{ padding: '0.8rem', textAlign: 'left' }}>Lieu</th>
                    <th style={{ padding: '0.8rem', textAlign: 'left' }}>Categorie</th>
                    <th style={{ padding: '0.8rem', textAlign: 'center' }}>Actions</th>
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
                      <td style={{ padding: '0.8rem', textAlign: 'center' }}>
                        <button onClick={() => deleteEntrainement(e.id)} style={btnDanger}>Supprimer</button>
                      </td>
                    </tr>
                  ))}
                  {entrainements.length === 0 && (
                    <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>Aucun entrainement planifie</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===== PAIEMENTS TAB ===== */}
        {activeTab === 'paiements' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ margin: 0 }}>Gestion des Paiements ({paiements.length})</h2>
              <button onClick={() => setShowPaiementForm(!showPaiementForm)} style={btnPrimary}>
                {showPaiementForm ? 'Annuler' : '+ Nouveau Paiement'}
              </button>
            </div>

            {showPaiementForm && (
              <div style={cardStyle}>
                <h3 style={{ marginTop: 0 }}>Enregistrer un paiement</h3>
                <form onSubmit={createPaiement}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <input style={inputStyle} type="number" step="0.01" placeholder="Montant (DT)" value={newPaiement.montant} onChange={e => setNewPaiement({ ...newPaiement, montant: e.target.value })} required />
                    <select style={inputStyle} value={newPaiement.mois} onChange={e => setNewPaiement({ ...newPaiement, mois: e.target.value })} required>
                      <option value="">-- Mois --</option>
                      {mois.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <input style={inputStyle} type="number" placeholder="Annee" value={newPaiement.annee} onChange={e => setNewPaiement({ ...newPaiement, annee: e.target.value })} required />
                    <select style={inputStyle} value={newPaiement.statut} onChange={e => setNewPaiement({ ...newPaiement, statut: e.target.value })}>
                      <option value="EN_ATTENTE">En attente</option>
                      <option value="PAYE">Paye</option>
                      <option value="EN_RETARD">En retard</option>
                    </select>
                    <input style={inputStyle} placeholder="Methode (especes, virement...)" value={newPaiement.methode} onChange={e => setNewPaiement({ ...newPaiement, methode: e.target.value })} />
                    <select style={inputStyle} value={newPaiement.enfantId} onChange={e => {
                      const enfant = enfants.find(en => en.id === parseInt(e.target.value));
                      setNewPaiement({ ...newPaiement, enfantId: e.target.value, parentId: enfant ? enfant.parentId.toString() : '' });
                    }} required>
                      <option value="">-- Enfant --</option>
                      {enfants.map(en => <option key={en.id} value={en.id}>{en.prenom} {en.nom}</option>)}
                    </select>
                  </div>
                  <button type="submit" style={btnPrimary}>Enregistrer</button>
                </form>
              </div>
            )}

            <div style={cardStyle}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #eee' }}>
                    <th style={{ padding: '0.8rem', textAlign: 'left' }}>Enfant</th>
                    <th style={{ padding: '0.8rem', textAlign: 'left' }}>Mois</th>
                    <th style={{ padding: '0.8rem', textAlign: 'left' }}>Annee</th>
                    <th style={{ padding: '0.8rem', textAlign: 'left' }}>Montant</th>
                    <th style={{ padding: '0.8rem', textAlign: 'left' }}>Statut</th>
                    <th style={{ padding: '0.8rem', textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paiements.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '0.8rem' }}>{p.enfants ? `${p.enfants.prenom} ${p.enfants.nom}` : p.enfant ? `${p.enfant.prenom} ${p.enfant.nom}` : '-'}</td>
                      <td style={{ padding: '0.8rem' }}>{p.mois}</td>
                      <td style={{ padding: '0.8rem' }}>{p.annee}</td>
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
                      <td style={{ padding: '0.8rem', textAlign: 'center', display: 'flex', gap: '0.3rem', justifyContent: 'center' }}>
                        {p.statut !== 'PAYE' && (
                          <button onClick={() => updatePaiementStatut(p.id, 'PAYE')} style={{ ...btnPrimary, background: '#28a745', padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}>Marquer paye</button>
                        )}
                        <button onClick={() => deletePaiement(p.id)} style={btnDanger}>Supprimer</button>
                      </td>
                    </tr>
                  ))}
                  {paiements.length === 0 && (
                    <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>Aucun paiement enregistre</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
