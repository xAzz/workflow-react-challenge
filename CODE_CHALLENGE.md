# Workflow Builder - Form Validation & Auto-Save Challenge

## Overview

You've been given a workflow builder application that allows users to create visual workflows with different types of nodes (Start, Form, Conditional, API, End). Your task is to implement form validation and an auto-save feature to improve the user experience.

## Current Application State

The application currently:
- ✅ Allows users to add workflow blocks to a canvas
- ✅ Supports editing node properties through a side panel editor
- ✅ Includes different node types (Start, Form, Conditional, API, End)
- ✅ Allows users to delete nodes
- ✅ Shows static validation errors as examples

## Your Task

Implement **form validation** and **auto-save functionality** for the workflow editor.

---

## Part 1: Form Field Validation

### Requirements

Implement validation for node configuration fields:

#### 1. **Form Node Validation**
- **Custom Name**: Required field, minimum 3 characters
- **Each Field**:
  - `name`: Required, alphanumeric only (no spaces), minimum 2 characters
  - `label`: Required, minimum 2 characters

#### 2. **Conditional Node Validation**
- **Custom Name**: Required, minimum 3 characters
- **Field to Evaluate**: Required
- **Operator**: Required
- **Value**: Required when operator is not `is_empty`

#### 3. **API Node Validation**
- **URL**: Required, must be a valid URL format (http:// or https://)
- **Method**: Required (GET, POST, PUT, DELETE)

### Implementation Details

1. **Validation Logic**: Create a validation utility that validates fields and returns error messages

2. **UI Feedback**:
   - Display validation errors inline in NodeEditor using Radix UI components
   - Update ValidationPanel (left panel) to show all validation errors from all nodes

3. **Validation Timing**: Validate on field change (consider debouncing for better UX)

---

## Part 2: Auto-Save Functionality

### Requirements

Implement auto-save that saves the workflow to `localStorage`:

1. **Auto-save when valid**: Only save when all nodes pass validation

2. **Debouncing**: Wait 2 seconds after changes before saving

3. **Storage**: Save to `localStorage` with key `workflow-autosave`

4. **Load on Mount**: Check for saved data on app load and prompt user to restore or discard

5. **Save Feedback**: Show save status (saving/saved/error)

### Implementation Details

1. **Auto-Save Hook**: Create a custom hook that handles debouncing and localStorage persistence

2. **Validation Check**: Track whether all nodes are valid before triggering save

3. **Restore Dialog**: Use Radix UI's `AlertDialog` to prompt user on app load

---

## Technical Requirements

### TypeScript
- Maintain strict TypeScript typing
- No `any` types
- Use proper interfaces

### Code Quality
- Follow existing code patterns
- Use Radix UI components for UI (no custom CSS)
- Named exports only (no default exports)

---

## Deliverables

### Core Requirements

1. **Validation utility** - Validate form fields for each node type
2. **Auto-save hook** - Handle debouncing and localStorage
3. **Updated NodeEditor** - Show validation errors inline
4. **Save status display** - Show current save state
5. **Restore dialog** - Prompt to restore saved workflow on load
6. **ValidationPanel** - Update the left panel to display real validation errors from all nodes

### Bonus Features (Optional)

- Field name suggestions for conditional nodes

---

## Evaluation Criteria

### Functionality (40%)
- Validation rules work correctly
- Auto-save works reliably
- Workflow restores from localStorage

### Code Quality (30%)
- Clean, maintainable code
- Proper TypeScript usage
- Follows existing patterns

### User Experience (20%)
- Clear error messages
- Good visual feedback
- Intuitive interface

### Technical Implementation (10%)
- Efficient debouncing
- Proper error handling

---

## Getting Started

1. Review existing codebase (`WorkflowEditor.tsx`, node components)
2. Start with validation, then add auto-save
3. Test with different scenarios

---

## Time Estimate

**Core Requirements**: 3 hours

---

## Submission Checklist

Before submitting:
- Code compiles without TypeScript errors
- No console errors
- Validation works correctly
- Auto-save and restore functionality works
- ValidationPanel displays real validation errors
- Code follows existing patterns

Test with: `npm run dev`

Good luck! 🚀
