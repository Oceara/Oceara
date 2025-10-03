import { expect } from "chai";
import { ethers } from "hardhat";

describe("Lock", function () {
  it("Should set the right unlockTime", async function () {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const unlockTime = (await ethers.time.latest()) + ONE_YEAR_IN_SECS;
    const lockedAmount = ethers.parseEther("1");

    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

    expect(await lock.unlockTime()).to.equal(unlockTime);
  });
});


