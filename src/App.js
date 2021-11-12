import { useState } from "react";
import imgLinha from "./assets/rectangle.svg";
import Tarefa from "./components/Tarefa";
import "./App.css";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [tamanho, setTamanho] = useState(0);
  const [selectedTodas, setSelectedTodas] = useState(true);
  const [selectedAtivas, setSelectedAtivas] = useState(false);
  const [selectedCompletadas, setSelectedCompletadas] = useState(false);

  function digitarTarefa(event) {
    const valorInput = event.target.value;

    if (event.key !== "Enter" || valorInput === "") return;

    const tarefasAtualizadas = [
      ...tarefas,
      { id: Math.random(), texto: valorInput, completa: false },
    ];
    setTarefas(tarefasAtualizadas);
    setTamanho(tarefasAtualizadas.length);
    event.target.value = "";
  }

  function deletarTarefa(id) {
    const tarefasAtualizadas = tarefas.filter(function (tarefa) {
      return tarefa.id !== id;
    });
    const tarefasPendentes = tarefasAtualizadas.filter(function (tarefa) {
      return !tarefa.completa;
    });
    setTarefas(tarefasAtualizadas);
    setTamanho(tarefasPendentes.length);
  }

  function completarTarefa(id) {
    const tarefasAtualizadas = [...tarefas];

    const tarefaCompletada = tarefasAtualizadas.find(function (tarefa) {
      return tarefa.id === id;
    });
    tarefaCompletada.completa = !tarefaCompletada.completa;

    const tarefasPendentes = tarefasAtualizadas.filter(function (tarefa) {
      return !tarefa.completa;
    });

    setTarefas(tarefasAtualizadas);
    setTamanho(tarefasPendentes.length);
  }

  function exibirTarefas() {
    const tarefasAtualizadas = [...tarefas];

    tarefasAtualizadas.forEach((tarefa) => {
      tarefa.className = "";
    });
    setTarefas(tarefasAtualizadas);
    setSelectedTodas(true);
    setSelectedAtivas(false);
    setSelectedCompletadas(false);
  }

  function deletarTarefaCompletada() {
    const tarefasAtualizadas = [...tarefas];

    const tarefasPendentes = tarefasAtualizadas.filter(function (tarefa) {
      return !tarefa.completa;
    });

    setTarefas(tarefasPendentes);
  }

  function exibirTarefasAtivas() {
    const tarefasAtualizadas = [...tarefas];

    tarefasAtualizadas.forEach((tarefa) => {
      !tarefa.completa
        ? (tarefa.className = "")
        : (tarefa.className = "hidden");
    });

    const tarefasPendentes = tarefasAtualizadas.filter(function (tarefa) {
      return !tarefa.completa;
    });
    setSelectedTodas(false);
    setSelectedAtivas(true);
    setSelectedCompletadas(false);
    setTarefas(tarefasAtualizadas);
    setTamanho(tarefasPendentes.length);
  }

  function exibirTarefasCompletadas() {
    const tarefasAtualizadas = [...tarefas];

    tarefasAtualizadas.forEach((tarefa) => {
      !tarefa.completa
        ? (tarefa.className = "hidden")
        : (tarefa.className = "");
    });
    setSelectedTodas(false);
    setSelectedAtivas(false);
    setSelectedCompletadas(true);
    setTarefas(tarefasAtualizadas);
    setTamanho(0);
  }

  return (
    <div className="App">
      <h1>TAREFAS</h1>
      <input
        type="text"
        placeholder="Criar uma nova tarefa"
        onKeyDown={digitarTarefa}
      ></input>
      <div className="quadroDeTarefas">
        <ul className="listaDeTarefas">
          {tarefas.map(function (tarefa) {
            return (
              <Tarefa
                className={tarefa.className}
                key={tarefa.id}
                id={tarefa.id}
                deletarTarefa={deletarTarefa}
                completarTarefa={completarTarefa}
                completa={tarefa.completa}
              >
                {tarefa.texto}
                <img className="linha" src={imgLinha} alt="linha" />
              </Tarefa>
            );
          })}
        </ul>
        <div className="rodapeListaDeTarefas">
          <div className="atividadesRestantes">
            <span> {`${tamanho}`} itens restantes</span>
          </div>
          <div className="situacaoTarefas">
            <span
              className={selectedTodas ? "selected" : ""}
              onClick={exibirTarefas}
            >
              Todas
            </span>
            <span
              onClick={() => exibirTarefasAtivas()}
              className={selectedAtivas ? "selected" : ""}
            >
              Ativas
            </span>
            <span
              onClick={() => exibirTarefasCompletadas()}
              className={selectedCompletadas ? "selected" : ""}
            >
              Completada
            </span>
            <div className="limparTarefas">
              <p onClick={deletarTarefaCompletada}>Limpar Completadas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
