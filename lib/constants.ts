export const DEMO_CONTRACT = `pragma solidity ^0.8.0;

contract VulnerableContract {
    mapping(address => uint256) public balances;
    
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }
    
    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        // Vulnerable to reentrancy
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        
        balances[msg.sender] -= amount;
    }
    
    function processArray(uint256[] memory data) public pure returns (uint256) {
        uint256 sum = 0;
        // Gas inefficient loop
        for (uint256 i = 0; i < data.length; i++) {
            sum += data[i];
        }
        return sum;
    }
    
    function unsafeFunction(address target, bytes memory data) public {
        // Missing input validation
        (bool success, ) = target.call(data);
        require(success, "Call failed");
    }
}`
