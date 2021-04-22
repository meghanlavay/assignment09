// CREATE AN ARRAY OF EMPLOYEES
let employees = [
    [12345689, 'Meghan', 1234, 'meghan@gmail.com', 'Administrative'],
    [22345689, 'Bob', 2234, 'bob@gmail.com', 'Engineering'],
    [32345689, 'Sally', 3234, 'sally@gmail.com', 'Executive'],
    [42345689, 'Ted', 4234, 'ted@gmail.com', 'Marketing'],
    [52345689, 'Jen', 5234, 'jen@gmail.com', 'Quality Assurance'],
];

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
if (localStorage.getItem > 0){
    employees = JSON.parse(localStorage.getItem('storedData'));
    
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
} else {
    alert('No storage exists');
    localStorage.setItem('storedData', JSON.stringify(employees));
}

// GET DOM ELEMENTS
const $ = (id) => document.getElementById(id);
let form = $('addForm');
let table = $('employees');
let empCount= length.employees;

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid();

// ADD EMPLOYEE
form.addEventListener('submit', (e) => {

    // PREVENT FORM SUBMISSION
    e.preventDefault();

    // GET THE VALUES FROM THE TEXT BOXES
    let id = $('id').value;
    let name = $('name').value;
    let ext = $('extension').value;
    let email = $('email').value;
    let department = $('department').value;

    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    let newEmp = [id, name, ext, email, department];

    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    employees.push(newEmp);

    // BUILD THE GRID
    buildGrid();

    empCount++;
    document.getElementById('empCount').innerHTML = empCount;

    // RESET THE FORM
    form.reset();

    // SET FOCUS BACK TO THE ID TEXT BOX
    $('id').focus();
});

// DELETE EMPLOYEE
table.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {

    // CONFIRM THE DELETE
        if (confirm("Are you sure you want to delete this employee?")) {

        // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
        let tbody = document.querySelector('tbody');
        let rowIndex = e.target.parentElement.parentElement.rowIndex;

        // CALL DELETEROW() METHOD TO DELETE SPECIFIC ROW IN THE TABLE
        table.deleteRow(e.target.parentElement.parentElement.rowIndex);

        // REMOVE EMPLOYEE FROM ARRAY
        employees.splice(rowIndex -1, 1);
        localStorage.removeItem('employees', employees[employees.length - 1]);

        // BUILD THE GRID
        buildGrid();
        }
    }
});

// BUILD THE EMPLOYEES GRID
function buildGrid() {

// REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
let empTable = $('employees');
let row = document.getElementsByTagName('tbody')[0];
row.parentNode.removeChild(row);

// REBUILD THE TBODY FROM SCRATCH
tbody = document.createElement("tbody");
count = 0;

// LOOP THROUGH THE ARRAY OF EMPLOYEES
// REBUILDING THE ROW STRUCTURE
employees.forEach((item) => {
    row = tbody.insertRow();
    cellId = row.insertCell();
    cellId.appendChild(document.createTextNode(item[0]));
    cellId = row.insertCell();
    cellId.appendChild(document.createTextNode(item[1]));
    cellId = row.insertCell();
    cellId.appendChild(document.createTextNode(item[2]));
    cellId = row.insertCell();
    cellId.appendChild(document.createTextNode(item[3]));
    cellId = row.insertCell();
    cellId.appendChild(document.createTextNode(item[4])); 
    
    // CREATE THE DELETE BUTTON
    let deleteBtn   = document.createElement('button');
    deleteBtn.className = 'btn btn-sm btn-danger delete';
    deleteBtn.appendChild(document.createTextNode('X'));
    cellId = row.insertCell();
    cellId.appendChild(deleteBtn); 
});

// BIND THE TBODY TO THE EMPLOYEE TABLE
table.appendChild(tbody);

// UPDATE EMPLOYEE COUNT
count +=1;

// STORE THE ARRAY IN STORAGE
localStorage.setItem('employees', JSON.stringify(employees));

}