
<template>
    <div class="container">
      <h1>Select a Clock</h1>
  
      <!-- Dropdown Menu -->
      <select v-model="selectedClock">
        <option v-for="clock in clocks" :key="clock.name" :value="clock">
          {{ clock.name }}
        </option>
      </select>
  
      <!-- Display Selected Image -->
      <div v-if="selectedClock" class="image-container">
        <img :src="selectedClock.url" :alt="selectedClock.name" />
      </div>
  
      <!-- Generate NFT Button -->
      <button @click="createNFT" :disabled="!selectedClock">
        Generate NFT
      </button>
  
      <!-- Loading Spinner -->
      <div v-if="loading" class="loading">Minting NFT...</div>
  
      <!-- Confirmation Modal -->
      <div v-if="nftUrl" class="modal">
        <div class="modal-content">
          <h2>NFT Created! 🎉</h2>
          <p>View your NFT on the blockchain explorer:</p>
          <a :href="nftUrl" target="_blank">View NFT</a>
          <button @click="nftUrl = ''">Close</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import * as xrpl from 'xrpl';
  
  const clocks = ref([
    { name: 'Clock 1', url: 'https://d2pn8kiwq2w21t.cloudfront.net/images/Consistency.width-1024.jpg' },
    { name: 'Clock 2', url: 'https://d2pn8kiwq2w21t.cloudfront.net/images/Coverage.width-1024.jpg' },
    { name: 'Clock 3', url: 'https://d2pn8kiwq2w21t.cloudfront.net/images/Emergency.width-1024.jpg' },
    { name: 'Clock 4', url: 'https://d2pn8kiwq2w21t.cloudfront.net/images/Collapse.width-1024.jpg' },
    { name: 'Clock 5', url: 'https://d2pn8kiwq2w21t.cloudfront.net/images/RisingWater.width-1024.jpg' },
    { name: 'Clock 6', url: 'https://d2pn8kiwq2w21t.cloudfront.net/images/Agriculture.width-1024.jpg' },
    { name: 'Clock 7', url: 'https://d2pn8kiwq2w21t.cloudfront.net/images/Deforestation.width-1024.jpg' },
    { name: 'Clock 8', url: 'https://d2pn8kiwq2w21t.cloudfront.net/images/Pollution.width-1024.jpg' },
    { name: 'Clock 9', url: 'https://d2pn8kiwq2w21t.cloudfront.net/images/Sinkhole.width-1024.jpg' },
    { name: 'Clock 10', url: 'https://d2pn8kiwq2w21t.cloudfront.net/images/Earthquake.width-1024.jpg' },
    { name: 'Clock 11', url: 'https://d2pn8kiwq2w21t.cloudfront.net/images/Illusion.width-1024.jpg' },
    { name: 'Clock 12', url: 'https://d2pn8kiwq2w21t.cloudfront.net/images/Precision.width-1024.jpg' },
  ]);
  
  const selectedClock = ref(null);
  const nftUrl = ref('');
  const loading = ref(false);
  
  const createNFT = async () => {
    if (!selectedClock.value) return;
  
    loading.value = true;
    const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');
    await client.connect();
  
    const wallet = xrpl.Wallet.fromSeed('YOUR_TESTNET_SECRET');
  
    const transaction = {
      TransactionType: 'NFTokenMint',
      Account: wallet.classicAddress,
      URI: xrpl.convertStringToHex(selectedClock.value.url),
      Flags: 8,
      NFTokenTaxon: 0,
    };
  
    try {
      const prepared = await client.autofill(transaction);
      const signed = wallet.sign(prepared);
      const result = await client.submitAndWait(signed.tx_blob);
      
      if (result.result.meta.TransactionResult === 'tesSUCCESS') {
        nftUrl.value = `https://xrpscan.com/tx/${signed.hash}`;
      } else {
        alert('NFT minting failed');
      }
    } catch (error) {
      console.error(error);
      alert('Error minting NFT');
    }
  
    client.disconnect();
    loading.value = false;
  };
  </script>
  
  <style scoped>
  .container {
    text-align: center;
    padding: 40px;
    background: #1e1e1e;
    color: white;
    min-height: 100vh;
  }
  select {
    margin: 20px;
    padding: 10px;
    font-size: 16px;
  }
  .image-container {
    margin-top: 20px;
  }
  .image-container img {
    width: 300px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);
  }
  button {
    padding: 10px 20px;
    margin-top: 20px;
    font-size: 16px;
    background: green;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background: darkgreen;
  }
  button:disabled {
    background: gray;
    cursor: not-allowed;
  }
  .loading {
    margin-top: 20px;
    font-size: 18px;
    color: yellow;
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    background: white;
    color: black;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
  }
  .modal button {
    background: red;
    margin-top: 10px;
  }
  </style>
  