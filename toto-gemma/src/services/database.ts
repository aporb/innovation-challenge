// src/services/database.ts
// SQLite database service for offline-first data persistence

import * as SQLite from 'expo-sqlite';
import type { Child, Screening, Answer, RiskResult, AgeGroup, DashboardStats } from '../types';

let db: SQLite.SQLiteDatabase | null = null;

/**
 * Initialize the database and create tables
 */
export async function initDatabase(): Promise<void> {
  db = await SQLite.openDatabaseAsync('toto_gemma.db');

  // Create tables
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS children (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      date_of_birth TEXT,
      age_in_months INTEGER,
      sex TEXT NOT NULL,
      village TEXT NOT NULL,
      caregiver_phone TEXT,
      caregiver_name TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      synced INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS screenings (
      id TEXT PRIMARY KEY NOT NULL,
      child_id TEXT NOT NULL,
      age_group TEXT NOT NULL,
      answers TEXT NOT NULL,
      risk_result TEXT,
      is_complete INTEGER DEFAULT 0,
      current_question_index INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      completed_at TEXT,
      synced INTEGER DEFAULT 0,
      FOREIGN KEY (child_id) REFERENCES children(id)
    );

    CREATE INDEX IF NOT EXISTS idx_screenings_child_id ON screenings(child_id);
    CREATE INDEX IF NOT EXISTS idx_screenings_created_at ON screenings(created_at);
  `);
}

/**
 * Get the database instance
 */
export function getDatabase(): SQLite.SQLiteDatabase {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
}

// ============ Child Operations ============

export async function insertChild(child: Child): Promise<void> {
  const database = getDatabase();
  await database.runAsync(
    `INSERT INTO children (id, name, date_of_birth, age_in_months, sex, village, caregiver_phone, caregiver_name, created_at, updated_at, synced)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      child.id,
      child.name,
      child.dateOfBirth,
      child.ageInMonths ?? null,
      child.sex,
      child.village,
      child.caregiverPhone ?? null,
      child.caregiverName ?? null,
      child.createdAt,
      child.updatedAt,
      child.synced ? 1 : 0,
    ]
  );
}

export async function updateChild(child: Child): Promise<void> {
  const database = getDatabase();
  await database.runAsync(
    `UPDATE children SET name = ?, date_of_birth = ?, age_in_months = ?, sex = ?, village = ?,
     caregiver_phone = ?, caregiver_name = ?, updated_at = ?, synced = ?
     WHERE id = ?`,
    [
      child.name,
      child.dateOfBirth,
      child.ageInMonths ?? null,
      child.sex,
      child.village,
      child.caregiverPhone ?? null,
      child.caregiverName ?? null,
      child.updatedAt,
      child.synced ? 1 : 0,
      child.id,
    ]
  );
}

export async function getChildById(id: string): Promise<Child | null> {
  const database = getDatabase();
  const row = await database.getFirstAsync<any>(
    'SELECT * FROM children WHERE id = ?',
    [id]
  );
  return row ? mapRowToChild(row) : null;
}

export async function getAllChildren(): Promise<Child[]> {
  const database = getDatabase();
  const rows = await database.getAllAsync<any>(
    'SELECT * FROM children ORDER BY updated_at DESC'
  );
  return rows.map(mapRowToChild);
}

export async function searchChildren(query: string): Promise<Child[]> {
  const database = getDatabase();
  const rows = await database.getAllAsync<any>(
    'SELECT * FROM children WHERE name LIKE ? ORDER BY name',
    [`%${query}%`]
  );
  return rows.map(mapRowToChild);
}

export async function getRecentChildren(limit: number = 10): Promise<Child[]> {
  const database = getDatabase();
  const rows = await database.getAllAsync<any>(
    'SELECT * FROM children ORDER BY updated_at DESC LIMIT ?',
    [limit]
  );
  return rows.map(mapRowToChild);
}

function mapRowToChild(row: any): Child {
  return {
    id: row.id,
    name: row.name,
    dateOfBirth: row.date_of_birth,
    ageInMonths: row.age_in_months,
    sex: row.sex,
    village: row.village,
    caregiverPhone: row.caregiver_phone,
    caregiverName: row.caregiver_name,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    synced: row.synced === 1,
  };
}

// ============ Screening Operations ============

export async function insertScreening(screening: Screening): Promise<void> {
  const database = getDatabase();
  await database.runAsync(
    `INSERT INTO screenings (id, child_id, age_group, answers, risk_result, is_complete, current_question_index, created_at, completed_at, synced)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      screening.id,
      screening.childId,
      screening.ageGroup,
      JSON.stringify(screening.answers),
      screening.riskResult ? JSON.stringify(screening.riskResult) : null,
      screening.isComplete ? 1 : 0,
      screening.currentQuestionIndex,
      screening.createdAt,
      screening.completedAt ?? null,
      screening.synced ? 1 : 0,
    ]
  );
}

export async function updateScreening(screening: Screening): Promise<void> {
  const database = getDatabase();
  await database.runAsync(
    `UPDATE screenings SET answers = ?, risk_result = ?, is_complete = ?,
     current_question_index = ?, completed_at = ?, synced = ?
     WHERE id = ?`,
    [
      JSON.stringify(screening.answers),
      screening.riskResult ? JSON.stringify(screening.riskResult) : null,
      screening.isComplete ? 1 : 0,
      screening.currentQuestionIndex,
      screening.completedAt ?? null,
      screening.synced ? 1 : 0,
      screening.id,
    ]
  );
}

export async function getScreeningById(id: string): Promise<Screening | null> {
  const database = getDatabase();
  const row = await database.getFirstAsync<any>(
    'SELECT * FROM screenings WHERE id = ?',
    [id]
  );
  return row ? mapRowToScreening(row) : null;
}

export async function getScreeningsForChild(childId: string): Promise<Screening[]> {
  const database = getDatabase();
  const rows = await database.getAllAsync<any>(
    'SELECT * FROM screenings WHERE child_id = ? ORDER BY created_at DESC',
    [childId]
  );
  return rows.map(mapRowToScreening);
}

export async function getIncompleteScreening(childId: string): Promise<Screening | null> {
  const database = getDatabase();
  const row = await database.getFirstAsync<any>(
    'SELECT * FROM screenings WHERE child_id = ? AND is_complete = 0 ORDER BY created_at DESC LIMIT 1',
    [childId]
  );
  return row ? mapRowToScreening(row) : null;
}

export async function getAllScreenings(): Promise<Screening[]> {
  const database = getDatabase();
  const rows = await database.getAllAsync<any>(
    'SELECT * FROM screenings ORDER BY created_at DESC'
  );
  return rows.map(mapRowToScreening);
}

export async function getRecentScreenings(limit: number = 20): Promise<(Screening & { childName: string })[]> {
  const database = getDatabase();
  const rows = await database.getAllAsync<any>(
    `SELECT s.*, c.name as child_name
     FROM screenings s
     JOIN children c ON s.child_id = c.id
     WHERE s.is_complete = 1
     ORDER BY s.created_at DESC LIMIT ?`,
    [limit]
  );
  return rows.map((row) => ({
    ...mapRowToScreening(row),
    childName: row.child_name,
  }));
}

function mapRowToScreening(row: any): Screening {
  return {
    id: row.id,
    childId: row.child_id,
    ageGroup: row.age_group as AgeGroup,
    answers: JSON.parse(row.answers) as Answer[],
    riskResult: row.risk_result ? (JSON.parse(row.risk_result) as RiskResult) : null,
    isComplete: row.is_complete === 1,
    currentQuestionIndex: row.current_question_index,
    createdAt: row.created_at,
    completedAt: row.completed_at,
    synced: row.synced === 1,
  };
}

// ============ Dashboard Statistics ============

export async function getDashboardStats(): Promise<DashboardStats> {
  const database = getDatabase();

  // Get counts
  const totalResult = await database.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM screenings WHERE is_complete = 1'
  );
  const total = totalResult?.count ?? 0;

  const todayResult = await database.getFirstAsync<{ count: number }>(
    "SELECT COUNT(*) as count FROM screenings WHERE is_complete = 1 AND date(created_at) = date('now')"
  );
  const today = todayResult?.count ?? 0;

  // Get risk distribution
  const riskRows = await database.getAllAsync<{ risk: string; count: number }>(
    `SELECT json_extract(risk_result, '$.overall') as risk, COUNT(*) as count
     FROM screenings
     WHERE is_complete = 1 AND risk_result IS NOT NULL
     GROUP BY risk`
  );

  const riskDistribution = { green: 0, yellow: 0, orange: 0, red: 0 };
  riskRows.forEach((row) => {
    if (row.risk in riskDistribution) {
      riskDistribution[row.risk as keyof typeof riskDistribution] = row.count;
    }
  });

  // Get pending referrals (orange + red)
  const pendingResult = await database.getFirstAsync<{ count: number }>(
    `SELECT COUNT(*) as count FROM screenings
     WHERE is_complete = 1
     AND (json_extract(risk_result, '$.overall') = 'orange' OR json_extract(risk_result, '$.overall') = 'red')`
  );
  const pendingReferrals = pendingResult?.count ?? 0;

  // Get pending sync count
  const syncResult = await database.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM screenings WHERE synced = 0'
  );
  const pendingSync = syncResult?.count ?? 0;

  // Get recent screenings
  const recentScreenings = await getRecentScreenings(5);

  return {
    totalScreenings: total,
    screeningsToday: today,
    riskDistribution,
    pendingReferrals,
    pendingSync,
    recentScreenings,
  };
}

// ============ Seed Data ============

export async function seedDemoData(): Promise<void> {
  const database = getDatabase();

  // Check if data already exists
  const existingChildren = await database.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM children'
  );
  if ((existingChildren?.count ?? 0) > 0) {
    return; // Data already seeded
  }

  const now = new Date().toISOString();
  const children: Child[] = [
    {
      id: 'child-001',
      name: 'Amina Hassan',
      dateOfBirth: '2025-05-02',
      sex: 'female',
      village: 'Kaloleni',
      caregiverPhone: '+254712345678',
      createdAt: '2025-12-01T08:00:00Z',
      updatedAt: now,
      synced: true,
    },
    {
      id: 'child-002',
      name: 'John Mwangi',
      dateOfBirth: '2024-01-15',
      sex: 'male',
      village: 'Rabai',
      caregiverPhone: '+254723456789',
      createdAt: '2025-12-05T09:00:00Z',
      updatedAt: now,
      synced: true,
    },
    {
      id: 'child-003',
      name: 'Faith Wanjiku',
      dateOfBirth: '2025-09-01',
      sex: 'female',
      village: 'Mariakani',
      createdAt: '2025-12-10T10:00:00Z',
      updatedAt: now,
      synced: true,
    },
    {
      id: 'child-004',
      name: 'Peter Ochieng',
      dateOfBirth: '2023-01-20',
      sex: 'male',
      village: 'Kinango',
      caregiverPhone: '+254734567890',
      createdAt: '2025-12-08T11:00:00Z',
      updatedAt: now,
      synced: true,
    },
    {
      id: 'child-005',
      name: 'Grace Akinyi',
      dateOfBirth: '2024-11-15',
      sex: 'female',
      village: 'Chonyi',
      createdAt: '2025-12-20T14:00:00Z',
      updatedAt: now,
      synced: true,
    },
  ];

  for (const child of children) {
    await insertChild(child);
  }

  // Add sample screenings
  const sampleScreenings: Screening[] = [
    {
      id: 'screening-001',
      childId: 'child-001',
      ageGroup: '6-24m',
      answers: [
        { questionId: 'q-6-24m-health-1', category: 'health', selectedRisk: 'green' },
        { questionId: 'q-6-24m-health-2', category: 'health', selectedRisk: 'green' },
        { questionId: 'q-6-24m-health-3', category: 'health', selectedRisk: 'green' },
        { questionId: 'q-6-24m-health-4', category: 'health', selectedRisk: 'green' },
        { questionId: 'q-6-24m-health-5', category: 'health', selectedRisk: 'green' },
        { questionId: 'q-6-24m-dev-1', category: 'development', selectedRisk: 'green' },
        { questionId: 'q-6-24m-dev-2', category: 'development', selectedRisk: 'yellow' },
        { questionId: 'q-6-24m-dev-3', category: 'development', selectedRisk: 'green' },
        { questionId: 'q-6-24m-dev-4', category: 'development', selectedRisk: 'green' },
        { questionId: 'q-6-24m-dev-5', category: 'development', selectedRisk: 'green' },
        { questionId: 'q-6-24m-nut-1', category: 'nutrition', selectedRisk: 'green' },
        { questionId: 'q-6-24m-nut-2', category: 'nutrition', selectedRisk: 'green' },
        { questionId: 'q-6-24m-nut-3', category: 'nutrition', selectedRisk: 'green' },
        { questionId: 'q-6-24m-nut-4', category: 'nutrition', selectedRisk: 'green' },
        { questionId: 'q-6-24m-nut-5', category: 'nutrition', selectedRisk: 'green' },
      ],
      riskResult: {
        overall: 'yellow',
        categories: { health: 'green', development: 'yellow', nutrition: 'green' },
        redFlags: [],
        areasOfConcern: ['q-6-24m-dev-2'],
      },
      isComplete: true,
      currentQuestionIndex: 15,
      createdAt: '2025-12-28T10:30:00Z',
      completedAt: '2025-12-28T10:35:00Z',
      synced: true,
    },
    {
      id: 'screening-002',
      childId: 'child-002',
      ageGroup: '2-5y',
      answers: [
        { questionId: 'q-2-5y-health-1', category: 'health', selectedRisk: 'green' },
        { questionId: 'q-2-5y-health-2', category: 'health', selectedRisk: 'green' },
        { questionId: 'q-2-5y-health-3', category: 'health', selectedRisk: 'green' },
        { questionId: 'q-2-5y-health-4', category: 'health', selectedRisk: 'green' },
        { questionId: 'q-2-5y-health-5', category: 'health', selectedRisk: 'green' },
        { questionId: 'q-2-5y-dev-1', category: 'development', selectedRisk: 'green' },
        { questionId: 'q-2-5y-dev-2', category: 'development', selectedRisk: 'green' },
        { questionId: 'q-2-5y-dev-3', category: 'development', selectedRisk: 'green' },
        { questionId: 'q-2-5y-dev-4', category: 'development', selectedRisk: 'green' },
        { questionId: 'q-2-5y-dev-5', category: 'development', selectedRisk: 'green' },
        { questionId: 'q-2-5y-nut-1', category: 'nutrition', selectedRisk: 'green' },
        { questionId: 'q-2-5y-nut-2', category: 'nutrition', selectedRisk: 'green' },
        { questionId: 'q-2-5y-nut-3', category: 'nutrition', selectedRisk: 'green' },
        { questionId: 'q-2-5y-nut-4', category: 'nutrition', selectedRisk: 'green' },
        { questionId: 'q-2-5y-nut-5', category: 'nutrition', selectedRisk: 'green' },
      ],
      riskResult: {
        overall: 'green',
        categories: { health: 'green', development: 'green', nutrition: 'green' },
        redFlags: [],
        areasOfConcern: [],
      },
      isComplete: true,
      currentQuestionIndex: 15,
      createdAt: '2025-12-20T14:00:00Z',
      completedAt: '2025-12-20T14:05:00Z',
      synced: true,
    },
  ];

  for (const screening of sampleScreenings) {
    await insertScreening(screening);
  }
}
