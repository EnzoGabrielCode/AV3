import Modal from "./modal.jsx";
import { useState, useEffect } from "react";

function ModalCadastrarAeronave({ open, onClose, onSave }) {
  const [cod, setCodigo] = useState("");
  const [modelo, setModelo] = useState("");
  const [tipo, setTipo] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [alcance, setAlcance] = useState("");
  const [id, setId] = useState(1);

  useEffect(() => {
    if (open) {
      setCodigo("");
      setModelo("");
      setTipo("");
      setCapacidade("");
      setAlcance("");
    }
  }, [open]);

  const handleSave = () => {
    if (!cod || !modelo || !tipo || !capacidade || !alcance) {
      alert("Por favor, preencha todos os campos antes de enviar.");
      return;
    }

    const novaAeronave = {
      id,
      cod,
      modelo,
      tipo,
      capacidade,
      alcance,
    };

    onSave(novaAeronave);
    setId((prev) => prev + 1);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Cadastrar Aeronave</h2>

      <div className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            value={cod}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="CÓD"
            className="border rounded p-2 w-full text-center"
          />
        </div>

        <div>
          <input
            type="text"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            placeholder="MODELO"
            className="border rounded p-2 w-full text-center"
          />
        </div>

        <div className="flex items-center justify-center gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="tipo"
              value="importada"
              checked={tipo === "importada"}
              onChange={(e) => setTipo(e.target.value)}
            />
            Importada
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="tipo"
              value="nacional"
              checked={tipo === "nacional"}
              onChange={(e) => setTipo(e.target.value)}
            />
            Nacional
          </label>
        </div>

        <div>
          <input
            type="text"
            value={capacidade}
            onChange={(e) => setCapacidade(e.target.value)}
            placeholder="CAPACIDADE"
            className="border rounded p-2 w-full text-center"
          />
        </div>

        <div>
          <input
            type="text"
            value={alcance}
            onChange={(e) => setAlcance(e.target.value)}
            placeholder="ALCANCE"
            className="border rounded p-2 w-full text-center"
          />
        </div>

        <div className="flex justify-center gap-4 mt-3">
          <button
            onClick={handleSave}
            className="border px-4 py-1 rounded hover:bg-gray-200 transition"
          >
            ENVIAR
          </button>
          <button
            onClick={onClose}
            className="border px-4 py-1 rounded hover:bg-gray-200 transition"
          >
            CANCELAR
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalCadastrarAeronave;
