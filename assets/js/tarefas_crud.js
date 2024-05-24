//
// tarefa = {
//     nome : "Nome",
//     detalhes : "O que é",
//     classificacao : "qual é",
//     prazo: "data",
//     status: "qual o status"
// };

const button_save = document.querySelector('#btn_save');
const name_task = document.querySelector('#name_task');
const task = document.querySelector('#task');

button_save.addEventListener('click', (e) => {
    e.preventDefault();
    alert(name_task.value);
})