import React, { type ReactNode } from 'react';
import { CopyableCommand } from '~/components/workflow/CopyableCommand';

type Token =
  | { type: 'text'; value: string }
  | { type: 'bold'; value: string }
  | { type: 'italic'; value: string }
  | { type: 'code'; value: string }
  | { type: 'link'; text: string; url: string };

function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  let remaining = text;

  // Pattern matches in order of specificity
  // Links: [text](url)
  // Bold: **text**
  // Italic: *text* (but not **)
  // Code: `text`
  const patterns = [
    { regex: /\[([^\]]+)\]\(([^)]+)\)/, type: 'link' as const },
    { regex: /\*\*([^*]+)\*\*/, type: 'bold' as const },
    { regex: /(?<!\*)\*([^*]+)\*(?!\*)/, type: 'italic' as const },
    { regex: /`([^`]+)`/, type: 'code' as const },
  ];

  while (remaining.length > 0) {
    let earliestMatch: { index: number; match: RegExpMatchArray; type: Token['type'] } | null = null;

    for (const pattern of patterns) {
      const match = remaining.match(pattern.regex);
      if (match && match.index !== undefined) {
        if (earliestMatch === null || match.index < earliestMatch.index) {
          earliestMatch = { index: match.index, match, type: pattern.type };
        }
      }
    }

    if (earliestMatch === null) {
      // No more patterns found, rest is plain text
      if (remaining.length > 0) {
        tokens.push({ type: 'text', value: remaining });
      }
      break;
    }

    // Add text before the match
    if (earliestMatch.index > 0) {
      tokens.push({ type: 'text', value: remaining.slice(0, earliestMatch.index) });
    }

    // Add the matched token
    const { match, type } = earliestMatch;
    if (type === 'link') {
      tokens.push({ type: 'link', text: match[1], url: match[2] });
    } else {
      tokens.push({ type, value: match[1] });
    }

    // Continue with remaining text
    remaining = remaining.slice(earliestMatch.index + match[0].length);
  }

  return tokens;
}

export function parseInlineMarkdown(text: string): ReactNode {
  const tokens = tokenize(text);

  if (tokens.length === 0) {
    return text;
  }

  if (tokens.length === 1 && tokens[0].type === 'text') {
    return tokens[0].value;
  }

  return (
    <>
      {tokens.map((token, index) => {
        switch (token.type) {
          case 'text':
            return <React.Fragment key={index}>{token.value}</React.Fragment>;
          case 'bold':
            return <strong key={index} className="font-bold text-white">{token.value}</strong>;
          case 'italic':
            return <em key={index} className="italic text-gray-300">{token.value}</em>;
          case 'code':
            if (token.value.startsWith('/')) {
              return <CopyableCommand key={index} command={token.value} />;
            }
            return (
              <code key={index} className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400 font-mono text-sm">
                {token.value}
              </code>
            );
          case 'link':
            return (
              <a
                key={index}
                href={token.url}
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                {token.text}
              </a>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
