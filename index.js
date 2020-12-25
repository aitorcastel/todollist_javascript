const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


let taskList = [];

function addTask(taskList, taskDescription) {
    taskList.push({done: false, description: taskDescription});
}

function printTaskList(taskList)
{
    for (let index = 0; index < taskList.length; index++)
    {
        if (taskList[index].done)
        {
            console.log('[x] ' + taskList[index].description);
        }else
        {
            console.log('[ ] ' + taskList[index].description);
        }
    };
}

function mode1(taskList)
{
    rl.question('[i] Introduce una nueva tarea (Escribe fin para terminar): ', function(taskDesc)
    {
        switch(taskDesc)
        {
            case 'fin':
                console.log('Fin de intro de tareas por parte del usuario');
                mode2(taskList);
                break;
            case 'exit':
                rl.close();
                break;
            default:
                addTask(taskList, taskDesc);
                console.log('lista de tareas actual: ');
                printTaskList(taskList);
                mode1(taskList);
        }
    }); 
}

function markTaskAsDone(taskList, index)
{
    if(index >= 0 && index < taskList.length)
    {
        taskList[index].done = true;
    }else
    {  
        console.log("[!] indice erróneo");
    }
}

function checkAllTaskDone(taskList) {
    for (let task of taskList) {
        if (!task.done) return false;
    }
    return true;
}

function mode2(taskList)
{
    printTaskList(taskList);
    rl.question('[i] ¿Qué tareas has realizado [1 - N]: ', function(taskNumber)
    {
        switch(taskNumber)
        {
            case 'fin':
            case 'exit':
                console.log("Adios!");
                rl.close();
                break;
            default:
                markTaskAsDone(taskList, taskNumber -1 );
                if(checkAllTaskDone(taskList))
                {
                    console.log("[i] Tareas terminadas!");
                    rl.close();
                }else
                {
                    mode2(taskList);
                }
            }
    });
}

// addTask(taskList, 'basura out');
// addTask(taskList, 'code this shit');
// addTask(taskList, 'eat');
// addTask(taskList, 'leer libro');
// addTask(taskList, 'malware');
// addTask(taskList, 'youtube dumper');
// addTask(taskList, 'sleep');

// console.log(">>> TaskList:\n");
// printTaskList(taskList);
//console.log(taskList);

mode1(taskList);