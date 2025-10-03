"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/i18n";

const tabs = ["projects", "registry", "reports", "export", "audit"] as const;
type Tab = typeof tabs[number];

export default function AdminDashboard() {
  const { t } = useI18n();
  const [tab, setTab] = useState<Tab>("projects");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t('adminConsole')}</h1>
        <div className="flex gap-2">
          {tabs.map((key) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-3 py-2 rounded-lg text-sm ${tab === key ? 'bg-blue-600 text-white' : 'border'}`}
            >
              {t(key)}
            </button>
          ))}
        </div>
      </div>

      {tab === 'projects' && (
        <div className="bg-white rounded-xl shadow p-6">Projects table placeholder</div>
      )}
      {tab === 'registry' && (
        <div className="bg-white rounded-xl shadow p-6">Registry management placeholder</div>
      )}
      {tab === 'reports' && (
        <div className="bg-white rounded-xl shadow p-6">Reports and metrics placeholder</div>
      )}
      {tab === 'export' && (
        <div className="bg-white rounded-xl shadow p-6">NGO/Community export placeholder</div>
      )}
      {tab === 'audit' && (
        <div className="bg-white rounded-xl shadow p-6">Audit trail table placeholder</div>
      )}
    </div>
  );
}


