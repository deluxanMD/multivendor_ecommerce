import { User } from "@/generated/prisma/client";
import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const { id } = evt.data;
    const eventType = evt.type;

    // User Created or User Updated
    if (eventType === "user.created" || eventType === "user.updated") {
      const data = evt.data;
      const user: Partial<User> = {
        id: id || "",
        name: data.first_name + " " + data.last_name,
        email: data.email_addresses[0]?.email_address || "",
        picture: data.image_url || "",
      };

      if (!user) return;

      const dbUser = await db.user.upsert({
        where: { email: user.email },
        update: user,
        create: {
          id: user.id!,
          name: user.name!,
          email: user.email!,
          picture: user.picture!,
          role: user.role || "USER",
        },
      });

      const client = await clerkClient();
      await client.users.updateUserMetadata(id!, {
        privateMetadata: { role: dbUser.role || "USER" },
      });
    }

    // User Deleted
    if (eventType === "user.deleted") {
      await db.user.delete({ where: { id: id || "" } });
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
