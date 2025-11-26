import Modal from "./modal.jsx";
import { useState, useEffect } from "react";

function ModalCadastrarFuncionario({ open, onClose, onSave }) {
  const [nome, setNome] = useState("");
  const [telefone, setTel] = useState("");
  const [endereco, setEndereco] = useState("");
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");
  const [funcao, setFuncao] = useState("");

  useEffect(() => {
    if (open) {
      setNome("");
      setTel("");
      setEndereco("");
      setUser("");
      setSenha("");
      setFuncao("");
    }
  }, [open]);

  const handleSave = () => {
    if (!nome || !telefone || !endereco || !user || !senha || !funcao) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const novoFuncionario = {
      nome,
      telefone,
      endereco,
      user,
      senha,
      funcao,
    };

    onSave(novoFuncionario);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Cadastrar Funcionário</h2>

      <div className="flex flex-col gap-5">
        <div>
          <label className="font-medium mb-1 block">Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome completo"
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <label className="font-medium mb-1 block">Telefone:</label>
          <input
            type="telefone"
            value={telefone}
            onChange={(e) => setTel(e.target.value)}
            placeholder="Digite o telefone"
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <label className="font-medium mb-1 block">Endereço:</label>
          <input
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            placeholder="Digite o endereço"
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <label className="font-medium mb-1 block">User:</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Digite o nome de usuário"
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <label className="font-medium mb-1 block">Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite a senha"
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <h3 className="font-medium mb-2">Função:</h3>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="funcao"
                value="adm"
                checked={funcao === "adm"}
                onChange={(e) => setFuncao(e.target.value)}
              />
              ADM
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="funcao"
                value="eng"
                checked={funcao === "eng"}
                onChange={(e) => setFuncao(e.target.value)}
              />
              ENG
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="funcao"
                value="ope"
                checked={funcao === "ope"}
                onChange={(e) => setFuncao(e.target.value)}
              />
              OPE
            </label>
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

export default ModalCadastrarFuncionario;
