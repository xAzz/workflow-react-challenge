# Thought Process & Approach

This README explains how I approached the project, why I made certain decisions & where I’d take it further with more time.

# Understanding the codebase
I started by reading the code before touching anything. I began at App.tsx to see how things were wired together, then worked my way down through the components to understand how everything connected to the editor. After that I read through the README & EXAMPLES once I had some context on how the code worked. I figured out that WorkflowEditor is the main file where most of the editor logic lives. Once that was clear, I focused on that file & kept changes scoped around that area instead of spreading logic across the app.

# Auto-Save Hook (useAutoSave)
I started with the auto save hook because it’s contained & easy to reason about. It forced me to understand the workflow data models early & how the nodes & edges change overtime & how often the state updates so I could check for when it would be considered savable. 

I have built similar hooks before, so it was a good starting point for me to learn how the data worked.

I initially built a basic useAutoSave hook first then I adjusted it once I dug deeper into the code & understood the types as well as how often the state changes. 

I ensured to keep the hook generic & decoupled from the editor so it doesn't care where the data comes from, just ensures the type is correct.

## How the hook works
The hook takes nodes, edges & isValid props & watches for changes internally.

What happens when nodes or edges change is it clears any existing timeouts. This is done to prevent spam saving on every small change if the user is still actively editing.

After that, it checks if the workflow is valid & if any nodes exist. If not, it sets the save status state back to idle. This is to prevent saving invalid or empty workflows.

If the workflow is valid, the hook sets the status to saving & starts a 2 second (2000ms) timeout. The delay is there to line up saves with meaningful changes rather than every small change.

The timeout callback function creates a saved workflow data object which contains the nodes, edges, timestamp & version. We then stringify that data & save it to localStorage with a storage key.

If successful, we then update the status state to be saved & the lastSavedAt time then create a new timeout to reset the status state to idle.

The reason we are updating the status state as well as lastSaveAt is for the UI feedback.

The hook exposes restoreSavedWorkflow to restore the state if something saved exists &
clearSavedWorkflow to delete the saved workflow from the storage.


# Validation Design
At the start I had a single validate.ts file which was just a dumping ground & a lot of if/else statements. It worked, but it got messy  once I realised validation wasn’t just form node data & it was different rules per node type & more.

Once I realised that, I split the massive function I had into separate smaller functions with their own individual files. The reason I did that was because I wanted each node type to own its validation rules & not be coupled with other types.

After that, we ended up with:
- validateFormNode.ts (form specific rules)
- validateConditionalNode.ts (conditional specific rules)
- validateApiNode.ts (api specific rules)
- validateNode.ts (router)
- validateWorkflow.ts (graph & connectivity rules)

## Why this structure?
The main reason is maintainability. If someone adds a new node type later, you just add a validateNewNodeType.ts & a case in validateNode.ts

You're also not going through a 500+ line dumping ground trying not to break something when adding something new, its more readable the way I have structured it.

I also structured it to be generic so each node validator returns the same type, isValid boolean & errors array which is an array of ValidationError type.

I kept the errors structured with stable ids (like field-name-${field.id}) so the UI can map errors back to specific inputs. It also makes it easier to show multiple errors at once rather than bailing on the first one.

I didn’t overengineer this with a schema library because for a take-home it’s faster & clearer to just read the rules directly in code. If this grew, I’d probably move to a schema-based approach like zod.

## How validation works
Validation is split into two layers: node-level validation & workflow-level validation. They solve different problems & are intentionally kept separate.

### Node-level validation
Each node type has its own validator (validateFormNode, validateConditionalNode, validateApiNode). These functions are only concerned with validating the data for that specific node — nothing about connections or graph structure.

This keeps things consistent & makes it easy for the editor to consume results without special-casing different node types.

Each validator runs a series of explicit checks & pushes structured errors with stable IDs. Those IDs are used by the UI to map errors back to specific inputs & display multiple errors at once instead of stopping on the first failure.

The validateNode function acts as a small router. It takes the node type & data & forwards validation to the correct validator. Start & end nodes are treated as always valid here, since their rules are enforced at the workflow level instead.

### Workflow-level validation
Workflow validation lives in validateWorkflow & focuses on the graph itself rather than individual node data.

It validates a few core rules:
- The workflow must have exactly one Start node & one End node
- Nodes (except Start/End) must have both incoming & outgoing connections
- Conditional nodes must have both TRUE & FALSE path connections
- All nodes must be reachable from the Start node

To check reachability, validation performs a traversal starting from the Start node & marks all reachable nodes. Any node not reached by that traversal is flagged as not being connected to the workflow, even if it has edges elsewhere.

This separation keeps graph logic out of the editor UI & avoids mixing “is this field required?” rules with “is this workflow logically valid?” rules.

## How results are used
Both node-level & workflow-level validation return the same result shape, which makes it easy to:
- Aggregate errors
- Block saving or execution when invalid
- Surface clear, targeted feedback in the UI

The goal is for validation to be predictable, easy to extend & easy to reason about as the workflow grows.

## Trade-offs / what I’d improve
One trade off is that validateNode currently casts from Record<string, unknown> to specific node data types. It’s fine given the controlled environment, but long term I’d enforce stricter typing at the node creation level so we don’t rely on casts. Also if more node types get added, I’d probably switch to a map-based registry instead of a switch statement, but for 3 node types a switch is clean & readable.

## Final Notes
Given the time constraints of the take-home, some decisions were made to prioritise clarity & correctness over deeper abstraction or optimisation.

I did use minor AI assistance (Cursor) in a very limited way to sanity check parts of the implementation & unblock myself late in the process.

All logic was reviewed, understood & adapted by me. Nothing was copypasted blindly.

Given more time, I’d continue refining typing, making validation easier to extend in the future & adding unit tests, but I intentionally avoided over-engineering for a take-home context.