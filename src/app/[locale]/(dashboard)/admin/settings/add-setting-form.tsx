"use client";

import { useState, useTransition } from "react";
import { createSetting } from "@/actions/settings.actions";

const CATEGORIES = ["general", "email", "payments", "branding", "notifications"];
const TYPES = ["string", "number", "boolean", "json"];

export function AddSettingForm() {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("string");
  const [category, setCategory] = useState("general");
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!key || !label) return;

    startTransition(async () => {
      const result = await createSetting({
        key,
        value: value || (type === "boolean" ? "false" : type === "number" ? "0" : ""),
        type,
        category,
        label,
        description: description || undefined,
      });
      if (result.success) {
        setMessage({ type: "success", text: "Setting created" });
        setKey("");
        setValue("");
        setLabel("");
        setDescription("");
      } else {
        setMessage({ type: "error", text: result.error ?? "Failed" });
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div>
        <label className="mb-1 block text-sm font-medium">Key</label>
        <input
          type="text"
          placeholder="e.g. site.name"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="w-full rounded-md border px-3 py-2 text-sm"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Label</label>
        <input
          type="text"
          placeholder="e.g. Site Name"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full rounded-md border px-3 py-2 text-sm"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Value</label>
        <input
          type="text"
          placeholder="Default value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full rounded-md border px-3 py-2 text-sm"
        >
          {TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-md border px-3 py-2 text-sm"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Description</label>
        <input
          type="text"
          placeholder="Optional description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      <div className="flex items-end sm:col-span-2 lg:col-span-3">
        <button
          type="submit"
          disabled={pending || !key || !label}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
        >
          {pending ? "Adding..." : "Add Setting"}
        </button>
        {message && (
          <span className={`ml-3 text-sm ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
            {message.text}
          </span>
        )}
      </div>
    </form>
  );
}
