"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const pw = formData.get("pw") as string;
  if (pw === process.env.AGENT_SECRET) {
    const cookieStore = await cookies();
    cookieStore.set("agent_authed", "1", {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
    });
    redirect("/agent");
  }
  redirect("/agent?error=1");
}
