// src/Pages/EquipesDeRecherchePage.tsx
import { getData } from "@/Helpers/CRUDFunctions";
import appConfig from "@/public/config";
import { PublicSujetWithParticipants } from "@/Types/CandidatureTypes.ts";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

const ResearchTeamsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState<PublicSujetWithParticipants[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getData<PublicSujetWithParticipants[]>(
      appConfig.API_PATHS.CHEFS_EQUIPES.chefsSujets.path
    )
      .then((data) => {
        console.log("🎯 API /chefs-sujets returned:", data);
        setItems(data || []);
      })
      .catch((err) => {
        console.error(err);
        setError("Impossible de charger les données.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filtered = items.filter(
    (item) =>
      // match on sujet title
      item.sujet.intitule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // match on chef name (if any)—we default to empty‐string here
      (item.chef?.nom ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>Chargement…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ÉQUIPES ET SUJETS DE RECHERCHE
          </h1>

          {/* Search */}
          <div className="flex items-center mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher…"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">
                  Sujet
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">
                  Chef d’équipe
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">
                  Professeurs
                </th>
               
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map((item, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 align-top">
                    <div className="text-sm text-gray-900">
                      {item.sujet.intitule}
                    </div>
                  </td>
                  <td className="px-6 py-4 align-top">
                    {item.chef ? `${item.chef.prenom} ${item.chef.nom}` : "—"}
                  </td>
                  <td className="px-6 py-4 align-top">
                    {item.professeurs
                      .map((p) => `${p.prenom} ${p.nom}`)
                      .join(", ") || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer stats */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div>
            Affichage de {filtered.length} sujet{filtered.length > 1 ? "s" : ""}{" "}
            de recherche
          </div>
          <div>Total: {items.length} sujets publics</div>
        </div>
      </div>
    </div>
  );
};

export default ResearchTeamsTable;
