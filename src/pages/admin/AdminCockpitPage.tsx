import React, { useState, useMemo } from 'react';
import { CockpitHeader } from '@/components/cockpit/CockpitHeader';
import { FilterBar } from '@/components/cockpit/FilterBar';
import { MetricCard } from '@/components/cockpit/MetricCard';
import { 
  EnrollmentTrendChart, 
  PassRateTrendChart, 
  EmploymentDestinationsChart, 
  CourseEvaluationChart,
  WorksTrendChart
} from '@/components/cockpit/Charts';
import { ClassTable } from '@/components/cockpit/ClassTable';
import { DetailModal } from '@/components/cockpit/DetailModal';
import { 
  generateMetrics, 
  trendChartData, 
  passRateChartData, 
  courseEvaluationsData,
  worksTrendData,
  classTableData
} from '@/data/cockpitMockData';
import { FilterState, MetricData } from '@/types/cockpit';

export default function AdminCockpitPage() {
  const [filter, setFilter] = useState<FilterState>({
    dimension: 'all',
    term: '2025-spring-3',
    classId: 'all',
    courseId: 'all'
  });

  const [selectedMetric, setSelectedMetric] = useState<MetricData | null>(null);

  const metrics = useMemo(() => generateMetrics(), []);

  const handleRefresh = () => {
    // Refresh triggered
    console.log("Cockpit data refreshed");
  };

  return (
    <div className="min-h-full bg-[#020716] bg-cyber-grid text-slate-200 font-sans flex flex-col selection:bg-cyan-500/30 relative overflow-x-hidden">
      {/* Top Cockpit Header */}
      <CockpitHeader onRefresh={handleRefresh} />

      {/* Main Body */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto p-5 flex flex-col space-y-5">
        {/* Filter Bar */}
        <FilterBar filter={filter} onChange={setFilter} />
        
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-4">
          {metrics.map((metric, index) => (
            <div key={metric.id} onClick={() => setSelectedMetric(metric)} className="cursor-pointer">
              <MetricCard 
                data={metric} 
                index={index} 
              />
            </div>
          ))}
        </div>

        {/* Middle Row: Trend & Donut Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:h-[340px]">
          <EnrollmentTrendChart data={trendChartData} />
          <PassRateTrendChart data={passRateChartData} />
          <EmploymentDestinationsChart />
        </div>

        {/* Bottom Row: Table & Remaining Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:h-[380px]">
          <ClassTable data={classTableData} />
          <CourseEvaluationChart data={courseEvaluationsData} />
          <WorksTrendChart data={worksTrendData} />
        </div>
      </main>

      {/* Detail Modal */}
      {selectedMetric && (
        <DetailModal data={selectedMetric} onClose={() => setSelectedMetric(null)} />
      )}
    </div>
  );
}
