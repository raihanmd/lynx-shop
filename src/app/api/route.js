const { NextResponse } = require("next/server");

export async function GET() {
  const mainPath = "https://ecomerce-collab-raihanmd.vercel.app";
  return NextResponse.json(
    {
      message: "Hello",
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      },
    }
  );
}
