'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Users, BarChart2, Smile, Calendar } from 'lucide-react';

export default function ClientReportsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Client Reports</h1>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Event Summaries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Generate detailed event summaries for clients</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Track and report on event attendance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Client Dashboards</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Custom dashboards for client insights</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Post-Event Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Comprehensive post-event reports</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Satisfaction Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Monitor client satisfaction metrics</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 