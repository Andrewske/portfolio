import React from 'react';
import { parseInlineMarkdown } from '~/utils/parseInlineMarkdown';

/**
 * Renders formatted content with paragraph breaks, indentation, and bullet handling.
 * - Empty lines create paragraph breaks
 * - Lines with leading whitespace get indented (pl-4)
 * - Bullet lines (starting with "- ") render on their own line
 */
export function renderFormattedContent(content: string): React.ReactNode {
  const allLines = content.split('\n');
  const renderedLines: React.ReactNode[] = [];
  let currentParagraph: React.ReactNode[] = [];

  allLines.forEach((line) => {
    if (line === '') {
      // Empty line = paragraph break
      if (currentParagraph.length > 0) {
        renderedLines.push(
          <p key={renderedLines.length} className="text-gray-300 text-sm leading-snug">
            {currentParagraph}
          </p>
        );
        currentParagraph = [];
      }
    } else {
      // Check for leading whitespace (indented line) or bullet line
      const leadingSpaces = line.match(/^(\s+)/);
      const isBulletLine = line.startsWith('- ');

      if (leadingSpaces) {
        // Indented line - render on its own line with padding
        if (currentParagraph.length > 0) {
          renderedLines.push(
            <p key={renderedLines.length} className="text-gray-300 text-sm leading-snug">
              {currentParagraph}
            </p>
          );
          currentParagraph = [];
        }
        renderedLines.push(
          <p key={renderedLines.length} className="text-gray-300 text-sm leading-snug pl-4">
            {parseInlineMarkdown(line.trim())}
          </p>
        );
      } else if (isBulletLine) {
        // Bullet line - render on its own line, no extra padding
        if (currentParagraph.length > 0) {
          renderedLines.push(
            <p key={renderedLines.length} className="text-gray-300 text-sm leading-snug">
              {currentParagraph}
            </p>
          );
          currentParagraph = [];
        }
        renderedLines.push(
          <p key={renderedLines.length} className="text-gray-300 text-sm leading-snug">
            {parseInlineMarkdown(line)}
          </p>
        );
      } else {
        // Regular line - add to current paragraph
        if (currentParagraph.length > 0) {
          currentParagraph.push(' ');
        }
        currentParagraph.push(parseInlineMarkdown(line));
      }
    }
  });

  // Flush remaining paragraph
  if (currentParagraph.length > 0) {
    renderedLines.push(
      <p key={renderedLines.length} className="text-gray-300 text-sm leading-snug">
        {currentParagraph}
      </p>
    );
  }

  if (renderedLines.length === 0) {
    return null;
  }
  if (renderedLines.length === 1) {
    return renderedLines[0];
  }
  return (
    <div className="space-y-1">
      {renderedLines}
    </div>
  );
}
