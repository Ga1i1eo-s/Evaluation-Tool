import { create } from 'zustand';
import { Message, EvaluationResult } from '../types';

interface ChatStore {
  messages: Message[];
  currentResponse: string;
  evaluation: EvaluationResult | null;
  isEvaluating: boolean;
  isStreaming: boolean;
  showAnnotations: boolean;
  userConfidence: number | null;
  activeTab: 'overview' | 'details' | 'trace' | 'improve';
  expandedDimensions: string[];
  expandedFindings: string[];
  panelVisible: boolean;

  addMessage: (message: Message) => void;
  setCurrentResponse: (response: string) => void;
  setEvaluation: (evaluation: EvaluationResult | null) => void;
  setIsEvaluating: (isEvaluating: boolean) => void;
  setIsStreaming: (isStreaming: boolean) => void;
  setShowAnnotations: (showAnnotations: boolean) => void;
  setUserConfidence: (confidence: number | null) => void;
  setActiveTab: (tab: 'overview' | 'details' | 'trace' | 'improve') => void;
  toggleDimension: (dimension: string) => void;
  toggleFinding: (finding: string) => void;
  setPanelVisible: (visible: boolean) => void;
  clearCurrentResponse: () => void;
}

export const useStore = create<ChatStore>((set) => ({
  messages: [],
  currentResponse: '',
  evaluation: null,
  isEvaluating: false,
  isStreaming: false,
  showAnnotations: false,
  userConfidence: null,
  activeTab: 'overview',
  expandedDimensions: [],
  expandedFindings: [],
  panelVisible: true,

  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setCurrentResponse: (response) => set({ currentResponse: response }),
  setEvaluation: (evaluation) => set({ evaluation }),
  setIsEvaluating: (isEvaluating) => set({ isEvaluating }),
  setIsStreaming: (isStreaming) => set({ isStreaming }),
  setShowAnnotations: (showAnnotations) => set({ showAnnotations }),
  setUserConfidence: (confidence) => set({ userConfidence: confidence }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  toggleDimension: (dimension) => set((state) => ({
    expandedDimensions: state.expandedDimensions.includes(dimension)
      ? state.expandedDimensions.filter((d) => d !== dimension)
      : [...state.expandedDimensions, dimension],
  })),
  toggleFinding: (finding) => set((state) => ({
    expandedFindings: state.expandedFindings.includes(finding)
      ? state.expandedFindings.filter((f) => f !== finding)
      : [...state.expandedFindings, finding],
  })),
  setPanelVisible: (visible) => set({ panelVisible: visible }),
  clearCurrentResponse: () => set({ currentResponse: '', evaluation: null, userConfidence: null }),
}));
