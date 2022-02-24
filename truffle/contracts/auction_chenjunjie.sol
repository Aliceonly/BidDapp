// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract auction_chenjunjie {

    uint public productIndex_chenjunjie;

    struct ProductInfo_chenjunjie {
        uint ProductId_chenjunjie;
        string ProductName_chenjunjie;
        string ProductDesc_chenjunjie;
        uint startPrice_chenjunjie;
        uint StartTime_chenjunjie;
        uint TimeLimit_chenjunjie;
        address Beneficiary_chenjunjie;
        bool startState_chenjunjie;
        bool endState_chenjunjie;
        uint MinimunBid_chenjunjie;
        uint Bidvalue_chenjunjie;
        address payable highestBidder_chenjunjie;
        uint highestBid_chenjunjie;
    }

    event HigherBid_chenjunjie (
        address bidder,
         uint amount
         );
    event StartAuction_chenjunjie (
        address starter
        );
    event EndAuction_chenjunjie (
        address winner,
         uint amount
         );
    mapping (
        address => mapping(
            uint => ProductInfo_chenjunjie
            )
    ) stores_chenjunjie;
    mapping (
        uint => address
        ) productIdInStore_chenjunjie;

    constructor() {
        productIndex_chenjunjie = 0;
    }

	function startAuction_chenjunjie(
        string memory _ProductName,
        string memory _ProductDesc,
        uint _startPrice,
        uint _MinimunBid,
        uint _duration)
            public {
        productIndex_chenjunjie += 1;
        ProductInfo_chenjunjie storage product =
         stores_chenjunjie[
             msg.sender
             ][
                 productIndex_chenjunjie
                 ];
        require(!product.startState_chenjunjie,
         "The auction has begun");
        product.ProductId_chenjunjie =
         productIndex_chenjunjie;
        product.Beneficiary_chenjunjie =
         msg.sender;
        product.StartTime_chenjunjie =
         block.timestamp;
        product.TimeLimit_chenjunjie =
         block.timestamp + _duration;
        product.ProductName_chenjunjie =
         _ProductName;
        product.ProductDesc_chenjunjie =
         _ProductDesc;
        product.startPrice_chenjunjie =
         _startPrice 
         *
          1000000000000000000;
        product.MinimunBid_chenjunjie =
         _MinimunBid 
         *
          1000000000000000000;
	    product.startState_chenjunjie =
         true;
	    emit StartAuction_chenjunjie(
            msg.sender
            );
        productIdInStore_chenjunjie[
            productIndex_chenjunjie
            ] = msg.sender;
    }

    function getProductInfo_chenjunjie(
        uint _ProductId_chenjunjie
        )
     public view
      returns (
            uint,
        string memory,
        string memory,
            uint,
            uint,
            uint,
            uint,
            address,
            bool,
            bool
            ) {
        ProductInfo_chenjunjie storage product =
         stores_chenjunjie
        [
            productIdInStore_chenjunjie
            [
                _ProductId_chenjunjie
                ]
                ][
                    _ProductId_chenjunjie
                    ];
        return (
            product.ProductId_chenjunjie,
             product.ProductName_chenjunjie,
              product.ProductDesc_chenjunjie,
               product.startPrice_chenjunjie,
                product.MinimunBid_chenjunjie,
                 product.StartTime_chenjunjie,
                  product.TimeLimit_chenjunjie,
                   product.Beneficiary_chenjunjie,
                    product.startState_chenjunjie,
                     product.endState_chenjunjie
                     );
    }

    function getBidofProduct_chenjunjie(
        uint _ProductId_chenjunjie
        ) public view returns (
            address,
             uint
            ) {
        ProductInfo_chenjunjie storage product =
         stores_chenjunjie
        [productIdInStore_chenjunjie
        [_ProductId_chenjunjie]
        ][
            _ProductId_chenjunjie
            ];
        return (
            product.highestBidder_chenjunjie,
             product.highestBid_chenjunjie
             );
    }

    function Auctionramainingtimer_chenjunjie(
        uint _ProductId_chenjunjie
        ) public view returns (
            uint
            ){
        ProductInfo_chenjunjie storage product =
         stores_chenjunjie
        [productIdInStore_chenjunjie
        [_ProductId_chenjunjie]
        ][
            _ProductId_chenjunjie
            ];
        return 
        product.TimeLimit_chenjunjie - block.timestamp;
    }

    function bid_chenjunjie(
        uint _ProductId_chenjunjie
        ) payable public {
        ProductInfo_chenjunjie storage product =
         stores_chenjunjie
        [productIdInStore_chenjunjie
        [_ProductId_chenjunjie]
        ][
            _ProductId_chenjunjie
            ];
        product.Bidvalue_chenjunjie =
         msg.value;
        require(
            product.startState_chenjunjie,
         "The auction has not yet begun");
        require(
            block.timestamp > product.StartTime_chenjunjie,
         "This is earlier than the auction start time");
        require(
            block.timestamp < product.TimeLimit_chenjunjie,
         "This is later than the auction end time");
        require(
            msg.sender != product.Beneficiary_chenjunjie,
         "You are the beneficiary of this auction");
        require(
            msg.value >= product.startPrice_chenjunjie,
         "Your bid is less than the starting price");
        require(
            msg.value >= product.startPrice_chenjunjie
             + product.MinimunBid_chenjunjie,
         "Your bid should larger than the minimun bid");
        require(
            msg.value > product.highestBid_chenjunjie,
         "Your bid is less than the highest bid");
        require(
            msg.value >= product.highestBid_chenjunjie
             + product.MinimunBid_chenjunjie,
         "Your bid should larger than the minimun bid");

        if (
            product.highestBid_chenjunjie != 0
            ) {
          payable(
              product.highestBidder_chenjunjie
              ).transfer(
                  product.highestBid_chenjunjie
                  );
        }

        product.highestBidder_chenjunjie =
         payable(msg.sender);
        product.highestBid_chenjunjie =
         msg.value;

        emit HigherBid_chenjunjie(
            msg.sender,
             msg.value
             );
    }

    function settleAuction_chenjunjie(
        uint _ProductId_chenjunjie
        ) public {
        ProductInfo_chenjunjie storage product =
         stores_chenjunjie
        [productIdInStore_chenjunjie
        [_ProductId_chenjunjie]
        ][
            _ProductId_chenjunjie
            ];
        require(
            product.startState_chenjunjie==true,
             "The auction has not yet begun");
        require(
            block.timestamp >= product.TimeLimit_chenjunjie,
             "The auction is not over yet");
        require(
            !product.endState_chenjunjie,
             "The auction is over");
        require(
            product.Beneficiary_chenjunjie == msg.sender,
             "The settlement of the auction is only available for the beneficiary");
        product.endState_chenjunjie = true;
        emit EndAuction_chenjunjie(
            product.highestBidder_chenjunjie,
             product.highestBid_chenjunjie
             );
        payable(
            product.Beneficiary_chenjunjie
            ).transfer(
                product.highestBid_chenjunjie
                );
    }
}