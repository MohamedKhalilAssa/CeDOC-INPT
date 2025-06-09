import React, { useState, useEffect } from "react";
import { getData, postData } from "../../../Helpers/CRUDFunctions"; // adjust path if needed

const DoctorantConferences = () => {
  const [conference, setConference] = useState("");
  const [date, setDate] = useState("");
  const [lieu, setLieu] = useState("");
  const [titre, setTitre] = useState("");
  const [prixIntitule, setPrixIntitule] = useState("");
  const [conferences, setConferences] = useState<any[]>([]);

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const data = await getData<any[]>("/confparticipation/");
        if (Array.isArray(data)) {
          setConferences(data);
        } else {
          console.error("Expected array, got:", data);
        }
      } catch (error) {
        console.error("Failed to fetch conferences:", error);
      }
    };

    fetchConferences();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      conference,
      date: new Date(date).toISOString(),
      lieu,
      titre,
      prixIntitule,
      justificatif: "",
      autresParticipants: "",
      status: "DECLAREE",
    };

    try {
      const created = await postData<any>("/confparticipation/", formData);
      if (created) {
        setConferences([...conferences, created]);
        setConference("");
        setDate("");
        setLieu("");
        setTitre("");
        setPrixIntitule("");
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div>
      <h2>Ajouter une participation à une conférence</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom de la conférence"
          value={conference}
          onChange={(e) => setConference(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Date de la conférence"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Lieu"
          value={lieu}
          onChange={(e) => setLieu(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Titre de la communication"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Prix ou distinctions"
          value={prixIntitule}
          onChange={(e) => setPrixIntitule(e.target.value)}
        />
        <button type="submit">Soumettre</button>
      </form>

      <h3>Mes participations</h3>
      {Array.isArray(conferences) && conferences.length > 0 ? (
        conferences.map((conf: any) => (
          <div key={conf.id} className="border-b py-2">
            <strong>{conf.conference}</strong> —{" "}
            {new Date(conf.date).toLocaleDateString()} à {conf.lieu}
            <p>{conf.titre}</p>
            {conf.prixIntitule && (
              <p>
                <em>Distinction : {conf.prixIntitule}</em>
              </p>
            )}
          </div>
        ))
      ) : (
        <p>Aucune participation trouvée.</p>
      )}
    </div>
  );
};

export default DoctorantConferences;
