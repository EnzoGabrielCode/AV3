import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalCadastrarPeca from "../components/modals/modalCadastrarPeca";
import ModalEditarPeca from "../components/modals/modalEditarPeca";
import { api } from "../services/api";

function Pecas() {
  const navigate = useNavigate();

  const [showModalCadastro, setShowModalCadastro] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [pecaSelecionada, setPecaSelecionada] = useState(null);
  const [pecas, setPecas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarPecas();
  }, []);

  const carregarPecas = async () => {
    try {
      setLoading(true);
      const data = await api.get("/pecas");
      setPecas(data);
    } catch (error) {
      console.error("Erro ao carregar pecas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPeca = async (novaPeca) => {
    try {
      const peca = await api.post("/pecas", novaPeca);
      setPecas([...pecas, peca]);
      setShowModalCadastro(false);
    } catch (error) {
      console.error("Erro ao cadastrar peca:", error);
    }
  };

  const handleOpenModalEditar = (peca) => {
    setPecaSelecionada(peca);
    setShowModalEditar(true);
  };

  const handleUpdatePecaStatus = async (pecaId, novoStatus) => {
    try {
      await api.put(`/pecas/${pecaId}`, { status: novoStatus });
      setPecas((pecasAtuais) =>
        pecasAtuais.map((peca) =>
          peca.id === pecaId ? { ...peca, status: novoStatus } : peca
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  return (
    <div className="h-full w-full">
      <Navbar />
      <div className="h-full w-ful py-29 px-18">
        <div className="flex flex-col gap-6 h-full w-full">
          <div className="flex justify-between">
            <div className="flex flex-row gap-6">
              <button
                onClick={() => {
                  navigate(-1);
                }}
                className="bg-slate-400 p-2 w-12 rounded-lg cursor-pointer shadow-md hover:bg-slate-300 transition"
              >
                <img src="/img/iconBack.png" alt="Voltar" />
              </button>
              <div className="bg-slate-400 size-fit text-2xl shadow-md font-medium p-2 rounded-lg">
                PECAS - AERONAVE
              </div>
            </div>
            <button
              onClick={() => setShowModalCadastro(true)}
              className="size-fit text-2xl font-medium p-2 px-6 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-500 transition cursor-pointer"
            >
              ADICIONAR
            </button>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <span className="text-xl">Carregando...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-7 gap-x-20 pb-7">
              {pecas.map((peca) => (
                <button
                  key={peca.id}
                  onClick={() => handleOpenModalEditar(peca)}
                  className="bg-gray-300 flex p-8 cursor-pointer flex-col text-[1.25rem] font-medium rounded-lg shadow-md hover:bg-gray-200 transition"
                >
                  <h3 className="text-[1.5rem] pb-6 font-extrabold text-start">
                    {peca.nome}
                  </h3>
                  <div className="w-full border border-gray-500 rounded-lg overflow-hidden">
                    <div className="flex justify-between border-b border-gray-500 p-2 bg-gray-100">
                      <span>TIPO:</span>
                      <span>{peca.tipo}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-500 p-2">
                      <span>FORNECEDOR:</span>
                      <span>{peca.fornecedor}</span>
                    </div>
                    <div className="flex justify-between border-gray-500 p-2 bg-gray-100">
                      <span>STATUS:</span>
                      <span className="uppercase">{peca.status}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <ModalCadastrarPeca
          open={showModalCadastro}
          onClose={() => setShowModalCadastro(false)}
          onSave={handleAddPeca}
        />

        <ModalEditarPeca
          open={showModalEditar}
          onClose={() => setShowModalEditar(false)}
          onUpdateStatus={handleUpdatePecaStatus}
          peca={pecaSelecionada}
        />
      </div>
    </div>
  );
}

export default Pecas;
