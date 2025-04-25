/* globals describe, expect, test */

import { types } from "../../../src/auth/types/types";

describe("auth types", () => {
  test("should have the correct types", () => {
    expect(types).toEqual({
      login: "[Auth] Login",
      logout: "[Auth] Logout",
    });
  });
});
