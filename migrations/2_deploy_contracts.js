const Naira = artifacts.require("Naira");
const btk = artifacts.require("btk");
const ebank = artifacts.require("ebank");

module.exports = async function(deployer, network, accounts) {
  // Deploy the Migrations contract as our only task
  await deployer.deploy(Naira);
  const naira = await Naira.deployed();

  await deployer.deploy(btk);
  const rwd = await btk.deployed();

  await deployer.deploy(ebank, rwd.address, naira.address);
  const eBank = await ebank.deployed();
// transfer btk token to the ebank
  await rwd.transfer(eBank.address, "1000000000000000000000000")
// distribute 100 naira to investor
await naira.transfer(accounts[1], "100000000000000000000");
};
