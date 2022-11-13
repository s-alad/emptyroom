class Classroom {
    roomnumber: string;
    avaliable?: boolean = true;
    occupiedSlots?: string[] = [];
    
    constructor(roomnumber: string) {
        this.roomnumber = roomnumber;
    }
}

export default Classroom;