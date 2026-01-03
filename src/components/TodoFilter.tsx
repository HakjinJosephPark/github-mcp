import type { FilterType } from '../types/todo';
import './TodoFilter.css';

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  currentFilter,
  onFilterChange,
  counts
}) => {
  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' }
  ];

  return (
    <div className="todo-filter">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          className={`filter-btn ${currentFilter === key ? 'active' : ''}`}
          onClick={() => onFilterChange(key)}
        >
          {label} ({counts[key]})
        </button>
      ))}
    </div>
  );
};
