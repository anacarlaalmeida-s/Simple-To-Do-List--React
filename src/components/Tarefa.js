import btnFechar from "../assets/delete.svg";

function Tarefa(props) {
  return (
    <li className={props.className}>
      <span
        onClick={() => props.completarTarefa(props.id)}
        style={{
          textDecoration: props.completa ? "line-through" : "",
          color: props.completa ? "#D1D2DA" : "",
        }}
      >
        {props.children}
      </span>
      <img
        onClick={() => props.deletarTarefa(props.id)}
        className="fechar"
        src={btnFechar}
        alt="fechar"
      />
    </li>
  );
}

export default Tarefa;
