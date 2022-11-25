//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

error raffle__NotEnoughEthEntered();

contract raffle is VRFConsumerBaseV2 {
    // state variables
    uint256 private immutable i_entranceFee;
    address payable[] private s_players;

    /*Events*/
    event RaffleEnter(address indexed player);

    constructor(address VRFCoordinator, uint256 entranceFee) VRFConsumerBaseV2(VRFCoordinator) {
        i_entranceFee = entranceFee;
    }

    function enterRaffle() public payable {
        if (msg.value < i_entranceFee) {
            revert raffle__NotEnoughEthEntered();
        }

        s_players.push(payable(msg.sender));
        emit RaffleEnter(msg.sender);
    }

    function requestRandomWinner() external {}

    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords)
        internal
        override
    {}

    function getEntranceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getPlayers(uint256 index) public view returns (address) {
        return s_players[index];
    }
}
