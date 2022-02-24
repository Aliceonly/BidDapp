const web3 = new Web3(Web3.givenProvider);
console.log("web3=>",web3);

const abi=[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "EndAuction_chenjunjie",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "bidder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "HigherBid_chenjunjie",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "starter",
				"type": "address"
			}
		],
		"name": "StartAuction_chenjunjie",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_ProductId_chenjunjie",
				"type": "uint256"
			}
		],
		"name": "Auctionramainingtimer_chenjunjie",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_ProductId_chenjunjie",
				"type": "uint256"
			}
		],
		"name": "bid_chenjunjie",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_ProductId_chenjunjie",
				"type": "uint256"
			}
		],
		"name": "getBidofProduct_chenjunjie",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_ProductId_chenjunjie",
				"type": "uint256"
			}
		],
		"name": "getProductInfo_chenjunjie",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "productIndex_chenjunjie",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_ProductId_chenjunjie",
				"type": "uint256"
			}
		],
		"name": "settleAuction_chenjunjie",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_ProductName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ProductDesc",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_startPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_MinimunBid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_duration",
				"type": "uint256"
			}
		],
		"name": "startAuction_chenjunjie",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

var myContract = new web3.eth.Contract(abi, '0xDda15E83926E7530bCA7c53c73AEFF7BE98cD137');

let system_accounts = [];
web3.eth.getAccounts().then(function(acc){
    system_accounts = acc;
    console.log("using account=>",system_accounts[0]);
});

$("#Submission").click(function(){
	myContract.methods.startAuction_chenjunjie($("#ProductName").val(),
	$("#ProductDesc").val(),$("#startPrice").val(),
	$("#MinimumBid").val(),$("#duration").val()).send({
		from: system_accounts[0],
	}).then(function(receipt){
		console.log(receipt);
	})
});

$("#GogetBidInfo").click(function(){
	myContract.methods.getBidofProduct_chenjunjie($("#ProductIdForBidInfo").val()).call().then(function(Information){
		$(".showHighestBidder").html(Information[0])
		$(".showHighestBid").html(Information[1])
	});
	myContract.methods.Auctionramainingtimer_chenjunjie($("#ProductIdForBidInfo").val()).call().then(function(Information){
		$(".showRemainTime").html(Information)
	});
});

$("#SeleteTheAuction").click(function() {
	myContract.methods.settleAuction_chenjunjie($("#ProductIdForSettle").val()).send({
		from: system_accounts[0],
	}).then(function(receipt){
		console.log("settle receipt=>",receipt)
		alert("您的拍卖已经结算完毕")
	})
});

$("#GogetProductInfo").click(function() {
	myContract.methods.getProductInfo_chenjunjie($("#IdForProductInfo").val()).call().then(function(Information){
		$(".showProductName").html(Information[1])
		$(".showProductDesc").html(Information[2])
		$(".showStartPrice").html(Information[3])
		$(".showMinimunBid").html(Information[4])
		$(".showStartTime").html(Information[5])
		$(".showEndTime").html(Information[6])
		$(".showBeneficiary").html(Information[7])
	});
})

$("#BidSubmission").click(function(){
	id = parseInt($("#ProductId").val());
	console.log("bidding specify the id:", id);
	console.log("bidding account=>", system_accounts[0]);
    myContract.methods.bid_chenjunjie(id).send({
        from: system_accounts[0],
        value: $("#value").val() * 1000000000000000000
    }).then(function(receipt){
        console.log("bid receipt=>", receipt)
		alert("您的报价已经被接受")
    })
});

myContract.methods.productIndex_chenjunjie().call().then(function(value){
	$(".showProductNum").html(value);
});