import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";

function Aeronaves() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [aeronave, setAeronave] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarAeronave();
  }, [id]);

  const carregarAeronave = async () => {
    try {
      setLoading(true);
      const data = await api.get(`/aeronaves/${id}`);
      setAeronave(data);
    } catch (error) {
      console.error("Erro ao carregar aeronave:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-full w-full">
        <Navbar />
        <div className="h-full w-ful py-29 px-18 flex justify-center items-center">
          <span className="text-xl">Carregando...</span>
        </div>
      </div>
    );
  }

  if (!aeronave) {
    return (
      <div className="h-full w-full">
        <Navbar />
        <div className="h-full w-ful py-29 px-18 flex justify-center items-center">
          <span className="text-xl">Aeronave não encontrada</span>
        </div>
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
                <div className="flex justify-between border-gray-500 p-2">
                  <span>ALCANCE:</span>
                  <span>{aeronave.alcance}</span>
                </div>
              </div>
            </button>

            <div className="bg-slate-300 flex p-8 flex-col text-[1.25rem] font-medium rounded-lg shadow-md">
              <div className="flex justify-between items-center pb-6">
                <h3 className="text-[1.5rem] font-extrabold">PECAS</h3>
                <button
                  onClick={() => navigate("/pecas")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
                >
                  VER MAIS
                </button>
              </div>
            </div>

            <div className="bg-slate-300 flex p-8 flex-col text-[1.25rem] font-medium rounded-lg shadow-md">
              <div className="flex justify-between items-center pb-6">
                <h3 className="text-[1.5rem] font-extrabold">ETAPAS</h3>
                <button
                  onClick={() => navigate("/etapas")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
                >
                  VER MAIS
                </button>
              </div>
            </div>

            <div className="bg-slate-300 flex p-8 flex-col text-[1.25rem] font-medium rounded-lg shadow-md">
              <div className="flex justify-between items-center pb-6">
                <h3 className="text-[1.5rem] font-extrabold">FUNCIONARIOS</h3>
                <button
                  onClick={() => navigate("/funcionariosAeronave")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
                >
                  VER MAIS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aeronaves;
