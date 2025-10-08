export const displayCustomers = async () => {
    const response = await fetch("http://localhost:8088/customers")

    const allCustomers = await response.json()

    const employeeCustomerResponse = await fetch("http://localhost:8088/employeeCustomers?_expand=customer&_expand=employee")

    const customerRelationships = await employeeCustomerResponse.json()

    let html = '<div class=employees>'

    const generateCustomerHTML = allCustomers.map(
        (customer) => {
    
        const relationships = customerRelationships.filter(
            (customerEmployee) => customerEmployee.customer.id === customer.id
            )

            const assignedEmployees = relationships.map(
                (assignedEmployee) => {
                    return `<li>${assignedEmployee.employee.firstName} ${assignedEmployee.employee.lastName}</li>`
                }).join("");


        return  `<h2>${customer.name}</h2>
                    Assigned Employees:<ul>${assignedEmployees}</ul>` 

    }
    )

    html += `${generateCustomerHTML}`

    html += `</div>`

    return html

}