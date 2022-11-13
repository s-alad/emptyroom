class Classroom {
    roomnumber: string;
    avaliable?: boolean = true;
    intervals: any = [];
    startIntervals: string[] = [];
    endIntervals: string[] = [];
    until?: string;
    dropped: boolean = false;
    
    constructor(roomnumber: string) {
        this.roomnumber = roomnumber;
        this.startIntervals = [];
        this.endIntervals = [];
        this.intervals = [];
    }

    getSchedule(time: Date) {

        let y = time.getFullYear();
        console.log(y)
        let m = time.getMonth() + 1;
        console.log(m)
        let d = time.getDate();
        console.log(d)

        let result: { startDate: string; endDate: string; title: string; }[] = [];
        this.intervals.forEach((interval: any) => {
            let obj = { startDate: y+'-'+m+'-'+d+'T'+interval[0], endDate: y+'-'+m+'-'+d+'T'+interval[1], title: 'occupied' }
            result.push(obj)
        })
        return result;
    }

    getIntervals() {
        console.log('intervs')
        console.log(this.roomnumber)
        console.log(this.intervals)
        console.log(typeof this.intervals)
        return this.intervals;
    }

    addInterval(interval: string[]) {
        this.intervals.push(interval);
    }

    addStartInterval(startInterval: string) {
        this.startIntervals.push(startInterval);
    }

    addEndInterval(endInterval: string) {
        this.endIntervals.push(endInterval);
    }

    sortIntervals() {
        this.startIntervals.sort();
        this.endIntervals.sort();
    }

    setUntil(hour: string) {
        if (this.avaliable) {
            for (let i = 0; i < this.startIntervals.length; i++) {
                if (this.startIntervals[i] > hour) {
                    this.until = this.startIntervals[i];
                    break;
                }
            }
        }
        else {
            for (let i = 0; i < this.endIntervals.length; i++) {
                if (this.endIntervals[i] > hour) {
                    this.until = this.endIntervals[i];
                    break;
                }
            }
        }
    }

    getUntil() {
        if (this.until == null || this.until == undefined) {
            return "until the end of the day";
        }
        else {
            //return "until " + this.until;
            if (this.avaliable) {
                return "until " + ((parseInt(this.until.split(":")[0]) % 12) || 12).toString() + ":" + this.until.split(":")[1];
            }
            else {
                return "until after " + ((parseInt(this.until.split(":")[0]) % 12) || 12).toString() + ":" + this.until.split(":")[1];
            }
        }
    }


}

export default Classroom;