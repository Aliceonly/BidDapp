const Auction =artifacts.require("auction_chenjunjie");
contract('Auction',async () => {
    it("查询出价信息函数",async () => {
        let instance =await Auction.deployed();
        instance.startAuction_chenjunjie("truffle测试商品","此商品为truffle测试专属",1,2,15);
        instance.getBidofProduct_chenjunjie.call(1).then(function(result) {
            assert.equal(result.highestBidder_chenjunjie,0x0000000000000000000000000000000000000000,"测试失败！出价地址不匹配");
            assert.equal(result.highestBid_chenjunjie,0,"测试失败！出价信息不匹配");
        })     
    });
});