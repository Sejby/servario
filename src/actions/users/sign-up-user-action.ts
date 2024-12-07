"use server";

import User, { IUser } from "@/lib/mongodb/models/user-model";
import { connectToDB } from "@/lib/mongodb/mongo";
import { redirect } from "next/navigation";

interface IPreviousState {
  state: string;
}

export async function signUpUserAction(
  previousState: IPreviousState,
  formData: FormData
) {
  try {
    await connectToDB();

    const user: IUser = await User.create({
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    });

    if (!user) {
      return "User not created";
    }
  } catch (error) {
    console.log(error);
    return "Failed to create user";
  }

  redirect("/signin");
}
