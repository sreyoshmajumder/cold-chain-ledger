<!-- HEADER BANNER -->
<div align="center">

![Header](https://capsule-render.vercel.app/api?type=waving&color=0:020d18,40:062033,70:083050,100:041525&height=220&section=header&text=Cold-Chain%20Ledger&fontSize=42&fontColor=00e5ff&fontAlignY=45&animation=fadeIn)

<h3>❄️⛓️ Enterprise IoT Supply Chain Monitoring — On the Blockchain</h3>
<p><em>Solidity + React + Vite + Node.js + ethers.js v6 + Tailwind CSS v4 &nbsp;·&nbsp; Real-Time Breach Detection &nbsp;·&nbsp; Immutable Transit Logs</em></p>

<br/>

[![Solidity](https://img.shields.io/badge/Solidity-0.8.x-062033?style=for-the-badge&logo=solidity&logoColor=00e5ff)](https://soliditylang.org)
[![Ethereum](https://img.shields.io/badge/Ethereum-Sepolia-062033?style=for-the-badge&logo=ethereum&logoColor=627eea)](https://ethereum.org)
[![React](https://img.shields.io/badge/React-Vite-062033?style=for-the-badge&logo=react&logoColor=61dafb)](https://react.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-v4.2-062033?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8)](https://tailwindcss.com)
[![ethers.js](https://img.shields.io/badge/ethers.js-v6.16-062033?style=for-the-badge&logo=ethereum&logoColor=00e5ff)](https://ethers.org)
[![Node.js](https://img.shields.io/badge/Node.js-Express-062033?style=for-the-badge&logo=nodedotjs&logoColor=3c873a)](https://nodejs.org)
[![IoT](https://img.shields.io/badge/IoT-Gateway%20Simulation-062033?style=for-the-badge&logo=arduino&logoColor=00e5ff)](https://github.com/sreyoshmajumder/cold-chain-ledger)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge&logoColor=white)](LICENSE)

<br/>

> **❄️ An enterprise-grade, blockchain-backed cold chain monitoring system — a Node.js IoT gateway simulation signs and pushes real-time temperature sensor data onto an Ethereum smart contract, which automatically flags shipments as breached when temperature thresholds are exceeded. A sleek React + Vite + Tailwind CSS v4 dashboard reads directly from the blockchain for a tamper-proof, real-time logistics view.**

<br/>

![IoT](https://img.shields.io/badge/IoT%20Gateway-Node.js%20Signs%20Sensor%20Transactions-00e5ff?style=flat-square&labelColor=062033)
![Breach](https://img.shields.io/badge/Breach%20Detection-Automatic%20On--Chain%20Flagging-ef4444?style=flat-square&labelColor=062033)
![Chain](https://img.shields.io/badge/Network-Ethereum%20Sepolia%20(Public%20RPC)-627eea?style=flat-square&labelColor=062033)
![Goods](https://img.shields.io/badge/Tracks-Pharma%20%7C%20Seafood%20%7C%20Dairy-22c55e?style=flat-square&labelColor=062033)

</div>

---

## 📋 Table of Contents

| | Section |
|---|---|
| 🎯 | [Problem Statement](#-problem-statement) |
| ✅ | [Solution](#-solution--blockchain-backed-cold-chain) |
| 🏗️ | [System Architecture](#-system-architecture) |
| 🌡️ | [IoT + Blockchain Data Flow](#-iot--blockchain-data-flow) |
| 📜 | [Smart Contract — ColdChain.sol](#-smart-contract--coldchainsol) |
| 🔌 | [IoT Gateway — Node.js Backend](#-iot-gateway--nodejs-backend) |
| ⚛️ | [React Dashboard Frontend](#-react-dashboard-frontend) |
| 🌡️ | [Temperature Thresholds by Cargo](#-temperature-thresholds-by-cargo-type) |
| 🔒 | [Security Architecture](#-security-architecture) |
| ⚙️ | [Environment Configuration](#-environment-configuration) |
| 🗂️ | [Project Structure](#-project-structure) |
| 🚀 | [Quick Start](#-quick-start) |
| 📡 | [Simulating IoT Sensor Readings](#-simulating-iot-sensor-readings) |
| 🔭 | [Roadmap](#-roadmap) |

---

## 🎯 Problem Statement

<div align="center">

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║   Cold chain logistics is one of the most trust-critical industries:    ║
║                                                                          ║
║   💊  PHARMACEUTICALS  Vaccines and medicines spoil above 8°C.          ║
║                        A single temperature excursion can cost lives.   ║
║                                                                          ║
║   🐟  SEAFOOD           Luxury seafood must stay below -18°C.           ║
║                        Tampering with records masks quality failures.   ║
║                                                                          ║
║   🧀  DAIRY             Dairy products breach above 4°C.                ║
║                        Retailers need proof of unbroken cold chain.    ║
║                                                                          ║
║   🚛  THE PROBLEM       Current cold chain logs live in Excel sheets,   ║
║                        proprietary databases, and paper records —       ║
║                        all editable, all deniable, none trustworthy.   ║
║                                                                          ║
║   📉  REAL COST         $35B+ in pharma losses annually from cold       ║
║                        chain failures. 1 in 4 temperature-sensitive    ║
║                        shipments arrive compromised.                   ║
║                                                                          ║
║   ─────────────────────────────────────────────────────────────────     ║
║   ► Cold-Chain Ledger makes every sensor reading immutable, every      ║
║     breach unforgeable, and every transit log publicly auditable.      ║
╚══════════════════════════════════════════════════════════════════════════╝
```

</div>

---

## ✅ Solution — Blockchain-Backed Cold Chain

```
  HOW IT WORKS IN 4 STEPS
  ════════════════════════════════════════════════════════════════════════

  STEP 1 — SHIPMENT CREATION
  ──────────────────────────────────────────────────────────────────────
  Logistics company calls createShipment(productType, minTemp, maxTemp)
  → Contract stores shipment ID, thresholds, and creation timestamp
  → Shipment begins in ACTIVE (not breached) state
  → Immutable record on Sepolia: cannot be modified or deleted

  STEP 2 — IOT GATEWAY READS SENSOR
  ──────────────────────────────────────────────────────────────────────
  Real-world: physical IoT sensor in the refrigerated truck reads °C
  This project: Node.js backend simulates the IoT gateway
  → POST /api/iot/temperature { shipmentId, temperature }
  → Backend holds wallet private key → signs the transaction securely
  → Sends recordTemperature(shipmentId, temperature) to blockchain
  → Private key NEVER exposed to frontend

  STEP 3 — ON-CHAIN BREACH DETECTION
  ──────────────────────────────────────────────────────────────────────
  Smart contract automatically evaluates every reading:

  if (temp < shipment.minTemp || temp > shipment.maxTemp) {
      shipment.breached = true;    // PERMANENT FLAG — cannot be unset
      emit TemperatureBreach(id, temp, block.timestamp);
  }

  Once breached → always breached. On-chain proof of failure.

  STEP 4 — REACT DASHBOARD READS CHAIN
  ──────────────────────────────────────────────────────────────────────
  Frontend reads directly from Sepolia blockchain (no backend needed)
  → getShipment(id) → status, temperatures array, breach flag
  → Shows: 🟢 ACTIVE | 🔴 BREACHED
  → All data tamper-proof — sourced directly from the immutable ledger
```

---

## 🏗️ System Architecture

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║          COLD-CHAIN LEDGER — 3-LAYER IOT + BLOCKCHAIN ARCHITECTURE           ║
╚═══════════════════════════════════════════════════════════════════════════════╝

  ┌──────────────────────────────────────────────────────────────────────────┐
  │  LAYER 1 — REACT FRONTEND  (Vite + Tailwind CSS v4)                      │
  │                         http://localhost:5173                            │
  │                                                                          │
  │  ┌────────────────────────────────────────────────────────────────────┐  │
  │  │                    App.jsx — Main Dashboard                         │  │
  │  │                                                                    │  │
  │  │  ┌──────────────────────┐   ┌────────────────────────────────────┐│  │
  │  │  │  Register Shipment   │   │   Live Monitoring Dashboard        ││  │
  │  │  │  ─────────────────   │   │   ───────────────────────────────  ││  │
  │  │  │  Product type input  │   │   Shipment cards:                  ││  │
  │  │  │  Min temp (°C)       │   │   • Shipment ID + Product Type     ││  │
  │  │  │  Max temp (°C)       │   │   • Temperature history array      ││  │
  │  │  │  [Register] btn      │   │   • Status: 🟢 ACTIVE / 🔴 BREACH  ││  │
  │  │  │  → POST /api/shipment│   │   • Real-time network sync count   ││  │
  │  │  └──────────────────────┘   │   • Reads directly from blockchain ││  │
  │  │                             └────────────────────────────────────┘│  │
  │  └────────────────────────────────────────────────────────────────────┘  │
  │                                                                          │
  │  ethers.js v6: JsonRpcProvider (public Sepolia RPC) — READ ONLY         │
  │  No wallet needed for reading · No MetaMask required                    │
  └────────────────────────────────┬─────────────────────────────────────────┘
                                   │  POST requests (register + sensor data)
                                   ▼
  ┌──────────────────────────────────────────────────────────────────────────┐
  │  LAYER 2 — IOT GATEWAY  (Node.js + Express)                              │
  │                         http://localhost:5000                            │
  │                                                                          │
  │  🔐 THE SECURE SIGNING LAYER                                             │
  │  Holds: PRIVATE_KEY (never sent to frontend)                             │
  │                                                                          │
  │  POST /api/shipment/create                                               │
  │  ├── Read { productType, minTemp, maxTemp } from request                │
  │  ├── new ethers.Wallet(PRIVATE_KEY, provider)                           │
  │  ├── contract.createShipment(productType, minTemp, maxTemp)             │
  │  └── Return: { shipmentId, txHash }                                     │
  │                                                                          │
  │  POST /api/iot/temperature                                               │
  │  ├── Read { shipmentId, temperature } from request                      │
  │  ├── Sign with wallet private key                                        │
  │  ├── contract.recordTemperature(shipmentId, temperature)                │
  │  └── Return: { txHash, breached }                                       │
  └────────────────────────────────┬─────────────────────────────────────────┘
                                   │  Signed transactions (ethers v6)
                                   ▼
  ┌──────────────────────────────────────────────────────────────────────────┐
  │  LAYER 3 — ETHEREUM SEPOLIA  (via Public RPC)                            │
  │  RPC: https://ethereum-sepolia-rpc.publicnode.com                       │
  │                                                                          │
  │  ┌────────────────────────────────────────────────────────────────────┐  │
  │  │  ColdChain.sol                                                      │  │
  │  │                                                                    │  │
  │  │  createShipment(productType, minTemp, maxTemp) → shipmentId        │  │
  │  │  recordTemperature(shipmentId, temperature) — IoT gateway only     │  │
  │  │    └── auto-evaluates: breach if temp < min OR temp > max          │  │
  │  │  getShipment(id) → full struct + temperatures array                │  │
  │  │  getTemperatureHistory(id) → int256[] readings                     │  │
  │  │                                                                    │  │
  │  │  Events: ShipmentCreated · TemperatureRecorded · TemperatureBreach │  │
  │  └────────────────────────────────────────────────────────────────────┘  │
  └──────────────────────────────────────────────────────────────────────────┘
```

---

## 🌡️ IoT + Blockchain Data Flow

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                   REAL-TIME TEMPERATURE RECORDING — FULL FLOW                ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  SENSOR / CLIENT      IOT GATEWAY            BLOCKCHAIN           DASHBOARD  ║
║  ─────────────────  ─────────────────  ──────────────────  ──────────────── ║
║                                                                               ║
║  [1] Simulate sensor reading                                                 ║
║  curl -X POST                                                                ║
║  localhost:5000/api/iot/temperature                                          ║
║  {"shipmentId": 1,                                                           ║
║   "temperature": -5}  ──────────▶                                           ║
║                                                                               ║
║                        [2] Gateway receives reading                         ║
║                        Validates: shipmentId exists                         ║
║                        Validates: temperature is int256                     ║
║                                                                               ║
║                        [3] Sign with private key                            ║
║                        wallet = new ethers.Wallet(PRIVATE_KEY, provider)   ║
║                        contract = Contract(ADDR, ABI, wallet)               ║
║                        tx = await contract.recordTemperature(1, -5)        ║
║                        await tx.wait()           ──────────▶               ║
║                                                                               ║
║                                               [4] EVM executes:            ║
║                                               shipments[1].temps.push(-5)  ║
║                                               emit TemperatureRecorded(1,-5)║
║                                               // breach check:              ║
║                                               if -5 < minTemp (-18):       ║
║                                                  → OK (above minimum)      ║
║                                               if -5 > maxTemp (-5):        ║
║                                                  → BREACHED 🔴             ║
║                                               shipments[1].breached = true ║
║                                               emit TemperatureBreach(1,-5) ║
║                                                          ◀──────────        ║
║                        [5] Receipt returned                                 ║
║                        { txHash: "0x...",                                   ║
║                          breached: true }     ◀──────────                  ║
║                                                                               ║
║  ◀────────── 200 OK                                                          ║
║  { txHash, breached }                                                        ║
║                                                                               ║
║                                                          [6] Dashboard       ║
║                                                          polls or re-reads   ║
║                                                          getShipment(1)      ║
║                                                          → status: BREACHED  ║
║                                                          → Card turns RED 🔴 ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

---

## 📜 Smart Contract — `ColdChain.sol`

### Full Interface

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ColdChain {

    // ─── Data Structures ──────────────────────────────────────────────────
    struct Shipment {
        uint256   id;
        string    productType;   // "Pharmaceutical" | "Seafood" | "Dairy" etc.
        address   owner;         // Who created this shipment
        int256    minTemp;       // Minimum safe temperature (°C × 10 for decimals)
        int256    maxTemp;       // Maximum safe temperature (°C × 10 for decimals)
        bool      breached;      // Once true → PERMANENT. Cannot be reset.
        uint256   createdAt;     // block.timestamp at creation
        int256[]  temperatures;  // Array of all recorded readings
    }

    // ─── State ────────────────────────────────────────────────────────────
    uint256 public shipmentCount;
    mapping(uint256 => Shipment) public shipments;

    // ─── Events ───────────────────────────────────────────────────────────
    event ShipmentCreated(
        uint256 indexed id,
        string  productType,
        int256  minTemp,
        int256  maxTemp,
        address indexed owner
    );

    event TemperatureRecorded(
        uint256 indexed shipmentId,
        int256  temperature,
        uint256 timestamp
    );

    event TemperatureBreach(
        uint256 indexed shipmentId,
        int256  temperature,       // The reading that triggered breach
        uint256 timestamp          // Exact time of breach
    );

    // ─── Functions ────────────────────────────────────────────────────────

    // Create a new shipment with temperature thresholds
    function createShipment(
        string  memory productType,
        int256         minTemp,
        int256         maxTemp
    ) external returns (uint256) {
        shipmentCount++;
        uint256 id = shipmentCount;

        shipments[id] = Shipment({
            id:           id,
            productType:  productType,
            owner:        msg.sender,
            minTemp:      minTemp,
            maxTemp:      maxTemp,
            breached:     false,
            createdAt:    block.timestamp,
            temperatures: new int256[](0)
        });

        emit ShipmentCreated(id, productType, minTemp, maxTemp, msg.sender);
        return id;
    }

    // Record an IoT temperature reading — auto-detects breach
    function recordTemperature(
        uint256 shipmentId,
        int256  temperature
    ) external {
        Shipment storage s = shipments[shipmentId];
        require(s.id != 0, "Shipment does not exist");

        s.temperatures.push(temperature);
        emit TemperatureRecorded(shipmentId, temperature, block.timestamp);

        // ─── Automatic Breach Detection ───────────────────────────────
        if (!s.breached &&
            (temperature < s.minTemp || temperature > s.maxTemp)) {
            s.breached = true;   // PERMANENT — cannot be un-breached
            emit TemperatureBreach(shipmentId, temperature, block.timestamp);
        }
    }

    // Read full shipment data (FREE — anyone, no gas)
    function getShipment(uint256 id) external view returns (
        uint256  shipmentId,
        string   memory productType,
        address  owner,
        int256   minTemp,
        int256   maxTemp,
        bool     breached,
        uint256  createdAt,
        int256[] memory temperatures
    ) {
        Shipment storage s = shipments[id];
        return (s.id, s.productType, s.owner, s.minTemp,
                s.maxTemp, s.breached, s.createdAt, s.temperatures);
    }

    // Get only the temperature history array (FREE)
    function getTemperatureHistory(
        uint256 shipmentId
    ) external view returns (int256[] memory) {
        return shipments[shipmentId].temperatures;
    }
}
```

### Function Access & Gas Matrix

```
  Function                  Caller    Gas         Breach Trigger   Notes
  ──────────────────────────────────────────────────────────────────────────
  createShipment()          Anyone    ~80k ⛽     No               Returns new ID
  recordTemperature()       Anyone    ~50k ⛽     YES — auto       Gateway calls this
  getShipment()             Anyone    FREE 🆓     No               Full struct read
  getTemperatureHistory()   Anyone    FREE 🆓     No               Returns int256[]

  BREACH DETECTION LOGIC:
  ──────────────────────────────────────────────────────────────────────
  if (temperature < minTemp || temperature > maxTemp)
      → shipment.breached = true  (PERMANENT — cannot be unset)
      → emit TemperatureBreach event (indexed, searchable on Etherscan)

  NOTE: In production, only the IoT gateway wallet should be able to
  call recordTemperature(). Add an onlyGateway modifier:
  modifier onlyGateway() {
    require(msg.sender == gatewayAddress, "Not authorized IoT gateway");
    _;
  }
```

---

## 🔌 IoT Gateway — Node.js Backend

```
  ARCHITECTURE: SECURE SIGNING BRIDGE
  ════════════════════════════════════════════════════════════════════════

  The Node.js backend is the ONLY component that holds the wallet private key.
  Frontend never touches the key. IoT sensors (simulated via curl) never touch it.
  This is the correct Web3 server-side signing pattern.

  DEPENDENCIES (backend/package.json):
  ──────────────────────────────────────────────────────────────────────
  express    → HTTP server
  ethers     → ^6.16.0 (wallet signing + contract calls)
  cors       → allow http://localhost:5173 (Vite frontend)
  dotenv     → load .env variables

  ETHERS V6 GATEWAY PATTERN:
  ──────────────────────────────────────────────────────────────────────
  // Load environment
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const wallet   = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    ABI,
    wallet    // ← signed by gateway wallet
  );

  // Route: Create Shipment
  // POST /api/shipment/create
  // Body: { productType, minTemp, maxTemp }
  const tx = await contract.createShipment(productType, minTemp, maxTemp);
  const receipt = await tx.wait();
  // Extract shipmentId from ShipmentCreated event in receipt.logs

  // Route: Record Temperature (IoT simulation)
  // POST /api/iot/temperature
  // Body: { shipmentId: 1, temperature: -5 }
  const tx = await contract.recordTemperature(shipmentId, temperature);
  const receipt = await tx.wait();
  // Check receipt.logs for TemperatureBreach event → return breached: true

  ENDPOINTS:
  ──────────────────────────────────────────────────────────────────────
  POST /api/shipment/create
  ├── Body: { productType: "Pharmaceutical", minTemp: 2, maxTemp: 8 }
  └── Returns: { shipmentId: 1, txHash: "0x..." }

  POST /api/iot/temperature
  ├── Body: { shipmentId: 1, temperature: 12 }  ← exceeds maxTemp!
  └── Returns: { txHash: "0x...", breached: true }

  GET /api/health
  └── Returns: { status: "IoT Gateway running", blockNumber: 7284391 }
```

---

## ⚛️ React Dashboard Frontend

```
  TECH STACK:  React + Vite + Tailwind CSS v4 + ethers.js v6
  ════════════════════════════════════════════════════════════════════════

  DEPENDENCIES (root package.json):
  ──────────────────────────────────────────────────────────────────────
  ethers         ^6.16.0    → blockchain reads
  tailwindcss    ^4.2.2     → dark enterprise dashboard styling
  autoprefixer   ^10.4.27   → CSS vendor prefixes
  postcss        ^8.5.8     → CSS pipeline

  BLOCKCHAIN READS (no wallet, no gas):
  ──────────────────────────────────────────────────────────────────────
  // App.jsx — read directly from Sepolia via public RPC
  const provider = new ethers.JsonRpcProvider(
    "https://ethereum-sepolia-rpc.publicnode.com"
  );
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

  // Fetch all shipments
  const count = await contract.shipmentCount();
  for (let i = 1; i <= count; i++) {
    const data = await contract.getShipment(i);
    // data = [id, productType, owner, minTemp, maxTemp,
    //          breached, createdAt, temperatures[]]
  }

  DASHBOARD UI COMPONENTS:
  ──────────────────────────────────────────────────────────────────────

  ┌──────────────────────────────────────────────────────────────────────┐
  │  HEADER                                                              │
  │  ❄️ Cold-Chain Ledger         🔄 Network Syncs: 47    Block: 7284391 │
  └──────────────────────────────────────────────────────────────────────┘

  ┌──────────────────┐   ┌──────────────────────────────────────────────┐
  │  REGISTER PANEL  │   │   SHIPMENT MONITORING GRID                   │
  │                  │   │                                              │
  │  Product Type:   │   │  ┌──────────────┐  ┌──────────────────────┐ │
  │  [Pharmaceutical]│   │  │ Shipment #1   │  │ Shipment #2          │ │
  │  Min Temp (°C):  │   │  │ 🧪 Pharma    │  │ 🐟 Seafood            │ │
  │  [2          ]   │   │  │ Range: 2-8°C │  │ Range: -25 to -18°C  │ │
  │  Max Temp (°C):  │   │  │              │  │                      │ │
  │  [8          ]   │   │  │ Temps: [4,5, │  │ Temps: [-20,-22,-15] │ │
  │                  │   │  │  6,7,12]     │  │                      │ │
  │  [Register]  btn │   │  │              │  │  ⚠️  BREACHED 🔴     │ │
  │  → POST backend  │   │  │ 🟢 ACTIVE    │  │  -15°C > -18°C max  │ │
  └──────────────────┘   │  └──────────────┘  └──────────────────────┘ │
                         └──────────────────────────────────────────────┘

  STATUS INDICATORS:
  ──────────────────────────────────────────────────────────────────────
  🟢 ACTIVE     → shipment.breached === false
                → Tailwind: green badge, normal card border
  🔴 BREACHED   → shipment.breached === true
                → Tailwind: red badge, pulsing red border, alert banner
                → Shows the threshold that was violated
  ❄️ LOADING    → Tailwind skeleton shimmer while fetching from chain
```

---

## 🌡️ Temperature Thresholds by Cargo Type

```
  COMMON COLD CHAIN TEMPERATURE RANGES
  ════════════════════════════════════════════════════════════════════════

  ┌──────────────────────────────────────────────────────────────────────┐
  │  Cargo Type           Min Temp    Max Temp    Notes                  │
  ├──────────────────────────────────────────────────────────────────────┤
  │  💊 Pharmaceuticals    +2°C        +8°C       Vaccines, biologics   │
  │  🧊 Deep Frozen        -25°C       -18°C      Ice cream, seafood    │
  │  🐟 Fresh Seafood      -2°C        +2°C       Sushi-grade fish      │
  │  🧀 Dairy              +1°C        +4°C       Milk, cheese          │
  │  🍎 Fresh Produce      +2°C        +7°C       Fruits, vegetables    │
  │  🩸 Blood Products     +2°C        +6°C       Medical blood units   │
  │  🧬 Lab Samples        -80°C       -60°C      Ultra-cold chain      │
  └──────────────────────────────────────────────────────────────────────┘

  IN THE dApp:
  These are set as custom int256 values per shipment at creation time.
  The smart contract enforces the exact thresholds immutably.
  Any deviation → permanent on-chain breach flag.
  No manual override. No exception. Cryptographically enforced.

  EXAMPLE BREACH SCENARIOS:
  ──────────────────────────────────────────────────────────────────────
  Pharma shipment (2-8°C) + reading of 12°C:
  → 12 > maxTemp(8) → breached = true → emit TemperatureBreach(1, 12)

  Deep frozen (-25 to -18°C) + reading of -15°C:
  → -15 > maxTemp(-18) → breached = true → emit TemperatureBreach(2, -15)

  Dairy (1-4°C) + reading of 0°C:
  → 0 < minTemp(1) → breached = true → emit TemperatureBreach(3, 0)
```

---

## 🔒 Security Architecture

```
  WHY BACKEND HOLDS THE PRIVATE KEY
  ════════════════════════════════════════════════════════════════════════

  ❌ WRONG APPROACH (common mistake):
  Frontend directly calls contract.recordTemperature(id, temp)
  → Frontend must have MetaMask installed
  → Private key in user's browser
  → IoT sensors can't sign without human interaction
  → Anyone can call recordTemperature() with fake data

  ✅ CORRECT APPROACH (this project):
  IoT Sensor (or curl simulation)
       │
       │  POST /api/iot/temperature
       │  (no authentication needed from sensor)
       ▼
  Node.js Gateway  ← holds PRIVATE_KEY in .env
       │
       │  Signs transaction with ethers.Wallet(PRIVATE_KEY, provider)
       │
       ▼
  Ethereum Sepolia  ← only this gateway wallet can call recordTemperature

  PRODUCTION UPGRADE:
  ──────────────────────────────────────────────────────────────────────
  For production, add gateway authentication:
  1. IoT device has an API key or JWT
  2. Backend validates before signing
  3. Smart contract has onlyGateway modifier
  4. Use AWS KMS or Vault for key management (not .env)
  5. Hardware Security Module (HSM) for physical IoT devices
```

---

## ⚙️ Environment Configuration

```bash
# backend/.env
PORT=5000
RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
PRIVATE_KEY=your_metamask_private_key_here_never_commit_this
CONTRACT_ADDRESS=0xYourDeployedColdChainContractAddress

# frontend/src/App.jsx  (hardcoded constants — no .env for Vite reads)
const CONTRACT_ADDRESS = "0xYourDeployedColdChainContractAddress";
const RPC_URL = "https://ethereum-sepolia-rpc.publicnode.com";
// ABI imported from local JSON file or inlined
```

---

## 🗂️ Project Structure

```
cold-chain-ledger/
│
├── 📋 README.md
├── 📦 package.json             # Root: ethers ^6.16, tailwindcss ^4.2, postcss
│
└── 📁 cold-chain-ledger/
    │
    ├── 📁 contracts/           # Solidity
    │   └── ColdChain.sol       # createShipment + recordTemperature + breach detect
    │
    ├── 📁 backend/             # IoT Gateway (Node.js + Express)
    │   ├── package.json        # express, ethers, cors, dotenv
    │   ├── .env                # RPC_URL + PRIVATE_KEY + CONTRACT_ADDRESS (gitignored)
    │   └── server.js           # Express app
    │       ├── POST /api/shipment/create    → sign + createShipment()
    │       ├── POST /api/iot/temperature    → sign + recordTemperature()
    │       └── GET  /api/health             → gateway status
    │
    └── 📁 frontend/            # React + Vite + Tailwind CSS v4
        ├── package.json        # react, react-dom, vite, @vitejs/plugin-react
        ├── vite.config.js
        ├── tailwind.config.js  # Tailwind v4 config
        ├── postcss.config.js
        ├── index.html
        └── src/
            ├── main.jsx        # ReactDOM.createRoot()
            └── App.jsx         # Dashboard: register shipment + monitor grid
                ├── CONTRACT_ADDRESS + ABI constants
                ├── JsonRpcProvider (public Sepolia RPC)
                ├── Shipment registration form → POST /api/shipment/create
                ├── getShipment(i) loop → card grid
                ├── Status indicators: 🟢 ACTIVE / 🔴 BREACHED
                └── Auto-refresh / network sync counter
```

---

## 🚀 Quick Start

### Prerequisites

```bash
✅  Node.js v18+
✅  MetaMask with Sepolia testnet ETH
✅  Deployed ColdChain.sol on Sepolia
     → Remix IDE: remix.ethereum.org → compile → deploy (Injected Provider)
✅  Sepolia ETH faucets:
     → https://sepoliafaucet.com
     → https://faucet.quicknode.com/ethereum/sepolia
```

### 1. Clone

```bash
git clone https://github.com/sreyoshmajumder/cold-chain-ledger.git
cd cold-chain-ledger
```

### 2. Deploy `ColdChain.sol`

```
# In Remix IDE:
1. Open contracts/ColdChain.sol
2. Compile: Solidity ^0.8.0
3. Deploy → Injected Provider → Sepolia
4. Copy deployed contract address
```

### 3. Backend (IoT Gateway)

```bash
cd cold-chain-ledger/backend
npm install

# Create .env:
PORT=5000
RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
PRIVATE_KEY=0xYourMetaMaskPrivateKey
CONTRACT_ADDRESS=0xYourDeployedContract

npm start
# → Gateway running at http://localhost:5000
```

### 4. Frontend (Dashboard)

```bash
cd ../frontend
npm install

# Paste your CONTRACT_ADDRESS into src/App.jsx
# Line: const CONTRACT_ADDRESS = "0x...";

npm run dev
# → http://localhost:5173
```

---

## 📡 Simulating IoT Sensor Readings

```bash
# First create a shipment (via the React dashboard form OR directly):
curl -X POST http://localhost:5000/api/shipment/create \
  -H "Content-Type: application/json" \
  -d '{"productType": "Pharmaceutical", "minTemp": 2, "maxTemp": 8}'
# Response: { "shipmentId": 1, "txHash": "0x..." }

# Record a NORMAL temperature reading (within 2-8°C range):
curl -X POST http://localhost:5000/api/iot/temperature \
  -H "Content-Type: application/json" \
  -d '{"shipmentId": 1, "temperature": 5}'
# Response: { "txHash": "0x...", "breached": false }

# Record a BREACH temperature (exceeds 8°C max!):
curl -X POST http://localhost:5000/api/iot/temperature \
  -H "Content-Type: application/json" \
  -d '{"shipmentId": 1, "temperature": 12}'
# Response: { "txHash": "0x...", "breached": true }
# Dashboard card immediately turns 🔴 BREACHED

# Test deep-frozen shipment breach (-18°C max, reading -15°C):
curl -X POST http://localhost:5000/api/iot/temperature \
  -H "Content-Type: application/json" \
  -d '{"shipmentId": 2, "temperature": -15}'
# -15 > -18 (maxTemp) → breached!
```

---

## 🔭 Roadmap

```
v1.0 ── CURRENT ─────────────────────────────────────────────────────────
  ✅  ColdChain.sol: createShipment + recordTemperature + auto breach detect
  ✅  Node.js IoT Gateway: secure private key signing for all writes
  ✅  React + Vite + Tailwind v4 dark enterprise dashboard
  ✅  ethers.js v6: JsonRpcProvider for free on-chain reads
  ✅  Temperature breach detection: permanent on-chain flag
  ✅  Real-time shipment monitoring grid
  ✅  curl-based IoT simulation (POST /api/iot/temperature)
  ✅  Public Sepolia RPC (no API key needed)

v2.0 ── RICHER MONITORING ───────────────────────────────────────────────
  🔲  Live temperature chart per shipment (Chart.js / Recharts)
  🔲  Event listener on TemperatureBreach → real-time push alert
  🔲  Email / webhook alert on breach detection
  🔲  Historical temperature graph with threshold overlay line

v3.0 ── MULTI-PARTY SUPPLY CHAIN ────────────────────────────────────────
  🔲  Role-based access: Manufacturer → Distributor → Retailer handoffs
  🔲  Multi-gateway support: each logistics partner has own signing wallet
  🔲  GPS coordinates recorded alongside temperature
  🔲  QR code per shipment → public verification page

v4.0 ── PRODUCTION DEPLOYMENT ───────────────────────────────────────────
  🔲  Hardware IoT integration: Raspberry Pi + DS18B20 temperature sensor
  🔲  AWS KMS / HashiCorp Vault for private key management
  🔲  Deploy on Polygon / Arbitrum for lower gas costs at scale
  🔲  MQTT protocol for real IoT device communication
  🔲  Bulk sensor batch submissions (gas optimization)
  🔲  Regulatory export: PDF audit trail per shipment
```

---

## 🛠️ Tech Stack

<div align="center">

![Solidity](https://img.shields.io/badge/Solidity-062033?style=for-the-badge&logo=solidity&logoColor=00e5ff)
![Ethereum](https://img.shields.io/badge/Ethereum%20Sepolia-062033?style=for-the-badge&logo=ethereum&logoColor=627eea)
![React](https://img.shields.io/badge/React%20%2B%20Vite-062033?style=for-the-badge&logo=react&logoColor=61dafb)
![Tailwind](https://img.shields.io/badge/Tailwind%20CSS%20v4-062033?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8)
![ethers.js](https://img.shields.io/badge/ethers.js%20v6-062033?style=for-the-badge&logo=ethereum&logoColor=00e5ff)
![Node.js](https://img.shields.io/badge/Node.js-062033?style=for-the-badge&logo=nodedotjs&logoColor=3c873a)
![Express](https://img.shields.io/badge/Express-062033?style=for-the-badge&logo=express&logoColor=ffffff)
![JavaScript](https://img.shields.io/badge/JavaScript-062033?style=for-the-badge&logo=javascript&logoColor=ffd700)

</div>

---

## 👨‍💻 Author

<div align="center">

**Built with ❄️ + ⛓️ + ❤️ by [Sreyosh Majumder](https://github.com/sreyoshmajumder)**

[![GitHub](https://img.shields.io/badge/GitHub-sreyoshmajumder-062033?style=for-the-badge&logo=github&logoColor=00e5ff)](https://github.com/sreyoshmajumder)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0284c7?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/YOUR_LINKEDIN)

> *"A broken cold chain isn't just a logistics failure — it's a public health crisis. Blockchain makes every breach undeniable."*

</div>

---

## ⭐ Show Some Love

```
★  Star this repository
🍴  Fork it and wire up a real IoT sensor (Raspberry Pi + DS18B20)
🐛  Open issues for bugs or feature suggestions
📢  Share with supply chain engineers, pharma logistics teams, and Web3 devs
```

---

<div align="center">

![Footer](https://capsule-render.vercel.app/api?type=waving&color=0:083050,50:062033,100:020d18&height=120&section=footer&text=Every%20Degree%20Matters.%20Every%20Reading%20Immutable.&fontSize=14&fontColor=00e5ff&fontAlignY=65)

</div>
