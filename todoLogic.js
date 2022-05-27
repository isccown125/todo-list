const btnAddTask = document.querySelector("#add-task-btn")
const taskList = document.querySelector(".task-list")
const inputDescription = document.getElementById("description")
const checkDoneTask = document.querySelectorAll(".check-task-style")
const deleteTaskBtn = document.querySelectorAll(".delete-task-btn")

let allertIsActive = false;
const arrTask = []

const allertHandler = (desc, bgcolor = "hsl(0, 60%, 40%)") => {
    const allert = document.createElement("div");
    allert.className = "allert";
    allert.textContent = `${desc}`;
    allert.style.background = `${bgcolor}`
    allert.style.fontWeight =  "bold"
    allert.style.display = "flex";
    if (allertIsActive === false) {
        document.body.append(allert)
        allertIsActive = true;
        let i = 1
        setTimeout(() => {
            const alertInter = setInterval(() => {
                if (i >= 0) {
                    allert.style.opacity = `${i -= 0.01}`
                    console.log("cos")
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
        this.actionWrapper.classList =  "action-task-wrapper"

        this.taskDescription = document.createElement("h1")
        this.taskDescription.textContent = this.description;
        
        this.checkTask = document.createElement("input")
        this.checkTask.type = "checkbox"
        this.checkTask.className = "check-task-style"

        this.deleteTaskBtn = document.createElement("button");
        this.deleteTaskBtn.classList = "delete-task-btn";


        this.taskListItem.append(this.taskDescWrapper)
        this.taskListItem.append(this.actionWrapper)
        this.taskDescWrapper.append(this.taskDescription)
        this.actionWrapper.append(this.checkTask)
        this.actionWrapper.append(this.deleteTaskBtn)

        arrTask.push(this.taskListItem);
        return this.taskListItem;
    }
}

const DataTask = new TaskValues();

btnAddTask.addEventListener("click", (e) => {
    e.preventDefault();


    if (DataTask.description.length <= 0) {
        return allertHandler("Nie podałeś treści zadania!");;
    } else {
        const task = new CreateTask(DataTask.description);
        console.log(DataTask.description)
        taskList.append(task.create());
        DataTask.description = "";
        inputDescription.value = "";
    }
})



