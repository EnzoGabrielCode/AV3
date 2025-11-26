import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import ModalCadastrarAeronave from "../components/modals/modalCadastrarAeronave";
import { api } from "../services/api";

function HomeAdm() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [aeronaves, setAeronaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarAeronaves();
  }, []);

  const carregarAeronaves = async () => {
    try {
      setLoading(true);
      const data = await api.get("/aeronaves");
      setAeronaves(data);
    } catch (error) {
      console.error("Erro ao carregar aeronaves:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAeronave = async (novaAeronave) => {
    try {
      const aeronave = await api.post("/aeronaves", novaAeronave);
      setAeronaves([...aeronaves, aeronave]);
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao cadastrar aeronave:", error);
      alert("Erro ao cadastrar aeronave");
    }
  };

  return (
    <div className="h-full w-full">
      <Navbar />
      <div className="h-full w-ful py-29 px-18">
        <div className="flex flex-col gap-6 h-full w-full">
          <div className="flex flex-row gap-6">
            <button className="bg-slate-400 size-fit text-2xl font-medium p-2 shadow-md rounded-lg">
              AERONAVES
            </button>
            <button
              onClick={() => {
                navigate("/funcionariosAdm");
              }}
              className="bg-slate-400 size-fit text-2xl font-medium p-2 shadow-md rounded-lg hover:bg-slate-300 transition cursor-pointer"
            >
              FUNCIONÁRIOS
            </button>
          </div>
          <div className="flex flex-row flex-wrap gap-6">
            {loading ? (
              <p>Carregando...</p>
            ) : (
              aeronaves.map((aeronave) => (
                <div
                  key={aeronave.id}
                  onClick={() => {
                    navigate(`/aeronaves/${aeronave.id}`);
                  }}
                  className="bg-slate-300 size-fit p-4 flex flex-col gap-2 shadow-md rounded-lg hover:bg-slate-200 cursor-pointer transition"
                >
                  <span className="font-bold text-xl">{aeronave.cod}</span>
                  <table>
                    <tbody>
                      <tr>
                        <td className="border border-black px-2">MODELO:</td>
                        <td className="border border-black px-2">
                          {aeronave.modelo}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-black px-2">TIPO:</td>
                        <td className="border border-black px-2">
                          {aeronave.tipo}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-black px-2">CAPACIDADE:</td>
                        <td className="border border-black px-2">
                          {aeronave.capacidade}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-black px-2">ALCANCE:</td>
                        <td className="border border-black px-2">
                          {aeronave.alcance}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))
            )}
            <div
              onClick={() => {
                setShowModal(true);
              }}
              className="bg-slate-300 w-50 h-50 flex justify-center items-center shadow-md rounded-lg hover:bg-slate-200 cursor-pointer transition"
            >
              <span className="text-6xl font-bold border-3 rounded-full border-black w-15 h-15 flex items-center justify-center">
                +
              </span>
            </div>
          </div>
        </div>
      </div>
      <ModalCadastrarAeronave
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleAddAeronave}
      />
    </div>
  );
}

export default HomeAdm;
