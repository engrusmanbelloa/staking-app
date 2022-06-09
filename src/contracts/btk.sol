// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

contract btk {
    string public name = "Bitkova token";
    string public symbol = "BTK";
    uint256 public totalSupply = 1000000000000000000000000;
    uint8 public decimals = 18;

    event Transfer(
        address indexed _from, 
        address indexed _to, 
        uint256 _value
        );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );
    // iterate thru addresses for fetching their respective balances
    mapping(address => uint256) public balanceOf;
    // iterate thru addresses for transaction approval
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() {
        // associate the owner address to the total supply
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        // require that the value to be sent is greater than or equal to balance of msg sender
        require(balanceOf[msg.sender] >= _value);
        // transfer the amount and deduct the balance msg sender
        balanceOf[msg.sender] -= _value;
        // increment the balance of the receiver
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
      allowance[msg.sender][_spender] = _value;
      emit Approval(msg.sender, _spender, _value);  
      return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        // require that the value to be sent is greater than or equal to balance of msg sender
        require(balanceOf[_from] >= _value);
        require(allowance[_from][msg.sender] >= _value);
        // increment balance of the receiver
        balanceOf[_to] += _value;
        // decrement the balance of the sender
        balanceOf[_from] -= _value;
        // approval
        allowance[msg.sender][_from] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}
