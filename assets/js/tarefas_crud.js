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
/*Variável que controla atualização*/
let novaTarefa = null;
/*Create Task*/
const atualizarDados = (tarefa) => {
    localStorage.setItem('tarefas', JSON.stringify(tarefa));
};
/*Inseri dados na lista da página*/
const apagarTarefa = (padrao) => {
    tarefas_ls  = tarefas_ls.filter(task => task.nome !== padrao);
    atualizarDados(tarefas_ls);
};
const editarTarefa = (index) => {
    btnToggle();
    novaTarefa = index;
    formulario.querySelector('#name_task').value = tarefas_ls[index].nome;
    formulario.querySelector('#task').value = tarefas_ls[index].detalhes.descricao;
    formulario.querySelector('#class_task').value = tarefas_ls[index].detalhes.class;
    let opcaoClassificacao = formulario.querySelector('#class_task');
    for(let i = 0; i < opcaoClassificacao.length; i++) {
        if(opcaoClassificacao.options[i].value === tarefas_ls[index].detalhes.classificacao){
            opcaoClassificacao.selectedIndex = i;
            break;
        }
    }
    formulario.querySelector('#date_task').value = tarefas_ls[index].detalhes.prazo;
    let opcaoStatus = formulario.querySelector('#status_task');
    for(let i = 0; i <opcaoStatus.length; i++ ){
        if(opcaoStatus.options[i].value === tarefas_ls[index].detalhes.status){
            opcaoStatus.selectedIndex = i;
            break;
        }
    }
}
const criaElemento = (tarefa, index) => {
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
                if(tarefa.detalhes.status !== 'F'){
                    spanBtnSucess.innerHTML = "<i class='fa fa-edit'></i>";
                    spanBtnSucess.onclick = () => {
                        editarTarefa(index)
                    };
                } else {
                    spanBtnSucess.innerHTML = "<i class='fa fa-lock'></i>";
                }
                TaskActions.appendChild(spanBtnSucess);
                let spanBtnDanger = document.createElement('span');
                spanBtnDanger.classList.add('btn', 'btn-danger','btn-sm');
                spanBtnDanger.innerHTML = "<i class='fa fa-eraser'></i>";
                spanBtnDanger.onclick = () => {
                    if(confirm("Deseja excluir a tarefa? ")) {
                        apagarTarefa(tarefa.nome);
                        location.reload();
                    }
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
/*Carrega as tarefas na página*/
tarefas_ls.forEach((tarefa, index) => {
    const divElemento = criaElemento(tarefa, index);
    div_lista_tasks.append(divElemento);
});
/*exibir formulário*/
const btnToggle = () => {
    formulario.classList.toggle('hidden');
    div_formulario.classList.toggle('app__form_grid');
    btnAddTask.classList.toggle("hidden");
};
btnAddTask.addEventListener('click', (e) => {
    btnToggle();
});
btnCancelTask.addEventListener('click', (e) => {
    btnToggle();
});
btnSaveTask.addEventListener('click', (e) => {
    btnToggle();
});
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    let tarefa = {
        'nome': name_task.value,
        'detalhes': {
            'descricao': task.value,
            'classificacao': class_task.value,
            'prazo': date_task.value,
            'status': status_task.value
        }
    }
    if(novaTarefa === null) {
        tarefas_ls.push(tarefa);
    }else{
        tarefas_ls[novaTarefa].nome = tarefa.nome;
        tarefas_ls[novaTarefa].detalhes.descricao = tarefa.detalhes.descricao;
        tarefas_ls[novaTarefa].detalhes.classificacao = tarefa.detalhes.classificacao;
        tarefas_ls[novaTarefa].detalhes.prazo = tarefa.detalhes.prazo;
        tarefas_ls[novaTarefa].detalhes.status = tarefa.detalhes.status;
    }
    atualizarDados(tarefas_ls);
    e.target.reset();
    location.reload();
});
