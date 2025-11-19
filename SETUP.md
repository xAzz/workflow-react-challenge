# Setup Instructions

## Prerequisites

- Node.js 18+
- npm or yarn

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
# Navigate to http://localhost:5173
```

## Project Structure

```
src/
├── components/
│   ├── nodes/               # Workflow node components
│   │   ├── StartNode.tsx    # Start node (entry point)
│   │   ├── FormNode.tsx     # Form node with fields
│   │   ├── ConditionalNode.tsx  # Conditional branching
│   │   ├── ApiNode.tsx      # API call node
│   │   └── EndNode.tsx      # End node (termination)
│   ├── WorkflowEditor.tsx   # Main editor component
│   ├── BlockPanel.tsx       # Left panel with blocks
│   └── ...
├── pages/
│   ├── Index.tsx            # Home page
│   └── NotFound.tsx         # 404 page
├── hooks/                   # Custom React hooks (CREATE THIS)
├── utils/                   # Utility functions (CREATE THIS)
├── App.tsx                  # Root app component
└── main.tsx                 # Entry point

```

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Radix UI Themes** - Component library
- **ReactFlow** - Canvas/node graph library
- **Lucide React** - Icon library
- **Vite** - Build tool

## Key Areas

You'll primarily work with:
- Validation logic (utilities)
- Auto-save functionality (custom hooks)
- UI components for feedback
- WorkflowEditor integration

## Current Features

### ✅ Working Features
- Add workflow blocks (Start, Form, Conditional, API, End)
- Connect blocks with edges
- Configure node properties via editor panel
- Delete nodes with X button or Delete/Backspace key
- Static validation error display (example only)

### 🎯 Your Task
- Implement real form validation
- Add auto-save functionality
- Show real-time validation errors
- Store/restore workflows from localStorage

## Radix UI Components Available

You can use these Radix UI components (already imported):
- `Box`, `Flex` - Layout
- `Text`, `Heading` - Typography
- `Button`, `IconButton` - Buttons
- `Card` - Containers
- `TextField` - Text inputs
- `Select` - Dropdowns
- `Checkbox` - Checkboxes
- `Badge` - Badges
- `Separator` - Dividers
- `AlertDialog` - Dialogs
- `Callout` - Alert messages

See: https://www.radix-ui.com/themes/docs

## Data Structures

### Node Types

```typescript
// Form Node
interface FormNodeData {
  label: string;
  customName?: string;
  fields?: FormField[];
  onDelete?: () => void;
}

interface FormField {
  id: string;
  name: string;
  label: string;
  type: 'string' | 'number' | 'dropdown' | 'checkbox';
  required: boolean;
  options?: string[];
}

// Conditional Node
interface ConditionalNodeData {
  label: string;
  customName?: string;
  fieldToEvaluate?: string;
  operator?: ConditionalOperator;
  value?: string;
  routes?: ConditionalRoute[];
  onDelete?: () => void;
}

// API Node
interface ApiNodeData {
  label: string;
  url?: string;
  method?: HttpMethod;
  onDelete?: () => void;
}
```

## Tips

1. Start with validation, then add auto-save
2. Test incrementally as you build
3. Handle edge cases (empty workflows, localStorage errors)
4. Follow existing patterns in the codebase

## Testing Your Implementation

### Manual Test Cases

1. **Validation**:
   - Leave required fields empty → should show error
   - Enter invalid URL in API node → should show error
   - Add dropdown with < 2 options → should show error
   - Fix all errors → errors should disappear

2. **Auto-Save**:
   - Make changes → should save after 2 seconds
   - Make rapid changes → should debounce properly
   - Close and reopen app → should prompt to restore
   - Accept restore → workflow should load correctly

3. **Edge Cases**:
   - Delete all nodes → should handle gracefully
   - Fill invalid data → should not auto-save
   - Rapid typing → should not lag

## Common Issues

### TypeScript Errors
- Make sure all types are properly defined
- Import types from node files: `import type { FormNodeData } from './nodes/FormNode'`

### localStorage Quota
- Handle quota exceeded errors
- Consider compressing data if workflow is large

### Performance
- Debounce validation (300ms recommended)
- Debounce auto-save (2000ms required)
- Avoid unnecessary re-renders

## Need Help?

Check the existing code patterns:
- How nodes are structured: `src/components/nodes/FormNode.tsx`
- How data updates: `WorkflowEditor.tsx` → `updateNodeData` function
- How state is managed: `useNodesState`, `useEdgesState` from ReactFlow

Good luck! 🚀
