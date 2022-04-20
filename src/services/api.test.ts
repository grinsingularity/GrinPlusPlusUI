import { getCommand, getConfigFilePath, getNodeDataPath } from "./node";

import { BaseApi } from "./api";
import { NodeAPI } from "./node/rest";
import { OwnerRPCApi } from "./owner/rpc";

class TestBasiApi extends BaseApi {}
class TestOwnerRPCApi extends OwnerRPCApi {}
class TestNodeAPI extends NodeAPI {}

export const _getCommand = function (): string {
  const cmd = (() => {
    switch (require("os").platform()) {
      case "win32":
        return "GrinNode.exe";
      case "darwin":
        return "GrinNode";
      case "linux":
        return "GrinNode";
      default:
        return "";
    }
  })();
  return cmd;
};

describe("APIs", () => {
  test("constructor", () => {
    const test = new TestBasiApi();
    expect(test.floonet).toBe(true);
    expect(test.protocol).toBe("http");
    expect(test.ip).toBe("127.0.0.1");
  });
  test("isMainnet()", () => {
    const falseTest = new TestBasiApi();
    expect(falseTest.isMainnet()).toBe(false);
    const trueTest = new TestBasiApi(false);
    expect(trueTest.isMainnet()).toBe(true);
  });
  test("NodeAPI", () => {
    const nodeAPIdev = new TestNodeAPI();
    let expectedValue = "http://127.0.0.1:13413/v1";
    expect(nodeAPIdev.url()).toBe(expectedValue);

    const nodeAPIprod = new TestNodeAPI(false, "http", "127.0.0.1");
    expectedValue = "http://127.0.0.1:3413/v1";
    expect(nodeAPIprod.url()).toBe(expectedValue);
  });
  test("OwnerRPCApi", () => {
    const nodeAPIdev = new TestOwnerRPCApi();
    let expectedValue = "http://127.0.0.1:3421/v2";
    expect(nodeAPIdev.url()).toBe(expectedValue);

    const nodeAPIprod = new TestOwnerRPCApi(false, "http", "127.0.0.1");
    expectedValue = "http://127.0.0.1:3421/v2";
    expect(nodeAPIprod.url()).toBe(expectedValue);
  });
  test("getNodeDataPath()", () => {
    const path = require("path");

    expect(getNodeDataPath()).toBe(
      path.normalize(require("path").join(".GrinPP", "MAINNET"))
    );
    expect(getNodeDataPath(true)).toBe(
      path.normalize(require("path").join(".GrinPP", "FLOONET"))
    );
  });
  test("getConfigFilePath()", () => {
    const path = require("path");

    expect(getConfigFilePath()).toBe(
      path.normalize(
        require("path").join(".GrinPP", "MAINNET", "server_config.json")
      )
    );
    expect(getConfigFilePath(true)).toBe(
      path.normalize(
        require("path").join(".GrinPP", "FLOONET", "server_config.json")
      )
    );
  });
  test("getCommand()", () => {
    expect(getCommand()).toBe(_getCommand());
  });
});
