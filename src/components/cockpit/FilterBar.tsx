import React, { useState, useRef, useEffect } from 'react';
import { filterOptions } from '../../data/cockpitMockData';
import { FilterState } from '../../types/cockpit';
import { ChevronDown, Check, RotateCcw, Search as SearchIcon } from 'lucide-react';

interface FilterBarProps {
  filter: FilterState;
  onChange: (filter: FilterState) => void;
}

interface CustomSelectProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (val: string) => void;
  widthClass?: string;
}

function CustomSelect({ options, value, onChange, widthClass = "w-40" }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${widthClass}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-[#071129] border transition-all duration-200 text-slate-200 text-xs px-3 py-1.5 rounded flex items-center justify-between shadow-sm outline-none cursor-pointer ${
          isOpen
            ? 'border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.3)] bg-[#0d1b3e]'
            : 'border-[#1e3a8a] hover:border-cyan-500/60 hover:bg-[#0a1838]'
        }`}
      >
        <span className="truncate text-slate-200 font-medium">{selectedOption?.label}</span>
        <ChevronDown
          size={14}
          className={`text-cyan-400 ml-1.5 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? 'rotate-180 text-cyan-300' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full z-50 bg-[#0a1738]/95 border border-cyan-500/50 shadow-[0_12px_28px_rgba(0,0,0,0.8)] rounded-md py-1 overflow-hidden backdrop-blur-md max-h-52 overflow-y-auto custom-scrollbar">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <div
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`px-3 py-1.5 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#1e3a8a] text-cyan-300 font-semibold border-l-2 border-cyan-400'
                    : 'text-slate-300 hover:bg-[#142858] hover:text-slate-100'
                }`}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && <Check size={12} className="text-cyan-400 ml-1 flex-shrink-0" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function FilterBar({ filter, onChange }: FilterBarProps) {
  const handleChange = (key: keyof FilterState, value: string) => {
    onChange({ ...filter, [key]: value });
  };

  const handleReset = () => {
    onChange({
      dimension: 'all',
      term: '2025-spring-3',
      classId: 'all',
      courseId: 'all',
    });
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-3 px-1 text-sm relative z-20">
      {/* Left: Dimension */}
      <div className="flex items-center space-x-3">
        <span className="text-slate-300 text-xs font-semibold whitespace-nowrap">统计维度</span>
        <CustomSelect
          options={filterOptions.dimensions}
          value={filter.dimension}
          onChange={(val) => handleChange('dimension', val)}
          widthClass="w-36 sm:w-40"
        />
      </div>

      {/* Right: Filters & Action Buttons */}
      <div className="flex flex-wrap items-center gap-2.5 bg-[#0a1532]/70 p-1.5 rounded border border-[#1e3a8a]/50">
        <span className="text-slate-300 text-xs font-semibold ml-1 whitespace-nowrap">筛选条件</span>

        <CustomSelect
          options={filterOptions.terms}
          value={filter.term}
          onChange={(val) => handleChange('term', val)}
          widthClass="w-40 sm:w-44"
        />

        <CustomSelect
          options={filterOptions.classes}
          value={filter.classId}
          onChange={(val) => handleChange('classId', val)}
          widthClass="w-36 sm:w-40"
        />

        <CustomSelect
          options={filterOptions.courses}
          value={filter.courseId}
          onChange={(val) => handleChange('courseId', val)}
          widthClass="w-36 sm:w-40"
        />

        <button className="px-4 py-1.5 bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-xs font-medium rounded transition-all duration-200 shadow-[0_0_10px_rgba(14,165,233,0.4)] hover:shadow-[0_0_14px_rgba(14,165,233,0.7)] flex items-center space-x-1 cursor-pointer">
          <SearchIcon size={12} />
          <span>查询</span>
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-1.5 bg-[#071129] border border-[#1e3a8a] hover:bg-[#1e3a8a]/50 text-slate-300 hover:text-white text-xs font-medium rounded transition-colors flex items-center space-x-1 cursor-pointer"
        >
          <RotateCcw size={12} />
          <span>重置</span>
        </button>
      </div>
    </div>
  );
}
