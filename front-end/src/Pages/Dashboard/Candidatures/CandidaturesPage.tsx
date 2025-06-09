// src/Pages/Dashboard/Candidatures/CandidaturesPage.tsx
import { getData, postData } from '@/Helpers/CRUDFunctions';
import appConfig from '@/public/config';
import { AlertCircle, Eye, FileText, Search, Users } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';

// raw enum values from backend
type CandidatureEnum = 'SOUMISE' | 'EN_COURS_DE_TRAITEMENT' | 'ACCEPTER' | 'REFUSER';

interface UtilisateurMini {
  email: string;
  roles: string[];
}

interface CandidatMini {
  prenom: string;
  nom: string;
  utilisateur: { email: string };
}

interface SujetMini {
  intitule: string;
}

interface Candidature {
  id: number;
  statutCandidature: CandidatureEnum;
  candidat: CandidatMini;
  sujets: SujetMini[];
}

// request DTOs
interface AccepterCandidatureRequest { dateEntretien: string; }
interface RefuserCandidatureRequest  { motif: string; }

// helpers
const formatStatus = (s: CandidatureEnum): string => {
  switch (s) {
    case 'SOUMISE': return 'Soumise';
    case 'EN_COURS_DE_TRAITEMENT': return 'En cours de traitement';
    case 'ACCEPTER': return 'Acceptée';
    case 'REFUSER': return 'Refusée';
    default: return s;
  }
};
const getStatusColor = (s: CandidatureEnum): string => {
  switch (s) {
    case 'SOUMISE': return 'bg-blue-100 text-blue-800';
    case 'EN_COURS_DE_TRAITEMENT': return 'bg-yellow-100 text-yellow-800';
    case 'ACCEPTER': return 'bg-green-100 text-green-800';
    case 'REFUSER': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const CandidaturesPage: React.FC = () => {
  const [candidatures, setCandidatures] = useState<Candidature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  // chef modal state
  const [isChef, setIsChef] = useState(false);
  const [modalType, setModalType] = useState<'accept'|'refuse'|null>(null);
  const [selected, setSelected] = useState<Candidature|null>(null);
  const [dateEntretien, setDateEntretien] = useState('');
  const [motif, setMotif] = useState('');

  // fetch user roles + candidatures
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // 1) who am I?
        const me = await getData<UtilisateurMini>(
          appConfig.API_PATHS.AUTH.currentUser.path
        );
        setIsChef(me?.roles.includes('CHEF_EQUIPE') ?? false);

        // 2) my candidatures view
        const list = await getData<Candidature[]>(
          appConfig.API_PATHS.CANDIDATURE.accessible.path
        );
        setCandidatures(list || []);
      } catch (e) {
        console.error(e);
        setError('Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // filtered list
  const filtered = useMemo(() => {
    const low = searchTerm.toLowerCase();
    return candidatures.filter(c => {
      const name = `${c.candidat.prenom} ${c.candidat.nom}`.toLowerCase();
      const mail = c.candidat.utilisateur.email.toLowerCase();
      const sujets = c.sujets.map(s=>s.intitule.toLowerCase()).join(' ');
      return name.includes(low)||mail.includes(low)||sujets.includes(low);
    });
  }, [candidatures, searchTerm]);

  // open modal
  const openModal = (c:Candidature, type:'accept'|'refuse') => {
    setSelected(c);
    setModalType(type);
    setDateEntretien('');
    setMotif('');
  };

  // save action
  const handleSave = async () => {
    if (!selected||!modalType) return;
    try {
      if (modalType==='accept') {
        const body:AccepterCandidatureRequest = { dateEntretien };
        await postData<AccepterCandidatureRequest>(
          appConfig.API_PATHS.CANDIDATURE.accepter
            .path.replace('{id}',String(selected.id)),
          body
        );
      } else {
        const body:RefuserCandidatureRequest = { motif };
        await postData<RefuserCandidatureRequest>(
          appConfig.API_PATHS.CANDIDATURE.refuser
            .path.replace('{id}',String(selected.id)),
          body
        );
      }
      // update local status
      setCandidatures(cs =>
        cs.map(c=>c.id===selected.id
          ? { ...c, statutCandidature: modalType==='accept'?'ACCEPTER':'REFUSER' }
          : c
        )
      );
      setModalType(null);
      setSelected(null);
    } catch(e) {
      console.error(e);
      alert('Erreur lors de l’opération');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin h-8 w-8 border-b-2 border-blue-600"/>
      <span className="ml-2">Chargement…</span>
    </div>
  );
  if (error) return (
    <div className="text-red-600">
      <AlertCircle/> {error}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header + Search */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Candidatures</h1>
          <p>Gérer les candidatures de doctorat</p>
        </div>
        <div className="flex items-center space-x-2">
          <Users/><span>{filtered.length} candidature(s)</span>
        </div>
      </div>
      <div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input
            className="pl-10 pr-4 py-2 border rounded-lg w-full"
            placeholder="Rechercher…"
            value={searchTerm}
            onChange={e=>setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      {filtered.length===0 ? (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-slate-400 mb-4"/>
          <h3>Aucune candidature</h3>
        </div>
      ) : (
        <table className="min-w-full divide-y">
          <thead><tr>
            <th>Candidat</th>
            <th>Statut</th>
            <th>Sujets</th>
            <th>Actions</th>
          </tr></thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={c.id} className={i%2? 'bg-slate-50':'bg-white'}>
                <td className="px-4 py-2">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                      {c.candidat.prenom[0]}{c.candidat.nom[0]}
                    </div>
                    <div className="ml-3">
                      <div>{c.candidat.prenom} {c.candidat.nom}</div>
                      <div className="text-sm text-slate-500">{c.candidat.utilisateur.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <span className={`${getStatusColor(c.statutCandidature)} px-2 py-1 rounded-full text-xs`}>
                    {formatStatus(c.statutCandidature)}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {c.sujets.slice(0,2).map((s,i)=>
                    <div key={i} className="truncate">{s.intitule}</div>
                  )}
                  {c.sujets.length>2 && <div>+{c.sujets.length-2} autres</div>}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button onClick={()=>console.log('View',c.id)}>
                    <Eye className="text-blue-600"/>
                  </button>
                  {isChef && c.statutCandidature==='SOUMISE' && (
                    <>
                      <button
                        onClick={()=>openModal(c,'accept')}
                        className="px-2 py-1 bg-green-100 rounded"
                      >Accepter</button>
                      <button
                        onClick={()=>openModal(c,'refuse')}
                        className="px-2 py-1 bg-red-100 rounded"
                      >Refuser</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {modalType && selected && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="mb-4">
              {modalType==='accept' ? 'Accepter la candidature' : 'Refuser la candidature'}
            </h2>
            {modalType==='accept' ? (
              <input
                type="date"
                className="w-full border p-2 mb-4"
                value={dateEntretien}
                onChange={e=>setDateEntretien(e.target.value)}
              />
            ) : (
              <textarea
                className="w-full border p-2 mb-4"
                placeholder="Motif de refus"
                value={motif}
                onChange={e=>setMotif(e.target.value)}
              />
            )}
            <div className="flex justify-end space-x-2">
              <button onClick={()=>setModalType(null)}>Annuler</button>
              <button
                onClick={handleSave}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >Sauvegarder</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidaturesPage;
