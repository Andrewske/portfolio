import { Badge } from '~/components/ui/badge';

interface PhaseLabelProps {
  phase: string;
}

export default function PhaseLabel({ phase }: PhaseLabelProps) {
  return (
    <div className="sticky top-4 z-10" data-testid="phase-label">
      <Badge variant="phase" className="text-xs font-mono uppercase tracking-wider">
        {phase}
      </Badge>
    </div>
  );
}
