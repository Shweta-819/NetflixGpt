
const validatedata = (email, password) => {
 const emaildata = (/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/).test(email);
 const passworddata = (/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/).test(password);
//  const fullnamedata = (/^[a-zA-Z]+ [a-zA-Z]+$/).test(fullname);

 if(!emaildata)return ("Email entered is not valid")
 if(!passworddata)return ("Password entered is not valid")
//  if(!fullnamedata)return("Full name entered is not valid")
}
export default validatedata;
