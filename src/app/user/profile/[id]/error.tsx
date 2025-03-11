'use client';

import { redirect } from "next/navigation";

function Error() {
  return redirect("/user")
}

export default Error
