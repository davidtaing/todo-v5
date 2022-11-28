import { server } from "../mocks/server";
import { useRouter } from "next/router";
jest.mock("next/router", () => require("next-router-mock"));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
