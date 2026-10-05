import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

import { EVENTS, type UConnEvent } from '@/data/events';

type SavedEventsContextValue = {
  /** Ids of the events the user saved, in date order. */
  savedIds: string[];
  /** The saved events themselves, in date order. */
  savedEvents: UConnEvent[];
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => void;
  removeSaved: (id: string) => void;
  clearSaved: () => void;
};

const SavedEventsContext = createContext<SavedEventsContextValue | null>(null);

/**
 * Holds the saved-event ids for the whole app. State is in-memory for now: the dataset is
 * placeholder data and there is no backend to persist to yet.
 */
export function SavedEventsProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  const toggleSaved = useCallback((id: string) => {
    setSavedIds((current) =>
      current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id],
    );
  }, []);

  const removeSaved = useCallback((id: string) => {
    setSavedIds((current) => current.filter((savedId) => savedId !== id));
  }, []);

  const clearSaved = useCallback(() => setSavedIds([]), []);

  const savedEvents = EVENTS.filter((event) => savedIds.includes(event.id));

  const value: SavedEventsContextValue = {
    savedIds,
    savedEvents,
    isSaved,
    toggleSaved,
    removeSaved,
    clearSaved,
  };

  return <SavedEventsContext.Provider value={value}>{children}</SavedEventsContext.Provider>;
}

export function useSavedEvents(): SavedEventsContextValue {
  const context = useContext(SavedEventsContext);
  if (!context) {
    throw new Error('useSavedEvents must be used within a SavedEventsProvider');
  }
  return context;
}
