import Modal from "./modal.jsx";
import { useState, useEffect } from "react";

function ModalCadastrarPeca({ open, onClose, onSave }) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [status, setStatus] = useState("");
  const [id, setId] = useState(1);

  useEffect(() => {
    if (open) {
      setNome("");
      setTipo("");
      setFornecedor("");
      setStatus("");
    }
  }, [open]);

  const handleSave = () => {
    if (!tipo || !fornecedor || !nome || !status) {
      alert("Por favor, preencha todos os campos antes de salvar.");
      return;
    }

    const novaPeca = { id, tipo, fornecedor, nome, status };
    onSave(novaPeca);
    setId((prev) => prev + 1);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Cadastrar Peça</h2>

      <div className="flex flex-col gap-5">
        <div>
          <label className="font-medium mb-1 block">Nome da peça:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome da peça"
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <h3 className="font-medium mb-2">Tipo:</h3>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tipo"
                value="Importada"
                checked={tipo === "Importada"}
                onChange={(e) => setTipo(e.target.value)}
              />
              Importada
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tipo"
                value="Nacional"
                checked={tipo === "Nacional"}
                onChange={(e) => setTipo(e.target.value)}
              />
              Nacional
            </label>
          </div>
        </div>

        <div>
          <label className="font-medium mb-1 block">Fornecedor:</label>
          <input
            type="text"
            value={fornecedor}
            onChange={(e) => setFornecedor(e.target.value)}
            placeholder="Digite o nome do fornecedor"
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <h3 className="font-medium mb-2">Status:</h3>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="Em produção"
                checked={status === "Em produção"}
                onChange={(e) => setStatus(e.target.value)}
              />
              Em produção
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="Em transporte"
                checked={status === "Em transporte"}
                onChange={(e) => setStatus(e.target.value)}
              />
              Em transporte
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="Pronta"
                checked={status === "Pronta"}
                onChange={(e) => setStatus(e.target.value)}
              />
              Pronta
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500"
          >
            Salvar
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalCadastrarPeca;
