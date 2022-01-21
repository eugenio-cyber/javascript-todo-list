
// let banco = [];

const receberTarefas = () => JSON.parse(localStorage.getItem ('todo')) ?? [];
const enviarTarefas = (banco) => localStorage.setItem('todo', JSON.stringify(banco));

const criarTarefa = (tarefa, situacao, indice) => {
    const div = document.createElement('div');
    div.classList.add('item');

    div.innerHTML = `
        <input type="checkbox" ${situacao} data-indice=${indice}>
        <h5> ${tarefa} </h5>
        <input id="deny" type="button" value="Excluir" data-indice=${indice}>
    `
    document.getElementById('listasTarefas').appendChild(div);
}

const adicionar = (e) => {

    const texto = e.target.value;

    if(texto == '') {
        alert('Você não digitou a tarefa')
    } else {
        if(e.key === 'Enter') {
            const banco = receberTarefas();
            banco.push ({'tarefa': texto, 'status': ''});
            enviarTarefas(banco);
            e.target.value = '';
            atualizar();
        }
    }
}

const adicionarBtn = (e) => {

    const texto = document.getElementById('adicionar').value;
    
    if(texto != '') {
        const banco = receberTarefas();
        banco.push ({'tarefa': texto, 'status': ''});
        enviarTarefas(banco);
        document.getElementById('adicionar').value = '';
        atualizar();
    } else [
        alert('Você não digitou a tarefa')
    ]
    
}

const limpar = () => {
    const todo = document.getElementById('listasTarefas');
    while (todo.firstChild) {
        todo.removeChild(todo.lastChild);
    }
}

const atualizar = () => {
    limpar();
    const banco = receberTarefas();
    banco.forEach((item, indice) => criarTarefa(item.tarefa, item.situacao, indice))
}

const tarefaClicada = (e) => {
    
    const elemnto = e.target;

    if(e.target.type === 'button') {
        const indice = elemnto.dataset.indice;
        remover(indice);
    } else if(e.target.type === 'checkbox') {
        const indice = elemnto.dataset.indice;
        adicionarItem(indice);
    }
}

const adicionarItem = (indice) => {
    const banco = receberTarefas();
    banco[indice].situacao = banco[indice].situacao === '' ? 'checked' : '';
    enviarTarefas(banco);
    atualizar();
}

const remover = (indice) => {
    const banco = receberTarefas();
    banco.splice(indice, 1);
    enviarTarefas(banco);
    atualizar();
}

document.getElementById('adicionar').addEventListener('keypress', adicionar);
document.getElementById('btnAdd').addEventListener('click', adicionarBtn);
document.getElementById('listasTarefas').addEventListener('click', tarefaClicada);

atualizar();