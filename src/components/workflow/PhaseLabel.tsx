interface PhaseLabelProps {
  phase: string;
}

export default function PhaseLabel({ phase }: PhaseLabelProps) {
  // Simple bracketed phase indicator like [PHASE: DISCUSSION]
  return (
    <div className="text-gray-500 text-sm font-mono" data-testid="phase-label">
      [PHASE: {phase}]
    </div>
  );
}
