// const { assert } = require("console");

const Naira = artifacts.require("Naira");
const btk = artifacts.require("btk");
const ebank = artifacts.require("ebank");

const assert = require('assert');
const { default: Web3 } = require('web3');

// require("chai")
// .use(require("chai-as-promised"))
// .should()

// ebank test
contract("ebank", ([owner, customer]) => {

    let eNaira, rwd, eBank

    function token(number){
        return web3.utils.toWei(number, "ether")
    }

    before(async () => {
        // load contracts
       eNaira = await Naira.new();
       rwd = await btk.new(); 
       eBank = await ebank.new(rwd.address, eNaira.address);
    
    // transfer all tokens to ebank
    await rwd.transfer(eBank.address, token("1000000"))

    // transfer 100 Naira to customer
    await eNaira.transfer(customer, token("100"), {from: owner})
    });
    // naira deployment test
    describe("Naira deployement", async () => {
        it("this should match 'Electronic Naira Token'", async () => {
            const name = await eNaira.name();
            assert.equal(name, "Electronic Naira Token");
        });
    });
    // btk test
    describe("btk deployement", async () => {
        it("this should match 'Bitkova token'", async () => {
            const name = await rwd.name();
            assert.equal(name, "Bitkova token");
        });
    });
// bank balance test
    describe("ebank deployement", async () => {
        it("Check that the bank name in ebank contract is 'eBank'", async () => {
            const name = await eBank.name();
            assert.equal(name, "eBank");
        })
        it("check that the ebank has the 1 million rwd token (btk)", async () => {
            let balance = await rwd.balanceOf(eBank.address);
            assert.equal(balance, token("1000000"));
        })
        it("check that the 0 is left the rwd token (btk)", async () => {
            let balance = await rwd.balanceOf(rwd.address);
            assert.equal(balance, token("0"));
        })
    });

   describe("Yeild farming", async () => {
       it("check that the user has eNaira to stake", async () => {
           let result 
           // check investor balance
           result = await eNaira.balanceOf(customer);
           assert.equal(result.toString(), token("100"))

    //        // check customer staking
    //        await eNaira.approve(eBank.address, token("100"), {from: customer})
    //        await eBank.depositTokens(token("100"), {from: customer})
      
    //   // check updated customer balance
    //   result = await eNaira.balanceOf(customer)
    //   assert.equal(result.toString(), token("0"))

    // await eBank.issueToken({from: owner})

    // // ensure only owner can issue token
    // await eBank.issueToken({from: customer}).should.be.rejected
        })
   }) 
})

