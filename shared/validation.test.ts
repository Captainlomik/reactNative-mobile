import { validationEmail } from "./validation";

describe("email validateion", () => {
    it("invalid email", () => {
        expect(validationEmail("123")).toBe(false);
    });
    it("invalid email", () => {
        expect(validationEmail("123@.ru")).toBe(false);
    });
    it("valid email", () => {
        expect(validationEmail("sergei@pshonnov.ru")).toBe(true);
    });
});
