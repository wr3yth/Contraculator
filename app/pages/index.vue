<template>
  <div class="flex h-screen items-center justify-center">
    <div
      class="flex w-full max-w-[480px] flex-col gap-4 rounded-xl bg-[#282a2e] p-6 drop-shadow-xl">
      <label class="flex flex-col">
        Input alternative numeric values:
        <input v-model="numerals" type="text" placeholder="0123456789" />
      </label>
      <label class="flex flex-col">
        numeric value of input characters:
        <input
          :value="numericValues"
          type="text"
          placeholder="0,1,2,3,4,5,6,7,8,9"
          readonly />
      </label>

      <div class="mb-5 flex w-full justify-between gap-3">
        <ResultBox class="flex-1">
          <div>Custom Numerals:</div>
          <div>
            {{ numerals.split('').join(', ') }}
          </div>
          <div>Base: {{ base }}</div>
        </ResultBox>
        <ResultBox class="flex-1">
          <div>In decimal:</div>
          <div>
            {{ numericValues }}
          </div>
          <div>Base: {{ base }}</div>
        </ResultBox>
      </div>
      <label class="flex flex-col">
        Contraculation box:
        <input v-model="expression" type="text" placeholder="user input" />
      </label>
      <div>
        <div>Result:</div>
        <ResultBox class="flex-1">
          <template v-if="expressionResult">
            <div>{{ expression }} = {{ expressionResultInCustomBase }}</div>
            <div>
              {{ expressionToEvaluate }} =
              {{ expressionResult }}
            </div>
          </template>
        </ResultBox>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const numerals = ref('');
const base = computed(() => numerals.value.length);
const numericValues = computed(() => {
  let values = '';
  for (let i = 0; i < numerals.value.length; i++) {
    values += i + ', ';
  }
  values = values.replace(/,\s*$/, '');
  return values;
});

const expression = ref('');

const expressionToEvaluate = computed(() => {
  // Replace custom numerals with standard numerals
  let val = expression.value;
  for (let i = 0; i < numerals.value.length; i++) {
    val = val.split(numerals.value.charAt(i)).join(i.toString());
  }
  return val;
});

const expressionResult = computed(() => {
  return evaluate(expressionToEvaluate.value);
});

const expressionResultInCustomBase = computed(() => {
  return convertToCustomBase(expressionResult.value);
});

// Function to evaluate the modified calculation
function evaluate(expressionToEvaluate: string) {
  // Split the calculation into parts
  const parts = expressionToEvaluate.split(/([+\-*/])/);
  // Initialize result with the first number
  let result = parseInt(parts[0] || '0', base.value);
  // Iterate over the parts
  for (let i = 1; i < parts.length; i += 2) {
    const operator = parts[i];
    const operand = parseInt(parts[i + 1] || '0', base.value);
    // Perform the operation
    if (operator === '+') {
      result += operand;
    } else if (operator === '-') {
      result -= operand;
    } else if (operator === '*') {
      result *= operand;
    } else if (operator === '/') {
      result /= operand;
    }
  }

  // Convert the result to a string representation in the custom base
  return result;
}

// Function to convert a number to a string representation in the custom base
function convertToCustomBase(number: number) {
  let customNumber = '';
  while (number > 0) {
    const remainder = number % base.value;
    customNumber = numerals.value[remainder] + customNumber;
    number = Math.floor(number / base.value);
  }
  return customNumber || numerals.value[0];
}
</script>
