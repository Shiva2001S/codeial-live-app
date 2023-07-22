export function getFormBody(params) {
    let formBody = [];

    for(let property in params){
        let encodedKey = encodedURIComponent(property); //'user name' => 'user%20name'
        let encodedValue = encodedURIComponent(params[property]); //'user name' => 'user%20name'

        formBody(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&') //'username=aakash&password=1234'
}