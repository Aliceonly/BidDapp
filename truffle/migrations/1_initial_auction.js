const Migrations = artifacts.require("auction_chenjunjie");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
