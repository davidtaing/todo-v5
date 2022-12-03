import { getRandomInt } from "./utils";

describe("utils.ts", () => {
  describe("getRandomInt", () => {
    it("returns a random int", () => {
      const result = getRandomInt(1, 100);

      expect(result % 1 === 0).toBeTruthy();
    });
  });
});
