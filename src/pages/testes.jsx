import Navbar from "../components/navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalCadastrarTeste from "../components/modals/modalCadastrarTeste";

function Testes() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleAddTeste = (novoTeste) => {
    setTestes([...testes, novoTeste]);
  };

  const [testes, setTestes] = useState([]);

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
                TESTES - AERONAVE
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="size-fit text-2xl font-medium p-2 px-6 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-500 transition cursor-pointer"
            >
              ADICIONAR
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-7 gap-x-20 pb-7">
            {testes.map((teste) => (
              <button className="bg-gray-300 flex p-8 cursor-pointer flex-col text-[1.25rem] font-medium rounded-lg shadow-md hover:bg-gray-200 transition">
                <h3 className="text-[1.5rem] pb-6 font-extrabold text-start">
                  TESTE - {teste.id}
                </h3>

                <div className="w-full border border-gray-500 rounded-lg overflow-hidden">
                  <div className="flex justify-between border-b border-gray-500 p-2 bg-gray-100">
                    <span>TIPO:</span>
                    <span>{teste.tipo}</span>
                  </div>

                  <div className="flex justify-between p-2">
                    <span>RESULTADO:</span>
                    <span>{teste.resultado}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <ModalCadastrarTeste
            open={showModal}
            onClose={() => setShowModal(false)}
            onSave={handleAddTeste}
          />
        </div>
      </div>
    </div>
  );
}

export default Testes;
