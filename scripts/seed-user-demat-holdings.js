const { MongoClient } = require("mongodb");

// MongoDB connection string - replace with your actual connection string
const MONGO_URI = process.env.MONGO_URI;

// User addresses
const USER_ADDRESSES = [
  "0x47C51d53D8B03062a308887a5f49ad9Ab0eA9688",
  "0xb87d7543E47cD48c2987A3Ab545Da1ddE6c18A7c",
];

// Company address
const COMPANY_ADDRESS = "0x1312c13BdBa3edFDD89706Fc47653B0ded6C7b42";

// Sample demat holdings data
const userDematHoldings = [
  {
    userAddress: "0x47C51d53D8B03062a308887a5f49ad9Ab0eA9688",
    dematAccountNumber: "DEMAT001234567",
    holdings: [
      {
        assetSymbol: "INR-SGB",
        assetName: "Sovereign Gold Bonds",
        quantity: 1000,
        valueInINR: 1000000,
        lastUpdated: new Date(),
        status: "active",
      },
      {
        assetSymbol: "INR-CORP",
        assetName: "Corporate Bonds",
        quantity: 500,
        valueInINR: 500000,
        lastUpdated: new Date(),
        status: "active",
      },
      {
        assetSymbol: "INR-MFD",
        assetName: "Mutual Fund Units",
        quantity: 750,
        valueInINR: 750000,
        lastUpdated: new Date(),
        status: "active",
      },
    ],
    totalValue: 2250000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userAddress: "0xb87d7543E47cD48c2987A3Ab545Da1ddE6c18A7c",
    dematAccountNumber: "DEMAT007654321",
    holdings: [
      {
        assetSymbol: "INR-SGB",
        assetName: "Sovereign Gold Bonds",
        quantity: 800,
        valueInINR: 800000,
        lastUpdated: new Date(),
        status: "active",
      },
      {
        assetSymbol: "INR-CORP",
        assetName: "Corporate Bonds",
        quantity: 1200,
        valueInINR: 1200000,
        lastUpdated: new Date(),
        status: "active",
      },
      {
        assetSymbol: "INR-MFD",
        assetName: "Mutual Fund Units",
        quantity: 600,
        valueInINR: 600000,
        lastUpdated: new Date(),
        status: "active",
      },
    ],
    totalValue: 2600000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Company custody data
const companyCustodyData = [
  {
    companyAddress: COMPANY_ADDRESS,
    custodyAccountNumber: "CUSTODY001",
    totalAssetsUnderCustody: 0,
    assets: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function seedData() {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db();

    // Clear existing data
    await db.collection("userDematHoldings").deleteMany({});
    await db.collection("companyCustody").deleteMany({});

    // Insert user demat holdings
    const userResult = await db
      .collection("userDematHoldings")
      .insertMany(userDematHoldings);
    console.log(
      `Inserted ${userResult.insertedCount} user demat holdings records`
    );

    // Insert company custody data
    const companyResult = await db
      .collection("companyCustody")
      .insertMany(companyCustodyData);
    console.log(
      `Inserted ${companyResult.insertedCount} company custody records`
    );

    console.log("Data seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await client.close();
  }
}

// Run the seeding function
seedData();
