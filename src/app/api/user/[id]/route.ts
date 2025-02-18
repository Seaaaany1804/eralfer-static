import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/app/utils/errorHandler";
import { UserService } from "@/services/userService";

// 📌 GET: Fetch a single user by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = parseInt(params.id, 10);

    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // Fetch user from DB
    const user = await UserService.getUserById(userId);
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });

  } catch (error) {
    return handleApiError({ error: "Error fetching user by ID: " + error });    
  }
}