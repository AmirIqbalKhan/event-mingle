'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash } from 'lucide-react';

interface Communication {
  id: string;
  type: string;
  subject: string;
  content: string;
  status: string;
  recipientId?: string;
}

export default function CommunicationsPage() {
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Communication | null>(null);
  const [form, setForm] = useState<Partial<Communication>>({});
  const [deleting, setDeleting] = useState<Communication | null>(null);

  useEffect(() => {
    fetchCommunications();
  }, []);

  async function fetchCommunications() {
    setLoading(true);
    const res = await fetch('/api/communications');
    const data = await res.json();
    setCommunications(data);
    setLoading(false);
  }

  function openCreate() {
    setEditing(null);
    setForm({});
    setShowModal(true);
  }

  function openEdit(communication: Communication) {
    setEditing(communication);
    setForm(communication);
    setShowModal(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      await fetch('/api/communications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } else {
      await fetch('/api/communications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
    setShowModal(false);
    fetchCommunications();
  }

  async function handleDelete() {
    if (!deleting) return;
    await fetch('/api/communications', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: deleting.id }),
    });
    setDeleting(null);
    fetchCommunications();
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Communications</h1>
          <p className="text-sm text-gray-500">Manage event communications</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add Communication
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Communication List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Subject</th>
                  <th className="px-4 py-2 text-left">Content</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Recipient ID</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {communications.map((communication) => (
                  <tr key={communication.id} className="border-b">
                    <td className="px-4 py-2">{communication.type}</td>
                    <td className="px-4 py-2">{communication.subject}</td>
                    <td className="px-4 py-2">{communication.content}</td>
                    <td className="px-4 py-2">{communication.status}</td>
                    <td className="px-4 py-2">{communication.recipientId || '-'}</td>
                    <td className="px-4 py-2 space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openEdit(communication)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => setDeleting(communication)}>
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
            <h2 className="text-lg font-semibold mb-4">{editing ? 'Edit Communication' : 'Add Communication'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Type</label>
                <input
                  className="w-full border rounded px-3 py-2 mt-1"
                  value={form.type || ''}
                  onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Subject</label>
                <input
                  className="w-full border rounded px-3 py-2 mt-1"
                  value={form.subject || ''}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Content</label>
                <input
                  className="w-full border rounded px-3 py-2 mt-1"
                  value={form.content || ''}
                  onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Status</label>
                <input
                  className="w-full border rounded px-3 py-2 mt-1"
                  value={form.status || ''}
                  onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Recipient ID</label>
                <input
                  className="w-full border rounded px-3 py-2 mt-1"
                  value={form.recipientId || ''}
                  onChange={e => setForm(f => ({ ...f, recipientId: e.target.value }))}
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
            <h2 className="text-lg font-semibold mb-4">Delete Communication</h2>
            <p>Are you sure you want to delete this communication?</p>
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