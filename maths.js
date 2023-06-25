// Define the function to get the operation from the user message
function getOperationFromMessage(message) {
    for (const key in operationSynonyms) {
        if (operationSynonyms.hasOwnProperty(key)) {
            const synonyms = operationSynonyms[key];
            if (synonyms.some(synonym => message.includes(synonym))) {
                return key;
            }
        }
    }
    return null;
}

// Define the function to perform a math operation
function performMathOperation(message, operation) {
    const words = message.split(" ");
    const numbers = words.filter(word => !isNaN(word)).map(Number);

    if (numbers.length < 2) {
        return "I'm sorry, I didn't find enough numbers to perform the operation.";
    }

    let result = numbers[0];
    let response = '';

    for (let i = 1; i < numbers.length; i++) {
        const number = numbers[i];

        if (operation === "add") {
            result += number;
            response += `${addSentences[Math.floor(Math.random() * addSentences.length)]} ${result}. `;
        } else if (operation === "subtract") {
            result -= number;
            response += `${subtractSentences[Math.floor(Math.random() * subtractSentences.length)]} ${result}. `;
        } else if (operation === "multiply") {
            result *= number;
            response += `${multiplySentences[Math.floor(Math.random() * multiplySentences.length)]} ${result}. `;
        } else if (operation === "divide") {
            if (number === 0) return "I'm sorry, I can't divide by zero.";
            result /= number;
            response += `${divideSentences[Math.floor(Math.random() * divideSentences.length)]} ${result}. `;
        } else if (operation === "exponentiation") {
            result = Math.pow(result, number);
            response += `${exponentiationSentences[Math.floor(Math.random() * exponentiationSentences.length)]} ${result}. `;
        } else if (operation === "sqrt") {
            if (result < 0) return "I'm sorry, I can't take the square root of a negative number.";
            result = Math.sqrt(result);
            response += `${sqrtSentences[Math.floor(Math.random() * sqrtSentences.length)]} ${result}. `;
        } else if (operation === "log") {
            if (result <= 0) return "I'm sorry, I can't take the logarithm of a number less than or equal to zero.";
            result = Math.log(result);
            response += `${logSentences[Math.floor(Math.random() * logSentences.length)]} ${result}. `;
        }
    }

    return response;
}