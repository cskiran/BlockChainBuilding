const Block = require("./Block");
const { GENESIS_DATA } = require("./config");
const cryptoHash = require("./cryptoHash");
describe("Block", () => {
  const timestamp = "new date";
  const lastHash = "lasthash";
  const hash = "hash";
  const data = ["blockcahin", "data"];
  const block = new Block({
    timestamp: timestamp,
    lastHash: lastHash,
    hash: hash,
    data: data,
  });

  it("has a timestamp, lasthash,data, hash", () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
  });

  describe("genesis()", () => {
    const genesisBlock = Block.genesis();
    it("returns a block instance", () => {
      expect(genesisBlock instanceof Block).toBe(true);
    });

    it("return the genensis data", () => {
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });

  describe("minBlock()", () => {
    const lastBlock = Block.genesis();
    const data = "mined data";
    const minedBlock = Block.mineBlock({ lastBlock, data });

    it("returns a block instance", () => {
      expect(minedBlock instanceof Block).toBe(true);
    });
    it("set the `lasthash` to be the hash of the lastblock", () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });
    it("sets the data", () => {
      expect(minedBlock.data).toEqual(data);
    });
    it("sets the timestamp", () => {
      expect(minedBlock.timestamp).not.toEqual(undefined);
    });
    it("creates a SHA-256 hash based on the proper inputs", () => {
      expect(minedBlock.hash).toEqual(
        cryptoHash(minedBlock.timestamp, lastBlock.hash, data)
      );
    });
  });
});
