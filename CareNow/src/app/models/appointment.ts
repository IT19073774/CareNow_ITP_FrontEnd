
export class Appointment {
    
    appointmentId:number;
    subject:string;
    description:string;
    startTime:string;
    endTime:string;

    constructor(id:number, description:string, endTime:string, startTime:string, subject:string) {
        this.appointmentId = id;
        this.subject = subject;
        this.endTime = endTime;
        this.description = description;
        this.startTime = startTime;
    }

    public getId() {
        return this.appointmentId;
    }
    
}