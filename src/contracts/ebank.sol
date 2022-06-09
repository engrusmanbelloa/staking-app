// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

import "./btk.sol";
import './naira.sol';
contract ebank {
    string public name = "eBank";
    address public owner;
    Naira public naira;
    btk public rwd;

    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(btk _rwd, Naira _naira) {
        rwd = _rwd;
        naira = _naira;
        owner = msg.sender;
    }
// staking function
    function depositTokens(uint _amount) public {
        // require staking amount to greater than zere
        require(_amount > 0);
        // transfer tokens to this contract address for staking
        naira.transferFrom(msg.sender, address(this), _amount);

        // update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;
    if (!hasStaked[msg.sender]){
        stakers.push(msg.sender);
    }

    hasStaked[msg.sender] = true;
    isStaking[msg.sender] = true;
    
    }

// unstakin function
function unstakeToken() public {
    uint balance = stakingBalance[msg.sender];
    require(balance > 0);

    naira.transfer(msg.sender, balance);
    // reset staking balance
    stakingBalance[msg.sender] = 0;
    // update staking status
    isStaking[msg.sender] = false;
}

// issue reward
    function issueToken()public {
        require(msg.sender == owner);

        for (uint i = 0; i<stakers.length; i++){
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient]/9;
            if(balance > 0){
                rwd.transfer(recipient, balance);
            }
        }
    }
}
