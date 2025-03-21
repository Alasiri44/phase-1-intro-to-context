// Your code here
let employeeRecords = [];
// creating the payroll system which populates record from an array
function createEmployeeRecord(myArray){
    
    
        employeeRecords =  
            {
                firstName: myArray[0],
                familyName: myArray[1],
                title: myArray[2],
                payPerHour: myArray[3],
                timeInEvents: [],
                timeOutEvents: [],
            }
        
   
    return employeeRecords;
}

// process an array of arrays into an array of employee records
function createEmployeeRecords(myArray){
    let employeeRecords = [];
    myArray.forEach(element => {
        employeeRecords.push(createEmployeeRecord(element))
    });
    
    return employeeRecords;
}

function createTimeInEvent(record, timestamp) {
    const [myDate, myTime] = timestamp.split(" ");
    const existingEvent = record.timeInEvents.find(event => event.date === myDate);

    if (existingEvent) {
        // If date exists, update the hour
        existingEvent.hour = parseInt(myTime, 10);
    } else {
        // Otherwise, create a new time-in event
        record.timeInEvents.push({
            type: 'TimeIn',
            date: myDate,
            hour: parseInt(myTime, 10)
        });
    }

    return record;
}

function createTimeOutEvent(record, timestamp){
    const [myDate,myTime] = timestamp.split(" ");
    const existingEvent = record.timeOutEvents.find(e => e.date === myDate);

    if(existingEvent){
        existingEvent.hour = parseInt(myTime, 10);
    }else{
    record.timeOutEvents.push(
        {
            type: 'TimeOut',
            date: myDate,
            hour: parseInt(myTime, 10)
        })
    };
    return record;
}

function hoursWorkedOnDate(record, date){
    let hoursWorked = 0;
    for(let i = 0; i < record.timeInEvents.length; i++){
        hoursWorked += record.timeOutEvents[i].hour - record.timeInEvents[i].hour;
        console.log(hoursWorked);
    }
    return hoursWorked/100;
}

function wagesEarnedOnDate(record,date='0'){
    let hoursWorked = hoursWorkedOnDate(record, date);
    return hoursWorked * record.payPerHour;
}

function allWagesFor(record){
    let wages = wagesEarnedOnDate(record);
    return wages;
}

function calculatePayroll(employees){
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
}
 
