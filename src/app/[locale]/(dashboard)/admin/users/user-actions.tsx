"use client";

import { useState, useTransition } from "react";
import { updateUserRole, toggleUserActive } from "@/actions/admin.actions";

const ROLES = [
  { value: "STUDENT", label: "Student" },
  { value: "PARENT", label: "Parent" },
  { value: "TUTOR", label: "Tutor" },
  { value: "ADMIN", label: "Admin" },
  { value: "SUPER_ADMIN", label: "Super Admin" },
  { value: "B2B_PARTNER", label: "B2B Partner" },
];

interface Props {
  userId: string;
  currentRole: string;
  isActive: boolean;
  canManageRoles: boolean;
  isSelf: boolean;
}

export function UserActions({ userId, currentRole, isActive, canManageRoles, isSelf }: Props) {
  const [pending, startTransition] = useTransition();
  const [showRoleSelect, setShowRoleSelect] = useState(false);

  function handleToggleActive() {
    startTransition(async () => {
      const result = await toggleUserActive(userId);
      if (!result.success) alert(result.error);
    });
  }

  function handleRoleChange(newRole: string) {
    if (newRole === currentRole) {
      setShowRoleSelect(false);
      return;
    }
    startTransition(async () => {
      const result = await updateUserRole(userId, newRole);
      if (!result.success) alert(result.error);
      setShowRoleSelect(false);
    });
  }

  return (
    <div className="flex items-center justify-end gap-1">
      {/* Role change */}
      {canManageRoles && !isSelf && (
        showRoleSelect ? (
          <select
            defaultValue={currentRole}
            onChange={(e) => handleRoleChange(e.target.value)}
            onBlur={() => setShowRoleSelect(false)}
            autoFocus
            disabled={pending}
            className="rounded border px-2 py-1 text-xs disabled:opacity-50"
          >
            {ROLES.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        ) : (
          <button
            onClick={() => setShowRoleSelect(true)}
            disabled={pending}
            className="rounded px-2 py-1 text-xs font-medium text-primary hover:bg-primary/10 disabled:opacity-50"
          >
            Change Role
          </button>
        )
      )}

      {/* Toggle active/inactive */}
      {!isSelf && (
        <button
          onClick={handleToggleActive}
          disabled={pending}
          className={`rounded px-2 py-1 text-xs font-medium disabled:opacity-50 ${
            isActive
              ? "text-red-600 hover:bg-red-50"
              : "text-green-700 hover:bg-green-50"
          }`}
        >
          {pending ? "..." : isActive ? "Deactivate" : "Activate"}
        </button>
      )}

      {isSelf && (
        <span className="text-xs text-muted-foreground italic">You</span>
      )}
    </div>
  );
}
