import Navbar from "../components/navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalCadastrarFuncionario from "../components/modals/modalCadastrarFuncionario";

function FuncionariosAdm() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleAddFuncionario = (novaFuncionario) => {
    setFuncionarios([...funcionarios, novaFuncionario]);
  };

  let [funcionarios, setFuncionarios] = useState([
    {
      id: 1,
      nome: "Carlos Silva",
      telefone: "(11) 91234-5678",
      endereco: "Rua A, 123, São Paulo",
      user: "carlos.silva",
      senha: "senha123",
      funcao: "Engenheiro",
    },
    {
      id: 2,
      nome: "Ana Souza",
      telefone: "(21) 99876-5432",
      endereco: "Avenida B, 456, Rio de Janeiro",
      user: "ana.souza",
      senha: "senha456",
      funcao: "Administrador",
    },
  ]);

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
                FUNCIONARIOS - AERONAVE
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white size-fit text-2xl font-medium p-2 cursor-pointer shadow-md hover:bg-blue-500 transition rounded-xl"
              >
                ADICIONAR
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-7 gap-x-20 pb-7">
            {funcionarios.map((funcionario) => (
              <button className="bg-gray-300 flex p-8 cursor-pointer flex-col text-[1.25rem] font-medium rounded-lg shadow-md hover:bg-gray-200 transition">
                <h3 className="text-[1.5rem] pb-6 font-extrabold text-start">
                  {funcionario.nome}
                </h3>

                <div className="w-full border border-gray-500 rounded-lg overflow-hidden">
                  <div className="flex justify-between border-b border-gray-500 p-2 bg-gray-100">
                    <span>TELEFONE:</span>
                    <span>{funcionario.telefone}</span>
                  </div>

                  <div className="flex justify-between border-b border-gray-500 p-2">
                    <span>ENDEREÇO:</span>
                    <span>{funcionario.endereco}</span>
                  </div>

                  <div className="flex justify-between border-b border-gray-500 p-2 bg-gray-100">
                    <span>USER:</span>
                    <span>{funcionario.user}</span>
                  </div>

                  <div className="flex justify-between p-2">
                    <span>FUNÇÃO:</span>
                    <span>{funcionario.funcao}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <ModalCadastrarFuncionario
            open={showModal}
            onClose={() => setShowModal(false)}
            onSave={handleAddFuncionario}
          />
        </div>
      </div>
    </div>
  );
}

export default FuncionariosAdm;
