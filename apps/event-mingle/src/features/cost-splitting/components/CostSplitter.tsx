import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface Participant {
  id: string;
  name: string;
  email: string;
  amount: number;
  paid: boolean;
}

interface CostSplitterProps {
  eventId: string;
  totalAmount: number;
  participants: Participant[];
  onUpdate: () => void;
}

export const CostSplitter: React.FC<CostSplitterProps> = ({
  eventId,
  totalAmount,
  participants,
  onUpdate,
}) => {
  const { data: session } = useSession();
  const [splitType, setSplitType] = useState<'equal' | 'custom'>('equal');
  const [customAmounts, setCustomAmounts] = useState<Record<string, number>>({});

  const equalAmount = totalAmount / participants.length;

  const handleSplitTypeChange = (type: 'equal' | 'custom') => {
    setSplitType(type);
    if (type === 'equal') {
      setCustomAmounts({});
    }
  };

  const handleCustomAmountChange = (participantId: string, amount: number) => {
    setCustomAmounts((prev) => ({
      ...prev,
      [participantId]: amount,
    }));
  };

  const handleMarkAsPaid = async (participantId: string) => {
    try {
      await axios.post(`/api/events/${eventId}/payments`, {
        participantId,
        amount: splitType === 'equal' ? equalAmount : customAmounts[participantId],
      });
      toast.success('Payment marked as completed');
      onUpdate();
    } catch (error) {
      toast.error('Failed to mark payment as completed');
    }
  };

  const handleSendReminder = async (participantId: string) => {
    try {
      await axios.post(`/api/events/${eventId}/reminders`, {
        participantId,
      });
      toast.success('Reminder sent successfully');
    } catch (error) {
      toast.error('Failed to send reminder');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Cost Splitting</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => handleSplitTypeChange('equal')}
            className={`px-4 py-2 rounded ${
              splitType === 'equal'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Equal Split
          </button>
          <button
            onClick={() => handleSplitTypeChange('custom')}
            className={`px-4 py-2 rounded ${
              splitType === 'custom'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Custom Split
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {participants.map((participant) => (
          <motion.div
            key={participant.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div>
                <h3 className="font-medium">{participant.name}</h3>
                <p className="text-sm text-gray-500">{participant.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {splitType === 'custom' ? (
                <input
                  type="number"
                  value={customAmounts[participant.id] || 0}
                  onChange={(e) =>
                    handleCustomAmountChange(
                      participant.id,
                      parseFloat(e.target.value)
                    )
                  }
                  className="w-24 px-2 py-1 border rounded"
                  min="0"
                  step="0.01"
                />
              ) : (
                <span className="font-medium">
                  ${equalAmount.toFixed(2)}
                </span>
              )}

              {participant.id !== session?.user?.id && (
                <div className="flex space-x-2">
                  {!participant.paid && (
                    <>
                      <button
                        onClick={() => handleMarkAsPaid(participant.id)}
                        className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Mark as Paid
                      </button>
                      <button
                        onClick={() => handleSendReminder(participant.id)}
                        className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Send Reminder
                      </button>
                    </>
                  )}
                  {participant.paid && (
                    <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded">
                      Paid
                    </span>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">Total Amount:</span>
          <span className="text-2xl font-bold">${totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}; 