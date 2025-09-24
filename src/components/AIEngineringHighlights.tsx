import Link from 'next/link';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { getAIHighlights, getAIStats } from '~/lib/aiMetrics';

export default function AIEngineringHighlights() {
  const highlights = getAIHighlights();
  const stats = getAIStats();

  return (
    <Card className="border-cyan-500/30 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-cyan-400 text-lg font-bold flex items-center gap-2">
            <span className="text-gray-500">{'//'}</span> AI Engineering Highlights
          </h2>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="statusDevelopment">{stats.activeSystems} ACTIVE</Badge>
            <Badge variant="default" className="bg-purple-900/20 text-purple-300 border-purple-500/30 text-xs sm:text-sm">
              🤖 {stats.totalYearsExperience} Years AI
            </Badge>
          </div>
        </div>
        <p className="text-gray-400 text-sm sm:text-base">
          Active AI systems with focus on cost optimization and performance engineering
        </p>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {highlights.map((highlight, index) => (
            <div key={index} className="text-center p-3 bg-black/30 rounded border border-gray-800">
              <div className={`text-xl lg:text-2xl font-bold text-${highlight.color}-400`}>
                {highlight.value}
              </div>
              <div className="text-xs text-gray-500 mb-1">{highlight.label}</div>
              <div className="text-xs text-gray-600 leading-tight hidden lg:block">
                {highlight.description}
              </div>
            </div>
          ))}
        </div>

        {/* Key Specializations */}
        <div className="mb-6">
          <h3 className="text-purple-400 text-sm font-medium mb-3 flex items-center gap-2">
            <span className="text-gray-500">{'//'}</span> Core AI Specializations
          </h3>
          <div className="flex flex-wrap gap-2">
            {stats.specializations.map((spec, index) => (
              <Badge
                key={index}
                variant="categoryAiMl"
                className="text-xs py-1 px-2"
              >
                {spec}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button variant="terminal" asChild className="text-sm">
            <a href="#projects">
              View AI Projects →
            </a>
          </Button>
          <Button variant="terminalOutline" asChild className="text-sm">
            <a href="https://github.com/Andrewske">
              GitHub Portfolio
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}