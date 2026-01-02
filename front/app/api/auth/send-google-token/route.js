// app/api/auth/send-google-token/route.ts
import { getToken } from "next-auth/jwt";

export async function POST(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token?.googleIdToken) {
        return new Response("Unauthorized", { status: 401 });
    }
    await fetch(`${process.env.BACKEND_PORT}/api/auth/google`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: token.googleIdToken }),
    });

    return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });

}
