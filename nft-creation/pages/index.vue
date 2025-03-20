<template>
    <div class="container">
      <h1>NFT Clock Generator ⏳</h1>
      <button @click="$router.push('/create')">Create NFT</button>
    </div>
  </template>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: #1e1e1e;
    color: white;
    text-align: center;
  }
  h1 {
    margin-bottom: 20px;
  }
  button {
    padding: 10px 20px;
    font-size: 16px;
    background: blue;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background: darkblue;
  }
  </style>
  