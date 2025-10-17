"use client";

import { useEffect } from "react";

function OpenInstruct() {
  useEffect(() => {
    const id = setTimeout(() => {
      document.getElementById("open-instr")?.click?.()
    }, 1000)

    return () => clearTimeout(id)
  }, [])

  return null
}

export default OpenInstruct
