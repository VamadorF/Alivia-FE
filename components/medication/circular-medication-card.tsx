"use client";

import { Medication } from "@/types";
import { getNextDose } from "@/data/medications";
import { Clock, Check } from "lucide-react";

interface CircularMedicationCardProps {
  medication: Medication;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}

const sizeClasses = {
  small: "w-20 h-20",
  medium: "w-28 h-28",
  large: "w-36 h-36",
};

const textSizeClasses = {
  small: "text-xs",
  medium: "text-sm",
  large: "text-base",
};

export function CircularMedicationCard({
  medication,
  size = "medium",
  onClick,
}: CircularMedicationCardProps) {
  const nextDose = getNextDose(medication);
  const allTaken = medication.schedule.every((s) => s.taken);

  return (
    <button
      onClick={onClick}
      className={`relative ${sizeClasses[size]} rounded-full transition-all hover:scale-110 hover:shadow-xl cursor-pointer`}
      style={{
        backgroundColor: medication.colorTone,
        boxShadow: `0 4px 20px ${medication.colorTone}40`,
      }}
    >
      {/* Medication Info */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-white">
        <div className={`font-bold ${textSizeClasses[size]} text-center leading-tight`}>
          {medication.name.split(" ")[0]}
        </div>
        <div className={`${size === "small" ? "text-[10px]" : "text-xs"} opacity-90 mt-0.5`}>
          {medication.dose}
        </div>
      </div>

      {/* Next Dose Indicator */}
      {nextDose && !allTaken && (
        <div className="absolute -top-1 -right-1 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-sky-500">
          <div className="text-center">
            <Clock className="h-3 w-3 text-sky-600 mx-auto" />
            <div className="text-[8px] font-bold text-sky-600 leading-none mt-0.5">
              {nextDose.hoursRemaining < 1
                ? `${Math.round(nextDose.hoursRemaining * 60)}m`
                : `${Math.round(nextDose.hoursRemaining)}h`}
            </div>
          </div>
        </div>
      )}

      {/* All Taken Indicator */}
      {allTaken && (
        <div className="absolute -top-1 -right-1 w-8 h-8 bg-green-500 rounded-full shadow-lg flex items-center justify-center border-2 border-white">
          <Check className="h-4 w-4 text-white" />
        </div>
      )}

      {/* Urgency Ring */}
      {nextDose && nextDose.hoursRemaining <= 1 && !allTaken && (
        <div
          className="absolute inset-0 rounded-full border-4 border-red-400 animate-pulse"
          style={{ borderColor: "#ef4444" }}
        />
      )}
    </button>
  );
}
