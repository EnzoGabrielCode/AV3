import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalCadastrarFuncionario from "../components/modals/modalCadastrarFuncionario";
import { api } from "../services/api";

function FuncionariosAdm() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  const carregarFuncionarios = async () => {
    try {
      setLoading(true);
      const data = await api.get("/funcionarios");
      setFuncionarios(data);
    } catch (error) {
      console.error("Erro ao carregar funcionarios:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFuncionario = async (novoFuncionario) => {
    try {
      const funcionario = await api.post("/funcionarios", novoFuncionario);
      setFuncionarios([...funcionarios, funcionario]);
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao cadastrar funcionario:", error);
      alert("Erro ao cadastrar funcionario");
    }
  };

  return (
    <div className="h-full w-full">
      <Navbar />
      <div className="h-full w-ful py-29 px-18">
        <div className="flex flex-col gap-6 h-full w-full">
          <div className="flex flex-row gap-6">
            <button
              onClick={() => {
                navigate("/homeAdm");
              }}
              className="bg-slate-400 size-fit text-2xl font-medium p-2 shadow-md rounded-lg hover:bg-slate-300 transition cursor-pointer"
            >
              AERONAVES
            </button>
            <button className="bg-slate-400 size-fit text-2xl font-medium p-2 shadow-md rounded-lg">
              FUNCIONÁRIOS
            </button>
          </div>
          <div className="flex flex-row flex-wrap gap-6">
            {loading ? (
              <p>Carregando...</p>
            ) : (
              funcionarios.map((funcionario) => (
                <div
                  key={funcionario.id}
                  className="bg-slate-300 size-fit p-4 flex flex-col gap-2 shadow-md rounded-lg hover:bg-slate-200 cursor-pointer transition"
                >
                  <span className="font-bold text-xl">{funcionario.nome}</span>
                  <table>
                    <tbody>
                      <tr>
                        <td className="border border-black px-2">FUNÇÃO:</td>
                        <td className="border border-black px-2">
                          {funcionario.funcao || funcionario.role}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-black px-2">EMAIL:</td>
                        <td className="border border-black px-2">
                          {funcionario.email}
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
      <ModalCadastrarFuncionario
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleAddFuncionario}
      />
    </div>
  );
}

export default FuncionariosAdm;
