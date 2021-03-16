pragma solidity =0.5.16;

import '../PlateERC20.sol';

contract ERC20 is PlateERC20 {
    constructor(uint _totalSupply) public {
        _mint(msg.sender, _totalSupply);
    }
}
