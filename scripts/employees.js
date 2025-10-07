export const displayEmployees = async () => {
    const response = await fetch("http://localhost:8088/employees?_expand=computer&_expand=department&_expand=location")
    const allEmployees = await response.json()


    let html = '<div class=employees>'

    const generateEmployeeHTML = allEmployees.map(
        (employee) => {
            return `<header class="employee__name">
                        <h1>${employee.firstName} ${employee.lastName}</h1>
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
            `
        }
    )

    html += generateEmployeeHTML.join("")

    html += '</div>'

    return html

}


