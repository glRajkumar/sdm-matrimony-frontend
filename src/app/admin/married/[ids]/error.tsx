'use client';

import { redirect } from "next/navigation";

function Error() {
  return redirect("/admin/married")
}

export default Error
