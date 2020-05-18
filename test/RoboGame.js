const RoboGame = artifacts.require("RoboGame");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("RoboGame", ([deployer, owner, tipper]) => {
  let roboGame;

  before(async () => {
    roboGame = await RoboGame.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = await RoboGame.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await roboGame.name();
      assert.equal(name, "Robot game!");
    });
  });

  describe("robots", async () => {
    let result, robotCount;

    before(async () => {
      result = await roboGame.createRobot("Henry", {
        from: owner,
      });
      robotCount = await roboGame.robotCount();
    });

    it("creates robots", async () => {
      //success
      assert.equal(robotCount, 1);
      const event = result.logs[0].args;
      assert.equal(
        event.robotID.toNumber(),
        robotCount.toNumber(),
        "robotID is correct"
      );
      assert.equal(event.name, "Henry", "name is correct");
      assert.equal(event.level, "0", "level is correct");
      assert.equal(event.owner, owner, "owner is correct");

      //failure: no robot name
      await roboGame.createRobot("", { from: owner }).should.be.rejected;
    });

    //all values for Ether are stored in Wei, because of no floating number storage, must be integer
    it("allows users to level each other", async () => {
      let oldOwnerBalance;
      oldOwnerBalance = await web3.eth.getBalance(owner);
      oldOwnerBalance = new web3.utils.BN(oldOwnerBalance);

      result = await roboGame.levelRobot(robotCount, {
        from: tipper,
        value: web3.utils.toWei("1", "Ether"),
      });
      //success
      const event = result.logs[0].args;
      assert.equal(
        event.robotID.toNumber(),
        robotCount.toNumber(),
        "id is correct"
      );
      assert.equal(event.name, "Henry", "conrent is correct");
      assert.equal(
        event.level,
        "1000000000000000000",
        "level amount is correct"
      );
      assert.equal(event.owner, owner, "owner is correct");

      //Check that owner recieved funds
      let newOwnerBalance;
      newOwnerBalance = await web3.eth.getBalance(owner);
      newOwnerBalance = new web3.utils.BN(newOwnerBalance);

      let level;
      level = web3.utils.toWei("1", "Ether");
      level = new web3.utils.BN(level);

      const expectedLevel = oldOwnerBalance.add(level);

      assert.equal(newOwnerBalance.toString(), expectedLevel.toString());

      //Failure: tries to level a robot that does not exist
      await roboGame.levelRobot(99, {
        from: tipper,
        value: web3.utils.toWei("1", "Ether"),
      }).should.be.rejected;
    });
  });
});
