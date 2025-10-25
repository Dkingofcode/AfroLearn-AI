import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, context } = body

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // For now, using the same intelligent response system
    // In production, this would call OpenAI/Anthropic API
    const response = generateAIResponse(message, context)

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Error in AI tutor:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}

function generateAIResponse(message: string, context?: any): string {
  const lowerMessage = message.toLowerCase()

  // Solana-specific responses
  if (lowerMessage.includes("solana") && lowerMessage.includes("account")) {
    return `**Understanding Solana Accounts**

Solana accounts are the fundamental building blocks of the Solana blockchain. Here's what you need to know:

**Account Structure:**
- **Address**: 32-byte public key (unique identifier)
- **Lamports**: Balance in lamports (1 SOL = 1,000,000,000 lamports)
- **Owner**: Program that controls the account
- **Data**: Arbitrary bytes for storing state
- **Executable**: Boolean flag for program accounts
- **Rent Epoch**: For rent collection

**Types of Accounts:**
1. **System Accounts**: Regular user accounts holding SOL
2. **Program Accounts**: Contain executable code
3. **Data Accounts**: Store program state (often PDAs)
4. **Token Accounts**: Hold SPL tokens

**Key Concepts:**
- Accounts must be rent-exempt (minimum balance)
- Only the owner program can modify account data
- Accounts can be created, closed, and reallocated

**Example in Anchor:**
\`\`\`rust
#[account]
pub struct MyAccount {
    pub owner: Pubkey,
    pub data: u64,
    pub bump: u8,
}
\`\`\`

Need help with a specific account operation?`
  }

  if (lowerMessage.includes("rust") && (lowerMessage.includes("ownership") || lowerMessage.includes("borrow"))) {
    return `**Rust Ownership and Borrowing**

This is one of Rust's most important concepts! Let me break it down:

**Ownership Rules:**
1. Each value has a single owner
2. When the owner goes out of scope, the value is dropped
3. Values can be moved or borrowed

**Borrowing:**
- **Immutable borrow (&T)**: Multiple readers allowed
- **Mutable borrow (&mut T)**: Only one mutable reference at a time

**Example:**
\`\`\`rust
fn main() {
    let s1 = String::from("hello");
    let s2 = &s1; // Immutable borrow
    let s3 = &s1; // Multiple immutable borrows OK
    
    println!("{}, {}, {}", s1, s2, s3); // All valid
    
    let mut s4 = String::from("world");
    let s5 = &mut s4; // Mutable borrow
    // let s6 = &s4; // ERROR: Can't borrow while mutably borrowed
    
    s5.push_str("!");
    println!("{}", s5);
}
\`\`\`

**Common Patterns in Solana:**
- Accounts are borrowed as references
- Use \`&mut\` for accounts you'll modify
- Use \`&\` for read-only accounts

Want to see more examples?`
  }

  if (lowerMessage.includes("anchor") && lowerMessage.includes("pda")) {
    return `**Program Derived Addresses (PDAs) in Anchor**

PDAs are a powerful feature for creating deterministic addresses without private keys!

**What are PDAs?**
- Addresses derived from seeds + program ID
- No private key exists (program signs for them)
- Deterministic and reproducible

**Why use PDAs?**
1. Store program state
2. Sign transactions on behalf of the program
3. Create unique addresses per user/resource

**Anchor Implementation:**
\`\`\`rust
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 32 + 8,
        seeds = [b"vault", user.key().as_ref()],
        bump
    )]
    pub vault: Account<'info, Vault>,
    
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Vault {
    pub owner: Pubkey,
    pub balance: u64,
    pub bump: u8,
}
\`\`\`

**Key Points:**
- Seeds must be consistent for the same PDA
- Store the bump for efficiency
- Use \`seeds\` and \`bump\` constraints in Anchor

**Finding PDAs:**
\`\`\`rust
let (pda, bump) = Pubkey::find_program_address(
    &[b"vault", user.key().as_ref()],
    program_id
);
\`\`\`

Need help implementing a specific PDA pattern?`
  }

  if (lowerMessage.includes("token") || lowerMessage.includes("spl")) {
    return `**SPL Tokens on Solana**

SPL (Solana Program Library) tokens are Solana's standard for fungible and non-fungible tokens!

**Token Program Basics:**
- **Mint Account**: Defines the token (supply, decimals, authority)
- **Token Account**: Holds tokens for a specific owner
- **Associated Token Account (ATA)**: Deterministic token account per user

**Creating a Token in Anchor:**
\`\`\`rust
use anchor_spl::token::{self, Mint, Token, TokenAccount};

#[derive(Accounts)]
pub struct CreateToken<'info> {
    #[account(
        init,
        payer = payer,
        mint::decimals = 9,
        mint::authority = mint_authority,
    )]
    pub mint: Account<'info, Mint>,
    
    #[account(mut)]
    pub payer: Signer<'info>,
    
    /// CHECK: This is the mint authority
    pub mint_authority: AccountInfo<'info>,
    
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}
\`\`\`

**Minting Tokens:**
\`\`\`rust
pub fn mint_tokens(ctx: Context<MintTokens>, amount: u64) -> Result<()> {
    token::mint_to(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::MintTo {
                mint: ctx.accounts.mint.to_account_info(),
                to: ctx.accounts.token_account.to_account_info(),
                authority: ctx.accounts.authority.to_account_info(),
            },
        ),
        amount,
    )?;
    Ok(())
}
\`\`\`

**Common Operations:**
- Create mint
- Create token account
- Mint tokens
- Transfer tokens
- Burn tokens

What specific token operation do you need help with?`
  }

  // Default comprehensive response
  return `I'm your AI tutor specialized in Solana, Rust, and Anchor development! 

**I can help you with:**

**Solana Development:**
- Account model and architecture
- Transaction structure
- Program deployment
- RPC interactions
- Solana CLI usage

**Rust Programming:**
- Ownership and borrowing
- Structs and enums
- Error handling
- Traits and generics
- Async programming

**Anchor Framework:**
- Program structure
- Account constraints
- Cross-program invocations (CPIs)
- PDAs and seeds
- Testing and deployment

**Common Topics:**
- SPL tokens
- NFT minting
- DeFi protocols
- Security best practices
- Performance optimization

**Ask me specific questions like:**
- "How do I create a PDA in Anchor?"
- "Explain Rust ownership with examples"
- "How do I mint SPL tokens?"
- "What are the security risks in Solana programs?"
- "Help me debug this error: [paste error]"

What would you like to learn about today?`
}
