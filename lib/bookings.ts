import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import Stripe from "stripe";

export type BookingRecord = {
  id: string;
  checkoutSessionId: string;
  paymentIntentId: string;
  customerName: string;
  customerEmail: string;
  service: string;
  serviceId: string;
  frequency: string;
  address: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  extras: string[];
  notes: string;
  totalAmount: number;
  paymentStatus: string;
  paidAt: string;
};

const dataDir = path.join(process.cwd(), "data");
const databasePath = path.join(dataDir, "bookings.db");
const legacyJsonPath = path.join(dataDir, "bookings.json");

function openDatabase() {
  mkdirSync(dataDir, { recursive: true });

  const db = new DatabaseSync(databasePath);

  db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      checkout_session_id TEXT UNIQUE NOT NULL,
      payment_intent_id TEXT NOT NULL,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      service TEXT NOT NULL,
      service_id TEXT NOT NULL,
      frequency TEXT NOT NULL,
      address TEXT NOT NULL,
      city TEXT NOT NULL,
      bedrooms INTEGER NOT NULL,
      bathrooms INTEGER NOT NULL,
      square_footage INTEGER NOT NULL,
      extras_json TEXT NOT NULL,
      notes TEXT NOT NULL,
      total_amount INTEGER NOT NULL,
      payment_status TEXT NOT NULL,
      paid_at TEXT NOT NULL
    )
  `);

  migrateLegacyJsonIfPresent(db);

  return db;
}

function migrateLegacyJsonIfPresent(db: DatabaseSync) {
  if (!existsSync(legacyJsonPath)) {
    return;
  }

  const row = db
    .prepare("SELECT COUNT(*) as count FROM bookings")
    .get() as { count: number };

  if (row.count > 0) {
    unlinkSync(legacyJsonPath);
    return;
  }

  const legacyContent = readFileSync(legacyJsonPath, "utf8");
  const records = JSON.parse(legacyContent) as BookingRecord[];

  for (const record of records) {
    insertOrReplaceBooking(db, record);
  }

  unlinkSync(legacyJsonPath);
}

function insertOrReplaceBooking(db: DatabaseSync, record: BookingRecord) {
  db.prepare(`
    INSERT OR REPLACE INTO bookings (
      id,
      checkout_session_id,
      payment_intent_id,
      customer_name,
      customer_email,
      service,
      service_id,
      frequency,
      address,
      city,
      bedrooms,
      bathrooms,
      square_footage,
      extras_json,
      notes,
      total_amount,
      payment_status,
      paid_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
  `).run(
    record.id,
    record.checkoutSessionId,
    record.paymentIntentId,
    record.customerName,
    record.customerEmail,
    record.service,
    record.serviceId,
    record.frequency,
    record.address,
    record.city,
    record.bedrooms,
    record.bathrooms,
    record.squareFootage,
    JSON.stringify(record.extras),
    record.notes,
    record.totalAmount,
    record.paymentStatus,
    record.paidAt,
  );
}

export async function readBookingRecords() {
  const db = openDatabase();

  const rows = db.prepare(`
    SELECT
      id,
      checkout_session_id,
      payment_intent_id,
      customer_name,
      customer_email,
      service,
      service_id,
      frequency,
      address,
      city,
      bedrooms,
      bathrooms,
      square_footage,
      extras_json,
      notes,
      total_amount,
      payment_status,
      paid_at
    FROM bookings
    ORDER BY paid_at DESC
  `).all() as Array<Record<string, string | number>>;

  db.close();

  return rows.map((row) => ({
    id: String(row.id),
    checkoutSessionId: String(row.checkout_session_id),
    paymentIntentId: String(row.payment_intent_id),
    customerName: String(row.customer_name),
    customerEmail: String(row.customer_email),
    service: String(row.service),
    serviceId: String(row.service_id),
    frequency: String(row.frequency),
    address: String(row.address),
    city: String(row.city),
    bedrooms: Number(row.bedrooms),
    bathrooms: Number(row.bathrooms),
    squareFootage: Number(row.square_footage),
    extras: JSON.parse(String(row.extras_json)) as string[],
    notes: String(row.notes),
    totalAmount: Number(row.total_amount),
    paymentStatus: String(row.payment_status),
    paidAt: String(row.paid_at),
  }));
}

export async function upsertBookingRecord(record: BookingRecord) {
  const db = openDatabase();
  insertOrReplaceBooking(db, record);
  db.close();
}

export function createBookingFromSession(session: Stripe.Checkout.Session): BookingRecord {
  const metadata = session.metadata ?? {};
  const extras =
    metadata.extras && metadata.extras !== "none"
      ? metadata.extras.split(", ").filter(Boolean)
      : [];

  return {
    id: session.client_reference_id ?? session.id,
    checkoutSessionId: session.id,
    paymentIntentId:
      typeof session.payment_intent === "string" ? session.payment_intent : "",
    customerName: metadata.customerName ?? "Unknown customer",
    customerEmail:
      metadata.customerEmail ?? session.customer_details?.email ?? "Unknown email",
    service: metadata.service ?? "Unknown service",
    serviceId: metadata.serviceId ?? "unknown",
    frequency: metadata.frequency ?? "one-time",
    address: metadata.address ?? "Unknown address",
    city: metadata.city ?? "Unknown city",
    bedrooms: Number(metadata.bedrooms ?? 0),
    bathrooms: Number(metadata.bathrooms ?? 0),
    squareFootage: Number(metadata.squareFootage ?? 0),
    extras,
    notes: metadata.notes === "none" ? "" : metadata.notes ?? "",
    totalAmount: session.amount_total ?? Number(metadata.estimatedTotal ?? 0),
    paymentStatus: session.payment_status ?? "paid",
    paidAt: new Date().toISOString(),
  };
}

export function ensureBookingDatabaseForRuntime() {
  const db = openDatabase();
  db.close();
}

export function seedEmptyLegacyJsonForCompatibility() {
  mkdirSync(dataDir, { recursive: true });

  if (!existsSync(legacyJsonPath)) {
    writeFileSync(legacyJsonPath, "[]\n", "utf8");
  }
}
