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

// Python syntax highlighting using current project colors
const highlightPython = (code: string): React.ReactNode[] => {
  const lines = code.split('\n');

  return lines.map((line, lineIndex) => {
    if (line.trim() === '') {
      return <div key={lineIndex} className="h-6" />;
    }

    const tokens: React.ReactNode[] = [];

    // Keywords
    const keywords = ['def', 'return', 'if', 'else', 'elif', 'for', 'while', 'import', 'from', 'as', 'class', 'try', 'except', 'finally', 'with', 'lambda', 'None', 'True', 'False'];
    // Built-in functions
    const builtins = ['print', 'len', 'str', 'int', 'float', 'list', 'dict', 'set', 'tuple', 'range', 'enumerate', 'zip'];

    const processLine = (line: string) => {
      let remaining = line;
      let index = 0;

      while (remaining.length > 0) {
        let matched = false;

        // Comments (highest priority)
        if (remaining.startsWith('#')) {
          const commentMatch = remaining;
          tokens.push(
            <span key={`${lineIndex}-${index}`} className="text-green-400">
              {commentMatch}
            </span>
          );
          remaining = '';
          matched = true;
        }
        // String literals (single or double quotes)
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
        // Triple-quoted strings
        else if (remaining.startsWith('"""') || remaining.startsWith("'''")) {
          const quote = remaining.slice(0, 3);
          const endIndex = remaining.indexOf(quote, 3);
          if (endIndex !== -1) {
            const stringMatch = remaining.slice(0, endIndex + 3);
            tokens.push(
              <span key={`${lineIndex}-${index}`} className="text-yellow-300">
                {stringMatch}
              </span>
            );
            remaining = remaining.slice(stringMatch.length);
            index += stringMatch.length;
            matched = true;
          }
        }
        // Keywords
        else {
          let keywordMatched = false;
          for (const keyword of keywords) {
            if (remaining.startsWith(keyword) && (remaining[keyword.length] === ' ' || remaining[keyword.length] === '(' || remaining[keyword.length] === ':' || remaining[keyword.length] === undefined || /\W/.test(remaining[keyword.length] || ''))) {
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
            // Built-in functions
            for (const builtin of builtins) {
              if (remaining.startsWith(builtin) && (remaining[builtin.length] === '(' || remaining[builtin.length] === ' ' || remaining[builtin.length] === undefined || /\W/.test(remaining[builtin.length] || ''))) {
                tokens.push(
                  <span key={`${lineIndex}-${index}`} className="text-purple-400">
                    {builtin}
                  </span>
                );
                remaining = remaining.slice(builtin.length);
                index += builtin.length;
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

// SQL syntax highlighting using current project colors
const highlightSQL = (code: string): React.ReactNode[] => {
  const lines = code.split('\n');

  return lines.map((line, lineIndex) => {
    if (line.trim() === '') {
      return <div key={lineIndex} className="h-6" />;
    }

    const tokens: React.ReactNode[] = [];

    // SQL Keywords
    const keywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'GROUP', 'BY', 'ORDER', 'HAVING', 'LIMIT', 'OFFSET', 'UNION', 'ALL', 'DISTINCT', 'AS', 'AND', 'OR', 'NOT', 'IN', 'EXISTS', 'BETWEEN', 'LIKE', 'IS', 'NULL', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER', 'DROP', 'TABLE', 'INDEX', 'VIEW', 'DATABASE'];
    // SQL Functions
    const functions = ['COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'COALESCE', 'CONCAT', 'SUBSTRING', 'LENGTH', 'UPPER', 'LOWER', 'TRIM', 'DATE', 'NOW', 'YEAR', 'MONTH', 'DAY'];

    const processLine = (line: string) => {
      let remaining = line;
      let index = 0;

      while (remaining.length > 0) {
        let matched = false;

        // Comments (-- style)
        if (remaining.startsWith('--')) {
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
        // Keywords (case insensitive)
        else {
          let keywordMatched = false;
          for (const keyword of keywords) {
            if (remaining.toUpperCase().startsWith(keyword) && (remaining[keyword.length] === ' ' || remaining[keyword.length] === '(' || remaining[keyword.length] === '\n' || remaining[keyword.length] === undefined || /\W/.test(remaining[keyword.length] || ''))) {
              tokens.push(
                <span key={`${lineIndex}-${index}`} className="text-cyan-300">
                  {remaining.slice(0, keyword.length)}
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
            // Functions (case insensitive)
            for (const func of functions) {
              if (remaining.toUpperCase().startsWith(func) && (remaining[func.length] === '(' || remaining[func.length] === ' ' || remaining[func.length] === undefined || /\W/.test(remaining[func.length] || ''))) {
                tokens.push(
                  <span key={`${lineIndex}-${index}`} className="text-purple-400">
                    {remaining.slice(0, func.length)}
                  </span>
                );
                remaining = remaining.slice(func.length);
                index += func.length;
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
  const highlightedCode = (() => {
    switch (language) {
      case 'typescript':
        return highlightTypeScript(code);
      case 'python':
        return highlightPython(code);
      case 'sql':
        return highlightSQL(code);
      default:
        return code.split('\n').map((line, index) => (
          <div key={index} className="text-gray-300 leading-6">
            {line || <span className="h-6" />}
          </div>
        ));
    }
  })();

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
        <div className="px-3 sm:px-4 py-2 bg-gray-800 border-b border-gray-700">
          <span className="text-xs sm:text-sm text-gray-300">{title}</span>
          <span className="text-xs text-gray-500 ml-2">({language})</span>
        </div>
        <div className="p-3 sm:p-4 bg-gray-950 text-xs sm:text-sm md:text-base font-mono overflow-x-auto">
          <div className="min-w-max">
            {highlightedCode}
          </div>
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