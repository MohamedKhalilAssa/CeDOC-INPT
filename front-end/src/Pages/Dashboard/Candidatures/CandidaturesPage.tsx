// src/Pages/Dashboard/Candidatures/CandidaturesPage.tsx
import DataTable, { Column } from '@/Components/Table/Table';
import { getData, postData } from '@/Helpers/CRUDFunctions';
import appConfig from '@/public/config';
import {
  AlertCircle,
  Eye
} from 'lucide-react';
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

// map backend enum → user-friendly label & badge color
const STATUS_LABELS: Record<CandidatureEnum,string> = {
  SOUMISE: 'Soumise',
  EN_COURS_DE_TRAITEMENT: 'En cours',
  ACCEPTER: 'Acceptée',
  REFUSER: 'Refusée'
};
const STATUS_COLORS: Record<CandidatureEnum,string> = {
  SOUMISE: 'bg-blue-100 text-blue-800',
  EN_COURS_DE_TRAITEMENT: 'bg-yellow-100 text-yellow-800',
  ACCEPTER: 'bg-green-100 text-green-800',
  REFUSER: 'bg-red-100 text-red-800'
};

const CandidaturesPage: React.FC = () => {
  const [data, setData] = useState<Candidature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);
  const [isChef, setIsChef] = useState(false);

  // modal state
  const [modalType, setModalType] = useState<'accept'|'refuse'|null>(null);
  const [selected, setSelected] = useState<Candidature|null>(null);
  const [dateEntretien, setDateEntretien] = useState('');
  const [motif, setMotif] = useState('');

  // initial fetch
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const me = await getData<UtilisateurMini>(
          appConfig.API_PATHS.AUTH.currentUser.path
        );
        setIsChef(me?.roles.includes('CHEF_EQUIPE') ?? false);

        const list = await getData<Candidature[]>(
          appConfig.API_PATHS.CANDIDATURE.accessible.path
        );
        setData(list || []);
      } catch (e) {
        console.error(e);
        setError('Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // open modal
  const openModal = (row: Candidature, type: 'accept'|'refuse') => {
    setSelected(row);
    setModalType(type);
    setDateEntretien('');
    setMotif('');
  };

  // save action
  const handleSave = async () => {
    if (!selected || !modalType) return;
    try {
      if (modalType === 'accept') {
        const body: AccepterCandidatureRequest = { dateEntretien };
        await postData<AccepterCandidatureRequest>(
          appConfig.API_PATHS.CANDIDATURE.accepter.path.replace('{id}', String(selected.id)),
          body
        );
      } else {
        const body: RefuserCandidatureRequest = { motif };
        await postData<RefuserCandidatureRequest>(
          appConfig.API_PATHS.CANDIDATURE.refuser.path.replace('{id}', String(selected.id)),
          body
        );
      }
      // update local state
      setData(ds => ds.map(d =>
        d.id === selected.id
          ? { ...d, statutCandidature: modalType === 'accept' ? 'ACCEPTER' : 'REFUSER' }
          : d
      ));
      setModalType(null);
      setSelected(null);
    } catch (e) {
      console.error(e);
      alert('Erreur lors de l’opération');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-b-2 border-blue-600" />
        <span className="ml-2">Chargement…</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-red-600 flex items-center">
        <AlertCircle className="mr-2" /> {error}
      </div>
    );
  }

  // configure columns
  const columns: Column[] = useMemo(() => [
    {
      key: 'candidat',
      label: 'Candidat',
      render: (_val, row: Candidature) => (
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
            {row.candidat.prenom[0]}{row.candidat.nom[0]}
          </div>
          <div className="ml-3">
            <div>{row.candidat.prenom} {row.candidat.nom}</div>
            <div className="text-sm text-slate-500">{row.candidat.utilisateur.email}</div>
          </div>
        </div>
      ),
      sortable: false
    },
    {
      key: 'statutCandidature',
      label: 'Statut',
      render: (val: CandidatureEnum) => (
        <span className={`px-2 py-1 rounded-full text-xs ${STATUS_COLORS[val]}`}>
          {STATUS_LABELS[val]}
        </span>
      ),
      sortable: true
    },
    {
      key: 'sujets',
      label: 'Sujets',
      render: (_val, row: Candidature) => {
        const list = row.sujets.slice(0,2).map(s => s.intitule).join(', ');
        return row.sujets.length > 2 ? `${list}, +${row.sujets.length-2}` : list;
      }
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_val, row: Candidature) => (
        <div className="flex space-x-2 justify-end">
          <button onClick={() => console.log('View', row.id)}>
            <Eye className="text-blue-600" />
          </button>
          {isChef && row.statutCandidature === 'SOUMISE' && (
            <>
              <button
                onClick={() => openModal(row,'accept')}
                className="px-2 py-1 bg-green-100 rounded"
              >Accepter</button>
              <button
                onClick={() => openModal(row,'refuse')}
                className="px-2 py-1 bg-red-100 rounded"
              >Refuser</button>
            </>
          )}
        </div>
      )
    }
  ], [isChef]);

  return (
    <div className="space-y-6">
      <DataTable
        title="Candidatures"
        subtitle="Gérer les candidatures de doctorat"
        data={data}
        columns={columns}
        searchable
        searchPlaceholder="Rechercher par nom, email ou sujet…"
        itemsPerPage={10}
        loading={loading}
        emptyMessage="Aucune candidature accessible"
      />

      {/* Modal */}
      {modalType && selected && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="mb-4 text-lg font-semibold">
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
