export const fillDigits = (num, dig=2) => {
	num += ''
	while(num.length<dig) num = '0'+num
	return num
}
