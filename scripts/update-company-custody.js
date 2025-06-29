const { MongoClient } = require("mongodb");

// MongoDB connection string - replace with your actual connection string
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/globalassetrail";

// Company address
const COMPANY_ADDRESS = "0x1312c13BdBa3edFDD89706Fc47653B0ded6C7b42";

async function updateCompanyCustody(
  userAddress,
  assetSymbol,
  assetName,
  quantity,
  valueInINR
) {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db();

    // Find existing company custody record
    const existingCustody = await db.collection("companyCustody").findOne({
      companyAddress: COMPANY_ADDRESS,
    });

    if (!existingCustody) {
      console.log("Company custody record not found, creating new one...");
      const newCustody = {
        companyAddress: COMPANY_ADDRESS,
        custodyAccountNumber: "CUSTODY001",
        totalAssetsUnderCustody: valueInINR,
        assets: [
          {
            userAddress: userAddress,
            assetSymbol: assetSymbol,
            assetName: assetName,
            quantity: quantity,
            valueInINR: valueInINR,
            depositedAt: new Date(),
            status: "under_custody",
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await db.collection("companyCustody").insertOne(newCustody);
      console.log("Created new company custody record");
    } else {
      // Update existing custody record
      const assetExists = existingCustody.assets.find(
        (asset) =>
          asset.userAddress === userAddress && asset.assetSymbol === assetSymbol
      );

      if (assetExists) {
        // Update existing asset
        await db.collection("companyCustody").updateOne(
          {
            companyAddress: COMPANY_ADDRESS,
            "assets.userAddress": userAddress,
            "assets.assetSymbol": assetSymbol,
          },
          {
            $inc: {
              "assets.$.quantity": quantity,
              "assets.$.valueInINR": valueInINR,
              totalAssetsUnderCustody: valueInINR,
            },
            $set: {
              "assets.$.depositedAt": new Date(),
              "assets.$.status": "under_custody",
              updatedAt: new Date(),
            },
          }
        );
      } else {
        // Add new asset
        await db.collection("companyCustody").updateOne(
          { companyAddress: COMPANY_ADDRESS },
          {
            $push: {
              assets: {
                userAddress: userAddress,
                assetSymbol: assetSymbol,
                assetName: assetName,
                quantity: quantity,
                valueInINR: valueInINR,
                depositedAt: new Date(),
                status: "under_custody",
              },
            },
            $inc: { totalAssetsUnderCustody: valueInINR },
            $set: { updatedAt: new Date() },
          }
        );
      }

      console.log("Updated company custody record");
    }
  } catch (error) {
    console.error("Error updating company custody:", error);
  } finally {
    await client.close();
  }
}

// Example usage
// updateCompanyCustody('0x47C51d53D8B03062a308887a5f49ad9Ab0eA9688', 'INR-SGB', 'Sovereign Gold Bonds', 1000, 1000000);

module.exports = { updateCompanyCustody };
