export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface DimensionScore {
  score: number;
  label: 'High' | 'Medium' | 'Low';
  summary: string;
  detail: string;
}

export interface Dimensions {
  correctness: DimensionScore;
  completeness: DimensionScore;
  reasoningQuality: DimensionScore;
  usefulness: DimensionScore;
  uncertainty: DimensionScore;
}

export interface Assumption {
  text: string;
  explanation: string;
  spanText: string;
}

export interface InformationGap {
  gap: string;
  importance: 'High' | 'Medium' | 'Low';
}

export interface Risk {
  risk: string;
  mitigation: string;
}

export interface StrongPoint {
  point: string;
  spanText: string;
}

export interface KeyFindings {
  assumptions: Assumption[];
  informationGaps: InformationGap[];
  risks: Risk[];
  strongPoints: StrongPoint[];
}

export interface EvaluationTraceStep {
  step: string;
  result: string;
  dimension: string;
}

export interface InlineAnnotation {
  spanText: string;
  type: 'assumption' | 'statistic' | 'uncertain' | 'strong';
  tooltip: string;
}

export interface EvaluationResult {
  overallConfidence: 'High' | 'Moderate' | 'Low';
  overallSummary: string;
  dimensions: Dimensions;
  keyFindings: KeyFindings;
  suggestedPrompts: string[];
  evaluationTrace: EvaluationTraceStep[];
  inlineAnnotations: InlineAnnotation[];
}

export interface ChatRequest {
  prompt: string;
  conversationHistory: Message[];
}

export interface ConfidenceRequest {
  rating: number;
  responseId: string;
}
