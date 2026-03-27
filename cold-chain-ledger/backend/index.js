require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
const contractABI = require('./abi.json');

const app = express();
app.use(cors());
app.use(express.json());

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, wallet);

// New Endpoint to create a shipment from the frontend
app.post('/api/shipments/create', async (req, res) => {
    try {
        const { productName, description, requirements, companyName, hasTemperatureLimit, maxTemperature } = req.body;
        
        const tx = await contract.createShipment(
            productName, 
            description, 
            requirements, 
            companyName, 
            hasTemperatureLimit, 
            maxTemperature || 0
        );
        await tx.wait();
        
        res.status(200).json({ success: true, transactionHash: tx.hash });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Endpoint for IoT sensors
app.post('/api/iot/temperature', async (req, res) => {
    try {
        const { shipmentId, temperature } = req.body;
        const tx = await contract.logTemperature(shipmentId, temperature);
        await tx.wait();
        res.status(200).json({ success: true, transactionHash: tx.hash });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Blockchain Gateway running on port ${PORT}`));