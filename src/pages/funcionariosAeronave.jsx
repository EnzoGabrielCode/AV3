import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";

function FuncionariosAeronave() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [funcionarios, setFuncionarios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarFuncionarios();
    }, [id]);

    const carregarFuncionarios = async () => {
        try {
            setLoading(true);
            const data = await api.get(`/aeronaves/${id}/funcionarios`);
            setFuncionarios(data || []);
        } catch (error) {
            console.error("Erro ao carregar funcionarios:", error);
            setFuncionarios([]);
        } finally {
            setLoading(false);
        }
    };

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
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-7 gap-x-20 pb-7">
                        {loading ? (
                            <div className="text-gray-500">Carregando...</div>
                        ) : funcionarios.length === 0 ? (
                            <div className="text-gray-500">Nenhum funcionario associado a esta aeronave.</div>
                        ) : (
                            funcionarios.map((funcionario) => (
                                <button
                                    key={funcionario.id}
                                    className="bg-gray-300 flex p-8 cursor-pointer flex-col text-[1.25rem] font-medium rounded-lg shadow-md hover:bg-gray-200 transition"
                                >
                                    <h3 className="text-[1.5rem] pb-6 font-extrabold text-start">
                                        {funcionario.nome}
                                    </h3>
                                    <div className="w-full border border-gray-500 rounded-lg overflow-hidden">
                                        <div className="flex justify-between border-b border-gray-500 p-2 bg-gray-100">
                                            <span>TELEFONE:</span>
                                            <span>{funcionario.telefone}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-gray-500 p-2">
                                            <span>ENDERECO:</span>
                                            <span>{funcionario.endereco}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-gray-500 p-2 bg-gray-100">
                                            <span>USER:</span>
                                            <span>{funcionario.user}</span>
                                        </div>
                                        <div className="flex justify-between p-2">
                                            <span>FUNCAO:</span>
                                            <span>{funcionario.funcao}</span>
                                        </div>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FuncionariosAeronave;
