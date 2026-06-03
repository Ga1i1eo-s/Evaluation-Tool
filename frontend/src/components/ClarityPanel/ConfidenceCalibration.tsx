interface ConfidenceCalibrationProps {
  before: number;
  after: number;
}

export function ConfidenceCalibration({ before, after }: ConfidenceCalibrationProps) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">Confidence Calibration</h2>
      <div className="flex items-center gap-4">
        <div className="flex-1 p-4 bg-white border border-gray-200 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Before Clarity</p>
          <p className="text-2xl font-bold text-gray-900">{before} / 5</p>
          <p className="text-xs text-gray-500 mt-1">You were fairly confident</p>
        </div>
        
        <div className="text-gray-400">
          →
        </div>
        
        <div className="flex-1 p-4 bg-white border border-gray-200 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">After Clarity</p>
          <p className="text-2xl font-bold text-gray-900">{after} / 5</p>
          <p className="text-xs text-gray-500 mt-1">Moderate confidence</p>
        </div>
      </div>
    </section>
  );
}
