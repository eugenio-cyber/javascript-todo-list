const receberTarefas = () => JSON.parse(localStorage.getItem("todo")) ?? [];
const enviarTarefas = (banco) =>
  localStorage.setItem("todo", JSON.stringify(banco));

const criarTarefa = (tarefa, situacao, indice) => {
  const div = document.createElement("div");
  div.classList.add("item");

  div.innerHTML = `
        <input type="checkbox" data-indice=${indice} ${situacao}>
        <h5 class="todo__text cursor-default" > ${tarefa} </h5>
        <div class="buttons">
          <input class="btn-edit all-unset" id="edit" type="button" value="Editar" data-indice=${indice}>
          <input class="btn-deny all-unset" id="deny" type="button" value="Excluir" data-indice=${indice}>
        </div>
    `;
  document.getElementById("todo-list").appendChild(div);
};

const adicionar = (e) => {
  const texto = e.target.value;
  console.log(texto);

  if (e.key === "Enter") {
    if (texto != "") {
      const banco = receberTarefas();
      banco.push({ tarefa: texto, situacao: "" });
      enviarTarefas(banco);
      e.target.value = "";
      atualizar();
    } else {
      iniciaModalAviso("modal-aviso");
    }
  }
};

const adicionarBtn = (e) => {
  const texto = document.querySelector(".adicionar").value;

  if (texto != "") {
    const banco = receberTarefas();
    banco.push({ tarefa: texto, situacao: "" });
    enviarTarefas(banco);
    document.querySelector(".adicionar").value = "";
    atualizar();
  } else {
    iniciaModalAviso("modal-aviso");
  }
};

const limpar = () => {
  const todo = document.querySelector("#todo-list");
  while (todo.firstChild) {
    todo.removeChild(todo.lastChild);
  }
};

const atualizar = () => {
  limpar();
  const banco = receberTarefas();
  banco.forEach((item, indice) =>
    criarTarefa(item.tarefa, item.situacao, indice)
  );
};

const tarefaClicada = (event) => {
  const elemento = event.target;
  const indice = elemento.dataset.indice;
  let texto = elemento.dataset.indice;

  if (elemento.id === "deny") {
    remover(indice);
  } else if (elemento.type === "checkbox") {
    adicionarItem(indice);
  } else if (elemento.id === "edit") {
    iniciaModalEditar("modal-editar", texto);
  }
};

const adicionarItem = (indice) => {
  const banco = receberTarefas();
  banco[indice].situacao = banco[indice].situacao === "" ? "checked" : "";
  enviarTarefas(banco);
  atualizar();
};

const remover = (indice) => {
  const banco = receberTarefas();
  banco.splice(indice, 1);
  enviarTarefas(banco);
  atualizar();
};

const editarItem = (texto, novoTexto) => {
  const banco = receberTarefas();
  banco.forEach((item, indice) => {
    if (texto == indice) {
      item.tarefa = novoTexto;
    }
  });
  enviarTarefas(banco);
  atualizar();
};

const iniciaModalAviso = (modalId) => {
  const modal = document.getElementById(modalId);
  modal.classList.add("mostrar");

  modal.addEventListener("click", (e) => {
    if (e.target.id === "modal-btn") {
      modal.classList.remove("mostrar");
    }
  });
};

const iniciaModalEditar = (modalId, texto) => {
  const modal = document.getElementById(modalId);
  let resposta;

  modal.classList.add("mostrar");

  modal.addEventListener("click", (e) => {
    if (e.target.id === "modal-btn-confirm") {
      if (document.getElementById("modal-editar-input").value !== "") {
        resposta = document.getElementById("modal-editar-input").value;
        document.getElementById("modal-editar-input").value = "";
        editarItem(texto, resposta);
      }
      modal.classList.remove("mostrar");
    } else if (e.target.id === "modal-btn-deny") {
      modal.classList.remove("mostrar");
    }
  });
};

document.querySelector("#adicionar").addEventListener("keypress", adicionar);
document.querySelector("#btnAdd").addEventListener("click", adicionarBtn);
document.querySelector("#todo-list").addEventListener("click", tarefaClicada);

atualizar();
