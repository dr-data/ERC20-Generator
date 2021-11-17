// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20_Simple is ERC20 {
	uint8 private decimals2;

	constructor(string memory _name, string memory _symbol, uint8 _decimals, uint _premint) ERC20(_name, _symbol) {
		decimals2 = _decimals;
		if(_premint > 0) { _mint(msg.sender, _premint); }
	}

	function decimals() public view override returns (uint8) {
        return decimals2;
    }
}
