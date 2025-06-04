'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash } from 'lucide-react'

interface Ticket {
  id: string;
  eventId: string;
  clientId?: string;
  price: number;
  status: string;
  event?: { name: string };
  client?: { name: string };
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Ticket | null>(null)
  const [form, setForm] = useState<Partial<Ticket>>({})
  const [deleting, setDeleting] = useState<Ticket | null>(null)

  useEffect(() => {
    fetchTickets()
  }, [])

  async function fetchTickets() {
    setLoading(true)
    const res = await fetch('/api/tickets')
    const data = await res.json()
    setTickets(data)
    setLoading(false)
  }

  function openCreate() {
    setEditing(null)
    setForm({})
    setShowModal(true)
  }

  function openEdit(ticket: Ticket) {
    setEditing(ticket)
    setForm(ticket)
    setShowModal(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (editing) {
      await fetch('/api/tickets', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } else {
      await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    }
    setShowModal(false)
    fetchTickets()
  }

  async function handleDelete() {
    if (!deleting) return
    await fetch('/api/tickets', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: deleting.id }),
    })
    setDeleting(null)
    fetchTickets()
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Tickets</h1>
          <p className="text-sm text-gray-500">Manage event tickets</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add Ticket
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ticket List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Event</th>
                  <th className="px-4 py-2 text-left">Client</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b">
                    <td className="px-4 py-2">{ticket.event?.name || '-'}</td>
                    <td className="px-4 py-2">{ticket.client?.name || '-'}</td>
                    <td className="px-4 py-2">${ticket.price.toFixed(2)}</td>
                    <td className="px-4 py-2">{ticket.status}</td>
                    <td className="px-4 py-2 space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openEdit(ticket)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => setDeleting(ticket)}>
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
            <h2 className="text-lg font-semibold mb-4">{editing ? 'Edit Ticket' : 'Add Ticket'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Event ID</label>
                <input
                  className="w-full border rounded px-3 py-2 mt-1"
                  value={form.eventId || ''}
                  onChange={e => setForm(f => ({ ...f, eventId: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Client ID</label>
                <input
                  className="w-full border rounded px-3 py-2 mt-1"
                  value={form.clientId || ''}
                  onChange={e => setForm(f => ({ ...f, clientId: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2 mt-1"
                  value={form.price || ''}
                  onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))}
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
            <h2 className="text-lg font-semibold mb-4">Delete Ticket</h2>
            <p>Are you sure you want to delete this ticket?</p>
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
  )
} 