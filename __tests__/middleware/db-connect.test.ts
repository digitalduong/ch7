/**
* @jest-environment node
*/

import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import dbConnect from "../../middleware/db-connect";

describe("dbConnect", () => {
  let connection: any;

  afterEach(async () => {
    jest.clearAllMocks();
    if (connection) {
      await connection.stop();
    }
    await mongoose.disconnect();
  });

  test("calls MongoMemoryServer.create()", async () => {
    const spy = jest.spyOn(MongoMemoryServer, "create");
    connection = await dbConnect();
    expect(spy).toHaveBeenCalled();
  });

  test("calls mongoose.disconnect()", async () => {
    connection = await dbConnect();
    const spy = jest.spyOn(mongoose, "disconnect");
    await mongoose.disconnect();
    expect(spy).toHaveBeenCalled();
  });

  test("calls mongoose.connect()", async () => {
    connection = await dbConnect();
    const spy = jest.spyOn(mongoose, "connect");
    const MONGO_URI = connection.getUri();
    expect(spy).toHaveBeenCalledWith(MONGO_URI, { dbName: "Weather" });
  });
});
