//projectcontroller.js

//Factory function to make new projects
const newProject = function(title, tasks) {
  return {
    title,
    tasks
  }
}

//factory function to create new tasks
const newTask = function(title, due, priority) {
  return {
    title,
    due,
    priority
  }
}

function editTask(project, task, newTask, newDate) {
  project[project.indexOf(task)].title = newTask;
  project[project.indexOf(task)].due = newDate;
  console.log('task edited');
  console.log(task);
}

function deleteTask(project, task) {
  console.log(project);
  console.log(task);
  project.splice(project.indexOf(task), 1);
}

const projects = [
  newProject(
    'Default Project',
    [
      newTask('Finish to do list', 'today', 'high'),
      newTask('Eat dinner', 'today', 'medium')
    ]
  ),
  newProject(
    'Tommorow',
    [ newTask('Read the next articles', 'monday', 'medium') ]
  )
];

export{ newTask, newProject, editTask, deleteTask, projects }