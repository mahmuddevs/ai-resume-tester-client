import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  FilePdfIcon,
  UploadSimpleIcon,
  BriefcaseIcon,
  SparkleIcon,
  WarningCircleIcon,
  TrashIcon,
  CheckCircleIcon
} from "@phosphor-icons/react";

interface FormValues {
  resume: File | null;
  jobDescription: string;
}

interface AnalyzeFormProps {
  onSubmit: (data: { resume: File; jobDescription: string }) => void;
}

// Helper to format file size
const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export default function AnalyzeForm({ onSubmit }: AnalyzeFormProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [filePreview, setFilePreview] = useState<{ name: string; size: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: {
      resume: null,
      jobDescription: "",
    },
    mode: "onChange",
  });

  const resumeValue = watch("resume");
  const jobDescriptionValue = watch("jobDescription");

  // Handle file selection and validation
  const handleFileChange = async (file: File | null) => {
    if (!file) {
      setValue("resume", null, { shouldValidate: true });
      setFilePreview(null);
      return;
    }

    // Verify it is a PDF
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const isPdf = file.type === "application/pdf" || fileExtension === "pdf";

    if (!isPdf) {
      setValue("resume", null);
      setFilePreview(null);
      alert("Invalid file type. Only PDF documents are allowed.");
      return;
    }

    // Limit to 10MB
    if (file.size > 10 * 1024 * 1024) {
      setValue("resume", null);
      setFilePreview(null);
      alert("File is too large. Maximum file size allowed is 10MB.");
      return;
    }

    setValue("resume", file, { shouldValidate: true });
    setFilePreview({
      name: file.name,
      size: formatBytes(file.size),
    });
    await trigger("resume");
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      await handleFileChange(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = async () => {
    setValue("resume", null, { shouldValidate: true });
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    await trigger("resume");
  };

  const onFormSubmit = (data: FormValues) => {
    if (data.resume) {
      onSubmit({
        resume: data.resume,
        jobDescription: data.jobDescription,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="w-full max-w-4xl mx-auto bg-white/60 backdrop-blur-xl border border-brand-border/40 p-8 sm:p-10 rounded-3xl shadow-xl space-y-8 animate-fade-in relative z-10"
    >
      <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-brand-primary/5 rounded-full blur-xl pointer-events-none -z-10" />

      {/* Grid container for input sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

        {/* LEFT COLUMN: Resume Upload drop zone */}
        <div className="space-y-4">
          <label className="text-sm font-extrabold text-brand-text uppercase tracking-wider block">
            1. Upload Resume (PDF Only)
          </label>

          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={!resumeValue ? handleButtonClick : undefined}
            className={`relative min-h-70 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-6 text-center transition-all duration-300 ${isDragActive
              ? "border-brand-primary bg-brand-primary/5 scale-[1.01] cursor-copy"
              : resumeValue
                ? "border-brand-success/40 bg-brand-success/5"
                : "border-brand-border hover:border-brand-primary/50 hover:bg-slate-50/50 cursor-pointer"
              }`}
          >
            {/* Hidden native input */}
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => {
                const files = e.target.files;
                if (files && files[0]) {
                  handleFileChange(files[0]);
                }
              }}
            />

            {!resumeValue ? (
              <div className="space-y-4 flex flex-col items-center">
                <div className="h-16 w-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-brand-primary shadow-xs hover:scale-105 transition-transform duration-300">
                  <UploadSimpleIcon className="h-8 w-8" />
                </div>
                <div>
                  <span
                    className="text-base font-bold text-brand-primary hover:text-brand-primary-hover underline cursor-pointer"
                  >
                    Click to upload
                  </span>
                  <span className="text-brand-text-muted text-sm block mt-1">
                    or drag and drop your file here
                  </span>
                </div>
                <div className="text-xs text-brand-text-muted/80 bg-slate-100 px-3 py-1 rounded-full font-medium">
                  PDF format, maximum 10MB
                </div>
              </div>
            ) : (
              <div className="space-y-5 w-full flex flex-col items-center">
                <div className="h-20 w-20 rounded-2xl bg-brand-success/10 border border-brand-success/20 flex items-center justify-center text-brand-success shadow-md shadow-brand-success/5 animate-pulse-subtle">
                  <FilePdfIcon className="h-10 w-10" />
                </div>
                <div className="w-full max-w-70">
                  <p className="text-base font-extrabold text-brand-text truncate" title={filePreview?.name}>
                    {filePreview?.name}
                  </p>
                  <p className="text-xs font-semibold text-brand-text-muted mt-0.5">
                    {filePreview?.size}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1 text-xs font-bold text-brand-success bg-brand-success/10 px-3 py-1 rounded-full border border-brand-success/20">
                  <CheckCircleIcon className="w-4 h-4" />
                  <span>Resume Ready</span>
                </div>

                <button
                  type="button"
                  onClick={removeFile}
                  className="flex items-center gap-1.5 text-xs font-bold text-brand-danger/90 hover:text-brand-danger bg-brand-danger/5 hover:bg-brand-danger/10 px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer"
                >
                  <TrashIcon className="h-4 w-4" />
                  Remove File
                </button>
              </div>
            )}
          </div>

          {/* Validation Register for Hidden Hook Form State */}
          <input
            type="hidden"
            {...register("resume", {
              required: "Please upload your resume in PDF format."
            })}
          />

          {errors.resume && (
            <p className="text-xs font-bold text-brand-danger flex items-center gap-1 mt-1 animate-slide-in-left">
              <WarningCircleIcon className="h-4 w-4 shrink-0" />
              {errors.resume.message}
            </p>
          )}
        </div>

        {/* RIGHT COLUMN: Job Description textarea */}
        <div className="space-y-4 h-full flex flex-col justify-start">
          <div className="flex justify-between items-center">
            <label className="text-sm font-extrabold text-brand-text uppercase tracking-wider block">
              2. Paste Job Description
            </label>
            <span className="text-xs font-bold text-brand-text-muted bg-slate-100 px-2 py-0.5 rounded-md">
              {jobDescriptionValue?.length || 0} chars
            </span>
          </div>

          <div className="relative grow min-h-70 flex flex-col">
            <div className="absolute top-4 left-4 text-brand-text-muted/60 pointer-events-none">
              <BriefcaseIcon className="h-5 w-5" />
            </div>
            <textarea
              {...register("jobDescription", {
                required: "Job description is required.",
                minLength: {
                  value: 10,
                  message: "Job description must be at least 10 characters long.",
                },
              })}
              placeholder="Paste the target job description details here. Include technical roles, requirements, and tech stack details..."
              className={`w-full grow min-h-70 bg-slate-50/50 hover:bg-slate-50 border p-5 pl-11 rounded-2xl text-sm leading-relaxed text-brand-text placeholder-brand-text-muted/60 focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all duration-300 ${errors.jobDescription ? "border-brand-danger ring-2 ring-brand-danger/10" : "border-brand-border"
                }`}
            />
          </div>

          {errors.jobDescription && (
            <p className="text-xs font-bold text-brand-danger flex items-center gap-1 mt-1 animate-slide-in-left">
              <WarningCircleIcon className="h-4 w-4 shrink-0" />
              {errors.jobDescription.message}
            </p>
          )}
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="pt-4 border-t border-brand-border/40 flex justify-center">
        <button
          type="submit"
          disabled={!isValid}
          className={`group flex items-center justify-center gap-3 px-10 py-4.5 rounded-xl font-bold text-lg text-white transition-all duration-300 transform ${isValid
            ? "bg-brand-primary shadow-lg shadow-brand-primary/25 hover:bg-brand-primary-hover hover:shadow-xl hover:shadow-brand-primary/35 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md cursor-pointer"
            : "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none border border-slate-200"
            }`}
        >
          <SparkleIcon className={`h-5 w-5 ${isValid ? "fill-white animate-spin [animation-duration:12s]" : ""}`} />
          <span>Refactor & Scan Resume</span>
        </button>
      </div>
    </form>
  );
}
