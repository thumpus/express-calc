function convertToInt(numberStrings){
    let converted = [];
    for (let num of numberStrings){
        let int = Number(num);
        if (Number.isNaN(int)){
            return new Error(`${num} is not a valid number`, 400)
        } else {
            converted.push(int);
        }
    }
    return converted;
}

module.exports = convertToInt;

