import { createActionGroup, emptyProps } from '@ngrx/store';

export const interactionsActions = createActionGroup({
  source: 'Interactions',
  events: {
    handleDelete: emptyProps(),
    cancelDelete: emptyProps(),
  },
});
