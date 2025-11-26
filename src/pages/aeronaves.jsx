import Navbar from "../components/navbar";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Aeronaves() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [aeronaves, setAeronaves] = useState([
    {
      id: 1,
      cod: "PT-ABC",
      modelo: "Cessna 172",
      tipo: "militar",
      capacidade: 4,
      alcance: 1289,
    },
    {
      id: 2,
      cod: "PT-DEF",
      modelo: "Boeing 737",
      tipo: "comercial",
      capacidade: 189,
      alcance: 6570,
    },
    {
      id: 3,
      cod: "PT-GHI",
      modelo: "Airbus A320",
      tipo: "comercial",
      capacidade: 180,
      alcance: 6150,
    },
  ]);

  const aeronave = aeronaves.find((a) => a.id === parseInt(id));

  let [pecas, setPecas] = useState([]);
  const [etapas, setEtapas] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);

  if (!aeronave) {
    return (
      <div className="h-full w-full">
        <Navbar />
        <div className="p-10 text-xl">Aeronave não encontrada.</div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <Navbar />
      <div className="h-full w-ful py-29 px-18">
        <div className="flex flex-col gap-6 h-full w-full">
          <div className="flex flex-row gap-6 justify-between">
            <div className="flex flex-row gap-6">
              <button
                onClick={() => {
                  navigate(-1);
                }}
                className="bg-slate-400 rounded-lg p-2 w-12 cursor-pointer shadow-md hover:bg-slate-300 transition"
              >
                <img src="/img/iconBack.png" alt="" />
              </button>
              <div className="bg-slate-400 size-fit text-2xl shadow-md font-medium p-2 rounded-xl">
                AERONAVE {aeronave.cod}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-y-7 gap-x-20 pb-7">
            <button className="bg-gray-300 flex p-8 flex-col text-[1.25rem] font-medium rounded-lg shadow-md">
              <h3 className="text-[1.5rem] pb-6 font-extrabold text-start">
                DETALHES
              </h3>

              <div className="w-full border border-gray-500 rounded-lg overflow-hidden">
                <div className="flex justify-between border-b border-gray-500 p-2 bg-gray-100">
                  <span>MODELO:</span>
                  <span>{aeronave.modelo}</span>
                </div>

                <div className="flex justify-between border-b border-gray-500 p-2">
                  <span>TIPO:</span>
                  <span>{aeronave.tipo}</span>
                </div>

                <div className="flex justify-between border-b border-gray-500 p-2 bg-gray-100">
                  <span>CAPACIDADE:</span>
                  <span>{aeronave.capacidade}</span>
                </div>

                <div className="flex justify-between p-2">
                  <span>ALCANCE:</span>
                  <span>{aeronave.alcance}</span>
                </div>
              </div>
            </button>
            <button className="bg-gray-300 flex p-8 flex-col text-[1.25rem] font-medium rounded-lg shadow-md">
              <div className="flex justify-between place-items-center pb-6">
                <h3 className="text-[1.5rem] pb-6 font-extrabold text-start">
                  PEÇAS
                </h3>
                <button
                  onClick={() => {
                    navigate(`/pecas`);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-500 transition cursor-pointer"
                >
                  VER MAIS
                </button>
              </div>
              <div className="w-full rounded-lg overflow-hidden flex flex-col gap-2">
                {pecas.slice(0, 4).map((peca, index) => (
                  <div
                    key={index}
                    className="flex justify-between border border-gray-500 p-2 bg-gray-100 rounded-lg"
                  >
                    <span>{peca.nome}</span>
                  </div>
                ))}
              </div>
            </button>
            <div className="bg-gray-300 flex p-8 flex-col text-[1.25rem] font-medium rounded-lg shadow-md">
              <div className="flex justify-between place-items-center pb-6">
                <h3 className="text-[1.5rem] pb-6 font-extrabold text-start">
                  ETAPAS
                </h3>
                <button
                  onClick={() => {
                    navigate(`/etapas`);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-500 transition cursor-pointer"
                >
                  VER MAIS
                </button>
              </div>
              <div className="w-full rounded-lg overflow-hidden flex flex-col gap-2">
                {etapas.slice(0, 4).map((etapa, index) => (
                  <div
                    key={index}
                    className="flex justify-between border border-gray-500 p-2 bg-gray-100 rounded-lg"
                  >
                    <span>{etapa.nome}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-300 flex p-8 flex-col text-[1.25rem] font-medium rounded-lg shadow-md">
              <div className="flex justify-between place-items-center pb-6">
                <h3 className="text-[1.5rem] pb-6 font-extrabold text-start">
                  FUNCIONÁRIOS
                </h3>
                <button
                  onClick={() => {
                    navigate(`/funcionariosAeronave`);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-500 transition cursor-pointer"
                >
                  VER MAIS
                </button>
              </div>
              <div className="w-full rounded-lg overflow-hidden flex flex-col gap-2">
                {funcionarios.slice(0, 4).map((funcionario, index) => (
                  <div
                    key={index}
                    className="flex justify-between border border-gray-500 p-2 bg-gray-100 rounded-lg"
                  >
                    <span>{funcionario.nome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aeronaves;
