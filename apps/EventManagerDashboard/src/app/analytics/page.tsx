'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash } from 'lucide-react';

interface Analytics {
  id: string;
  metric: string;
  value: number;
  date: string;
  eventId?: string;
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Analytics | null>(null);
  const [form, setForm] = useState<Partial<Analytics>>({});
  const [deleting, setDeleting] = useState<Analytics | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    setLoading(true);
    const res = await fetch('/api/analytics');
    const data = await res.json();
    setAnalytics(data);
    setLoading(false);
  }

  function openCreate() {
    setEditing(null);
    setForm({});
    setShowModal(true);
  }

  function openEdit(analytic: Analytics) {
    setEditing(analytic);
    setForm(analytic);
    setShowModal(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      await fetch('/api/analytics', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } else {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
    setShowModal(false);
    fetchAnalytics();
  }

  async function handleDelete() {
    if (!deleting) return;
    await fetch('/api/analytics', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: deleting.id }),
    });
    setDeleting(null);
    fetchAnalytics();
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500">Manage event analytics</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add Analytics
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Analytics List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Metric</th>
                  <th className="px-4 py-2 text-left">Value</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Event ID</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {analytics.map((analytic) => (
                  <tr key={analytic.id} className="border-b">
                    <td className="px-4 py-2">{analytic.metric}</td>
                    <td className="px-4 py-2">{analytic.value}</td>
                    <td className="px-4 py-2">{analytic.date}</td>
                    <td className="px-4 py-2">{analytic.eventId || '-'}</td>
                    <td className="px-4 py-2 space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openEdit(analytic)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => setDeleting(analytic)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* Modal for Create/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">{editing ? 'Edit Analytics' : 'Add Analytics'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Metric</label>
                <input
                  className="w-full border rounded px-3 py-2 mt-1"
                  value={form.metric || ''}
                  onChange={e => setForm(f => ({ ...f, metric: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Value</label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2 mt-1"
                  value={form.value ?? ''}
                  onChange={e => setForm(f => ({ ...f, value: Number(e.target.value) }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Date</label>
                <input
                  type="date"
                  className="w-full border rounded px-3 py-2 mt-1"
                  value={form.date || ''}
                  onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Event ID</label>
                <input
                  className="w-full border rounded px-3 py-2 mt-1"
                  value={form.eventId || ''}
                  onChange={e => setForm(f => ({ ...f, eventId: e.target.value }))}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editing ? 'Update' : 'Add'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleting && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Delete Analytics</h2>
            <p>Are you sure you want to delete this analytics entry?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setDeleting(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 