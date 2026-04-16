import React, { useEffect, useState } from 'react';
import { mockApi, type TransferRequest } from '../lib/supabase';
import { Download, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export const PartnerDashboard: React.FC = () => {
  const [requests, setRequests] = useState<TransferRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // Partner Hospital ID (Mock)
  const myHospitalId = 'p1'; 

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    setLoading(true);
    const data = await mockApi.getRequests(myHospitalId, 'receiver');
    setRequests(data);
    setLoading(false);
  };

  const handleUpdateStatus = async (id: string, status: TransferRequest['status']) => {
    await mockApi.updateRequestStatus(id, status);
    if (status === 'accepted') {
       toast.success('회송 환자 수용 처리가 완료되었습니다.', {
          style: { borderRadius: '10px', background: '#ecfdf5', color: '#065f46', border: '1px solid #10b981' }
       });
    } else if (status === 'rejected') {
       toast('회송 요청을 거절했습니다.', {
          icon: '⚠️',
          style: { borderRadius: '10px' }
       });
    }
    loadRequests(); // Reload to refresh data
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">수신된 회송 요청 (받은 요청)</h1>
          <p className="text-gray-500 mt-1">상급병원으로부터 들어온 환자 회송 요청을 확인하고 수용 여부를 결정하세요.</p>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center gap-2 mb-4 text-orange-600 font-medium">
          <AlertCircle size={20} />
          <span>새로 들어온 요청이나 확인 대기 중인 요청이 표시됩니다.</span>
        </div>

        {loading ? (
          <div className="p-4 text-center text-gray-500">Loading...</div>
        ) : requests.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <Download size={48} className="text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700">대기 중인 요청이 없습니다</h3>
            <p className="text-gray-500 mt-2">새로운 회송 요청이 들어오면 이곳에 표시됩니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {requests.map(req => (
              <div key={req.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center" style={{ backgroundColor: req.status === 'pending' ? '#eff6ff' : 'white' }}>
                 <div>
                   <div className="flex items-center gap-2 mb-2">
                     <span className={`badge badge-${req.status}`}>{req.status.toUpperCase()}</span>
                     <span className="text-sm text-gray-500">From: {req.fromHospitalId}</span>
                     <span className="text-sm text-gray-400">· {new Date(req.createdAt).toLocaleString()}</span>
                   </div>
                   <h4 className="text-lg font-bold">{req.patientInitials} <span className="text-sm font-normal text-gray-500">({req.age}세, {req.gender})</span></h4>
                   <div className="text-sm text-gray-700 mt-1 mb-1 font-medium bg-gray-100 inline-block px-2 py-1 rounded">주진단: {req.primaryDiagnosis}</div>
                   <div className="text-sm text-gray-600 mt-1">
                     <span className="font-semibold text-gray-800">상태:</span> {req.adlStatus} | <span className={req.needsOxygen ? 'text-red-500 font-bold' : ''}>산소 {req.needsOxygen ? '필요' : '불필요'}</span> | <span className={req.hasInfection ? 'text-red-500 font-bold' : ''}>감염 {req.hasInfection ? '주의' : '없음'}</span>
                   </div>
                   {req.notes && <div className="text-sm text-gray-500 mt-2 bg-yellow-50 p-2 rounded">참고: {req.notes}</div>}
                 </div>
                 <div className="flex gap-2">
                   {req.status !== 'accepted' && req.status !== 'rejected' && (
                     <>
                        <button 
                          className="btn btn-outline text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                          onClick={() => handleUpdateStatus(req.id, 'rejected')}
                        >
                          거절
                        </button>
                        <button 
                          className="btn btn-success"
                          onClick={() => handleUpdateStatus(req.id, 'accepted')}
                        >
                          수용 (예약)
                        </button>
                     </>
                   )}
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
