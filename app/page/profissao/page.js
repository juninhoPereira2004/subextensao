"use client";

import { useEffect, useState } from "react";
import Nav from "@/app/components/Nav/Nav";
import { apiGet, apiPost, apiPut, apiDelete } from "@/app/utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./page.module.css";

const Profissoes = () => {
  const [profissoes, setProfissoes] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [salario, setSalario] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Carregar profissões ao montar a página
  const fetchProfissoes = async () => {
    try {
      const response = await apiGet("/profissao");
      setProfissoes(response);
    } catch (error) {
      console.error("Erro ao carregar as profissões:", error);
    }
  };

  useEffect(() => {
    fetchProfissoes();
  }, []);

  // Salvar ou atualizar profissão
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const profissaoData = { nome, descricao, salario, empresa };

    try {
      if (editId) {
        await apiPut(`/profissao/${editId}`, profissaoData);
        setEditId(null);
      } else {
        await apiPost("/profissao", profissaoData);
      }

      setNome("");
      setDescricao("");
      setSalario("");
      setEmpresa("");

      fetchProfissoes();
      toast.success("Profissão salva com sucesso!", {
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Erro ao salvar profissão. Tente novamente.", {
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Excluir profissão
  const handleDelete = async (id) => {
    if (confirm("Deseja realmente excluir esta profissão?")) {
      setDeletingId(id);
      try {
        await apiDelete(`/profissao/${id}`);
        fetchProfissoes();
        toast.success("Profissão excluída com sucesso!");
      } catch (error) {
        toast.error("Erro ao excluir profissão. Tente novamente.");
        console.error("Erro ao excluir profissão:", error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  // Preencher formulário para edição
  const handleEdit = (profissao) => {
    setNome(profissao.nome);
    setDescricao(profissao.descricao);
    setSalario(profissao.salario);
    setEmpresa(profissao.empresa);
    setEditId(profissao.id);
  };

  return (
    <div id="root">
      <Nav />
      <div className="container mt-4">
        <h1 className="text-center mb-4">Gerenciamento de Profissões</h1>

        {/* Formulário */}
        <form onSubmit={handleSave} className="mb-4">
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Nome da profissão"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                placeholder="Salário estimado"
                value={salario}
                onChange={(e) => setSalario(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Nome da empresa"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                required
              />
            </div>
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={loading}
              >
                {loading ? "Salvando..." : editId ? "Atualizar" : "Adicionar"}
              </button>
            </div>
          </div>
        </form>

        {/* Tabela de Profissões */}
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Salário</th>
              <th>Empresa</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {profissoes.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Nenhuma profissão encontrada
                </td>
              </tr>
            ) : (
              profissoes.map((profissao) => (
                <tr key={profissao.id}>
                  <td>{profissao.nome}</td>
                  <td>{profissao.descricao}</td>
                  <td>{profissao.salario}</td>
                  <td>{profissao.empresa}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(profissao)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(profissao.id)}
                      disabled={deletingId === profissao.id}
                    >
                      {deletingId === profissao.id ? "Excluindo..." : "Excluir"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profissoes;
