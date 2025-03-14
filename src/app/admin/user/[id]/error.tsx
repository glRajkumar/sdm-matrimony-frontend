'use client';

import { redirect } from "next/navigation";

function Error() {
  return redirect("/admin")
}

export default Error
