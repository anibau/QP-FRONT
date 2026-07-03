export const getNames = (displayName) => {
    if(displayName.length === 0) return {
        "firstName": "",
        "lastName": "",
    }
    const names = displayName.split(" ");
    if(names.length == 1){
        return {
            "firstName": names[0],
            "lastName": ""
        }
    }
    if(names.length == 2){
        return {
            "firstName": names[0],
            "lastName": names[1],
        }
    }
    if(names.length == 3){
        return {
            "firstName": names[0],
            "lastName": names[1] + " " + names[2],
        }
    }
    if(names.length == 4){
        return {
            "firstName": names[0] + " " + names[1],
            "lastName": names[2] + " " + names[3],
        }
    }
    return {
        "firstName": names[0] + " " + names[1],
        "lastName": names[2] + " " + names[3],
    }
}