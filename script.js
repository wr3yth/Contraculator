var base = 10; 
var customNumerals = "0123456789"; 
var inDecimal = document.getElementById('in-decimal');

// Activate the placeholder for the input fields
function activatePlaceholder() {
    var numeralsField = document.getElementById("numerals");
    numeralsField.placeholder = "0123456789";
    updateInDecimalPlaceholder(customNumerals.length);
}

// Function to update the result box with base and custom numerals
function updateResultBox() {
    var howbase = charSeparator();
    var resultBox = document.getElementById("resultBox");
    resultBox.innerHTML = "Custom Numerals: " + howbase + "<br>Base: " + base;
    resultBox.style.display = "block";
}

// Function to put + between each character
function charSeparator() {
    var newbase = "";
    for (var i = 0; i < customNumerals.length; i++) {
        newbase += customNumerals[i];
        if (i < customNumerals.length - 1) {
            newbase += ",";
        }
    }
    return newbase;
}

function charGuide(customNumerals) {
    var guide = "";
    for (var i = 0; i < customNumerals.length; i++) {
        guide += i + " = " + customNumerals[i] + "\n";
    }
    return guide;
}

// Function to update the placeholder of inDecimal
function updateInDecimalPlaceholder(length) {
    var placeholderText = "";
    for (var i = 0; i < length; i++) {
        placeholderText += i;
        if (i < length - 1) {
            placeholderText += ",";
        }
    }
    inDecimal.placeholder = placeholderText || "0";
}

// Event listener to update the inDecimal placeholder based on the numerals input length
document.getElementById("numerals").addEventListener("input", function() {
    updateInDecimalPlaceholder(this.value.length);
});

/*
function updateDecalculatePlaceholder(length) {
    var placeholderText = "";
    for (var i = 0; i < length; i++) {
        placeholderText += i;
        if (i < length - 1) {
            placeholderText += ",";
        }
    }
    Decalculate.placeholder = placeholderText || "0";
}


document.getElementById("calculate").addEventListener("input", function() {
    updateDecalculatePlaceholder(this.value.length);
});
*/

// Apply button functionality
document.getElementById("applyBtn").addEventListener("click", function() {
    customNumerals = document.getElementById("numerals").value;
    //inDecimal.value = document.getElementById("numerals").value;
    base = customNumerals.length; // Update the base
    updateInDecimalPlaceholder(customNumerals.length); // Update inDecimal placeholder
    updateResultBox();
});

// Calculation input functionality
document.getElementById("calculation").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        var calculation = document.getElementById("calculation").value;
        // Perform calculation using custom numerals
        var result = evaluateCalculation(calculation);
        document.getElementById("resultBox").innerHTML += "<br>  " + calculation + " = " + result;
        document.getElementById("resultBox").style.display = "block";
        // Clear the calculation input field
        document.getElementById("calculation").value = "";
    }
});

// Function to evaluate the calculation
function evaluateCalculation(calculation) {
    // Replace custom numerals with standard numerals
    for (var i = 0; i < customNumerals.length; i++) {
        calculation = calculation.split(customNumerals[i]).join(i.toString());
    }
    // Evaluate the modified calculation
    return evaluate(calculation);
}

// Function to evaluate the modified calculation
function evaluate(calculation) {
    // Split the calculation into parts
    var parts = calculation.split(/([\+\-\*\/])/);
    // Initialize result with the first number
    var result = parseInt(parts[0], base);
    // Iterate over the parts
    for (var i = 1; i < parts.length; i += 2) {
        var operator = parts[i];
        var operand = parseInt(parts[i + 1], base);
        // Perform the operation
        if (operator === "+") {
            result += operand;
        } else if (operator === "-") {
            result -= operand;
        } else if (operator === "*") {
            result *= operand;
        } else if (operator === "/") {
            result /= operand;
        }
    }
    // Convert the result to a string representation in the custom base
    return convertToCustomBase(result);
}

// Function to convert a number to a string representation in the custom base
function convertToCustomBase(number) {
    var customNumber = "";
    while (number > 0) {
        var remainder = number % base;
        customNumber = customNumerals[remainder] + customNumber;
        number = Math.floor(number / base);
    }
    return customNumber || customNumerals[0];
}

// Initial update of the result box
updateResultBox();
