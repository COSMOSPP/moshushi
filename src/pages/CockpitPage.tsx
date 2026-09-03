import React, { useState, useMemo } from 'react';
import { CockpitHeader } from '@/components/cockpit/CockpitHeader';
import { MetricCard } from '@/components/cockpit/MetricCard';
import { 
  EnrollmentTrendChart, 
  StudentLevelDistributionChart, 
  EmploymentDestinationsChart, 
  CourseEvaluationRankingChart,
  TeacherRankingChart
} from '@/components/cockpit/Charts';
import { ClassTable } from '@/components/cockpit/ClassTable';
import { DetailModal } from '@/components/cockpit/DetailModal';
import { 
  generateMetrics, 
  trendChartData, 
  studentLevelData, 
  courseRankingData,
  teacherRankingData,
  classTableData
} from '@/data/cockpitMockData';
import { MetricData } from '@/types/cockpit';

export default function AdminCockpitPage() {
  const [selectedMetric, setSelectedMetric] = useState<MetricData | null>(null);

  const metrics = useMemo(() => generateMetrics(), []);

  const handleRefresh = () => {
    // Refresh triggered
    console.log("Cockpit data refreshed");
  };

  return (
    <div className="min-h-screen xl:h-screen w-full bg-[#020716] bg-cyber-grid text-slate-200 font-sans flex flex-col selection:bg-cyan-500/30 relative overflow-x-hidden xl:overflow-hidden">
      {/* Top Cockpit Header */}
      <CockpitHeader onRefresh={handleRefresh} />

      {/* Main Body with unified 20px (gap-5) margins & gutters */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto p-5 flex flex-col justify-between min-h-0 gap-5">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-5 flex-shrink-0">
          {metrics.map((metric, index) => (
            <div key={metric.id} onClick={() => setSelectedMetric(metric)} className="cursor-pointer h-full">
              <MetricCard 
                data={metric} 
                index={index} 
              />
            </div>
          ))}
        </div>

        {/* Middle Row: Trend & Donut Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 flex-1 min-h-0">
          <EnrollmentTrendChart data={trendChartData} />
          <StudentLevelDistributionChart data={studentLevelData} />
          <EmploymentDestinationsChart />
        </div>

        {/* Bottom Row: Table & Remaining Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 flex-1 min-h-0">
          <ClassTable data={classTableData} />
          <CourseEvaluationRankingChart data={courseRankingData} />
          <TeacherRankingChart data={teacherRankingData} />
        </div>
      </main>

      {/* Detail Modal */}
      {selectedMetric && (
        <DetailModal data={selectedMetric} onClose={() => setSelectedMetric(null)} />
      )}
    </div>
  );
}
