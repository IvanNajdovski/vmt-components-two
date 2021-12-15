import { generateQuery } from "..";

const object = {
    params: "params",
    index: 1
}

const object1 = {
    params: ["params", "params2"],
    index: 1
}

describe("generateQuery", () => {

    test("generateQuery function", () => {
        expect(generateQuery(object)).toBe("?params=params&index=1");
    });
    
});