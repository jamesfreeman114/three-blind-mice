import { displayEmployees } from "./employees.js";


const container = document.querySelector("#container")

const render = async () => {
    const employeeHTML = await displayEmployees()

    const composedHTML = `
        <h1>Employees</h1>
        ${employeeHTML}
        `

    container.innerHTML = composedHTML    

}

render()