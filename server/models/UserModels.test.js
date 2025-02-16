import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt";
import User from "./UserModels";
import { jest } from "@jest/globals";

describe("User Model", () => {
  let user;

  beforeAll(() => {
    user = new User({
      email: "test@example.com",
      password: "plaintextpassword",
    });
  });
});
it("Should execute the pre-save hook before saving a new user document", async () => {
  const saveSpy = jest.spyOn(userSchema, "pre");
  const newUser = new User({
    email: "test@example.com",
    password: "plaintextpassword",
  });

  await newUser.save();

  expect(saveSpy).toHaveBeenCalledWith("save", expect.any(Function));
  saveSpy.mockRestore();
});
