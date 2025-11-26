import Modal from "./modal.jsx";

function ModalEditarEtapa({ open, onClose, onUpdateStatus, etapa }) {
  if (!open || !etapa) {
    return null;
  }

  const handleUpdateStatus = () => {
    let novoStatus = "";
    if (etapa.status === "pendente") {
      novoStatus = "em andamento";
    } else if (etapa.status === "em andamento") {
      novoStatus = "concluida";
    }

    if (novoStatus) {
      onUpdateStatus(etapa.id, novoStatus);
      onClose();
    }
  };

  const prazoFormatado = new Date(etapa.prazo).toLocaleDateString("pt-BR", {
    timeZone: "UTC",
  });

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col items-center text-center p-4">
        <h2 className="text-2xl font-bold mb-4 uppercase">{etapa.nome}</h2>

        <div className="text-lg space-y-2 mb-6 text-left">
          <p>
            <span className="font-semibold">NOME DA ETAPA:</span> {etapa.nome}
          </p>
          <p>
            <span className="font-semibold">PRAZO:</span> {prazoFormatado}
          </p>
          <p>
            <span className="font-semibold">STATUS:</span>{" "}
            <span className="uppercase font-medium">{etapa.status}</span>
          </p>
        </div>

        <div className="text-md font-semibold text-gray-600 mb-6">
          <span>PENDENTE</span> &rarr;
          <span> EM ANDAMENTO</span> &rarr;
          <span> CONCLUÍDA</span>
        </div>

        <div className="flex flex-col gap-3 w-full items-center">
          <button
            onClick={handleUpdateStatus}
            disabled={etapa.status === "concluida"}
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

export default ModalEditarEtapa;
