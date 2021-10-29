// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./erc20Types.sol";


contract ERC20CreatorV0 {

	event Created(address indexed _tokenAddress, address indexed _tokenCreator, string _tokenName);
	
	function createErc20Token(	
		string calldata _name, string calldata _symbol, 
		uint8 _decimals, uint _premint, bool isMintable, 
		bool isBurnable
	) public {
		address tokenAddress = erc20Factory(
			_name, _symbol, _decimals, _premint, isMintable, isBurnable
		);
		if(tokenAddress != address(0)) {
			emit Created(tokenAddress, msg.sender, _name);
		}
	}

	function erc20Factory (
		string calldata _name, string calldata _symbol, 
		uint8 _decimals, uint _premint, bool isMintable, 
		bool isBurnable
	) private returns(address newAddress) {
		
		if(isMintable && isBurnable) {
			Token1 newToken = new Token1(
				_name, _symbol, _decimals, _premint
			);
			if(_premint > 0) { 
				newToken.transfer(msg.sender, _premint); 
			}
			newToken.transferOwnership(msg.sender);

			return address(newToken);
		}
		else if(isMintable) {
		    Token2 newToken = new Token2(
				_name, _symbol, _decimals, _premint
			);
			if(_premint > 0) { 
				newToken.transfer(msg.sender, _premint); 
			}
			newToken.transferOwnership(msg.sender);
			return address(newToken);
		}
		else if(isBurnable) {
		    Token3 newToken = new Token3(
				_name, _symbol, _decimals, _premint
			);
			if(_premint > 0) { 
				newToken.transfer(msg.sender, _premint); 
			}
			return address(newToken);
		}
		else {
		    Token4 newToken = new Token4(
				_name, _symbol, _decimals, _premint
			);
			if(_premint > 0) { 
				newToken.transfer(msg.sender, _premint); 
			}
			return address(newToken);
		}
	}

}