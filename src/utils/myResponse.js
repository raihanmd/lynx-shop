import { NextResponse } from "next/server";

export const myResponse = (statusCode, payload, message) => {
  if (typeof payload === "string") {
    payload = JSON.parse(payload);
  }

  return NextResponse.json(
    {
      statusCode,
      payload,
      message,
      metadata: {
        prev: "",
        next: "",
        current: "",
      },
    },
    {
      status: statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59",
        "Content-Type": "application/json",
      },
    }
  );
};
