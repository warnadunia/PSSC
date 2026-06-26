import { redirect } from "next/navigation";

export default function CoachRootPage() {
  // Langsung arahkan ke MyPage kalau user buka /coach
  redirect("/coach/mypage");
}