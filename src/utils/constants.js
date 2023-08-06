const PROTOCOL = 'http'
// const DOMAIN = '10.0.2.2:3000'
const DOMAIN = '192.168.43.43:3000'
// const DOMAIN = '192.168.1.3:3000'
// const DOMAIN = '127.0.0.1:3000'


const constants = {
	DOMAIN, PROTOCOL,
	'PATIENT_URL': `${PROTOCOL}://${DOMAIN}/api/patient`,
	'SOCKET_URL': `${PROTOCOL}://${DOMAIN}/socket`,
	PRIMARY: '#245c6d',
}

export default constants;
