<template>
  <div class="chat">
    <h1>Business Idea Evaluator</h1>

    <!-- Form to submit idea -->
    <form @submit.prevent="submitIdea" class="form">
      <div>
        <label for="idea">Your Business Idea:</label>
        <textarea id="idea" v-model="idea" rows="4" placeholder="Enter your idea..." required></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>

    <!-- Display AI score -->
    <div v-if="score !== null" class="score">
      <h3>Credibility Score: {{ score }}</h3>
    </div>

    <!-- Error message -->
    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const idea = ref('')
const score = ref(null)
const error = ref('')

const submitIdea = async () => {
  if (!idea.value.trim()) {
    error.value = 'Please enter a business idea.'
    return
  }

  try {
    error.value = ''
    
    // Using $fetch for client-side API request
    const response = await $fetch('/api/evaluate', {
      method: 'POST',
      body: { idea: idea.value }
    })
    
    if (response?.score !== undefined) {
      score.value = response.score
    } else {
      error.value = 'Error evaluating idea.'
    }
  } catch {
    error.value = 'API connection error.'
  }
}
</script>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  text-align: center;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin-bottom: 20px;
}

textarea {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  resize: vertical;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #45a049;
}

.score {
  margin-top: 20px;
}

.error {
  color: red;
  margin-top: 20px;
}
</style>
