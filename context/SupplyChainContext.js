import React, {useState, useEffect} from "react";
import Web3Modal from "web3modal";
import {ethers} from "ethers";
 
const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ContractABI     = [
  {
  "inputs": [],
  "stateMutability": "nonpayable",
  "type": "constructor"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "sender",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "receiver",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "pickupTime",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "distance",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "string",
      "name": "_distributionType",
      "type": "string"
    },
    {
      "indexed": false,
      "internalType": "string",
      "name": "_quantity",
      "type": "string"
    },
    {
      "indexed": false,
      "internalType": "string",
      "name": "_villageAddress",
      "type": "string"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "price",
      "type": "uint256"
    }
  ],
  "name": "ShipmentCreated",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "sender",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "receiver",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "deliveryTime",
      "type": "uint256"
    }
  ],
  "name": "ShipmentDelivered",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "sender",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "receiver",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "pickupTime",
      "type": "uint256"
    }
  ],
  "name": "ShipmentInTransit",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "sender",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "receiver",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }
  ],
  "name": "ShipmentPaid",
  "type": "event"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "_sender",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "_receiver",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "_index",
      "type": "uint256"
    }
  ],
  "name": "completeShipment",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "_receiver",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "_pickupTime",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "_distance",
      "type": "uint256"
    },
    {
      "internalType": "string",
      "name": "_distributionType",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "_quantity",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "_villageAddress",
      "type": "string"
    },
    {
      "internalType": "uint256",
      "name": "_price",
      "type": "uint256"
    }
  ],
  "name": "createShipment",
  "outputs": [],
  "stateMutability": "payable",
  "type": "function"
},
{
  "inputs": [],
  "name": "getAllTransactions",
  "outputs": [
    {
      "components": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "pickupTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "deliveryTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "distance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "distributionType",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "quantity",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "villageAddress",
          "type": "string"
        },
        {
          "internalType": "enum SupplyChain.ShipmentStatus",
          "name": "status",
          "type": "uint8"
        },
        {
          "internalType": "bool",
          "name": "isPaid",
          "type": "bool"
        }
      ],
      "internalType": "struct SupplyChain.TypeShipment[]",
      "name": "",
      "type": "tuple[]"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "_sender",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "_index",
      "type": "uint256"
    }
  ],
  "name": "getShipment",
  "outputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    },
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    },
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    },
    {
      "internalType": "enum SupplyChain.ShipmentStatus",
      "name": "",
      "type": "uint8"
    },
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "_sender",
      "type": "address"
    }
  ],
  "name": "getShipmentCount",
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
      "internalType": "address",
      "name": "",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "name": "shipments",
  "outputs": [
    {
      "internalType": "address",
      "name": "sender",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "receiver",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "pickupTime",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "deliveryTime",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "distance",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "price",
      "type": "uint256"
    },
    {
      "internalType": "string",
      "name": "distributionType",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "quantity",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "villageAddress",
      "type": "string"
    },
    {
      "internalType": "enum SupplyChain.ShipmentStatus",
      "name": "status",
      "type": "uint8"
    },
    {
      "internalType": "bool",
      "name": "isPaid",
      "type": "bool"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "_sender",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "_receiver",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "_index",
      "type": "uint256"
    }
  ],
  "name": "startShipment",
  "outputs": [],
  "stateMutability": "nonpayable",
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
  "name": "typeShipments",
  "outputs": [
    {
      "internalType": "address",
      "name": "sender",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "receiver",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "pickupTime",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "deliveryTime",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "distance",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "price",
      "type": "uint256"
    },
    {
      "internalType": "string",
      "name": "distributionType",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "quantity",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "villageAddress",
      "type": "string"
    },
    {
      "internalType": "enum SupplyChain.ShipmentStatus",
      "name": "status",
      "type": "uint8"
    },
    {
      "internalType": "bool",
      "name": "isPaid",
      "type": "bool"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}];

//FETCHING SMART CONTRACT 
const fetchContract = (signerOrProvider) => 
    new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);

export const SupplyChainContext  = React.createContext();
export const SupplyChainProvider = ({children}) => {

  const [currentUser, setCurrentUser] = useState("");

  const createShipment = async (items) => {
    console.log(items);
    const {receiver, pickupTime, distance, distributionType, quantity, villageAddress, price} = items;

    try {
      const web3Modal  = new Web3Modal();
      const connection = await web3Modal.connect();    
      const provider   = new ethers.providers.Web3Provider(connection);
      const signer     = provider.getSigner();
      const contract   = fetchContract(signer);
      
      const createItem = await contract.createShipment(
        receiver,
        new Date(pickupTime).getTime(),
        distance,
        distributionType,
        quantity,
        villageAddress,
        ethers.utils.parseUnits(price, 18),
        {
          value : ethers.utils.parseUnits(price, 18)
        }
      );

      await createItem.wait();
      console.log(createItem);
    } catch (error) {
     alert("GAGAL MEMBUAT PENGIRIMAN ", error);
    }
    location.reload();
  };

  const getAllShipment = async () => {
    try {
      //membuat instance dari JsonRpcProvider
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);

      const shipment    = await contract.getAllTransactions();
      const allShipments = shipment.map((shipment) => ({
        sender: shipment.sender,
        receiver: shipment.receiver,
        price: ethers.utils.formatEther(shipment.price.toString()),
        pickupTime: shipment.pickupTime.toNumber(),
        deliveryTime: shipment.deliveryTime.toNumber(),
        distance: shipment.distance.toNumber(),
        distributionType: shipment.distributionType,
        quantity : shipment.quantity,
        villageAddress: shipment.villageAddress,
        isPaid: shipment.isPaid,
        status: shipment.status,
      }));
      return allShipments; 
    } catch (error) {
      console.log("Error getting shipment", error);
    }
  };

  const getShipmentsCount = async () => {
    try {
      if (!window.ethereum) return "Install Metamask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts"
      });

      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const shipmentsCount = await contract.getShipmentCount(accounts[0]);
      return shipmentsCount.toNumber();

    } catch (error) {
      console.log("Error getting shipments count", error);
    }
  };

  const completeShipment = async (completeship) => {
    console.log(completeship);

    const {receiver, index} = completeship; 

    try {
      if (!window.ethereum) return "Install Metamask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts"
      });
      
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const transaction = await contract.completeShipment(
        accounts[0],
        receiver,
        index,
        {
          gasLimit: 300000,
        }
      );

      await transaction.wait();
      console.log(transaction);
      location.reload();
    } catch (error) {
      console.log("Error ", error);
    }
  };

  const getShipment = async (index) => {
    console.log(index * 1);

    try {
      if (!window.ethereum) return "Install Metamask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts"
      });

      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const shipment = await contract.getShipment(accounts[0], index * 1);

      const SingleShipment = {
        sender : shipment[0],
        receiver : shipment[1],
        pickupTime : shipment[2].toNumber(),
        deliveryTime : shipment[3].toNumber(),
        distance : shipment[4].toNumber(),
        distributionType : shipment[5],
        quantity : shipment[6],
        villageAddress : shipment[7],
        price: ethers.utils.formatEther(shipment[8].toString()),
        status : shipment[9],
        isPaid : shipment[10]
      };

      return SingleShipment;
      
    } catch (error) {
      console.log("Error getting shipment", error);
    }
  };

  const startShipment = async (getProduct) => {
    const {receiver, index} = getProduct;

    try {
      if (!window.ethereum) return "Install Metamask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts"
      });

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const shipment = await contract.startShipment(
        accounts[0],
        receiver,
        index * 1
      );

      await shipment.wait();
      console.log(shipment);  

    } catch (error) {
      console.log("Gagal Memulai Pengiriman", error);
    }
    location.reload();
  };

  //CHECK WALLET CONNECTION

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return "Install Metamask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts"
      });

      if (accounts.length) {
        setCurrentUser(accounts[0]);
      } else {
        console.log("No Account");
      }
    } catch (error) {
      console.log("Error checking wallet connection", error);
    }
  };

  //CONNECT WALLET FUNCTION

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return "Install Metamask";

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });

      setCurrentUser(accounts[0]);
    } catch (error) {
      console.log("Error connecting wallet", error);
    }
  };
  
  useEffect(() => {
    checkIfWalletConnected();
  }, []);
  
  return (
    <SupplyChainContext.Provider
      value = {{ 
        connectWallet,
        createShipment,
        getAllShipment,
        completeShipment,
        getShipment,
        startShipment,
        getShipmentsCount,
        currentUser
       }}
       > {children} 
    </SupplyChainContext.Provider>
  );
}
