/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { UserService } from "@/services/userService";

// 📌 GET: Fetch a single user by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id);
    // Fetch user from DB
    const user = await UserService.getUserById(userId);
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });

  } catch (error) {
    return Response.json({ error: 'Invalid user ID' }, { status: 400 });
  }
}
