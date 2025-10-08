export const displayEmployees = async () => {
    const response = await fetch("http://localhost:8088/employees?_expand=computer&_expand=department&_expand=location")

    const allEmployees = await response.json()

    const employeeCustomerResponse = await fetch("http://localhost:8088/employeeCustomers?_expand=customer&_expand=employee")

    const customerRelationships = await employeeCustomerResponse.json()

    let html = '<div class=employees>'

    const generateEmployeeHTML = allEmployees.map(
        (employee) => {
    
        const relationships = customerRelationships.filter(
            (customerEmployee) => customerEmployee.employee.id === employee.id
            )

            const assignedCustomers = relationships.map(
                (assignedCustomer) => {
                    return `<li>${assignedCustomer.customer.name}</li>`
                }).join("");


            

            return `<header class="employee__name">
                        <h2>${employee.firstName} ${employee.lastName}</h2>
                    </header>
                    <section class="employee__computer"> 
                        Currently using a ${employee.computer.year} ${employee.computer.model}
                    </section>
                    <section class="employee__department">
                        Works in the ${employee.department.name} department.
                    </section>
                    <section class="employee__location">
                        Works at the ${employee.location.name} office.
                    </section>
                    <section class="employee__customers">
                        Has worked for the following customers:
                        <ul>${assignedCustomers}</ul>
                    </section>

            `
        }
    )

    html += generateEmployeeHTML.join("")


    html += '</div>'

    return html

}


