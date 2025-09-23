interface CodeBlockProps {
  code: string;
  language: string;
  title: string;
  impactContext?: string;
  technicalExplanation?: string;
}

// Simple TypeScript syntax highlighting using current project colors
const highlightTypeScript = (code: string): React.ReactNode[] => {
  const lines = code.split('\n');

  return lines.map((line, lineIndex) => {
    if (line.trim() === '') {
      return <div key={lineIndex} className="h-6" />;
    }

    const tokens: React.ReactNode[] = [];
    let currentIndex = 0;

    // Keywords
    const keywords = ['export', 'function', 'const', 'let', 'var', 'if', 'else', 'return', 'import', 'from', 'interface', 'type', 'string', 'number', 'boolean'];
    // Types
    const types = ['Record', 'ProcessKnowledgeArgs', 'Date', 'string', 'number'];
    // Built-ins
    const builtins = ['console', 'new', 'Date'];

    const processLine = (line: string) => {
      let remaining = line;
      let index = 0;

      while (remaining.length > 0) {
        let matched = false;

        // Comments (highest priority)
        if (remaining.startsWith('//')) {
          const commentMatch = remaining;
          tokens.push(
            <span key={`${lineIndex}-${index}`} className="text-green-400">
              {commentMatch}
            </span>
          );
          remaining = '';
          matched = true;
        }
        // String literals
        else if (remaining.match(/^['"`]/)) {
          const stringMatch = remaining.match(/^(['"`])((?:\\.|(?!\1)[^\\])*)\1/);
          if (stringMatch) {
            tokens.push(
              <span key={`${lineIndex}-${index}`} className="text-yellow-300">
                {stringMatch[0]}
              </span>
            );
            remaining = remaining.slice(stringMatch[0].length);
            index += stringMatch[0].length;
            matched = true;
          }
        }
        // Template literals
        else if (remaining.startsWith('`')) {
          const templateMatch = remaining.match(/^`[^`]*`/);
          if (templateMatch) {
            tokens.push(
              <span key={`${lineIndex}-${index}`} className="text-yellow-300">
                {templateMatch[0]}
              </span>
            );
            remaining = remaining.slice(templateMatch[0].length);
            index += templateMatch[0].length;
            matched = true;
          }
        }
        // Keywords
        else {
          let keywordMatched = false;
          for (const keyword of keywords) {
            if (remaining.startsWith(keyword) && (remaining[keyword.length] === ' ' || remaining[keyword.length] === '(' || remaining[keyword.length] === ':' || remaining[keyword.length] === undefined)) {
              tokens.push(
                <span key={`${lineIndex}-${index}`} className="text-cyan-300">
                  {keyword}
                </span>
              );
              remaining = remaining.slice(keyword.length);
              index += keyword.length;
              matched = true;
              keywordMatched = true;
              break;
            }
          }

          if (!keywordMatched) {
            // Types
            for (const type of types) {
              if (remaining.startsWith(type) && (remaining[type.length] === '<' || remaining[type.length] === ',' || remaining[type.length] === '>' || remaining[type.length] === ' ' || remaining[type.length] === undefined)) {
                tokens.push(
                  <span key={`${lineIndex}-${index}`} className="text-purple-400">
                    {type}
                  </span>
                );
                remaining = remaining.slice(type.length);
                index += type.length;
                matched = true;
                break;
              }
            }
          }
        }

        // If no special token matched, consume one character with default color
        if (!matched) {
          const char = remaining[0];
          tokens.push(
            <span key={`${lineIndex}-${index}`} className="text-gray-300">
              {char}
            </span>
          );
          remaining = remaining.slice(1);
          index += 1;
        }
      }
    };

    processLine(line);

    return (
      <div key={lineIndex} className="leading-6">
        {tokens}
      </div>
    );
  });
};

export function CodeBlock({ code, language, title, impactContext, technicalExplanation }: CodeBlockProps) {
  const highlightedCode = language === 'typescript'
    ? highlightTypeScript(code)
    : code.split('\n').map((line, index) => (
        <div key={index} className="text-gray-300 leading-6">
          {line || <span className="h-6" />}
        </div>
      ));

  // Helper function to format technical explanation
  const formatTechnicalExplanation = (content: string) => {
    return content.split('**').map((part, index) => {
      if (index % 2 === 1) {
        // This is a bold section
        return <strong key={index} className="text-cyan-300 font-bold">{part}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="space-y-4">
      {/* Impact Context */}
      {impactContext && (
        <div className="p-4 bg-blue-950/30 border border-blue-800/50 rounded-lg">
          <p className="text-blue-200 text-sm leading-relaxed">
            <span className="text-blue-300 font-semibold">Impact: </span>
            {impactContext}
          </p>
        </div>
      )}

      {/* Code Block */}
      <div className="border border-gray-800 rounded-lg overflow-hidden">
        <div className="px-4 py-2 bg-gray-800 border-b border-gray-700">
          <span className="text-sm text-gray-300">{title}</span>
          <span className="text-xs text-gray-500 ml-2">({language})</span>
        </div>
        <div className="p-4 bg-gray-950 text-base font-mono whitespace-pre-wrap overflow-wrap-anywhere">
          {highlightedCode}
        </div>
      </div>

      {/* Technical Explanation */}
      {technicalExplanation && (
        <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
          <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
            {formatTechnicalExplanation(technicalExplanation)}
          </div>
        </div>
      )}
    </div>
  );
}