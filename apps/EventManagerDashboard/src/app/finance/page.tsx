'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function FinancePage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Financial Management</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Reports
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Budget Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Track event budgets and expenses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Monitor and categorize expenses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Forecasting</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Project future revenue and growth</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Generate detailed financial reports</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Multi-currency Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Handle multiple currencies and conversions</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 