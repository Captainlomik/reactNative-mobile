import { passwordValidation, validationEmail } from "./validation";

describe("email validation", () => {
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

describe("password validation", () => {
  it("password too short", () => {
    expect(passwordValidation("hell")).toBe(false)
  })
  it("valid password", () => {
    expect(passwordValidation("hellotheremafriend")).toBe(true)
  })
})
