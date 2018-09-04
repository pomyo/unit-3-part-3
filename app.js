/** Switched from const to var..needed to be updatable  */
var employeeList = [
  {
    name: 'Jan',
    officeNum: 1,
    phoneNum: '222-222-2222'
  },
  {
    name: 'Juan',
    officeNum: 304,
    phoneNum: '489-789-8789'
  },
  {
    name: 'Margie',
    officeNum: 789,
    phoneNum: '789-789-7897'
  },
  {
    name: 'Sara',
    officeNum: 32,
    phoneNum: '222-789-4654'
  },
  {
    name: 'Tyrell',
    officeNum: 3,
    phoneNum: '566-621-0452'
  },
  {
    name: 'Tasha',
    officeNum: 213,
    phoneNum: '789-766-5675'
  },
  {
    name: 'Ty',
    officeNum: 211,
    phoneNum: '789-766-7865'
  },
  {
    name: 'Sarah',
    officeNum: 345,
    phoneNum: '222-789-5231'
  }
];

const _constants = {
  separator: "----------------------------------------------------------",
  empTemplate:    {
    name:       "Default",
    officeNum:  "N/A",
    phoneNum:   "N/A"
  }
}

const _functions = {
  
/************************************************************************************************************ 
  _    _          _                           ______                          _     _                       
 | |  | |        | |                         |  ____|                        | |   (_)                      
 | |__| |   ___  | |  _ __     ___   _ __    | |__     _   _   _ __     ___  | |_   _    ___    _ __    ___ 
 |  __  |  / _ \ | | | '_ \   / _ \ | '__|   |  __|   | | | | | '_ \   / __| | __| | |  / _ \  | '_ \  / __|
 | |  | | |  __/ | | | |_) | |  __/ | |      | |      | |_| | | | | | | (__  | |_  | | | (_) | | | | | \__ \
 |_|  |_|  \___| |_| | .__/   \___| |_|      |_|       \__,_| |_| |_|  \___|  \__| |_|  \___/  |_| |_| |___/
                     | |                                                                                    
                     |_|                                                                                    
 ***********************************************************************************************************/ 
  
  // void
  printEmp: function (employee) {
    render(`Employee Name: ${employee.name}`, 
        `Employee Office Number: ${employee.officeNum}`, 
        `Employee Phone Number: ${employee.phoneNum}`);
    render(_constants.separator);
  },

  // @Deprecated void
  printNotFound: function () {
    render('Employee Name: Not Found', 
            'Employee Office Number: N/A', 
            'Employee Phone Number: N/A');
  },

  // void
  invalidField: function () {
    render("Sorry, you've selected an invalid field to update. Refresh and try again.");
  },

 /********************************************************************************************************************
  _____                                       _       ______                          _     _                       
  |  __ \                                     | |     |  ____|                        | |   (_)                      
  | |__) |  _ __    ___    _ __ ___    _ __   | |_    | |__     _   _   _ __     ___  | |_   _    ___    _ __    ___ 
  |  ___/  | '__|  / _ \  | '_ ` _ \  | '_ \  | __|   |  __|   | | | | | '_ \   / __| | __| | |  / _ \  | '_ \  / __|
  | |      | |    | (_) | | | | | | | | |_) | | |_    | |      | |_| | | | | | | (__  | |_  | | | (_) | | | | | \__ \
  |_|      |_|     \___/  |_| |_| |_| | .__/   \__|   |_|       \__,_| |_| |_|  \___|  \__| |_|  \___/  |_| |_| |___/
                                      | |                                                                            
                                      |_|                                                                            
  *******************************************************************************************************************/ 
  
  // void
  print: function (array) {
    array.forEach(e => {
      _functions.printEmp(e);
    })
  },

  // return json { exists, emp }
  verify: function (array) {

    let exists = false;
    let emp = _constants.empTemplate;

    emp.name = prompt("Enter a name");

    array.forEach(e => {
      if(emp.name === e.name) {
        exists = true;
        emp = e;
      }
    })

    render(`Employee exists: ${exists}`);
  
    let data = {
      exists: exists,
      emp: emp
    }

    return data;
  },

  // return json { exists, emp }
  lookup: function (array) {

    let data = _functions.verify(array);

    if(data.exists) {
      _functions.printEmp(data.emp);
    }

    return data;
  },

  // void
  contains: function (array) {
    let searchString = prompt("Enter text to search for")
    let foundOne = false;
    array.forEach( e => {
      if(e.name.includes(searchString)) {
        foundOne = true;
        _functions.printEmp(e);
      }
    })

    if(!foundOne) {
      render("No employee names containing: " + searchString);
    }
  },

  // return new array
  update: function (array) {

    let _array = array;
    let data = _functions.lookup(_array);

    if(data.exists) {

      let field = prompt("Enter a field (name, office number, phone number)");
      let value = prompt("Enter a value for the field");
      
        switch(field.toLowerCase()) {
          case "name":
            data.emp.name = value;
          break;
  
          case "office number":
            data.emp.officeNum = value;
          break;
            
          case "phone number":
            data.emp.phoneNum = value;
          break;
            
          default: 
            _functions.invalidField();
          break;
        }

        render("Updated employee information: ");
        _functions.printEmp(data.emp);


    } else {
        render("Can not update a non-existing employee, please add employee first. Refresh and try again.")
    }

    return _array;

  },

  // return new array
  add: function (array) {

    let _array = array;
    let data = _functions.lookup(_array);

    if(data.exists) {
      render("Employee already exists");
    } else {
      let oNumber = prompt("Enter an office number");
      let tNumber = prompt("Enter a phone number");

      data.emp.officeNum = oNumber;
      data.emp.phoneNum = tNumber;
      _array.push(data.emp);
      render("New employee added: ")
      _functions.print(_array);
    }

    return _array;

  },

  // return new array
  delete: function (array) {

    let _array = array;
    let data = _functions.lookup(_array);

    if(data.exists) {
      for(let i = 0; i < _array.length; i ++) {
        if(data.emp.name === _array[i].name)
          _array.splice(i, 1); 
      }
      render("Deleted employee: ");
      _functions.print(_array);

    } else {
      render("Can not delete a non-existing employee. Refresh and try again.")
    }

    return _array;
  },

  table: function (array) {
      var table = document.createElement("table");
        table.classList.add("display");
        table.setAttribute("id", "employeeTable");

      var tableHead = document.createElement("thead");
      var headerRow = document.createElement("tr");

      var nameColumn = document.createElement("th");
        nameColumn.innerHTML = "Name";

      var officeNumColumn = document.createElement("th");
        officeNumColumn.innerHTML = "Office Number";

      var phoneNumColumn = document.createElement("th");
        phoneNumColumn.innerHTML = "Phone Number";

        headerRow.appendChild(nameColumn);
        headerRow.appendChild(officeNumColumn);
        headerRow.appendChild(phoneNumColumn);
        tableHead.appendChild(headerRow);
        table.appendChild(tableHead);

      var tableBody = document.createElement("tbody");

      array.forEach( e => {
        let row = document.createElement("tr");

        let name = row.insertCell(0);
        name.innerHTML = e.name;

        let officeNum = row.insertCell(1);
        officeNum.innerHTML = e.officeNum;

        let phoneNum = row.insertCell(2);
        phoneNum.innerHTML = e.phoneNum;
        
        tableBody.appendChild(row);
      });

      table.appendChild(tableBody);

      var _content = document.getElementById("content");
      _content.appendChild(table);

      $('#employeeTable').DataTable();
      $('#employeeTable').css("text-align", "center");

  },

  // void
  command: function () {
    const input = prompt("Enter command");

    switch(input) {

      case "table":
        _functions.table(employeeList);
      break;

      case "print":
        _functions.print(employeeList);
        break;
    
      case "verify":
        _functions.verify(employeeList);
        break;
    
      case "lookup":
        _functions.lookup(employeeList);
        break;
    
      case "contains":
        _functions.contains(employeeList);
        break;
    
      case "update":
        employeeList = _functions.update(employeeList);
      break;
    
      case "add":
        employeeList = _functions.add(employeeList);
      break;
    
      case "delete":
        employeeList = _functions.delete(employeeList);
      break;
    
      default:
        render("Invalid command. Refresh and try again.");
      break;
    
    }
  }
}

/** No native document.ready #sad */
_functions.command();