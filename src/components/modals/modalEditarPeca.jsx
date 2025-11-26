import Modal from "./modal.jsx";

function ModalEditarPeca({ open, onClose, onUpdateStatus, peca }) {
  if (!open || !peca) {
    return null;
  }

  const handleUpdateStatus = () => {
    let novoStatus = "";
    if (peca.status === "em produção") {
      novoStatus = "em transporte";
    } else if (peca.status === "em transporte") {
      novoStatus = "pronta";
    }

    if (novoStatus) {
      onUpdateStatus(peca.id, novoStatus);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col items-center text-center p-4">
        <h2 className="text-2xl font-bold mb-4 uppercase">{peca.nome}</h2>

        <div className="text-lg space-y-2 mb-6 text-left">
          <p>
            <span className="font-semibold">NOME DA PEÇA:</span> {peca.nome}
          </p>
          <p>
            <span className="font-semibold">TIPO:</span> {peca.tipo}
          </p>
          <p>
            <span className="font-semibold">FORNECEDOR:</span> {peca.fornecedor}
          </p>
          <p>
            <span className="font-semibold">STATUS:</span>{" "}
            <span className="uppercase font-medium">{peca.status}</span>
          </p>
        </div>

        <div className="text-md font-semibold text-gray-600 mb-6">
          <span>EM PROD.</span> &rarr;
          <span> TRANSP.</span> &rarr;
          <span> PRONTA</span>
        </div>

        <div className="flex flex-col gap-3 w-full items-center">
          <button
            onClick={handleUpdateStatus}
            disabled={peca.status === "pronta"}
            className="w-4/5 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            ATUALIZAR STATUS
          </button>
          <button
            onClick={onClose}
            className="w-4/5 bg-gray-300 px-4 py-2 rounded hover:bg-gray-200 transition"
          >
            VOLTAR
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalEditarPeca;
