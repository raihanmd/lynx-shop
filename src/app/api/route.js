const { NextResponse } = require("next/server");

export async function GET() {
  return NextResponse.json(
    {
      message: "Hello",
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Content-Type": "application/json",
      },
    }
  );
}
