import Modal from "./modal.jsx";
import { useState, useEffect } from "react";

function ModalCadastrarTeste({ open, onClose, onSave }) {
  const [tipo, setTipo] = useState("");
  const [resultado, setResultado] = useState("");
  const [id, setId] = useState(1);

  useEffect(() => {
    if (open) {
      setTipo("");
      setResultado("");
    }
  }, [open]);

  const handleSave = () => {
    if (!tipo || !resultado) {
      alert("Por favor, preencha todos os campos antes de salvar.");
      return;
    }

    const novoTeste = { id, tipo, resultado };
    onSave(novoTeste);
    setId((prev) => prev + 1);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Cadastrar Teste</h2>

      <div className="flex flex-col gap-5">
        <div>
          <h3 className="font-medium mb-2">Tipo de teste:</h3>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tipo"
                value="Elétrico"
                checked={tipo === "Elétrico"}
                onChange={(e) => setTipo(e.target.value)}
              />
              Elétrico
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tipo"
                value="Hidráulico"
                checked={tipo === "Hidráulico"}
                onChange={(e) => setTipo(e.target.value)}
              />
              Hidráulico
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tipo"
                value="Aerodinâmico"
                checked={tipo === "Aerodinâmico"}
                onChange={(e) => setTipo(e.target.value)}
              />
              Aerodinâmico
            </label>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Resultado:</h3>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="resultado"
                value="Aprovado"
                checked={resultado === "Aprovado"}
                onChange={(e) => setResultado(e.target.value)}
              />
              Aprovado
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="resultado"
                value="Desaprovado"
                checked={resultado === "Desaprovado"}
                onChange={(e) => setResultado(e.target.value)}
              />
              Desaprovado
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

export default ModalCadastrarTeste;
