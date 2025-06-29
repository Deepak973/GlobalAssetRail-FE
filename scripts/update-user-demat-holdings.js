const { MongoClient } = require("mongodb");

// MongoDB connection string - replace with your actual connection string
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/globalassetrail";

async function updateUserDematHoldings(
  userAddress,
  assetSymbol,
  quantity,
  valueInINR,
  operation = "deduct"
) {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db();

    // Find user's demat holdings
    const userHoldings = await db.collection("userDematHoldings").findOne({
      userAddress: userAddress,
    });

    if (!userHoldings) {
      console.log("User demat holdings not found");
      return;
    }

    // Find the specific asset
    const assetIndex = userHoldings.holdings.findIndex(
      (holding) => holding.assetSymbol === assetSymbol
    );

    if (assetIndex === -1) {
      console.log("Asset not found in user holdings");
      return;
    }

    // Update the asset quantity and value
    const currentHolding = userHoldings.holdings[assetIndex];
    let newQuantity, newValue;

    if (operation === "deduct") {
      newQuantity = Math.max(0, currentHolding.quantity - quantity);
      newValue = Math.max(0, currentHolding.valueInINR - valueInINR);
    } else {
      newQuantity = currentHolding.quantity + quantity;
      newValue = currentHolding.valueInINR + valueInINR;
    }

    // Update the holding
    await db.collection("userDematHoldings").updateOne(
      {
        userAddress: userAddress,
        "holdings.assetSymbol": assetSymbol,
      },
      {
        $set: {
          "holdings.$.quantity": newQuantity,
          "holdings.$.valueInINR": newValue,
          "holdings.$.lastUpdated": new Date(),
          updatedAt: new Date(),
        },
      }
    );

    // Update total value
    const updatedHoldings = await db.collection("userDematHoldings").findOne({
      userAddress: userAddress,
    });

    const newTotalValue = updatedHoldings.holdings.reduce(
      (total, holding) => total + holding.valueInINR,
      0
    );

    await db.collection("userDematHoldings").updateOne(
      { userAddress: userAddress },
      {
        $set: {
          totalValue: newTotalValue,
          updatedAt: new Date(),
        },
      }
    );

    console.log(
      `Updated user demat holdings for ${userAddress}, asset: ${assetSymbol}`
    );
  } catch (error) {
    console.error("Error updating user demat holdings:", error);
  } finally {
    await client.close();
  }
}

// Example usage
// updateUserDematHoldings('0x47C51d53D8B03062a308887a5f49ad9Ab0eA9688', 'INR-SGB', 1000, 1000000, 'deduct');

module.exports = { updateUserDematHoldings };
