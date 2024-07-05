import { IBotNodeData } from '@/types';

import { create } from 'zustand';

interface BotNodeStore {
  showBotProperty: boolean;
  botNodeData: IBotNodeData | null;
  setShowBotProperty: (show: boolean) => void;
  setBotNodeData: (botNodeData: IBotNodeData | null | undefined) => void;
}

export const useBotPropertyStore = create<BotNodeStore>(set => ({
  showBotProperty: false,
  botNodeData: null,
  setShowBotProperty: show => set({ showBotProperty: show }),
  setBotNodeData: botNodeData => set({ botNodeData: botNodeData }),
}));
