import Navbar from "../components/navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalCadastrarEtapa from "../components/modals/modalCadastrarEtapa";
import ModalEditarEtapa from "../components/modals/modalEditarEtapa";

function Etapas() {
  const navigate = useNavigate();

  const [showModalCadastro, setShowModalCadastro] = useState(false);

  const [showModalEditar, setShowModalEditar] = useState(false);
  const [etapaSelecionada, setEtapaSelecionada] = useState(null);

  const [etapas, setEtapas] = useState([
    {
      id: 1,
      nome: "Montagem da fuselagem",
      prazo: "2024-07-15",
      status: "em andamento",
      funcionarios: [],
    },
    {
      id: 2,
      nome: "Instalação dos motores",
      prazo: "2024-08-01",
      status: "pendente",
      funcionarios: [],
    },
  ]);

  const handleAddEtapa = (novaEtapa) => {
    setEtapas([...etapas, novaEtapa]);
  };
  const handleOpenModalEditar = (etapa) => {
    setEtapaSelecionada(etapa);
    setShowModalEditar(true);
  };

  const handleUpdateEtapaStatus = (etapaId, novoStatus) => {
    setEtapas((etapasAtuais) =>
      etapasAtuais.map((etapa) =>
        etapa.id === etapaId ? { ...etapa, status: novoStatus } : etapa
      )
    );
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
                <img src="/img/iconBack.png" alt="" />
              </button>
              <div className="bg-slate-400 size-fit text-2xl shadow-md font-medium p-2 rounded-lg">
                ETAPAS - AERONAVE
              </div>
            </div>
            <button
              onClick={() => setShowModalCadastro(true)}
              className="size-fit text-2xl font-medium p-2 px-6 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-500 transition cursor-pointer"
            >
              ADICIONAR
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-7 gap-x-20 pb-7">
            {etapas.map((etapa) => (
              <button
                key={etapa.id}
                onClick={() => handleOpenModalEditar(etapa)}
                className="bg-gray-300 flex p-8 cursor-pointer flex-col text-[1.25rem] font-medium rounded-lg shadow-md hover:bg-gray-200 transition"
              >
                <h3 className="text-[1.5rem] pb-6 font-extrabold text-start">
                  {etapa.nome}
                </h3>

                <div className="w-full border border-gray-500 rounded-lg overflow-hidden">
                  <div className="flex justify-between border-b border-gray-500 p-2 bg-gray-100">
                    <span>PRAZO:</span>
                    <span>
                      {new Date(etapa.prazo).toLocaleDateString("pt-BR", {
                        timeZone: "UTC",
                      })}
                    </span>
                  </div>

                  <div className="flex justify-between p-2">
                    <span>STATUS:</span>
                    <span className="uppercase">{etapa.status}</span>
                  </div>
                </div>
              </button>
            ))}
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
      </div>
    </div>
  );
}

export default Etapas;
