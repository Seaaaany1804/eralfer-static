"use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { AuthService } from "@/services/authService";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // // const [error, setError] = useState("");
    // const router = useRouter();

    // const handleLogin = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setError("");

    //     try {
    //         const response = await AuthService.login(email, password);
    //         const data = await response.json(); // ✅ Extract JSON from response            
    //         // 🔀 Redirect based on role
    //         switch (data.role) {
    //             case "admin":
    //                 router.push("/admin/dashboard");
    //                 break;
    //             case "teacher":
    //                 router.push("/teacher/dashboard");
    //                 break;
    //             case "student":
    //                 router.push("/student/dashboard");
    //                 break;
    //             default:
    //                 router.push("/");
    //         }
    //     // } catch (err) {
    //     //     setError("Invalid email or password" + err);
    //     // }
    // };

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
    );
}
