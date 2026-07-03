export const validateCardNumber = (text) => {
    if(text.length === 0){
        return "Ingrese un número de tarjeta válido";
    }
    const cleanedText = text.replace(/\s/g, '');
    if(!parseInt(cleanedText)){
        return "Ingrese un número de tarjeta válido";
    }
    return "";
}
export const validateNoEmptyInput = (text) => {
    if(text.length == 0){
        return "Ingrese un dato válido";
    }
    return "";
}
export const validateExpicyDate = (text) => {
    if(text.length != 5){
        return "Ingrese una fecha válida";
    }
    return "";
}
export const validateCVV = (text) => {
    if(text.length != 3){
        return "CVV inválido";
    }
    return "";
}