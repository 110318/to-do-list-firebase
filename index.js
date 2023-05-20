import { async } from '@firebase/util'
import {getTasks, addTask, editDocument, deleteTask } from './firebase.js'

let tareas = []
await renderTodo()

async function renderTodo(){
    tareas = await getTasks()
    const todoContainer = document.querySelector('#to-do-container')

    todoContainer.innerHTML = ''

    tareas.forEach(tarea => {
    const elem = document.createElement('li')
    elem.textContent = tarea.title
    if(tarea.completed) elem.style.color = 'red'
    elem.addEventListener('click', async () => {
        await editDocument(tarea.title ,tarea.id)
        await renderTodo()
    })

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar'
    deleteButton.addEventListener('click', async (event) => {
        event.stopPropagation();
        await deleteTask(tarea.id)
        await renderTodo();
    })

    elem.appendChild(deleteButton)
    todoContainer.append(elem)
    })
}

async function handleClick (){
    const inputTarea = document.getElementById('input-todo')
    const inputText = inputTarea.value 
    await addTask(inputText)
    inputTarea.value = ''
    await renderTodo()
}

const buttonTarea = document.getElementById('create-todo')
buttonTarea.addEventListener('click', async () => await handleClick())