import { request } from "../utils/request";
import { getUser, saveUser } from "./auth";

export async function changeUser(user) {
  const response = await request(
    `http://localhost:1337/api/users/${getUser().id}`,
    {
      method: "PUT",
      body: user,
    }
  );
  saveUser(response);
  return response;
}
