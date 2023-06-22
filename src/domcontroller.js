//domcontroller.js
import { newTask, newProject, editTask, deleteTask, projects} from './projectcontroller';
//import newTask from './projectcontroller';

function renderProjectTabs() {
  
  const controls = document.getElementById('project-tabs');
  controls.innerHTML = "";
  projects.forEach(function(project) {
  
    let tab = document.createElement('div');
    controls.appendChild(tab);
    let button = document.createElement('button');
    button.classList.add('project-name-select');
    button.textContent =  "- " + project.title;
    tab.appendChild(button);
    button.addEventListener('click', () => {
      renderTasks(project);
    });
  });
}

//the button controls for adding a new project
const new_project_button = document.getElementById('new-project-button');
const new_project_form = document.getElementById('popup-form');
const new_project_title = document.getElementById('new-project-name');
const new_project_x = document.getElementById('new-project-x');

new_project_form.addEventListener('submit', (event) => {
  event.preventDefault();
  projects.unshift(newProject(new_project_title.value, []));
  new_project_form.classList.remove('nothidden');
  renderProjectTabs();
});

new_project_x.addEventListener('click', () => {
  new_project_form.classList.remove('nothidden');
});

new_project_button.addEventListener('click', () => {
  new_project_form.classList.add('nothidden');
});


function renderForm(project) {
  
  const form_bed = document.getElementById('new-task');
  form_bed.innerHTML = "";
  let h3 = document.createElement('h3');
  h3.textContent = "Add a new task";
  form_bed.appendChild(h3);
  let form_controls_2 = document.createElement('div');
  form_controls_2.setAttribute('id', 'form-controls-2');
  form_bed.appendChild(form_controls_2);
  let div1 = document.createElement('div');
  form_controls_2.appendChild(div1);
  let label1 = document.createElement('label');
  label1.setAttribute('for', 'priority');
  label1.textContent = "Task Priority:";
  div1.appendChild(label1);
  
  let select = document.createElement('select');
  select.setAttribute('id', 'priority');
  select.setAttribute('form', 'new-task-form');
  div1.appendChild(select);
  
  let optionLow = document.createElement('option');
  optionLow.setAttribute('value', 'low');
  optionLow.textContent = "Low";
  let optionMed = document.createElement('option');
  optionMed.setAttribute('value', 'medium');
  optionMed.textContent = "Medium";
  let optionHi = document.createElement('option');
  optionHi.setAttribute('value', 'high');
  optionHi.textContent = "High";
  select.appendChild(optionLow);
  select.appendChild(optionMed);
  select.appendChild(optionHi);
  
  let div2 = document.createElement('div');
  form_controls_2.appendChild(div2);
  let label2 = document.createElement('label');
  label2.setAttribute('for', 'date');
  label2.textContent = "Due date:";
  div2.appendChild(label2);
  let new_date_input = document.createElement('input')
  new_date_input.setAttribute('type', 'date');
  new_date_input.setAttribute('form', 'new-task-input');
  new_date_input.setAttribute('id', 'date');
  div2.appendChild(new_date_input);
  
  
  let form = document.createElement('form');
  form.setAttribute('id', 'new-task-form');
  form_bed.appendChild(form);
  
  let new_task_input = document.createElement('input');
  new_task_input.setAttribute('type', 'text');
  new_task_input.setAttribute('id', 'new-task-input');
  new_task_input.setAttribute('placeholder', 'What do you have planned?');
  form.appendChild(new_task_input);
  let new_task_submit = document.createElement('input');
  new_task_submit.setAttribute('type', 'submit');
  new_task_submit.setAttribute('id', 'new-task-submit');
  new_task_submit.setAttribute('value', 'Add task');
  form.appendChild(new_task_submit);
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let new_task = newTask(new_task_input.value, new_date_input.value, select.value);
    project.tasks.unshift(new_task);
    renderTasks(project);
    console.log(new_task_input.value, new_date_input.value, select.value);
  });
}

function renderTasks(project) {
  const page = document.getElementById("current-tasks");
  page.innerHTML = "";
  
  renderForm(project);
  
  let tasks = project.tasks;
  
  if (tasks.length == 0) {
    let bee = document.createElement('img');
    bee.setAttribute('src', 'images/bee-sleep.png');
    bee.classList.add('bee-img');
    let h3 = document.createElement('h3');
    h3.textContent = "This project currently has no tasks.";
    page.appendChild(h3);
    page.appendChild(bee);
  } else {
    let titleh2 = document.getElementById('project-title');
    titleh2.textContent = project.title;
    
    tasks.forEach(function(task) {
      let date_text = document.createElement('input');
      date_text.setAttribute('type', 'date');
      date_text.readOnly = true;
      date_text.setAttribute('value', task.due);
      date_text.setAttribute('readonly', 'true');
      date_text.classList.add('dueDate');
      page.appendChild(date_text);
            
      let task_div = document.createElement('div');
      task_div.classList.add('task');
      page.appendChild(task_div);
          
      let priority_dot = document.createElement('span');
      priority_dot.classList.add('dot');
      priority_dot.classList.add(task.priority);
      task_div.appendChild(priority_dot);
      let task_text = document.createElement('input');
        
      task_text.setAttribute('type', 'text');
      task_text.classList.add('text');
      task_text.setAttribute('value', task.title);
      task_text.setAttribute('readonly', true);
      task_div.appendChild(task_text);
      
      let task_actions = document.createElement('div');
      task_actions.classList.add('task-actions');
      task_div.appendChild(task_actions);
      
      let edit_button = document.createElement('button');
              
      edit_button.classList.add('edit');
      edit_button.innerHTML = ('<span class="material-symbols-outlined">edit</span>');
                
      edit_button.addEventListener('click', () => {
        task_text.removeAttribute('readonly');
        task_text.setAttribute('value', '');
        date_text.readOnly = false;
        //task_text.setAttribute('placeholder', 'What do you have planned?'); // better without the placeholder text I think
        task_text.focus();
        let save_button = document.createElement('button');
        save_button.classList.add('save');
        save_button.innerHTML = ('<span class="material-symbols-outlined">save</span>');
        task_actions.appendChild(save_button);
        edit_button.classList.toggle('hidden');
                    
        save_button.addEventListener('click', () =>  {
          edit_button.classList.toggle('hidden');
          save_button.classList.add('hidden');
          task_text.setAttribute('readonly', true)
          date_text.readOnly = true;
          //save the actual content
          editTask(project.tasks, task, task_text.value, date_text.value);
          //taskController.editTask(defaultProjectTasks, task, task_text.value, date_text.value);
  
        });
      });
              
      let delete_button = document.createElement('button');
      delete_button.innerHTML = ('<span class="material-symbols-outlined">delete</span>');
      delete_button.classList.add('delete');
      delete_button.addEventListener('click', () => {
        deleteTask(project.tasks, task);
        renderTasks(project);
      });
      task_actions.appendChild(delete_button);
      task_actions.appendChild(edit_button);
    });
  }
}

export { renderProjectTabs, renderTasks };