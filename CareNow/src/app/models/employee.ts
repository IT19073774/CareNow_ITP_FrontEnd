
export class Employee {

	employeeId: number;
	firstName: String;
	lastName: String;
    nic: String;
    contactNo: String;
	address: String;
	gender: String;
	dob: String;
	email: String;
    hiredDate: String;
    type: String;

    constructor(EmployeeId: number,FirstName: String,LastName: String,NIC: String,ContactNo: String,Address: String,Gender: String,
        DOB: String,Email: String,HiredDate: String,Type: String) {
            this.employeeId = EmployeeId;
            this.firstName = FirstName;
            this.lastName = LastName;
            this.nic = NIC;
            this.contactNo = ContactNo;
            this.address = Address;
            this.gender = Gender;
            this.dob = DOB;
            this.email = Email;
            this.hiredDate = HiredDate;
            this.type = Type;
    }

    public getId() {
        return this.employeeId;
    }
    
}