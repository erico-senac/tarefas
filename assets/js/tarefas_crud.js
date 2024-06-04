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
const div_lista_tasks = document.querySelector('.app__lista_tasks');
/*Create Task*/
const atualizarDados = (tarefa) => {
    localStorage.setItem('tarefas', JSON.stringify(tarefa));
};
/*Inseri dados na lista da página*/
const atualizarLista = (tarefas) => {
    let itemTarefa;
    tarefas.forEach(tarefa => {
        itemTarefa = `<div className="app__list_tasks_task">
            <div className="task_name">
                <span className="name">${tarefa.nome}</span>
                <div className="task_actions">
                    <span className="btn btn-sm btn-success"><i className="fas fa-edit"></i></span>
                    <span className="btn btn-sm btn-danger"><i className="fas fa-eraser"></i></span>
                    <span className="btn btn-sm btn-warning"><i className="fas fa-check"></i></span>
                </div>
            </div>
            <div className="task_details">
                <span className="details">${tarefa.detalhes.descricao}</span>
                <span className="date">${tarefa.detalhes.prazo}</span>
                <span className="status">${tarefa.detalhes.status}</span>
            </div>
        </div>`;
        div_lista_tasks.innerHTML += itemTarefa;
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