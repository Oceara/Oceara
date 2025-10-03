"use client";

import React from "react";
import { useI18n } from "@/i18n/i18n";

export function BigActionButton({ icon, label, onClick, disabled }: { icon: string; label: string; onClick?: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-center justify-center space-x-3 px-6 py-4 rounded-2xl text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
    >
      <span className="text-2xl">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

export function StepCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      {children}
    </div>
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold">{title}</h2>
      {children}
    </div>
  );
}


