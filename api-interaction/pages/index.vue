<template>
  <div class="home">
    <h1>Business Idea Evaluator</h1>
    <p>Submit your business idea and let our AI evaluate its credibility!</p>
    
    <!-- Button to navigate to the Chat page -->
    <NuxtLink to="/chat">
      <button>Go to Chat</button>
    </NuxtLink>
  </div>
</template>


<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
