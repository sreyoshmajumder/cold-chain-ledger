# ❄️ Cold-Chain Monitoring Ledger

An enterprise-grade, blockchain-backed supply chain monitoring system. This project simulates an IoT gateway that tracks the transit of temperature-sensitive goods (pharmaceuticals, luxury seafood, dairy) and immutably records the data on an Ethereum-compatible blockchain.

If a shipment's temperature exceeds its designated safety threshold, the smart contract permanently flags the ledger as compromised, ensuring absolute trust and transparency across multiple logistics companies.

## 🚀 Features

* **Immutable Transit Logs:** Shipment creation and temperature readings are permanently stored on-chain.
* **Real-Time Breach Detection:** Smart contracts automatically evaluate IoT temperature data against custom product thresholds.
* **Professional Dashboard:** A responsive, dark-themed UI built with React and Tailwind CSS for monitoring live network syncs.
* **IoT Gateway Simulation:** A Node.js/Express backend that securely signs transactions and pushes sensor data to the blockchain.

## 🛠️ Technology Stack

* **Frontend:** React (Vite), Tailwind CSS, Lucide Icons
* **Backend:** Node.js, Express, Cors, dotenv
* **Blockchain/Web3:** Solidity, ethers.js v6, Remix IDE
* **Network:** Sepolia Testnet (via Public RPC)

## 📂 Project Architecture

1.  **Smart Contract (`ColdChain.sol`):** Manages the logic for shipment creation, temperature arrays, and breach validation.
2.  **Node.js Backend:** Acts as the secure bridge. It holds the private keys and signs transactions on behalf of the IoT sensors, preventing the need to expose wallet keys on the frontend.
3.  **React Frontend:** Reads directly from the blockchain to display a tamper-proof status dashboard and handles new registry submissions via the backend API.

## 💻 Local Setup & Execution

### Prerequisites
* Node.js installed
* MetaMask wallet with Sepolia Testnet ETH
* Deployed `ColdChain.sol` contract

### 1. Backend Setup
Navigate to the backend directory and install dependencies:
\`\`\`bash
cd backend
npm install
\`\`\`
Create a `.env` file in the `backend` directory:
\`\`\`env
PORT=5000
RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
PRIVATE_KEY=your_metamask_private_key
CONTRACT_ADDRESS=your_deployed_contract_address
\`\`\`
Start the IoT Gateway:
\`\`\`bash
npm start
\`\`\`

### 2. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
\`\`\`bash
cd frontend
npm install
\`\`\`
In `frontend/src/App.jsx`, ensure you have pasted your deployed `CONTRACT_ADDRESS` and your specific `ABI` array at the top of the file.

Start the Vite development server:
\`\`\`bash
npm run dev
\`\`\`

## 📡 Simulating an IoT Sensor Reading

To simulate a real-world temperature spike and test the smart contract's breach detection, send a POST request to your running backend:

\`\`\`bash
curl -X POST http://localhost:5000/api/iot/temperature \
-H "Content-Type: application/json" \
-d '{"shipmentId": 1, "temperature": -5}'
\`\`\`
*Note: Ensure the `shipmentId` exists and the `temperature` exceeds the maximum threshold set during the shipment creation to trigger a breach.*

## 📄 License
This project is open-source and available under the MIT License.
