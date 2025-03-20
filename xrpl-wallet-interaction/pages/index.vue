<template>
    <div class="wallet-connection">
      <h1>Connect with XUMM Wallet</h1>
      <button @click="login" id="signinbutton">Login</button>
      <button @click="logout" id="logoutbutton">Logout</button>
  
      <div v-if="account">
        <h2>Connected Account</h2>
        <p>{{ account }}</p>
        <form @submit.prevent="sendTransaction">
          <label for="recipient">Recipient Address</label>
          <input v-model="recipientAddress" type="text" id="recipient" required />
  
          <label for="amount">Amount (in XRP)</label>
          <input v-model="amount" type="number" id="amount" required />
  
          <button type="submit">Send Transaction</button>
        </form>
      </div>
    </div>
  </template>
  
  #### **Vue Script (index.vue):**
  ```javascript
  <script>
  export default {
    data() {
      return {
        xumm: null,
        account: null,
        recipientAddress: '',
        amount: 0,
      };
    },
    methods: {
      // Login to XUMM wallet
      login() {
        this.xumm.authorize()
          .then(() => {
            this.xumm.user.account.then(account => {
              this.account = account;
            });
          })
          .catch(error => {
            console.error('Login failed:', error);
          });
      },
  
      // Logout from XUMM wallet
      logout() {
        this.xumm.logout();
        this.account = null;
      },
  
      // Send XRP transaction
      async sendTransaction() {
        if (!this.recipientAddress || this.amount <= 0) {
          alert('Please enter a valid address and amount');
          return;
        }
  
        try {
          // Convert amount to "drops" (1 XRP = 1,000,000 drops)
          const amountInDrops = this.amount * 1000000;
  
          // Construct the payload
          const payload = {
            transaction: {
              TransactionType: 'Payment',
              Account: this.account,  // The connected user's address
              Amount: amountInDrops,  // Convert XRP to drops
              Destination: this.recipientAddress,  // Recipient's address
            }
          };
  
          console.log('Payload before sending:', payload);
  
          // Send the payload to XUMM for approval
          const response = await this.xumm.payload.create(payload);
  
          // Check the response from XUMM
          if (response && response.uuid) {
            console.log('Payload created:', response);
            window.location.href = `xumm://payload/${response.uuid}`;  // Redirect user to XUMM for approval
          } else {
            throw new Error(`Failed to create payload. Response: ${JSON.stringify(response)}`);
          }
        } catch (error) {
          console.error('Error sending transaction:', error);
        }
      }
    },
    mounted() {
      // Initialize XUMM SDK with API key from runtime config
      const xummApiKey = useRuntimeConfig().public.XUMM_API_KEY;  // Access public config for API key
      this.xumm = new Xumm(xummApiKey);
  
      // Event listeners for XUMM SDK
      this.xumm.on("ready", () => console.log("XUMM SDK ready"));
  
      this.xumm.on("success", async () => {
        this.xumm.user.account.then(account => {
          this.account = account;
        });
      });
  
      this.xumm.on("logout", async () => {
        this.account = null;
      });
    }
  };
  </script>
  
  #### **Vue Style (index.vue):**
  ```css
  <style scoped>
  .wallet-connection {
    text-align: center;
    margin-top: 20px;
  }
  
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  input {
    padding: 10px;
    margin: 10px;
    width: 250px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #218838;
  }
  </style>
  