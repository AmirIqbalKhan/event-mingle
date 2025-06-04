'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Save, Shield, Users, Bell, Database } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">System Settings</h1>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Manage user roles and permissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Configure security settings and access controls</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Manage system notifications and alerts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Configure data storage and backup settings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Set up system-wide preferences and defaults</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 