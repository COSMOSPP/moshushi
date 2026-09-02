import React from "react";
import { MetricData } from "../../types/cockpit";
import { Download, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DetailModalProps {
  data: MetricData | null;
  onClose: () => void;
}

export function DetailModal({ data, onClose }: DetailModalProps) {
  if (!data) return null;

  const detailHeaders = data.detailHeaders || ["ID", "维度", "当前值", "状态"];
  const detailData = data.detailData || [];

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + detailHeaders.join(",") + "\n"
      + detailData.map(row => Object.values(row).join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${data.title}_明细数据.csv`);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[85vh]"
        >
          <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />
          
          <div className="flex items-center justify-between p-6 border-b border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-slate-100">{data.title} - 数据明细</h2>
              <p className="text-sm text-slate-400 mt-1">当前展示最近 {detailData.length} 条记录</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleExport}
                className="flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-sm font-medium rounded-lg border border-[#1e3a8a] transition-colors"
              >
                <Download size={16} className="mr-2" />
                导出数据
              </button>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          <div className="p-6 overflow-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  {detailHeaders.map((header, idx) => (
                    <th key={idx} className="pb-3 px-4 text-sm font-medium text-slate-400 border-b border-slate-800 whitespace-nowrap">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {detailData.map((row, rowIdx) => (
                  <motion.tr 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: rowIdx * 0.03 }}
                    key={rowIdx} 
                    className="hover:bg-slate-800/50 transition-colors group"
                  >
                    {Object.values(row).map((cell: any, cellIdx) => (
                      <td key={cellIdx} className="py-4 px-4 text-sm text-slate-300 border-b border-slate-800/50 group-last:border-0 whitespace-nowrap">
                        {cell}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
