import { useState } from "react";
import { getFetch, type ApiError } from "../../utils/getFetch";
import SectionHeading from "../../components/home/section-heading";
import AnalyzeForm from "../../components/analyze/analyze-form";
import LoadingScreen from "../../components/analyze/loading-screen";
import ResultOverview from "../../components/analyze/result-overview";
import KeywordAnalysis from "../../components/analyze/keyword-analysis";
import ImprovementsList from "../../components/analyze/improvements-list";
import { WarningCircleIcon, ArrowLeftIcon } from "@phosphor-icons/react";

interface AnalysisData {
  _id: string;
  userId: string;
  resumeFileName: string;
  jobDescription: string;
  metrics: {
    matchScore: number;
    missingKeywords: string[];
    strengths: string[];
    weaknesses: string[];
    actionableImprovements: string[];
  };
}

interface ApiResponse {
  message: string;
  data: AnalysisData;
  statusCode: number;
}

export default function Analyze() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [result, setResult] = useState<AnalysisData | null>(null);

  const handleFormSubmit = async (formData: { resume: File; jobDescription: string }) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const body = new FormData();
    body.append("resume", formData.resume);
    body.append("jobDescription", formData.jobDescription);

    try {
      const response = await getFetch<ApiResponse>("/analyze/run", {
        method: "POST",
        body: body,
        private: true,
      });

      if (response && response.data) {
        setResult(response.data);
      } else {
        throw new Error("Unable to fetch complete scanning metrics.");
      }
    } catch (err: unknown) {
      console.error("Analysis Failed:", err);
      const apiErr = err as ApiError;
      setError({
        message: apiErr.message || "An unexpected error occurred during resume analysis.",
        status: apiErr.status,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="w-full min-h-[calc(100vh-4.5rem)] bg-brand-bg relative overflow-hidden pb-20">

      {/* Background ambient light effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-125 h-125 bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/3 w-100 h-100 bg-brand-secondary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Loading Overlay */}
      {isLoading && <LoadingScreen />}

      {/* Main Content Area */}
      <div className="cont pt-12 md:pt-16 space-y-12">

        {/* State A: Show upload form */}
        {!result && (
          <div className="space-y-10">
            <SectionHeading
              badge="Secure Auditing"
              title={
                <>
                  Resume{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-primary to-brand-secondary">
                    ATS Audit
                  </span>
                </>
              }
              subtitle="Upload your resume PDF and paste the target job description details to instantly isolate keyword gaps and receive actionable suggestions."
              align="center"
            />

            {/* Error Box */}
            {error && (
              <div className="max-w-4xl mx-auto p-5 border border-brand-danger/25 bg-brand-danger/5 rounded-2xl flex items-start gap-3.5 animate-slide-in-left">
                <WarningCircleIcon className="w-6 h-6 text-brand-danger shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-extrabold text-brand-danger uppercase tracking-wide">
                    Scan Auditing Refused
                  </h4>
                  <p className="text-xs font-bold text-brand-text-muted leading-relaxed">
                    {error.message}
                  </p>
                </div>
              </div>
            )}

            <AnalyzeForm onSubmit={handleFormSubmit} />
          </div>
        )}

        {/* State B: Show results dashboard */}
        {result && (
          <div className="space-y-8 animate-fade-in">
            {/* Quick Back Button link */}
            <div className="max-w-7xl mx-auto pl-1">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 text-xs font-extrabold text-brand-primary bg-brand-primary/5 border border-brand-primary/10 hover:bg-brand-primary/10 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                <span>Back to Scanner Form</span>
              </button>
            </div>

            {/* Overview Widget */}
            <ResultOverview
              score={result.metrics.matchScore}
              totalMissing={result.metrics.missingKeywords.length}
              totalStrengths={result.metrics.strengths.length}
              totalWeaknesses={result.metrics.weaknesses.length}
              totalImprovements={result.metrics.actionableImprovements.length}
              resumeName={result.resumeFileName}
              onReset={handleReset}
            />

            {/* Keywords board */}
            <KeywordAnalysis
              missingKeywords={result.metrics.missingKeywords}
              strengths={result.metrics.strengths}
            />

            {/* Actionable suggestions list */}
            <ImprovementsList
              weaknesses={result.metrics.weaknesses}
              improvements={result.metrics.actionableImprovements}
            />
          </div>
        )}

      </div>
    </div>
  );
}