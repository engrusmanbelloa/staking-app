const eBank = artifacts.require("ebank");

module.exports = async function issueReward(callback){
    let ebank = await eBank.deployed();
    await ebank.issueToken()
    console.log("issue success");
    callback()
}