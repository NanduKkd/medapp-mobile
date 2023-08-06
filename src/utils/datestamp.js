import { fillDigits } from './number'
const monthNames = ['January', 'February','March','April','May','June','July','August','September','October','November','December']
const shortMonthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function getTzDiff() {
	return new Date(`2022-01-01T00:00:00Z`).getTime()-new Date('2022-01-01T00:00:00+00:00').getTime();
}

export default class Datestamp {
	constructor(d=new Date()) {
		if(typeof d === "string") {
			let split = d.split('-')
			this.date = parseInt(split[2])
			this.month = parseInt(split[1])-1
			this.year = parseInt(split[0])
			this.ds = (new Date(d+`T00:00:00+00:00`).getTime())/24/60/60/1000
		} else if (typeof d === 'number') {
			this.ds = d;
			let date = new Date(d*24*60*60*1000+getTzDiff());
			this.date = date.getDate();
			this.month = date.getMonth();
			this.year = date.getFullYear();
		} else {
			this.date = d.getDate()
			this.month = d.getMonth()
			this.year = d.getFullYear()
			this.ds = (new Date(`${d.getFullYear()}-${fillDigits(d.getMonth())}-${fillDigits(d.getDate())}T00:00:00+00:00`).getTime())/24/60/60/1000
		}
		this.format.bind(this)
		this.toString.bind(this)
		this.toDate.bind(this)
		this.age.bind(this)
	}
	age(at=new Datestamp()) {
		const diff = at.year - this.year;
		const atBirthday = new Datestamp(`${at.year}-${this.month}-${this.date}`)
		if(atBirthday.ds>this.ds) return diff-1
		return diff
	}
	format(pattern) {
		return pattern
			.replace(/\bYYYY\b/g, this.year)
			.replace(/\bMMMM\b/g, monthNames[this.month])
			.replace(/\bMMM\b/g, shortMonthNames[this.month])
			.replace(/\bMM\b/g, fillDigits(this.month))
			.replace(/\bM\b/g, this.month+1)
			.replace(/\bDD\b/g, fillDigits(this.date))
			.replace(/\bD\b/g, this.date)
	}
	toString(){
		return `${this.year}-${fillDigits(this.month)+1}-${fillDigits(this.date)}`
	}
	toDate(){
		return new Date(this.toString()+'T00:00:00Z')
	}
}
