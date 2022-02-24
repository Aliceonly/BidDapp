const Auction =artifacts.require("auction_chenjunjie");
contract('Auction',async () => {
    it("测试启动拍卖函数",async () => {
        let instance = await Auction.deployed();
        instance.startAuction_chenjunjie("truffle测试商品","此商品为truffle测试专属",1,2,1);
        instance.getProductInfo_chenjunjie.call(1).then(function(result) {
            assert.equal(result.startState_chenjunjie,true,"测试失败！拍卖未开始");
        })
    });
});