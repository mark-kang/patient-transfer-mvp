import React, { useEffect, useState } from 'react';
import { mockApi, type TransferRequest } from '../lib/supabase';
import { RequestForm } from '../components/RequestForm';
import { Plus, Clock, CheckCircle2, XCircle } from 'lucide-react';

export const HospitalDashboard: React.FC = () => {
  const [requests, setRequests] = useState<TransferRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // General Hospital ID (Mock)
  const myHospitalId = 'h1'; 

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    setLoading(true);
    const data = await mockApi.getRequests(myHospitalId, 'sender');
    setRequests(data);
    setLoading(false);
  };

  const StatusIcon = ({ status }: { status: string }) => {
    switch(status) {
      case 'pending': return <Clock size={16} className="text-gray-500" />;
      case 'viewed': return <Clock size={16} className="text-blue-500" />;
      case 'accepted': return <CheckCircle2 size={16} className="text-green-500" />;
      case 'rejected': return <XCircle size={16} className="text-red-500" />;
      default: return null;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">환자 회송 현황 (보낸 요청)</h1>
          <p className="text-gray-500 mt-1">협력병원으로 보낸 회송 요청들의 진행 상태를 추적합니다.</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={18} />
          {showForm ? '취소하기' : '새 회송 요청'}
        </button>
      </div>

      {showForm && (
        <RequestForm 
          onCancel={() => setShowForm(false)} 
          onSubmitSuccess={() => {
            setShowForm(false);
            loadRequests();
          }} 
        />
      )}

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="card">
          <div className="text-sm font-medium text-gray-500">진행 중 (대기/확인)</div>
          <div className="text-2xl font-bold mt-2">
            {requests.filter(r => ['pending', 'viewed'].includes(r.status)).length}건
          </div>
        </div>
        <div className="card">
          <div className="text-sm font-medium text-gray-500">수용됨</div>
          <div className="text-2xl font-bold mt-2 text-green-600">
            {requests.filter(r => r.status === 'accepted').length}건
          </div>
        </div>
        <div className="card">
          <div className="text-sm font-medium text-gray-500">거절됨</div>
          <div className="text-2xl font-bold mt-2 text-red-600">
            {requests.filter(r => r.status === 'rejected').length}건
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-bold mb-4">요청 목록</h3>
        {loading ? (
          <div className="p-4 text-center text-gray-500">Loading...</div>
        ) : requests.length === 0 ? (
          <div className="p-6 text-center text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            아직 보낸 회송 요청이 없습니다.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <th className="p-4 text-sm text-gray-500 font-medium">환자 정보</th>
                  <th className="p-4 text-sm text-gray-500 font-medium">수신 병원</th>
                  <th className="p-4 text-sm text-gray-500 font-medium">상태</th>
                  <th className="p-4 text-sm text-gray-500 font-medium">요청일</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(req => (
                  <tr key={req.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                     <td className="p-4">
                       <div className="font-bold text-gray-900">{req.patientInitials} <span className="text-sm font-normal text-gray-500">({req.age}세, {req.gender})</span></div>
                       <div className="text-xs text-gray-500 mt-1">{req.primaryDiagnosis} | {req.adlStatus}</div>
                     </td>
                     <td className="p-4 text-gray-600 font-medium">{req.toHospitalId === 'p1' ? '제일요양병원(협력)' : req.toHospitalId === 'p2' ? '푸른재활병원(협력)' : req.toHospitalId}</td>
                     <td className="p-4">
                       <span className={`badge badge-${req.status} flex items-center gap-1 inline-flex`}>
                         <StatusIcon status={req.status} />
                         {req.status.toUpperCase()}
                       </span>
                     </td>
                     <td className="p-4 text-sm text-gray-500">
                       {new Date(req.createdAt).toLocaleDateString()}
                     </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
