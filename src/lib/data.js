import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');

/**
 * Read a JSON data file
 * @param {string} filename - The JSON filename (e.g., 'projects.json')
 * @returns {any} Parsed JSON data
 */
export function readData(filename) {
  const filePath = path.join(DATA_DIR, filename);
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Failed to read ${filename}:`, err.message);
    return null;
  }
}

/**
 * Write data to a JSON file atomically
 * @param {string} filename - The JSON filename
 * @param {any} data - The data to write
 */
export function writeData(filename, data) {
  const filePath = path.join(DATA_DIR, filename);
  const tmpPath = filePath + '.tmp';
  try {
    fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tmpPath, filePath);
    return true;
  } catch (err) {
    console.error(`Failed to write ${filename}:`, err.message);
    // Clean up temp file if it exists
    try { fs.unlinkSync(tmpPath); } catch (_) {}
    return false;
  }
}

/**
 * Log an activity
 * @param {string} action - e.g., 'created', 'updated', 'deleted'
 * @param {string} entityType - e.g., 'project', 'certificate'
 * @param {string} entityTitle - Title of the entity
 */
export function logActivity(action, entityType, entityTitle) {
  const activities = readData('activity.json') || [];
  activities.unshift({
    id: Date.now().toString(),
    action,
    entityType,
    entityTitle,
    timestamp: new Date().toISOString(),
  });
  // Keep only last 50 activities
  if (activities.length > 50) activities.length = 50;
  writeData('activity.json', activities);
}

/**
 * Generate a unique ID
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

/* ── Specific data helpers ── */

export function getProjects() {
  return readData('projects.json') || [];
}

export function getProjectById(id) {
  const projects = getProjects();
  return projects.find(p => p.id === id) || null;
}

export function saveProjects(projects) {
  return writeData('projects.json', projects);
}

export function getCertificates() {
  return readData('certificates.json') || [];
}

export function saveCertificates(certs) {
  return writeData('certificates.json', certs);
}

export function getSkills() {
  return readData('skills.json') || [];
}

export function saveSkills(skills) {
  return writeData('skills.json', skills);
}

export function getExperience() {
  return readData('experience.json') || [];
}

export function saveExperience(exp) {
  return writeData('experience.json', exp);
}

export function getAbout() {
  return readData('about.json') || {};
}

export function saveAbout(data) {
  return writeData('about.json', data);
}

export function getContent() {
  return readData('content.json') || [];
}

export function saveContent(content) {
  return writeData('content.json', content);
}

export function getSettings() {
  return readData('settings.json') || {};
}

export function saveSettings(settings) {
  return writeData('settings.json', settings);
}

export function getMessages() {
  return readData('messages.json') || [];
}

export function saveMessages(messages) {
  return writeData('messages.json', messages);
}

export function getMedia() {
  return readData('media.json') || [];
}

export function saveMedia(media) {
  return writeData('media.json', media);
}

export function getActivity() {
  return readData('activity.json') || [];
}

export function getAnalytics() {
  return readData('analytics.json') || { pageViews: [], summary: { totalVisits: 0, uniqueVisitors: 0, topPages: {}, deviceBreakdown: { desktop: 0, mobile: 0, tablet: 0 }, browserBreakdown: {}, dailyVisits: {} } };
}

export function saveAnalytics(data) {
  return writeData('analytics.json', data);
}

export function getHackathons() {
  return readData('hackathons.json') || [];
}

export function saveHackathons(data) {
  return writeData('hackathons.json', data);
}
