const hasha = require('hasha');
let name = 'ExcelMan';

function sendHMsg(){
    console.log(hasha(name));
}
