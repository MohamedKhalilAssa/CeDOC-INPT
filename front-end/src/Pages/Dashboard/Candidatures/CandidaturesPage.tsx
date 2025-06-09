// src/Pages/Dashboard/Candidatures/CandidaturesPage.tsx
import { getData, postData } from "@/Helpers/CRUDFunctions";
import appConfig from "@/public/config";
import { AlertCircle, Eye } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import Badge from "@/Components/DashComps/ui/badge/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/Components/DashComps/ui/table";

type CandidatureEnum =
  | "SOUMISE"
  | "EN_COURS_DE_TRAITEMENT"
  | "ACCEPTER"
  | "REFUSER";

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
interface AccepterCandidatureRequest {
  dateEntretien: string;
}
interface RefuserCandidatureRequest {
  motif: string;
}

const STATUS_LABELS: Record<CandidatureEnum, string> = {
  SOUMISE: "Soumise",
  EN_COURS_DE_TRAITEMENT: "En cours",
  ACCEPTER: "Acceptée",
  REFUSER: "Refusée",
};
const STATUS_COLORS: Record<CandidatureEnum, string> = {
  SOUMISE: "bg-blue-100 text-blue-800",
  EN_COURS_DE_TRAITEMENT: "bg-yellow-100 text-yellow-800",
  ACCEPTER: "bg-green-100 text-green-800",
  REFUSER: "bg-red-100 text-red-800",
};

export default function CandidaturesPage() {
  const [data, setData] = useState<Candidature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isChef, setIsChef] = useState(false);

  // pagination
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage]);

  // modal state
  const [modalType, setModalType] = useState<"accept" | "refuse" | null>(
    null
  );
  const [selected, setSelected] = useState<Candidature | null>(null);
  const [dateEntretien, setDateEntretien] = useState("");
  const [motif, setMotif] = useState("");

  // fetch user + candidatures
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const me = await getData<UtilisateurMini>(
          appConfig.API_PATHS.AUTH.currentUser.path
        );
        setIsChef(me?.roles.includes("CHEF_EQUIPE") ?? false);

        const list = await getData<Candidature[]>(
          appConfig.API_PATHS.CANDIDATURE.accessible.path
        );
        setData(list || []);
      } catch {
        setError("Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const openModal = (row: Candidature, type: "accept" | "refuse") => {
    setSelected(row);
    setModalType(type);
    setDateEntretien("");
    setMotif("");
  };

  const handleSave = async () => {
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
      // update local state
      setData((ds) =>
        ds.map((d) =>
          d.id === selected.id
            ? {
                ...d,
                statutCandidature:
                  modalType === "accept" ? "ACCEPTER" : "REFUSER",
              }
            : d
        )
      );
      setModalType(null);
      setSelected(null);
    } catch {
      alert("Erreur lors de l’opération");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-b-2 border-blue-600" />
        <span className="ml-2">Chargement…</span>
      </div>
    );
  if (error)
    return (
      <div className="text-red-600 flex items-center">
        <AlertCircle className="mr-2" /> {error}
      </div>
    );

  return (
    <div className="space-y-6">
      {/* table wrapper */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader>Candidat</TableCell>
                <TableCell isHeader>Statut</TableCell>
                <TableCell isHeader>Sujets</TableCell>
                <TableCell isHeader className="text-right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {paginated.map((c) => (
                <TableRow key={c.id}>
                  {/* candidate */}
                  <TableCell className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                        {c.candidat.prenom[0]}
                        {c.candidat.nom[0]}
                      </div>
                      <div>
                        <div className="font-medium">
                          {c.candidat.prenom} {c.candidat.nom}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {c.candidat.utilisateur.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* status */}
                  <TableCell className="px-4 py-3">
                    <Badge
                      size="sm"
                      color={
                        c.statutCandidature === "ACCEPTER"
                          ? "success"
                          : c.statutCandidature === "REFUSER"
                          ? "error"
                          : c.statutCandidature === "EN_COURS_DE_TRAITEMENT"
                          ? "warning"
                          : "primary"
                      }
                    >
                      {STATUS_LABELS[c.statutCandidature]}
                    </Badge>
                  </TableCell>

                  {/* sujets */}
                  <TableCell className="px-4 py-3">
                    {c.sujets.slice(0, 2).map((s, i) => (
                      <div key={i} className="truncate">
                        • {s.intitule}
                      </div>
                    ))}
                    {c.sujets.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{c.sujets.length - 2} autre(s)
                      </div>
                    )}
                  </TableCell>

                  {/* actions */}
                  <TableCell className="px-4 py-3 text-right">
                    <button
                      onClick={() => console.log("View", c.id)}
                      className="mr-2 text-blue-600 hover:text-blue-800"
                    >
                      <Eye />
                    </button>
                    {isChef && c.statutCandidature === "SOUMISE" && (
                      <>
                        <button
                          onClick={() => openModal(c, "accept")}
                          className="px-2 py-1 bg-green-100 rounded text-sm"
                        >
                          Accepter
                        </button>
                        <button
                          onClick={() => openModal(c, "refuse")}
                          className="ml-2 px-2 py-1 bg-red-100 rounded text-sm"
                        >
                          Refuser
                        </button>
                      </>
                    )}
                  </TableCell>  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* pagination */}
      <div className="flex items-center justify-between">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* modal */}
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
