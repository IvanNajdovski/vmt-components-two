import { filterCaseAll } from "..";

const data = {
    id: "1"
}

describe("filterCaseAll", () => {
    test("filterCaseAll function", () => {
        expect(filterCaseAll([data])).toStrictEqual([{ "id": "1" }]);
    });

    test("filterCaseAll function, empty array", () => {
        expect(filterCaseAll([])).toStrictEqual([]);
    });
});