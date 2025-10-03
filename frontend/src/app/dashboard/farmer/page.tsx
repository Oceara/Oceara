"use client";

import { useState } from "react";
import { BigActionButton, StepCard, Section } from "./wizard/components";
import { useI18n } from "@/i18n/i18n";

type UploadKind = "drone" | "satellite" | "field";

export default function FarmerDashboard() {
  const { t } = useI18n();
  const [step, setStep] = useState(1);
  const [uploadKind, setUploadKind] = useState<UploadKind | null>(null);

  return (
    <div className="space-y-6">
      <Section title={t("getStarted")}> 
        <div className="grid md:grid-cols-3 gap-4">
          <BigActionButton icon="🛩️" label="Drone" onClick={() => { setUploadKind("drone"); setStep(2); }} />
          <BigActionButton icon="🛰️" label="Satellite" onClick={() => { setUploadKind("satellite"); setStep(2); }} />
          <BigActionButton icon="📝" label="Field" onClick={() => { setUploadKind("field"); setStep(2); }} />
        </div>
      </Section>

      {step >= 2 && (
        <Section title={t("uploadData")}>
          <div className="grid md:grid-cols-2 gap-4">
            <StepCard title="Select Files">
              <input type="file" className="w-full border rounded-lg p-3" multiple={uploadKind !== 'field'} />
            </StepCard>
            <StepCard title="Details">
              <div className="space-y-3">
                <input className="w-full border rounded-lg p-3" placeholder="Project Name" />
                <input className="w-full border rounded-lg p-3" placeholder="Location" />
                <textarea className="w-full border rounded-lg p-3" placeholder="Notes" rows={3} />
              </div>
            </StepCard>
          </div>
          <div className="flex justify-end">
            <BigActionButton icon="➡️" label={t("review")} onClick={() => setStep(3)} />
          </div>
        </Section>
      )}

      {step >= 3 && (
        <Section title={t("review")}>
          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-600">Review your details and submit for processing.</p>
          </div>
          <div className="flex justify-end">
            <BigActionButton icon="✅" label={t("submit")} onClick={() => setStep(1)} />
          </div>
        </Section>
      )}
    </div>
  );
}


