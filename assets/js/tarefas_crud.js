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

/*Create Task*/
const inserirDados = (tarefa) => {
    localStorage.setItem(tarefa.nome, JSON.stringify(tarefa.detalhes));
}
/*exibir formulário*/
const btnToggle = () => {
    formulario.classList.toggle('hidden');
    div_formulario.classList.toggle('app__form_grid');
    btnAddTask.classList.toggle("hidden");
}
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
        'detalhes' : {
            'descricao': task.value,
            'classificacao': class_task.value,
            'prazo': date_task.value,
            'status': status_task.value
        }
    }
    inserirDados(tarefa);
});
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.reset();
    btnToggle();
})
