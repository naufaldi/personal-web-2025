---
title: "How to Setup MiniMax in OpenCode"
slug: setup-minimax-opencode
description: "Step-by-step guide to configure MiniMax-M2.1 as your AI coding assistant in OpenCode, from installation to authentication."
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2026-01-20
image: "/blog/minimax-opencode.png"
---

OpenCode is a powerful AI coding assistant that supports multiple LLM providers. This guide shows you how to set up MiniMax-M2.1, a state-of-the-art coding model, as your OpenCode provider.

## What You'll Get

By the end of this guide, you'll have:

- OpenCode installed and ready to use
- MiniMax-M2.1 configured as your coding assistant
- Full access to MiniMax's advanced polyglot programming and code refactoring capabilities

## Prerequisites

- A MiniMax API key (get one at [platform.minimax.io](https://platform.minimax.io))
- Node.js 18+ or a Unix-like terminal (for curl installation)

## Step 1: Install OpenCode

You have two installation options. Choose the one that works best for your setup.

### Option A: Install via curl (Recommended)

```bash
curl -fsSL https://opencode.ai/install | bash
```

![Install OpenCode via curl](/blog/install-open.png)

### Option B: Install via npm

```bash
npm i -g opencode-ai
```

**Important:** Close and reopen your terminal (or start a new terminal session) to ensure the `opencode` command is available in your PATH.

After installation, verify that OpenCode is available by running:

```bash
opencode --version
```

## Step 2: Authenticate with MiniMax

OpenCode provides an interactive authentication flow that makes provider setup simple.

Run the authentication command:

```bash
opencode auth login
```

When prompted to select a provider:

1. Search for and select **MiniMax** from the provider list
2. Enter your MiniMax API key when prompted

> **Note:** If you subscribed through the Coding Plan, you can find your API key at [https://platform.minimax.io/user-center/payment/coding-plan](https://platform.minimax.io/user-center/payment/coding-plan)

![MiniMax Coding Plan](/blog/coding-plan.png)

![OpenCode auth login - Select MiniMax](/blog/minimax-auth.png)

That's it! OpenCode will save your credentials securely.

## Step 3: Select the MiniMax-M2.1 Model

Start OpenCode in your project directory:

```bash
cd /path/to/your/project
opencode
```

Once OpenCode is running, type `/models` to open the model selector.

Select **MiniMax-M2.1** from the list of available models.

![Select MiniMax-M2.1 model](/blog/minimax-opencode.png)

You're now ready to use MiniMax-M2.1 for AI-assisted coding!

## Step 4: Set MiniMax-M2.1 as Default Model

To avoid selecting the model every time you start OpenCode, you can set MiniMax-M2.1 as your default model.

Edit the OpenCode configuration file at `~/.config/opencode/opencode.json` and add the `defaultModel` field:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "defaultModel": "MiniMax-M2.1"
}
```

If the file doesn't exist, create it with the above content. If it already exists, just add the `defaultModel` line to your existing configuration.

Now when you start OpenCode, it will automatically use MiniMax-M2.1 without requiring manual selection each time.

![Set default model in config](/blog/default-models.png)

## Verification Checklist

To confirm everything is working correctly:

- [ ] `opencode --version` shows the installed version
- [ ] `opencode auth login` successfully authenticated with MiniMax
- [ ] `/models` command shows **MiniMax-M2.1** in the model list
- [ ] You can send a test prompt and receive a response from MiniMax-M2.1

## Important: MiniMax Model Limitations

The MiniMax-M2.1 model you just configured is a **text-only** model. This means:

- **No visual input**: MiniMax-M2.1 cannot directly analyze images, screenshots, or diagrams
- **No web search**: MiniMax-M2.1 cannot search the web for up-to-date information or documentation

These are common requirements in modern coding workflows. To add these capabilities, you need to install the **MiniMax MCP server**, which provides two additional tools:

- `web_search`: Search the web for documentation, examples, and solutions
- `understand_image`: Analyze screenshots, UI mockups, architecture diagrams, and more

The MCP server works alongside MiniMax-M2.1, giving your AI assistant access to visual understanding and real-time web information.

**Ready to extend your setup?** Check out the companion guide: [How to Add MiniMax MCP Tools to OpenCode](./setup-mcp-minimax-opencode)

## Next Steps

Now that you have MiniMax set up in OpenCode, you might want to:

- **Add MiniMax MCP tools**: Install the MiniMax MCP server to add `web_search` and `understand_image` capabilities (see the companion guide on setting up MiniMax MCP in OpenCode)
- **Explore MiniMax capabilities**: Try complex refactoring tasks, multi-language code generation, or debugging with MiniMax-M2.1
- **Customize your workflow**: Check out the [OpenCode documentation](https://opencode.ai/docs) for advanced configuration options

## References

- [MiniMax OpenCode Setup Guide](https://platform.minimax.io/docs/coding-plan/opencode)
- [OpenCode Documentation](https://opencode.ai/docs)
- [MiniMax API Documentation](https://platform.minimax.io/docs)
