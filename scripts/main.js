import { displayEmployees } from "./employees.js";
import { displayCustomers } from "./customerList.js";

const container = document.querySelector("#container")

const render = async () => {
    const employeeHTML = await displayEmployees()
    const customerHTML = await displayCustomers()

    const composedHTML = `
        <h1>Employees</h1>
        ${employeeHTML}

        <h2>Customers</h2>
        ${customerHTML}
        `

    container.innerHTML = composedHTML    

}

render()