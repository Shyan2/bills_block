const SocialNetwork = artifacts.require("SocialNetwork");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("SocialNetwork", ([deployer, author, tipper]) => {
  //array provided by ganashe
  let socialNetwork; //represents deployed SC

  before(async () => {
    socialNetwork = await SocialNetwork.deployed();
  });
  //async await pattern, works inatly in truffle
  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = await SocialNetwork.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await socialNetwork.name();
      assert.equal(name, "Dapp University Social Network");
    });
  });

  describe("posts", async () => {
    let result, postCount;

    before(async () => {
      result = await socialNetwork.createPost("This is my first post", {
        from: author,
      });
      postCount = await socialNetwork.postCount();
    });

    it("creates posts", async () => {
      //Success
      assert.equal(postCount, 1);
      const event = result.logs[0].args;
      assert.equal(event.id.toNumber(), postCount.toNumber(), "id is correct");
      assert.equal(
        event.content,
        "This is my first post",
        "content is correct"
      );
      assert.equal(event.tipAmount, "0", "tip amount is correct");
      assert.equal(event.author, author, "author is correct");

      //Failure: Post must have content
      await socialNetwork.createPost("", { from: author }).should.be.rejected;
    });

    it("lists posts", async () => {
      const post = await socialNetwork.posts(postCount);
      assert.equal(post.id.toNumber(), postCount.toNumber(), "id is correct");
      assert.equal(post.content, "This is my first post", "content is correct");
      assert.equal(post.tipAmount, "0", "tip amount is correct");
      assert.equal(post.author, author, "author is correct");
    });

    //all values for Ether are stored in Wei, because of no floating number storage, must be integer
    it("allows users to tip posts", async () => {
      let oldAuthorBalance;
      oldAuthorBalance = await web3.eth.getBalance(author);
      oldAuthorBalance = new web3.utils.BN(oldAuthorBalance); //Big Number in JS

      result = await socialNetwork.tipPost(postCount, {
        from: tipper,
        value: web3.utils.toWei("1", "Ether"),
      });
      //Success
      const event = result.logs[0].args;
      assert.equal(event.id.toNumber(), postCount.toNumber(), "id is correct");
      assert.equal(
        event.content,
        "This is my first post",
        "content is correct"
      );
      assert.equal(
        event.tipAmount,
        "1000000000000000000",
        "tip amount is correct"
      );
      assert.equal(event.author, author, "author is correct");

      //Check that author receieved funds
      let newAuthorBalance;
      newAuthorBalance = await web3.eth.getBalance(author);
      newAuthorBalance = new web3.utils.BN(newAuthorBalance); //Big Number in JS

      let tipAmount;
      tipAmount = web3.utils.toWei("1", "Ether");
      tipAmount = new web3.utils.BN(tipAmount);

      const expectedBalance = oldAuthorBalance.add(tipAmount);

      assert.equal(newAuthorBalance.toString(), expectedBalance.toString());

      //Failure: Tries to tip a post that does not exist
      await socialNetwork.tipPost(99, {
        from: tipper,
        value: web3.utils.toWei("1", "Ether"),
      }).should.be.rejected;
    });
  });
});
