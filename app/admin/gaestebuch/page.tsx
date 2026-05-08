'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Check, X, Trash2, Edit, ArrowLeft, Plus, BookOpen, Camera } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { ManualEntryDialog } from '@/components/admin/manual-entry-dialog';

interface Entry {
  id: number;
  name: string;
  ort: string | null;
  stayPeriod: string | null;
  accommodation: string | null;
  rating: number | null;
  message: string;
  submitterEmail: string | null;
  status: 'pending' | 'approved' | 'rejected';
  source: string;
  photoUrl: string | null;
  approvedAt: string | null;
  createdAt: string;
}

type Filter = 'pending' | 'approved' | 'rejected' | 'all';

export default function AdminGaestebuch() {
  const router = useRouter();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('pending');
  const [editing, setEditing] = useState<Entry | null>(null);
  const [showManual, setShowManual] = useState(false);

  const fetchEntries = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/guestbook');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setEntries(data.entries);
      }
    } catch {
      toast.error('Fehler beim Laden');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const stats = useMemo(() => {
    return {
      pending: entries.filter((e) => e.status === 'pending').length,
      approved: entries.filter((e) => e.status === 'approved').length,
      rejected: entries.filter((e) => e.status === 'rejected').length,
    };
  }, [entries]);

  const filtered = useMemo(() => {
    if (filter === 'all') return entries;
    return entries.filter((e) => e.status === filter);
  }, [entries, filter]);

  const handleStatus = async (id: number, status: 'approved' | 'rejected' | 'pending') => {
    const res = await fetch(`/api/admin/guestbook/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const data = await res.json();
      setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...data.entry } : e)));
      toast.success(
        status === 'approved' ? 'Freigeschaltet' : status === 'rejected' ? 'Abgelehnt' : 'Auf prüfen gesetzt'
      );
    } else {
      toast.error('Fehler');
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Eintrag von "${name}" wirklich löschen?`)) return;
    const res = await fetch(`/api/admin/guestbook/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setEntries((prev) => prev.filter((e) => e.id !== id));
      toast.success('Gelöscht');
    } else {
      toast.error('Fehler beim Löschen');
    }
  };

  const handleSaveEdit = async (entry: Entry) => {
    const res = await fetch(`/api/admin/guestbook/${entry.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: entry.name,
        ort: entry.ort,
        stayPeriod: entry.stayPeriod,
        accommodation: entry.accommodation,
        rating: entry.rating,
        message: entry.message,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setEntries((prev) => prev.map((e) => (e.id === entry.id ? { ...e, ...data.entry } : e)));
      toast.success('Gespeichert');
      setEditing(null);
    } else {
      toast.error('Fehler beim Speichern');
    }
  };

  const handleManualCreated = (entry: Entry) => {
    setEntries((prev) => [entry, ...prev]);
    setShowManual(false);
    toast.success('Eintrag angelegt und freigeschaltet');
  };

  return (
    <div className="min-h-screen bg-stone">
      <header className="bg-forest text-white px-4 py-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-white/80 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-serif text-xl flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Gästebuch
            </h1>
          </div>
          <Button
            onClick={() => setShowManual(true)}
            size="sm"
            className="bg-amber-300 hover:bg-amber-400 text-forest"
          >
            <Plus className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Zettel-Eintrag hinzufügen</span>
            <span className="sm:hidden">Zettel</span>
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-white rounded-xl border border-border p-5">
          <h2 className="font-serif text-2xl text-forest mb-4">Einträge verwalten</h2>
          <p className="text-sm text-text-primary/70 mb-4">
            Neue Einträge erscheinen unter „Zu prüfen". Mit „Freigeben" werden sie auf der öffentlichen
            Seite sichtbar. Du kannst Tippfehler vor dem Freigeben über „Bearbeiten" korrigieren.
          </p>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-amber-50 rounded-lg p-3 text-center">
              <span className="text-2xl font-semibold text-amber-700">{stats.pending}</span>
              <p className="text-xs text-amber-700/80">Zu prüfen</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <span className="text-2xl font-semibold text-green-700">{stats.approved}</span>
              <p className="text-xs text-green-700/80">Freigegeben</p>
            </div>
            <div className="bg-stone-100 rounded-lg p-3 text-center">
              <span className="text-2xl font-semibold text-stone-600">{stats.rejected}</span>
              <p className="text-xs text-stone-600/80">Abgelehnt</p>
            </div>
          </div>
        </div>

        <div className="flex gap-1 bg-stone/50 rounded-lg p-1 w-fit overflow-x-auto">
          {([
            { key: 'pending', label: 'Zu prüfen', count: stats.pending },
            { key: 'approved', label: 'Online', count: stats.approved },
            { key: 'rejected', label: 'Abgelehnt', count: stats.rejected },
            { key: 'all', label: 'Alle', count: entries.length },
          ] as { key: Filter; label: string; count: number }[]).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                filter === tab.key
                  ? 'bg-white text-forest shadow-sm'
                  : 'text-muted-foreground hover:text-text-primary'
              }`}
            >
              {tab.label}
              {tab.count > 0 && <span className="ml-1.5 text-xs opacity-60">{tab.count}</span>}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-forest border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Keine Einträge in dieser Kategorie.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((entry) => (
              <article key={entry.id} className="bg-white rounded-xl shadow-sm border border-border p-5">
                {editing?.id === entry.id ? (
                  <EditForm
                    entry={editing}
                    onChange={setEditing}
                    onSave={() => handleSaveEdit(editing)}
                    onCancel={() => setEditing(null)}
                  />
                ) : (
                  <>
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-serif text-lg text-forest">{entry.name}</h3>
                          <StatusBadge status={entry.status} />
                          {entry.source === 'handwritten' && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 inline-flex items-center gap-1">
                              <Camera className="w-3 h-3" /> Zettel
                            </span>
                          )}
                          {entry.rating && (
                            <span className="text-amber-500 text-sm">
                              {'★'.repeat(entry.rating)}
                              {'☆'.repeat(5 - entry.rating)}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {[
                            entry.ort,
                            entry.stayPeriod,
                            entry.accommodation,
                            `eingegangen ${format(new Date(entry.createdAt), 'd. MMM yyyy', { locale: de })}`,
                            entry.submitterEmail && `📧 ${entry.submitterEmail}`,
                          ]
                            .filter(Boolean)
                            .join(' · ')}
                        </p>
                      </div>
                    </div>

                    {entry.photoUrl && (
                      <a
                        href={entry.photoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mb-3"
                      >
                        <img
                          src={entry.photoUrl}
                          alt={`Foto Zettel von ${entry.name}`}
                          className="max-w-md max-h-64 rounded-lg border border-stone-200 bg-stone-50"
                        />
                      </a>
                    )}

                    <p className="text-text-primary leading-relaxed whitespace-pre-line bg-stone/30 p-4 rounded-lg">
                      {entry.message}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mt-4">
                      {entry.status !== 'approved' && (
                        <Button
                          size="sm"
                          onClick={() => handleStatus(entry.id, 'approved')}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Check className="w-4 h-4 mr-1" /> Freigeben
                        </Button>
                      )}
                      {entry.status !== 'rejected' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatus(entry.id, 'rejected')}
                        >
                          <X className="w-4 h-4 mr-1" /> Ablehnen
                        </Button>
                      )}
                      {entry.status === 'rejected' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatus(entry.id, 'pending')}
                        >
                          Zurück zu „Prüfen"
                        </Button>
                      )}
                      <Button size="sm" variant="outline" onClick={() => setEditing(entry)}>
                        <Edit className="w-4 h-4 mr-1" /> Bearbeiten
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive ml-auto"
                        onClick={() => handleDelete(entry.id, entry.name)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </>
                )}
              </article>
            ))}
          </div>
        )}
      </main>

      <ManualEntryDialog
        open={showManual}
        onClose={() => setShowManual(false)}
        onCreated={handleManualCreated}
      />
    </div>
  );
}

function StatusBadge({ status }: { status: Entry['status'] }) {
  const map = {
    pending: { label: 'Zu prüfen', cls: 'bg-amber-100 text-amber-800' },
    approved: { label: 'Online', cls: 'bg-green-100 text-green-800' },
    rejected: { label: 'Abgelehnt', cls: 'bg-stone-200 text-stone-700' },
  } as const;
  const m = map[status];
  return <span className={`text-xs px-2 py-0.5 rounded-full ${m.cls}`}>{m.label}</span>;
}

function EditForm({
  entry,
  onChange,
  onSave,
  onCancel,
}: {
  entry: Entry;
  onChange: (e: Entry) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="grid md:grid-cols-2 gap-3">
        <input
          className="border rounded h-10 px-3"
          placeholder="Name"
          value={entry.name}
          onChange={(e) => onChange({ ...entry, name: e.target.value })}
        />
        <input
          className="border rounded h-10 px-3"
          placeholder="Ort"
          value={entry.ort || ''}
          onChange={(e) => onChange({ ...entry, ort: e.target.value || null })}
        />
        <input
          className="border rounded h-10 px-3"
          placeholder="Aufenthalt (z. B. Mai 2026)"
          value={entry.stayPeriod || ''}
          onChange={(e) => onChange({ ...entry, stayPeriod: e.target.value || null })}
        />
        <input
          className="border rounded h-10 px-3"
          placeholder="Unterkunft"
          value={entry.accommodation || ''}
          onChange={(e) => onChange({ ...entry, accommodation: e.target.value || null })}
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-text-primary/70">Bewertung:</span>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange({ ...entry, rating: entry.rating === n ? null : n })}
            className={`text-xl ${entry.rating && n <= entry.rating ? 'text-amber-400' : 'text-stone-300'}`}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        className="border rounded w-full p-3 min-h-[140px]"
        value={entry.message}
        onChange={(e) => onChange({ ...entry, message: e.target.value })}
      />
      <div className="flex gap-2">
        <Button onClick={onSave} className="bg-forest hover:bg-forest/90 text-white">
          Speichern
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Abbrechen
        </Button>
      </div>
    </div>
  );
}
