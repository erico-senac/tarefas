/*botões*/
const btnAddTask = document.querySelector('#btn_add');
const btnSaveTask = document.querySelector('#btn_save');
const btnCancelTask = document.querySelector('#btn_cancel');
/*form*/
const formulario = document.querySelector('.app__form_add_tasks');
const div_formulario = document.querySelector('.app__form');
/*inputs da task*/
const name_task = document.querySelector('#name_task');
const task = document.querySelector('#task');
const class_task = document.querySelector('#class_task');
const date_task = document.querySelector('#date_task');
const status_task = document.querySelector('#status_task');
/*Painel Lista Tarefas*/
let tarefas_ls = JSON.parse(localStorage.getItem('tarefas')) || [];
const div_lista_tasks = document.querySelector('.app__list_tasks');
/*Create Task*/
const atualizarDados = (tarefa) => {
    localStorage.setItem('tarefas', JSON.stringify(tarefa));
};
/*Inseri dados na lista da página*/
const apagarTarefa = (padrao) => {
    let novo = tarefas_ls.filter(task => task.nome !== padrao);
    tarefas_ls = novo
    atualizarDados(tarefas_ls);
    atualizarLista(tarefas_ls);
};

const criaElemento = (tarefa) => {
    /*Cria a div da tarefa*/
    let itemTarefa = document.createElement('div');
    itemTarefa.classList.add("app__list_tasks_task");
    /*Cria a dive de nome da tarefa e adiciona os elementos*/
        let taskName = document.createElement('div');
        taskName.classList.add('task_name');
            let spanName = document.createElement('span');
            spanName.classList.add('name');
            spanName.innerHTML = tarefa.nome;
        taskName.appendChild(spanName);
            let TaskActions = document.createElement('div');
            TaskActions.classList.add('task_actions');
                let spanBtnSucess = document.createElement('span');
                spanBtnSucess.classList.add('btn', 'btn-success' ,'btn-sm');
                spanBtnSucess.innerHTML = "<i class='fa fa-edit'></i>";
                TaskActions.appendChild(spanBtnSucess);
                let spanBtnDanger = document.createElement('span');
                spanBtnDanger.classList.add('btn', 'btn-danger','btn-sm');
                spanBtnDanger.innerHTML = "<i class='fa fa-eraser'></i>";
                spanBtnDanger.onclick = () => {
                    apagarTarefa(tarefa.nome);
                };
                TaskActions.appendChild(spanBtnDanger);
                let spanBtnWarning = document.createElement('span');
                spanBtnWarning.classList.add('btn', 'btn-warning','btn-sm');
                spanBtnWarning.innerHTML = "<i class='fa fa-check'></i>";
            TaskActions.appendChild(spanBtnWarning);
        taskName.appendChild(TaskActions);
        let taskDetails = document.createElement('div');
        taskDetails.classList.add("task_details");
            let spanDesc = document.createElement('span');
            spanDesc.classList.add('details');
            spanDesc.innerHTML = tarefa.detalhes.descricao;
            taskDetails.appendChild(spanDesc);
            let spanPrazo = document.createElement('span');
            spanPrazo.classList.add('date');
            spanPrazo.innerHTML = tarefa.detalhes.prazo;
            taskDetails.appendChild(spanPrazo);
            let spanStatus = document.createElement('span');
            spanStatus.classList.add('status');
            spanStatus.innerHTML = tarefa.detalhes.status;
            taskDetails.appendChild(spanStatus);
    itemTarefa.appendChild(taskName);
    itemTarefa.appendChild(taskDetails);
    return itemTarefa;
}

const atualizarLista = (tarefas) => {
    tarefas.forEach(tarefa => {
        const divElemento = criaElemento(tarefa);
        div_lista_tasks.append(divElemento);
    })
}
/*exibir formulário*/
const btnToggle = () => {
    formulario.classList.toggle('hidden');
    div_formulario.classList.toggle('app__form_grid');
    btnAddTask.classList.toggle("hidden");
};
btnAddTask.addEventListener('click', (e) => {
    btnToggle();
    /*formulario.classList.remove('hidden');
    div_formulario.classList.remove('app__form_grid');
    e.target.classList.add("hidden");*/
});
btnCancelTask.addEventListener('click', (e) => {
    /*formulario.classList.add('hidden');
    div_formulario.classList.add('app__form_grid');
    btnAddTask.classList.remove("hidden");*/
    btnToggle();
});
btnSaveTask.addEventListener('click', (e) => {
    let tarefa = {
        'nome': name_task.value,
        'detalhes': {
            'descricao': task.value,
            'classificacao': class_task.value,
            'prazo': date_task.value,
            'status': status_task.value
        }
    }
    tarefas_ls.push(tarefa);
    atualizarDados(tarefas_ls);
    atualizarLista(tarefas_ls);
});
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.reset();
    btnToggle();
});

if(tarefas_ls != null){
    atualizarLista(tarefas_ls);
}