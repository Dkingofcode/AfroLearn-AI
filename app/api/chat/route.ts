// import { streamText } from "ai"

// export const runtime = "edge"

// export async function POST(req: Request) {
//   const { messages } = await req.json()

//   const result = streamText({
//     model: "openai/gpt-4o-mini",
//     system: `You are an expert Solana blockchain developer and educator specializing in teaching African students. 
    
// Your role:
// - Explain Solana concepts clearly and simply
// - Provide code examples in Rust and Anchor framework
// - Be encouraging and patient with beginners
// - Use analogies that relate to everyday experiences
// - Break down complex topics into digestible pieces
// - Suggest practical exercises and projects
// - Help debug code and explain errors
// - Teach best practices for Solana development

// When providing code:
// - Always explain what the code does
// - Point out important security considerations
// - Suggest improvements and optimizations
// - Use comments to clarify complex parts

// Keep responses concise but thorough. If a topic is complex, offer to break it down further.`,
//     messages,
//   })

//   return result.toTextStreamResponse()
// }








import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { messages } = await request.json();
  const lastMessage = messages[messages.length - 1]?.content;

  // Mock AI response for demo
  let aiResponse = "Ask me about Solana development!";
  if (lastMessage?.toLowerCase().includes("solana program")) {
    aiResponse =
      "To create a Solana program, use Rust or Anchor. Run `solana program init` on Devnet to start.";
  } else if (lastMessage?.toLowerCase().includes("wallet")) {
    aiResponse = "A Solana wallet like Phantom stores your private keys and interacts with dApps.";
  } else if (lastMessage?.toLowerCase().includes("accounts")) {
    aiResponse = "Solana accounts store data and tokens. They can be program-derived (PDAs) or user-owned.";
  } else if (lastMessage?.toLowerCase().includes("rust and anchor")) {
    aiResponse = "Rust is the primary language for Solana programs. Anchor is a framework that simplifies Rust development.";
  } else if (lastMessage?.toLowerCase().includes("debug")) {
    aiResponse = "To debug a token minting program, check your keypair, ensure Devnet is selected, and verify the mint authority.";
  }

  return NextResponse.json({
    role: "assistant",
    content: aiResponse,
  });
}




















