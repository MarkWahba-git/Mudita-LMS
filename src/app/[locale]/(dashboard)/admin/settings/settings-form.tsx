"use client";

import { useState, useTransition } from "react";
import { bulkUpdateSettings } from "@/actions/settings.actions";

interface Setting {
  id: string;
  key: string;
  value: string;
  type: string;
  category: string;
  label: string;
  description: string | null;
}

interface Props {
  settings: Setting[];
  canEdit: boolean;
}

export function SettingsForm({ settings, canEdit }: Props) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(settings.map((s) => [s.key, s.value]))
  );
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function handleSave() {
    const updates = settings
      .filter((s) => values[s.key] !== s.value)
      .map((s) => ({ key: s.key, value: values[s.key] }));

    if (updates.length === 0) {
      setMessage({ type: "error", text: "No changes to save" });
      return;
    }

    startTransition(async () => {
      const result = await bulkUpdateSettings(updates);
      setMessage(
        result.success
          ? { type: "success", text: `${updates.length} setting(s) updated` }
          : { type: "error", text: result.error ?? "Failed" }
      );
    });
  }

  return (
    <div className="space-y-4">
      {settings.map((setting) => (
        <div key={setting.key} className="grid gap-1">
          <label className="text-sm font-medium">{setting.label}</label>
          {setting.description && (
            <p className="text-xs text-muted-foreground">{setting.description}</p>
          )}

          {setting.type === "boolean" ? (
            <select
              value={values[setting.key]}
              onChange={(e) => setValues((prev) => ({ ...prev, [setting.key]: e.target.value }))}
              disabled={!canEdit || pending}
              className="w-full max-w-xs rounded-md border px-3 py-2 text-sm disabled:opacity-50"
            >
              <option value="true">Enabled</option>
              <option value="false">Disabled</option>
            </select>
          ) : setting.type === "json" ? (
            <textarea
              value={values[setting.key]}
              onChange={(e) => setValues((prev) => ({ ...prev, [setting.key]: e.target.value }))}
              disabled={!canEdit || pending}
              rows={4}
              className="w-full rounded-md border px-3 py-2 font-mono text-sm disabled:opacity-50"
            />
          ) : setting.type === "number" ? (
            <input
              type="number"
              value={values[setting.key]}
              onChange={(e) => setValues((prev) => ({ ...prev, [setting.key]: e.target.value }))}
              disabled={!canEdit || pending}
              className="w-full max-w-xs rounded-md border px-3 py-2 text-sm disabled:opacity-50"
            />
          ) : (
            <input
              type="text"
              value={values[setting.key]}
              onChange={(e) => setValues((prev) => ({ ...prev, [setting.key]: e.target.value }))}
              disabled={!canEdit || pending}
              className="w-full rounded-md border px-3 py-2 text-sm disabled:opacity-50"
            />
          )}
        </div>
      ))}

      {canEdit && (
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleSave}
            disabled={pending}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
          >
            {pending ? "Saving..." : "Save Changes"}
          </button>
          {message && (
            <span className={`text-sm ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
              {message.text}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
