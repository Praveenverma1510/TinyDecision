# Tiny Decisions - Personal Decision Log

## Overview
Tiny Decisions is a simple web application that helps users track important life decisions, weigh their options, and reflect on outcomes. This project was developed as a frontend assignment focusing on clean architecture, thoughtful UX, and practical state management.

## Thought Process

### Component Structure
I organized the application into these main components:
- **App**: Main container handling state and routing
- **DecisionForm**: Form for creating/editing decisions
- **DecisionList**: Displays all decisions with filtering
- **DecisionItem**: Individual decision card component
- **EmptyState**: Placeholder when no decisions exist

This modular structure separates concerns while keeping components focused and reusable. The hierarchy flows from parent (App) to child components with clear data flow through props.

### State Management
I implemented a straightforward state management approach:
- Used React hooks (useState, useEffect) for local state
- Stored data in localStorage for persistence
- Maintained a single source of truth for decisions in the App component
- Implemented proper lifting state up for shared state between components

### UX Considerations
Key UX decisions included:
- Progressive disclosure of form fields (only show decision outcome fields when marked as decided)
- Clear visual distinction between pending and completed decisions
- Intuitive filtering system
- Empty states with helpful guidance
- Responsive layout that works on mobile and desktop

## Decisions and Tradeoffs

1. **Data Storage**: Chose localStorage over a JSON server for simplicity, as the assignment didn't require backend functionality. This keeps the app self-contained but limits collaboration features.

2. **State Management**: Opted for React's built-in state management rather than Redux or Context API since the app's complexity didn't warrant additional libraries. This keeps dependencies minimal but might require refactoring if features expand.

3. **Form Handling**: Implemented a single form component for both creating and editing decisions rather than separate components. This reduces code duplication but makes the form slightly more complex.

4. **Styling**: Used Tailwind CSS for rapid development and consistent styling, though this does create longer className strings in the JSX.

5. **Mobile Responsiveness**: Implemented basic responsive design but didn't optimize heavily for all mobile scenarios, focusing instead on core functionality as specified in the requirements.

## Future Enhancevements

Given more time, I would:

1. **Add Search Functionality**: Implement search by title or content to help users find specific decisions.

2. **Improve Analytics**: Add more detailed statistics and visualization of decision patterns over time.

3. **Implement Tags/Categories**: Allow users to categorize decisions for better organization.

4. **Add Export/Import**: Enable users to backup their decisions or migrate between devices.

5. **Enhance Reflection Features**: 
   - Add reminders to revisit decisions after time has passed
   - Include more structured reflection prompts

6. **Improve Accessibility**:
   - Better ARIA labels
   - More keyboard navigation support
   - Enhanced color contrast

7. **Add Sharing Features**: Allow exporting decisions as PDF or sharing (with privacy controls).

8. **Implement Undo/Redo**: Especially for decision deletion.

9. **Add More Interactive Elements**:
   - Drag-and-drop sorting
   - Priority marking
   - Progress tracking for multi-step decisions

10. **Enhanced Mobile Experience**:
    - Offline support
    - Add to home screen capability
    - More touch-friendly controls
