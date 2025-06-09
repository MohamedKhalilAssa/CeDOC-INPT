// src/Pages/Dashboard/Candidatures/CandidaturesPage.tsx
import Badge from "@/Components/DashComps/ui/badge/Badge";
import ServerSideTable, { Column } from "@/Components/Table/ServerSideTable";
import { getData, postData } from "@/Helpers/CRUDFunctions";
import appConfig from "@/public/config";
import { PaginatedResponse, TableConfig } from "@/Types/GlobalTypes";
import { AlertCircle, Eye } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

type CandidatureEnum = "SOUMISE" | "EN_COURS_DE_TRAITEMENT" | "ACCEPTER" | "REFUSER";

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

interface AccepterCandidatureRequest { dateEntretien: string }
interface RefuserCandidatureRequest  { motif: string }

// Map raw enum → label
const STATUS_LABELS: Record<CandidatureEnum, string> = {
  SOUMISE: "Soumise",
  EN_COURS_DE_TRAITEMENT: "En cours",
  ACCEPTER: "Acceptée",
  REFUSER: "Refusée",
};
// Map raw enum → Badge color prop
const STATUS_VARIANT: Record<CandidatureEnum, "primary" | "warning" | "success" | "error"> = {
  SOUMISE: "primary",
  EN_COURS_DE_TRAITEMENT: "warning",
  ACCEPTER: "success",
  REFUSER: "error",
};

export default function CandidaturesPage() {
  // — Table config/state
  const [config, setConfig] = useState<TableConfig>({
    search: "",
    sortBy: "id",
    sort: "asc",
    filters: {},
    page: 1,
    pageSize: 10,
  });
  const [pageData, setPageData] = useState<PaginatedResponse<Candidature>>({
    content: [],
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    pageSize: config.pageSize,
    isLast: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [isChef, setIsChef]   = useState(false);

  // — Modal state
  const [modalType, setModalType]     = useState<"accept" | "refuse" | null>(null);
  const [selected, setSelected]       = useState<Candidature | null>(null);
  const [dateEntretien, setDateEntretien] = useState("");
  const [motif, setMotif]             = useState("");

  // — Fetch user+data on any config change
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // who am I?
        const me = await getData<UtilisateurMini>(appConfig.API_PATHS.AUTH.currentUser.path);
        setIsChef(me?.roles.includes("CHEF_EQUIPE") ?? false);

        // page request
        const resp = await getData<PaginatedResponse<Candidature>>(
          `${appConfig.API_PATHS.CANDIDATURE.accessible.path}` +
            `?page=${config.page - 1}` +
            `&size=${config.pageSize}` +
            `&sortBy=${config.sortBy}` +
            `&direction=${config.sort}` +
            (config.search
              ? `&search=${encodeURIComponent(config.search)}`
              : "")
        );
        if (resp) setPageData(resp);
      } catch (e) {
        console.error(e);
        setError("Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    })();
  }, [config]);

  // — Open accept/refuse modal
  const openModal = useCallback(
    (row: Candidature, type: "accept" | "refuse") => {
      setSelected(row);
      setModalType(type);
      setDateEntretien("");
      setMotif("");
    },
    []
  );

  // — Send accept/refuse, then refresh
  const handleSave = useCallback(async () => {
    if (!selected || !modalType) return;
    try {
      if (modalType === "accept") {
        await postData<void>(
          appConfig.API_PATHS.CANDIDATURE.accepter.path.replace(
            "{id}",
            String(selected.id)
          ),
          { dateEntretien } as AccepterCandidatureRequest
        );
      } else {
        await postData<void>(
          appConfig.API_PATHS.CANDIDATURE.refuser.path.replace(
            "{id}",
            String(selected.id)
          ),
          { motif } as RefuserCandidatureRequest
        );
      }
      // simply re‐trigger the table fetch
      setConfig((c) => ({ ...c }));
      setModalType(null);
      setSelected(null);
    } catch (e) {
      console.error(e);
      alert("Erreur lors de l’opération");
    }
  }, [selected, modalType, dateEntretien, motif]);

  if (error) {
    return (
      <div className="text-red-600 flex items-center">
        <AlertCircle className="mr-2" />
        {error}
      </div>
    );
  }

  // — Define columns
  const columns: Column[] = useMemo(
    () => [
      {
        key: "candidat",
        label: "Candidat",
        render: (_v, r) => (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
              {r.candidat.prenom[0]}
              {r.candidat.nom[0]}
            </div>
            <div>
              <div className="font-medium">
                {r.candidat.prenom} {r.candidat.nom}
              </div>
              <div className="text-sm text-gray-500">
                {r.candidat.utilisateur.email}
              </div>
            </div>
          </div>
        ),
      },
      {
        key: "statutCandidature",
        label: "Statut",
        sortable: true,
        render: (val: CandidatureEnum) => (
          <Badge size="sm" color={STATUS_VARIANT[val]}>
            {STATUS_LABELS[val]}
          </Badge>
        ),
      },
      {
        key: "sujets",
        label: "Sujets",
        render: (_v, r) => {
          const list = r.sujets
            .slice(0, 2)
            .map((s: SujetMini) => s.intitule)
            .join(", ");
          return r.sujets.length > 2
            ? `${list}, +${r.sujets.length - 2}`
            : list;
        },
      },
      {
        key: "actions",
        label: "Actions",
        render: (_v, r) => (
          <div className="flex justify-end space-x-2">
            <button onClick={() => console.log("View", r.id)}>
              <Eye className="text-blue-600" />
            </button>
            {isChef && r.statutCandidature === "SOUMISE" && (
              <>
                <button
                  onClick={() => openModal(r, "accept")}
                  className="px-2 py-1 bg-green-100 rounded text-sm"
                >
                  Accepter
                </button>
                <button
                  onClick={() => openModal(r, "refuse")}
                  className="px-2 py-1 bg-red-100 rounded text-sm"
                >
                  Refuser
                </button>
              </>
            )}
          </div>
        ),
      },
    ],
    [isChef, openModal]
  );

  return (
    <div className="space-y-6">
      <ServerSideTable
        title="Candidatures"
        subtitle="Gérer les candidatures de doctorat"
        columns={columns}
        data={pageData}
        loading={loading}
        searchable
        searchPlaceholder="Rechercher par nom, email ou sujet…"
        config={config}
        onConfigChange={(delta) => setConfig((c) => ({ ...c, ...delta }))}
        onView={(row) => console.log("View", row.id)}
      />

      {/* Modal */}
      {modalType && selected && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="mb-4 text-lg font-semibold">
              {modalType === "accept"
                ? "Accepter la candidature"
                : "Refuser la candidature"}
            </h2>
            {modalType === "accept" ? (
              <input
                type="date"
                className="w-full border p-2 mb-4"
                value={dateEntretien}
                onChange={(e) => setDateEntretien(e.target.value)}
              />
            ) : (
              <textarea
                className="w-full border p-2 mb-4"
                placeholder="Motif de refus"
                value={motif}
                onChange={(e) => setMotif(e.target.value)}
              />
            )}
            <div className="flex justify-end space-x-2">
              <button onClick={() => setModalType(null)}>Annuler</button>
              <button
                onClick={handleSave}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
