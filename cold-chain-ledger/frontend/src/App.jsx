import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { ShieldCheck, Activity, Box, ArrowRight, ThermometerSnowflake, LogIn, PlusCircle } from 'lucide-react';

// 1. REPLACE WITH YOUR NEWLY DEPLOYED CONTRACT ADDRESS
const CONTRACT_ADDRESS = "0xCB01D261D97756e477A034bA9e223d794bdfd3CB";

// 2. PASTE YOUR FULL ABI ARRAY HERE FROM REMIX (Between the brackets)
const ABI = 
	[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "productName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "companyName",
				"type": "string"
			}
		],
		"name": "ShipmentCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "shipmentId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "int256",
				"name": "temperature",
				"type": "int256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "breachDetected",
				"type": "bool"
			}
		],
		"name": "TemperatureLogged",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_productName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_requirements",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_companyName",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "_hasTemperatureLimit",
				"type": "bool"
			},
			{
				"internalType": "int256",
				"name": "_maxTemperature",
				"type": "int256"
			}
		],
		"name": "createShipment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_shipmentId",
				"type": "uint256"
			},
			{
				"internalType": "int256",
				"name": "_temperature",
				"type": "int256"
			}
		],
		"name": "logTemperature",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_shipmentId",
				"type": "uint256"
			}
		],
		"name": "getShipmentDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "productName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "requirements",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "companyName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "creationTime",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "hasTemperatureLimit",
						"type": "bool"
					},
					{
						"internalType": "int256",
						"name": "maxTemperature",
						"type": "int256"
					},
					{
						"internalType": "bool",
						"name": "isBreached",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					}
				],
				"internalType": "struct ColdChain.Shipment",
				"name": "",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "int256",
						"name": "temperature",
						"type": "int256"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct ColdChain.Reading[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "shipmentCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "shipmentReadings",
		"outputs": [
			{
				"internalType": "int256",
				"name": "temperature",
				"type": "int256"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "shipments",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "productName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "requirements",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "companyName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "creationTime",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "hasTemperatureLimit",
				"type": "bool"
			},
			{
				"internalType": "int256",
				"name": "maxTemperature",
				"type": "int256"
			},
			{
				"internalType": "bool",
				"name": "isBreached",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
		


// --- LANDING PAGE COMPONENT ---
function LandingPage({ onLogin }) {
  const navigate = useNavigate();

  const handleAuth = () => {
    onLogin();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white selection:bg-indigo-500/30">
      <nav className="flex justify-between items-center p-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <ThermometerSnowflake className="w-8 h-8 text-indigo-400" />
          <span className="text-2xl font-bold tracking-tight">Ledger<span className="text-indigo-400">Sync</span></span>
        </div>
        <button onClick={handleAuth} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-6 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-indigo-500/20">
          <LogIn className="w-4 h-4" /> Sign In / Register
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-8 pt-20 pb-32 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Immutable <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Supply Chain</span> <br/>
            Integrity.
          </h1>
          <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-xl">
            Empower your logistics with blockchain. We record product requirements, precise timestamps, and real-time IoT temperature monitoring on an unalterable ledger. Perfect for pharmaceuticals, luxury goods, and perishables.
          </p>
          <div className="flex gap-4">
            <button onClick={handleAuth} className="flex items-center gap-2 bg-white text-indigo-950 px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition-all">
              Start Monitoring <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-16 grid grid-cols-3 gap-6 border-t border-slate-800 pt-8">
            <div>
              <ShieldCheck className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="font-semibold">Tamper-Proof</h3>
              <p className="text-sm text-slate-400 mt-1">Data secured by Ethereum smart contracts.</p>
            </div>
            <div>
              <Activity className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="font-semibold">Real-Time</h3>
              <p className="text-sm text-slate-400 mt-1">IoT sensors update the ledger instantly.</p>
            </div>
            <div>
              <Box className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="font-semibold">Enterprise Ready</h3>
              <p className="text-sm text-slate-400 mt-1">Multi-company support and compliance.</p>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-2xl blur-3xl opacity-20 animate-pulse"></div>
          <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 shadow-2xl">
            <div className="aspect-[4/3] rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700">
               <span className="text-slate-500 font-medium tracking-widest uppercase">Global Supply Chain Data</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- DASHBOARD COMPONENT ---
function Dashboard() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    requirements: '',
    companyName: 'PharmaCorp Global',
    hasTempLimit: false,
    maxTemp: ''
  });

  useEffect(() => {
    fetchBlockchainData();
  }, []);

  const fetchBlockchainData = async () => {
    try {
      // UPDATED: Using a more stable public RPC node for Sepolia
      const provider = new ethers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com");
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
      const count = await contract.shipmentCount();
      
      let fetchedShipments = [];
      for (let i = 1; i <= count; i++) {
        const details = await contract.getShipmentDetails(i);
        fetchedShipments.push({
          id: details[0].id.toString(),
          productName: details[0].productName,
          companyName: details[0].companyName,
          hasTempLimit: details[0].hasTemperatureLimit,
          maxTemp: details[0].maxTemperature.toString(),
          isBreached: details[0].isBreached,
          timestamp: new Date(Number(details[0].creationTime) * 1000).toLocaleString(),
          readings: details[1]
        });
      }
      setShipments(fetchedShipments);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleCreateShipment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/shipments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: formData.productName,
          description: formData.description,
          requirements: formData.requirements,
          companyName: formData.companyName,
          hasTemperatureLimit: formData.hasTempLimit,
          maxTemperature: formData.maxTemp === '' ? 0 : parseInt(formData.maxTemp)
        })
      });
      if (response.ok) {
        setShowForm(false);
        alert("Shipment logged to blockchain successfully!");
        fetchBlockchainData();
      } else {
        const errorData = await response.json();
        alert(`Failed: ${errorData.error}`);
      }
    } catch (err) {
      console.error("Failed to push to backend", err);
      alert("Network error: Is your Node.js backend running?");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 p-8 font-sans">
      <header className="mb-10 flex justify-between items-center border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <ThermometerSnowflake className="text-indigo-500" /> Professional Dashboard
          </h1>
          <p className="text-slate-400 mt-1">Welcome back. Network is synchronized.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 rounded-lg font-medium transition flex items-center gap-2 shadow-lg shadow-indigo-500/20">
          <PlusCircle className="w-5 h-5" /> New Registry
        </button>
      </header>

      {showForm && (
        <div className="mb-10 bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-xl max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-6 border-b border-slate-700 pb-4">Register New Product to Blockchain</h2>
          <form onSubmit={handleCreateShipment} className="grid grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-slate-400 mb-2">Company Operating On Behalf Of</label>
              <select className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500" value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})}>
                <option>PharmaCorp Global</option>
                <option>SeaFresh Logistics</option>
                <option>AgriChain Solutions</option>
              </select>
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-slate-400 mb-2">Product Name</label>
              <input required type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500" value={formData.productName} onChange={(e) => setFormData({...formData, productName: e.target.value})} />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-400 mb-2">Full Description</label>
              <textarea required rows="2" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-slate-400 mb-2">Special Requirements / Handling</label>
              <input required type="text" placeholder="e.g. Keep away from direct sunlight" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500" value={formData.requirements} onChange={(e) => setFormData({...formData, requirements: e.target.value})} />
            </div>
            <div className="col-span-2 md:col-span-1 flex flex-col justify-end">
              <label className="flex items-center gap-3 cursor-pointer p-3 bg-slate-900 border border-slate-700 rounded-lg h-[50px]">
                <input type="checkbox" className="w-5 h-5 rounded text-indigo-500 focus:ring-indigo-500" checked={formData.hasTempLimit} onChange={(e) => setFormData({...formData, hasTempLimit: e.target.checked})} />
                <span className="text-sm font-medium text-slate-300">Requires Temperature Tracking?</span>
              </label>
            </div>
            {formData.hasTempLimit && (
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-slate-400 mb-2">Maximum Allowed Temperature (°C)</label>
                <input required type="number" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500" value={formData.maxTemp} onChange={(e) => setFormData({...formData, maxTemp: e.target.value})} />
              </div>
            )}
            <div className="col-span-2 mt-4">
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-lg shadow-lg transition duration-200">
                Sign Transaction & Record to Ledger
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
          <h2 className="text-lg font-semibold text-white">Live Chain Records</h2>
          <button onClick={fetchBlockchainData} className="text-sm bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition text-slate-200">Refresh Chain</button>
        </div>
        {loading ? (
          <div className="p-10 text-center text-slate-400 animate-pulse">Querying Blockchain Nodes...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Creation Time</th>
                  <th className="px-6 py-4">Temp Status</th>
                  <th className="px-6 py-4">Integrity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {shipments.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500">No shipments registered on the network yet.</td>
                  </tr>
                )}
                {shipments.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-700/30 transition">
                    <td className="px-6 py-4 text-slate-400">#{s.id}</td>
                    <td className="px-6 py-4 font-medium text-indigo-300">{s.companyName}</td>
                    <td className="px-6 py-4 font-bold text-white">{s.productName}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{s.timestamp}</td>
                    <td className="px-6 py-4 text-sm">
                      {s.hasTempLimit ? <span className="text-slate-300">Max {s.maxTemp}°C</span> : <span className="text-slate-500">Not Tracked</span>}
                    </td>
                    <td className="px-6 py-4">
                      {!s.hasTempLimit ? (
                        <span className="text-slate-500 text-xs px-2.5 py-1 bg-slate-800 rounded-full border border-slate-700">N/A</span>
                      ) : s.isBreached ? (
                        <span className="text-red-400 text-xs px-2.5 py-1 bg-red-900/30 rounded-full border border-red-800">Compromised</span>
                      ) : (
                        <span className="text-emerald-400 text-xs px-2.5 py-1 bg-emerald-900/30 rounded-full border border-emerald-800">Secure</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// --- MAIN ROUTER CONFIG ---
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <LandingPage onLogin={() => setIsAuthenticated(true)} />} />
      </Routes>
    </Router>
  );
}