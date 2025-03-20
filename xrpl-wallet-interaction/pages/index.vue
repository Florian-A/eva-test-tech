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
  
          // Construct the payload (without 'Account' field, which is handled by XUMM)
          const payload = {
            transaction: {
              TransactionType: 'Payment',
              Amount: amountInDrops,  // Convert XRP to drops
              Destination: this.recipientAddress,  // Recipient's address
            }
          };
  
          console.log('Payload before sending:', payload);
  
          // Send the payload to XUMM for approval
          const response = await this.xumm.payload.create(payload);
  
          // Log the response for debugging
          console.log('XUMM Payload Response:', response);
  
          // Check the response and handle accordingly
          if (response && response.uuid) {
            console.log('Payload created successfully:', response);
            // Redirect user to XUMM for approval
            window.location.href = `xumm://payload/${response.uuid}`;
          } else {
            // Additional log for null response
            console.error('Failed to create payload. Response:', response);
            alert('Failed to create the transaction. Please check the console for detailed error messages.');
          }
        } catch (error) {
          console.error('Error sending transaction:', error);
          alert('There was an error creating the transaction. Please check the console for details.');
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
  