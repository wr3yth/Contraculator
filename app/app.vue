<template>
  <NuxtLoadingIndicator color="#2525ff" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup></script>

<style>
html,
body {
  background-color: #1d1f21;
  color: #c5c8c6;
  font-family: 'Roboto', Arial, sans-serif;
  font-size: 16px;
}

input[type='text'] {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #373b41;
  background-color: #1d1f21;
  color: #c5c8c6;
  box-sizing: border-box;
  @apply text-sm;
}

input[type='button'] {
  width: 100%;
  padding: 10px;
  background-color: #5f819d;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  @apply text-sm;
}

input[type='button']:hover {
  background-color: #81a2be;
}
</style>
