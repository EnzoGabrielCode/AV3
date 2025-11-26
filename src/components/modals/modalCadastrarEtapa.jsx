import Modal from "./modal.jsx";
import { useState, useEffect } from "react";

function ModalCadastrarEtapa({
  open,
  onClose,
  onSave,
  funcionariosDisponiveis = [],
}) {
  const [nome, setNome] = useState("");
  const [prazo, setPrazo] = useState("");
  const [funcionariosSelecionados, setFuncionariosSelecionados] = useState([]);
  const [id, setId] = useState(1);

  useEffect(() => {
    if (open) {
      setNome("");
      setPrazo("");
      setFuncionariosSelecionados([]);
    }
  }, [open]);

  const handleToggleFuncionario = (nomeFuncionario) => {
    setFuncionariosSelecionados((prevSelecionados) =>
      prevSelecionados.includes(nomeFuncionario)
        ? prevSelecionados.filter((f) => f !== nomeFuncionario)
        : [...prevSelecionados, nomeFuncionario]
    );
  };

  const handleSave = () => {
    if (!nome || !prazo) {
      alert(
        "Por favor, preencha todos os campos e selecione ao menos um funcionário."
      );
      return;
    }

    const novaEtapa = {
      id,
      nome,
      prazo,
      status: "pendente",
      funcionarios: funcionariosSelecionados,
    };

    onSave(novaEtapa);
    setId((prev) => prev + 1);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Cadastrar Etapa</h2>

      <div className="flex flex-col gap-5">
        <div>
          <label className="font-medium mb-1 block">Nome da Etapa:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome da etapa"
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <label className="font-medium mb-1 block">Prazo:</label>
          <input
            type="date"
            value={prazo}
            onChange={(e) => setPrazo(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <h3 className="font-medium mb-2">Funcionários Disponíveis:</h3>
          <div className="border rounded-lg p-2 max-h-40 overflow-y-auto bg-gray-50">
            {funcionariosDisponiveis.length === 0 ? (
              <p className="text-gray-500 text-sm text-center">
                Nenhum funcionário disponível.
              </p>
            ) : (
              funcionariosDisponiveis.map((func, index) => (
                <label
                  key={index}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded"
                >
                  <input
                    type="checkbox"
                    checked={funcionariosSelecionados.includes(func)}
                    onChange={() => handleToggleFuncionario(func)}
                  />
                  {func}
                </label>
              ))
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-1 rounded hover:bg-gray-200 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-500 transition"
          >
            Enviar
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalCadastrarEtapa;
