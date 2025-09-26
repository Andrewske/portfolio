'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { SkillCategory, projects, getProjectsByCategory } from '~/lib/projects';

interface ProjectFilterProps {
  onFilterChange: (categories: SkillCategory[]) => void;
}

const categories: { name: SkillCategory | 'All'; label: string; color: string }[] = [
  { name: 'All', label: 'All Projects', color: 'text-gray-400' },
  { name: 'Languages', label: 'Languages', color: 'text-purple-300' },
  { name: 'Frontend', label: 'Frontend', color: 'text-blue-300' },
  { name: 'Backend', label: 'Backend', color: 'text-yellow-300' },
  { name: 'AI/ML', label: 'AI/ML', color: 'text-cyan-300' },
  { name: 'Data & Analytics', label: 'Data', color: 'text-green-300' },
  { name: 'APIs & Integrations', label: 'APIs', color: 'text-orange-300' },
  { name: 'Infrastructure', label: 'Infrastructure', color: 'text-red-300' },
];

export default function ProjectFilter({ onFilterChange }: ProjectFilterProps) {
  const [activeFilters, setActiveFilters] = useState<Set<SkillCategory | 'All'>>(new Set(['All']));

  const handleFilterClick = (category: SkillCategory | 'All') => {
    const newFilters = new Set(activeFilters);

    if (category === 'All') {
      setActiveFilters(new Set(['All']));
      onFilterChange([]);
    } else {
      if (newFilters.has('All')) {
        newFilters.delete('All');
      }

      if (newFilters.has(category)) {
        newFilters.delete(category);
      } else {
        newFilters.add(category);
      }

      if (newFilters.size === 0) {
        setActiveFilters(new Set(['All']));
        onFilterChange([]);
      } else {
        setActiveFilters(newFilters);
        const filterArray = Array.from(newFilters).filter((f): f is SkillCategory => f !== 'All');
        onFilterChange(filterArray);
      }
    }
  };

  const getProjectCount = (category: SkillCategory | 'All') => {
    if (category === 'All') return projects.length;
    return getProjectsByCategory(category).length;
  };

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <div className="flex items-center gap-2 text-gray-500 mr-4">
        <span className="text-green-400">$</span>
        <span>filter --by-skill</span>
      </div>
      {categories.map(({ name, label, color }) => {
        const isActive = activeFilters.has(name);
        const count = getProjectCount(name);

        return (
          <Button
            key={name}
            variant={isActive ? "terminal" : "terminalGhost"}
            size="sm"
            onClick={() => handleFilterClick(name)}
            className={`transition-all ${isActive ? '' : 'opacity-70 hover:opacity-100'}`}
          >
            <span className={color}>{label}</span>
            <Badge
              variant="outline"
              className="ml-2 px-1.5 py-0 h-5 text-xs border-gray-700"
            >
              {count}
            </Badge>
          </Button>
        );
      })}
    </div>
  );
}