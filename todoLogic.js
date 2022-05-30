const btnAddTask = document.querySelector("#add-task-btn")
const taskList = document.querySelector(".task-list")
const inputDescription = document.getElementById("description")
const checkDoneTask = document.querySelectorAll(".check-task-style")

let allertIsActive = false;

const webAlert = (desc, bgcolor = "hsl(0, 60%, 40%)") => {
    const allert = document.createElement("div");
    allert.className = "allert";
    allert.textContent = `${desc}`;
    allert.style.background = `${bgcolor}`
    allert.style.fontWeight = "bold"
    allert.style.display = "flex";
    if (allertIsActive === false) {
        document.body.append(allert)
        allertIsActive = true;
        let i = 1
        setTimeout(() => {
            const alertInter = setInterval(() => {
                if (i >= 0) {
                    allert.style.opacity = `${i -= 0.01}`
                }
            }, 7)

            setTimeout(() => {
                allert.classList.remove("d-flex")
                clearInterval(alertInter)
                allertIsActive = false;
                document.body.removeChild(document.querySelector(".allert"))
            }, 700)
        }, 2500)
    } else {
        return
    }
}



class TaskValues {
    constructor() {
        this.description = this.getDescriptionInput() || "";
    }
    getDescriptionInput() {
        this.description = document.querySelector("#description")
            .addEventListener("change", (e) => {
                this.description = e.target.value;
            })
    }
}




class CreateTask {
    constructor(description) {
        this.description = description
    }

    create() {
        this.taskListItem = document.createElement("li")
        this.taskListItem.className = "task-list__item"
        this.taskDescWrapper = document.createElement("div")
        this.taskDescWrapper.className = "title"
        this.actionWrapper = document.createElement("div")
        this.actionWrapper.classList = "action-task-wrapper"

        this.taskDescription = document.createElement("h1")
        this.taskDescription.textContent = this.description;

        this.checkTask = document.createElement("input")
        this.checkTask.type = "checkbox"
        this.checkTask.className = "check-task-style"
        this.checkTask.classList.add("check-task")

        this.deleteTaskBtn = document.createElement("button");
        this.deleteTaskBtn.classList = "delete-task-btn";


        this.taskListItem.append(this.taskDescWrapper)
        this.taskListItem.append(this.actionWrapper)
        this.taskDescWrapper.append(this.taskDescription)
        this.actionWrapper.append(this.checkTask)
        this.actionWrapper.append(this.deleteTaskBtn)
        return this.taskListItem;
    }
}

const DataTask = new TaskValues();

const deleteTask = (event) => {
    const tasks = [...document.querySelectorAll(".task-list__item")]
    tasks.forEach((element, index) => {
        element.addEventListener("click", (event) => {
            if (event.target.tagName === "BUTTON" && tasks[index] === element) {
                element.remove();
            } else {
                return
            }
        })
    });
}

const checkOfTheTask = ()=>{
    const tasks = [...document.querySelectorAll(".task-list__item")]
    tasks.forEach((element)=>{
        element.addEventListener("change", (event)=>{
            const checkboxTask = element.querySelector(".check-task")
            if(checkboxTask.checked === true){
                element.classList.add("checked")
            }else{
                element.classList.remove("checked")
            }

        })
    
    })
}


const addTaskHandler = (e) => {
    e.preventDefault();
    if (DataTask.description.length <= 0) {
        return webAlert("Nie podałeś treści zadania!");;
    } else {
        const task = new CreateTask(DataTask.description);
        taskList.append(task.create());
        DataTask.description = "";
        inputDescription.value = "";
    }
    checkOfTheTask()
    deleteTask()
}






btnAddTask.addEventListener("click", addTaskHandler)