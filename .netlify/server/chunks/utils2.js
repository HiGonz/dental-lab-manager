function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function getDaysUntilDue(dueDate) {
  const due = new Date(dueDate);
  const now = /* @__PURE__ */ new Date();
  const diffMs = due.getTime() - now.getTime();
  return Math.ceil(diffMs / (1e3 * 60 * 60 * 24));
}
function getStatusColor(status) {
  const colors = {
    pending: "warning",
    approved: "primary",
    in_progress: "primary",
    rejected: "danger",
    completed: "success",
    delivered: "secondary"
  };
  return colors[status] || "secondary";
}
function getStatusLabel(status) {
  const labels = {
    pending: "Pending Review",
    approved: "Approved",
    in_progress: "In Progress",
    rejected: "Rejected",
    completed: "Completed",
    delivered: "Delivered"
  };
  return labels[status] || status;
}
function getRoleLabel(role) {
  const labels = {
    specialist: "Specialist",
    receptionist: "Receptionist",
    manager: "Branch Manager",
    technician: "Lab Technician"
  };
  return labels[role] || role;
}
function getRoleColor(role) {
  const colors = {
    specialist: "primary",
    receptionist: "success",
    manager: "warning",
    technician: "secondary"
  };
  return colors[role] || "secondary";
}
function canViewKPIs(role) {
  return ["manager", "technician"].includes(role);
}
function canManagePatients(role) {
  return ["receptionist", "manager"].includes(role);
}
function groupBy(array, key) {
  return array.reduce((groups, item) => {
    const value = String(item[key]);
    if (!groups[value]) {
      groups[value] = [];
    }
    groups[value].push(item);
    return groups;
  }, {});
}
export {
  getRoleLabel as a,
  getStatusColor as b,
  canViewKPIs as c,
  getStatusLabel as d,
  getDaysUntilDue as e,
  formatDate as f,
  getRoleColor as g,
  groupBy as h,
  canManagePatients as i
};
