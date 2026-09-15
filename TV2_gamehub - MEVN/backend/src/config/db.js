const mongoose = require("mongoose");

async function connectDb() 
{
  
  const mongoUri = process.env.MONGODB_URI; // Per seguretat no al codi -> env com al test.

  if (!mongoUri) 
  {
    throw new Error("Necessitem MONGODB_URI");
  }

  await mongoose.connect(mongoUri);
  console.log("Hem connectat a MongoDB");
}

module.exports = { connectDb };
