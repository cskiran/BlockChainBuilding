const BlockChain = require("./blockChain");
const Block = require("./Block");

describe("BlockChain", () => {
  let blockChain = new BlockChain();
  beforeEach(() => {
    blockChain = new BlockChain();
  });
  it("contains a chain Array instance", () => {
    expect(blockChain.chain instanceof Array).toBe(true);
  });
  it("starts with genesis block", () => {
    expect(blockChain.chain[0]).toEqual(Block.genesis());
  });
  it("add new block to chain", () => {
    const newData = "random";
    blockChain.addBlock({ data: newData });
    expect(blockChain.chain[blockChain.chain.length - 1].data).toEqual(newData);
  });

  describe("isValidChain()", () => {
    describe("when chain does not run with genesis block", () => {
      it("returns false", () => {
        blockChain.chain[0] = { data: "fake" };
        expect(BlockChain.isValidChain(blockChain.chain)).toBe(false);
      });
    });
    describe("when the chain start with genesis block", () => {
      beforeEach(() => {
        blockChain.addBlock({ data: "bears" });
        blockChain.addBlock({ data: "beats" });
        blockChain.addBlock({ data: "battle" });
      });
      describe("and a lasthash reference has changed", () => {
        it("returns false", () => {
          blockChain.chain[2].lastHash = "broken-last";
          expect(BlockChain.isValidChain(blockChain.chain)).toBe(false);
        });
      });
      describe("and chain contains a block with an invalid field", () => {
        it("returns false", () => {
          blockChain.chain[2].data = "bad-data";
          expect(BlockChain.isValidChain(blockChain.chain)).toBe(false);
        });
        describe("and chain does not contain any invalid blocks", () => {
          it("returns", () => {
            expect(BlockChain.isValidChain(blockChain.chain)).toBe(true);
          });
        });
      });
    });
  });
});
