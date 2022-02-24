const Auction =artifacts.require("auction_chenjunjie");
contract('Auction',async () => {
    it("查询拍卖剩余时间函数",async () => {
        let instance =await Auction.deployed();
        instance.startAuction_chenjunjie("truffle测试商品","此商品为truffle测试专属",1,2,15);
        instance.Auctionramainingtimer_chenjunjie.call(1);
    });
});