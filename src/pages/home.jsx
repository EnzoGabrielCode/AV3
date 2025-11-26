import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { useState } from "react";
import ModalCadastrarAeronave from "../components/modals/modalCadastrarAeronave";

function Home() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

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

  const handleAddAeronave = (novaAeronave) => {
    setAeronaves([...aeronaves, novaAeronave]);
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
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-7 gap-x-20 pb-7">
            {aeronaves.map((aeronave) => (
              <button
                key={aeronave.id}
                className="bg-gray-300 flex p-8 cursor-pointer flex-col text-[1.25rem] font-medium rounded-lg shadow-md hover:bg-gray-200 transition"
                onClick={() => navigate(`/aeronaves/${aeronave.id}`)}
              >
                <h3 className="text-[1.5rem] pb-6 font-extrabold text-start">
                  {aeronave.cod}
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
            ))}
            <button
              onClick={() => setShowModal(true)}
              className="bg-gray-300 flex p-8 cursor-pointer justify-center items-center rounded-lg shadow-md hover:bg-gray-200 transition"
            >
              <img className="w-15" src="/img/iconAdd.png" alt="" />
            </button>
          </div>
          <ModalCadastrarAeronave
            open={showModal}
            onClose={() => setShowModal(false)}
            onSave={handleAddAeronave}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
