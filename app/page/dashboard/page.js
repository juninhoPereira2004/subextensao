"use client";

import { useEffect, useState } from "react";
import Nav from "@/app/components/Nav/Nav";
import useAuth from "@/app/hooks/useAuth";
import { apiGet } from "@/app/utils/api";

const Dashboard = () => {
  // useAuth();

  const [configuracoes, setConfiguracoes] = useState([]);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [totalAmbientes, setTotalAmbientes] = useState(0);
  const [totalReservas, setTotalReservas] = useState(0);
  const [loading, setLoading] = useState(true);

  let nomes_configuracoes = {
    'limite_reservas_usuario': 'Limite de Reservas por Aluno',
    'horario_funcionamento': 'Horário de Funcionamento',
  };
  // Carregar dados de configurações, usuários, ambientes e reservas
  const fetchData = async () => {
    try {
      const [configResponse, usuariosResponse, ambientesResponse, reservasResponse] = await Promise.all([
        apiGet("/configuracoes"),
        apiGet("/usuarios"),
        apiGet("/ambientes"),
        apiGet("/reservas"),
      ]);

      setConfiguracoes(configResponse);
      setTotalUsuarios(usuariosResponse.length);
      setTotalAmbientes(ambientesResponse.length);
      setTotalReservas(reservasResponse.length);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id="root">
      <Nav />
      <div className="container mt-4">
        <div className="text-center mb-4">
        </div>
        <h1 className="text-center mb-4">Dashboard</h1>

        {loading ? (
          <div className="text-center">
            <p>Carregando dados...</p>
          </div>
        ) : (
          <>
            {/* Exibir Métricas Totais */}
            <div className="row mb-4">
              <div className="col-md-4">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">Total de Profissão</h5>
                    <p className="card-text fs-3">{totalUsuarios}</p>
                  </div>  
                </div>
              </div>
            </div>

            {/* Exibir Configurações */}
            <div className="row">
              {configuracoes.map((config) => (
                <div className="col-md-6 mb-4" key={config.id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{nomes_configuracoes[config.nome_configuracao]}</h5>
                      <p className="card-text">{config.valor_configuracao}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
