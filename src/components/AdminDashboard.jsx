import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, CheckCircle, AlertCircle } from "lucide-react";
import SectionHeading from "./SectionHeading";

const apiBase = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const apiUrl = (path) => `${apiBase}${path}`;

export default function AdminDashboard() {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!formData.title || !formData.content) {
      setErrorMessage("Title and content are required.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch(apiUrl("/api/blogs/create"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ title: "", image: "", content: "" });
        setTimeout(() => {
          navigate(`/blogs/${data.slug}`);
        }, 2000);
      } else {
        setErrorMessage(data.message || "Failed to create publication.");
        setStatus("error");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMessage("Network error. Make sure the backend server is running.");
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-5 pt-32 pb-24 sm:px-6 lg:px-8">
      {/* Header Actions */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/")}
          className="secondary-action !px-4 !py-2 text-sm"
          type="button"
        >
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </button>
      </div>

      <SectionHeading
        eyebrow="Admin Panel"
        title="Publish a new article"
        description="Write and deploy standard markdown-supported articles directly to the portfolio database."
      />

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-white/10 bg-zinc-950/70 p-6 backdrop-blur sm:p-8"
      >
        <h3 className="text-xl font-semibold text-white">Create Publication</h3>
        <p className="mt-1 text-sm text-zinc-500">
          Draft and submit your thoughts to populate the homepage feed and blogs archive.
        </p>

        {/* Status Feedbacks */}
        {status === "success" && (
          <div className="mt-6 flex items-center gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-400">
            <CheckCircle size={20} className="flex-none" />
            <p className="text-sm font-medium">
              Publication created successfully! Redirecting to reader page...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="mt-6 flex items-center gap-3 rounded-lg border border-rose-500/20 bg-rose-500/10 p-4 text-rose-400">
            <AlertCircle size={20} className="flex-none" />
            <p className="text-sm font-medium">{errorMessage}</p>
          </div>
        )}

        {/* Inputs */}
        <div className="mt-6 space-y-4">
          <label className="form-field">
            <span>Title *</span>
            <input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter a compelling title..."
              required
              disabled={status === "sending" || status === "success"}
            />
          </label>

          <label className="form-field">
            <span>Cover Image URL (Optional)</span>
            <input
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="https://example.com/cover-image.jpg"
              disabled={status === "sending" || status === "success"}
            />
          </label>

          <label className="form-field">
            <span>Content *</span>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your article content here..."
              rows="10"
              required
              disabled={status === "sending" || status === "success"}
            />
          </label>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/blogs")}
            className="secondary-action"
            disabled={status === "sending" || status === "success"}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={status === "sending" || status === "success"}
            className="primary-action min-w-[140px] justify-center"
          >
            {status === "sending" ? (
              <span>Publishing...</span>
            ) : (
              <>
                <Send size={16} />
                <span>Publish</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
