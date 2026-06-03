import ReactMarkdown from 'react-markdown';
import { InlineAnnotation } from '../../types';
import { AnnotationTooltip } from './AnnotationTooltip';
import { WarningBox } from './WarningBox';

interface AnnotatedResponseProps {
  content: string;
  showAnnotations: boolean;
  annotations: InlineAnnotation[];
}

export function AnnotatedResponse({ content, showAnnotations, annotations }: AnnotatedResponseProps) {
  if (!showAnnotations || annotations.length === 0) {
    return (
      <div className="prose prose-sm max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    );
  }

  let annotatedContent = content;

  annotations.forEach((annotation, index) => {
    const spanText = annotation.spanText;
    if (annotatedContent.includes(spanText)) {
      const annotationClass = {
        assumption: 'border-b-2 border-dashed border-orange-500',
        statistic: 'border-b-2 border-dashed border-green-500',
        uncertain: 'border-b-2 border-dashed border-purple-500',
        strong: 'border-b-2 border-solid border-green-500',
      }[annotation.type];

      const replacement = `<span class="${annotationClass} relative" data-tooltip="${annotation.tooltip}">
        ${spanText}
        <sup className="text-purple-500 ml-1 cursor-help">?</sup>
      </span>`;

      annotatedContent = annotatedContent.replace(spanText, replacement);
    }
  });

  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown>{annotatedContent}</ReactMarkdown>
      {annotations.some(a => a.type === 'assumption') && (
        <WarningBox />
      )}
    </div>
  );
}
