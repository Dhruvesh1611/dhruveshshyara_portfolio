import projectsJson from './projects.json';

// Re-export for backward compatibility — all components that import from here continue to work.
// The admin panel writes to projects.json, and this module reads from it.
export const allProjects = projectsJson.map(p => ({
  ...p,
  // Keep the original numeric id for display purposes (e.g., "01", "02")
  id: typeof p.displayOrder === 'number' ? p.displayOrder : parseInt(p.id.replace('proj_', ''), 10) || 0,
  _adminId: p.id, // Preserve the admin ID for lookups
}));
