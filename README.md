# Workflow Builder - Frontend Challenge

A visual workflow builder application built with React, TypeScript, and Radix UI.

## 🎯 Code Challenge

> **📖 Start Here:** Before beginning, please read [CODE_CHALLENGE.md](./CODE_CHALLENGE.md) for complete requirements and [EXAMPLES.md](./EXAMPLES.md) for helpful patterns and hints.

**Task Summary:**

1. Implement form validation for all node types
2. Add auto-save functionality that triggers when all nodes are valid
3. Store workflows in localStorage and restore on reload
4. Display real validation errors in the ValidationPanel

**Time Estimate:** 3 hours for core requirements

## 📚 Documentation

**Read these first:**

- **[CODE_CHALLENGE.md](./CODE_CHALLENGE.md)** ⭐ Full challenge requirements and evaluation criteria
- **[EXAMPLES.md](./EXAMPLES.md)** ⭐ Code examples and helpful patterns

**Reference:**

- **[SETUP.md](./SETUP.md)** - Setup instructions and project structure

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Radix UI Themes** - Component library
- **ReactFlow** - Visual workflow canvas
- **Vite** - Build tool
- **Lucide React** - Icons

## 📂 Project Structure

```
src/
├── components/
│   ├── nodes/              # Workflow node components
│   ├── WorkflowEditor.tsx  # Main editor
│   └── BlockPanel.tsx      # Block palette
├── hooks/                  # Custom hooks (you'll create this)
├── utils/                  # Utilities (you'll create this)
├── pages/                  # App pages
└── main.tsx               # Entry point
```

## ✨ Current Features

- ✅ Visual workflow builder with drag-and-drop canvas
- ✅ Multiple node types (Start, Form, Conditional, API, End)
- ✅ Node configuration panel
- ✅ Delete nodes (X button or Delete/Backspace key)
- ✅ Connect nodes with edges
- ✅ Static validation error display (examples)

## 🎯 What You'll Build

- 🔍 **Real-time validation** for all form fields
- 💾 **Auto-save** to localStorage with debouncing
- 📊 **Validation error display** inline and in ValidationPanel
- 🔄 **Restore workflow** on page reload
- ⏱️ **Save status indicator** showing last saved time

## 📋 Requirements

### Part 1: Validation

Validate all node configurations:

- **Form nodes**: Name, fields, field properties, dropdown options
- **Conditional nodes**: Name, field to evaluate, operator, value, routes
- **API nodes**: URL format, HTTP method

### Part 2: Auto-Save

- Auto-save when all nodes are valid
- Debounce saves (2 seconds)
- Show save status in UI
- Store in localStorage
- Restore on app load

## 🎓 Evaluation Criteria

- **Functionality (40%)** - Does it work correctly?
- **Code Quality (30%)** - Clean, maintainable, follows patterns?
- **UX (20%)** - Clear feedback and smooth experience?
- **Technical (10%)** - Efficient implementation?

## 🆘 Need Help?

Check the documentation files:

- Setup issues? → [SETUP.md](./SETUP.md)
- Need examples? → [EXAMPLES.md](./EXAMPLES.md)
- Requirements unclear? → [CODE_CHALLENGE.md](./CODE_CHALLENGE.md)

## 📝 Submission Checklist

Before submitting, ensure:

- [ ] All validation rules implemented correctly
- [ ] Auto-save works and debounces properly
- [ ] Workflow restores from localStorage
- [ ] ValidationPanel displays real validation errors
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Code follows existing patterns
- [ ] Named exports used (no default exports)
- [ ] Radix UI components used for UI

## 🧪 Testing

Test your implementation:

1. **Validation**: Try entering invalid data, verify errors show
2. **Auto-save**: Make changes, verify save after 2 seconds
3. **Restore**: Refresh page, verify prompt to restore
4. **Edge cases**: Delete all nodes, rapid typing, etc.

## 🌟 Bonus Points

- Add field name autocomplete for conditionals block

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

---

Good luck! We're excited to see your solution! 🚀

---
