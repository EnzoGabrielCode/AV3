import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModalCadastrarEtapa from "../components/modals/modalCadastrarEtapa";
import ModalEditarEtapa from "../components/modals/modalEditarEtapa";
import { api } from "../services/api";

function Etapas() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [showModalCadastro, setShowModalCadastro] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [etapaSelecionada, setEtapaSelecionada] = useState(null);
  const [etapas, setEtapas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      carregarEtapas();
    }
  }, [id]);

  const carregarEtapas = async () => {
    try {
      setLoading(true);
      const data = await api.get(`/etapas/aeronave/${id}`);
      setEtapas(data);
    } catch (error) {
      console.error("Erro ao carregar etapas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEtapa = async (novaEtapa) => {
    try {
      const etapa = await api.post("/etapas", {
        ...novaEtapa,
        aeronaveId: parseInt(id)
      });
      setEtapas([...etapas, etapa]);
      setShowModalCadastro(false);
    } catch (error) {
      console.error("Erro ao adicionar etapa:", error);
    }
  };

  const handleUpdateEtapaStatus = async (etapaId, novoStatus) => {
    try {
      await api.put(`/etapas/${etapaId}`, { status: novoStatus });
      setEtapas(
        etapas.map((etapa) =>
          etapa.id === etapaId ? { ...etapa, status: novoStatus } : etapa
        )
      );
      setShowModalEditar(false);
    } catch (error) {
      console.error("Erro ao atualizar etapa:", error);
    }
  };

  const handleDeleteEtapa = async (etapaId) => {
    try {
      await api.delete(`/etapas/${etapaId}`);
      setEtapas(etapas.filter((etapa) => etapa.id !== etapaId));
    } catch (error) {
      console.error("Erro ao excluir etapa:", error);
    }
  };

  const handleEditClick = (etapa) => {
    setEtapaSelecionada(etapa);
    setShowModalEditar(true);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Concluida":
        return "bg-green-500";
      case "Em Andamento":
        return "bg-yellow-500";
      case "Pendente":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Etapas de Manutenção</h1>
          <button
            onClick={() => setShowModalCadastro(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Nova Etapa
          </button>
        </div>

        {loading ? (
          <div className="text-white text-center">Carregando...</div>
        ) : etapas.length === 0 ? (
          <div className="text-white text-center">Nenhuma etapa cadastrada para esta aeronave.</div>
        ) : (
          <div className="grid gap-4">
            {etapas.map((etapa) => (
              <div
                key={etapa.id}
                className="bg-gray-800 rounded-lg p-4 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-3 h-3 rounded-full ${getStatusClass(
                      etapa.status
                    )}`}
                  />
                  <div>
                    <h3 className="text-white font-semibold">{etapa.nome}</h3>
                    <p className="text-gray-400 text-sm">{etapa.descricao}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(etapa)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteEtapa(etapa.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ModalCadastrarEtapa
        open={showModalCadastro}
        onClose={() => setShowModalCadastro(false)}
        onSave={handleAddEtapa}
      />

      <ModalEditarEtapa
        open={showModalEditar}
        onClose={() => setShowModalEditar(false)}
        onUpdateStatus={handleUpdateEtapaStatus}
        etapa={etapaSelecionada}
      />
    </div>
  );
}

export default Etapas;
